import { gql, useQuery } from "@apollo/client";
import { WhoamiQuery } from "../types/WhoamiQuery";

const WHOAMI_QUERY = gql`
  query WhoamiQuery {
    whoami {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery<WhoamiQuery>(WHOAMI_QUERY);
};
