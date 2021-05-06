import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../types/RestaurantsPageQuery";
import { Restaurant } from "../../components/restaurant";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";

const RESTAURANTS_QUERY = gql`
  query RestaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}, ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, { variables: { input: { page } } });
  const onPrevPageClick = () => setPage((current) => current - 1);
  const onNextPageClick = () => setPage((current) => current + 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({ pathname: "/search", search: `?term=${searchTerm}` });
  };

  return (
    <div>
      <Helmet>
        <title>Home | hUber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="w-full py-20 bg-gray-800 flex justify-center items-center"
      >
        <input
          {...register("searchTerm", { required: true, min: 3 })}
          type="search"
          name="searchTerm"
          placeholder="Search Restaurants..."
          className="w-3/4 md:w-3/12 input rounded-md border-0"
        />
      </form>
      <div>
        {!loading && (
          <div className="max-w-screen-xl mx-auto mt-8 pb-20">
            <div className="max-w-sm mx-auto flex justify-around">
              {data?.allCategories.categories?.map((category) => (
                <Link to={`/category/${category.slug}`} key={category.id}>
                  <div className="flex flex-col items-center cursor-pointer group">
                    <div
                      className="w-16 h-16 rounded-full bg-cover group-hover:bg-gray-100"
                      style={{ backgroundImage: `url(${category.coverImage})` }}
                    >
                      {category.name}
                    </div>
                    <span className="mt-1 text-sm font-medium text-center">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.restaurants.results?.map((restaurant) => (
                <Restaurant
                  key={restaurant.id}
                  id={restaurant.id + ""}
                  name={restaurant.name}
                  coverImg={restaurant.coverImg}
                  categoryName={restaurant.category?.name}
                />
              ))}
            </div>
            <div className="max-w-md mt-10 mx-auto grid grid-cols-3 text-center items-center">
              {page > 1 ? (
                <button
                  onClick={onPrevPageClick}
                  className="text-2xl font-medium focus:outline-none"
                >
                  &larr;
                </button>
              ) : (
                <div></div>
              )}
              <span>
                Page {page} of {data?.restaurants.totalPages}
              </span>
              {data?.restaurants.totalPages &&
              page < data?.restaurants.totalPages ? (
                <button
                  onClick={onNextPageClick}
                  className="text-2xl font-medium focus:outline-none"
                >
                  &rarr;
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
