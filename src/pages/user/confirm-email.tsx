import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { VerifyEmail, VerifyEmailVariables } from "../../types/VerifyEmail";
import { useMe } from "../../hooks/useMe";

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();
  const onCompleted = (data: VerifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.whoami.id) {
      client.writeFragment({
        id: `User:${userData.whoami.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: { verified: true },
      });
      history.push("/");
    }
  };
  const [VerifyEmail] = useMutation<VerifyEmail, VerifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    { onCompleted }
  );

  useEffect(() => {
    const [_, code] = window.location.href.split("code=");

    VerifyEmail({ variables: { input: { code } } });
  }, [VerifyEmail]);

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Verify Email | hUber Eats</title>
      </Helmet>
      <h2 className="mb-1 text-lg font-medium">Confirming email...</h2>
      <h4 className="text-sm text-gray-700">
        Please wait, don't close this page.
      </h4>
    </div>
  );
};
