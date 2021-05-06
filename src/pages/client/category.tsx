import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Category, CategoryVariables } from "../../types/Category";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";

const CATEGORY_QUERY = gql`
  query Category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const CategoryPage = () => {
  const params = useParams<ICategoryParams>();
  const { loading, data } = useQuery<Category, CategoryVariables>(
    CATEGORY_QUERY,
    {
      variables: { input: { page: 1, slug: params.slug } },
    }
  );

  return <h1>Category</h1>;
};
