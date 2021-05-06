import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { Restaurant, RestaurantVariables } from "../../types/Restaurant";

const RESTAURANT_QUERY = gql`
  query Restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

export const RestaurantPage = () => {
  const params = useParams<IRestaurantParams>();
  const { loading, data } = useQuery<Restaurant, RestaurantVariables>(
    RESTAURANT_QUERY,
    { variables: { input: { restaurantId: Number(params.id) } } }
  );

  return (
    <div>
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ""} | hUber Eats</title>
      </Helmet>
      <div
        className="py-48 bg-cover bg-center bg-gray-800"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="w-3/12 py-8 pl-48 bg-white">
          <h4 className="mb-3 text-4xl">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="mb-2 text-sm font-light">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h6 className="text-sm font-light">
            {data?.restaurant.restaurant?.address}
          </h6>
        </div>
      </div>
    </div>
  );
};
