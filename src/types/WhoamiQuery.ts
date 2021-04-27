/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: WhoamiQuery
// ====================================================

export interface WhoamiQuery_whoami {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  verified: boolean;
}

export interface WhoamiQuery {
  whoami: WhoamiQuery_whoami;
}
