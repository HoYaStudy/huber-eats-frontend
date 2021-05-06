import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useLazyQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  SearchRestaurant,
  SearchRestaurantVariables,
} from "../../types/SearchRestaurant";

const SEARCH_RESTAURANT = gql`
  query SearchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [queryReadyToStart] = useLazyQuery<
    SearchRestaurant,
    SearchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const [_, query] = location.search.split("?term-");
    if (!query) {
      return history.replace("/");
    }
    queryReadyToStart({ variables: { input: { page: 1, query } } });
  }, [location, history]);

  return (
    <div>
      <Helmet>
        <title>Search | hUber Eats</title>
      </Helmet>
      <h1>Search Page</h1>
    </div>
  );
};
