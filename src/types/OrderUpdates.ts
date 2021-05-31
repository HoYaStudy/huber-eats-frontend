/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderUpdatesInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: OrderUpdates
// ====================================================

export interface OrderUpdates_orderUpdates_customer {
  __typename: "User";
  email: string;
}

export interface OrderUpdates_orderUpdates_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface OrderUpdates_orderUpdates_driver {
  __typename: "User";
  email: string;
}

export interface OrderUpdates_orderUpdates {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  customer: OrderUpdates_orderUpdates_customer | null;
  restaurant: OrderUpdates_orderUpdates_restaurant | null;
  driver: OrderUpdates_orderUpdates_driver | null;
}

export interface OrderUpdates {
  orderUpdates: OrderUpdates_orderUpdates;
}

export interface OrderUpdatesVariables {
  input: OrderUpdatesInput;
}
