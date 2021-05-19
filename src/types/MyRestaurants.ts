/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyRestaurants
// ====================================================

export interface MyRestaurants_myRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface MyRestaurants_myRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: MyRestaurants_myRestaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface MyRestaurants_myRestaurants {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  error: string | null;
  restaurants: MyRestaurants_myRestaurants_restaurants[];
}

export interface MyRestaurants {
  myRestaurants: MyRestaurants_myRestaurants;
}
