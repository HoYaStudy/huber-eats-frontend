/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface Category_category_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface Category_category_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: Category_category_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface Category_category_category {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface Category_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: Category_category_restaurants[] | null;
  category: Category_category_category | null;
}

export interface Category {
  category: Category_category;
}

export interface CategoryVariables {
  input: CategoryInput;
}
