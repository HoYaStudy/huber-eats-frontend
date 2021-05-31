/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: CookedOrders
// ====================================================

export interface CookedOrders_cookedOrders_customer {
  __typename: "User";
  email: string;
}

export interface CookedOrders_cookedOrders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface CookedOrders_cookedOrders_driver {
  __typename: "User";
  email: string;
}

export interface CookedOrders_cookedOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  customer: CookedOrders_cookedOrders_customer | null;
  restaurant: CookedOrders_cookedOrders_restaurant | null;
  driver: CookedOrders_cookedOrders_driver | null;
}

export interface CookedOrders {
  cookedOrders: CookedOrders_cookedOrders;
}
