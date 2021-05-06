import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";
import { EditProfile, EditProfileVariables } from "../../types/EditProfile";

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfilePage = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: EditProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        whoami: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              verified
              email
            }
          `,
          data: { email: newEmail, verified: false },
        });
      }
    }
  };
  const [editProfile, { loading }] = useMutation<
    EditProfile,
    EditProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: { email: userData?.whoami.email },
  });
  const onSubmit = () => {
    const { email, password } = getValues();

    editProfile({
      variables: { input: { email, ...(password !== "" && { password }) } },
    });
  };

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile| hUber Eats</title>
      </Helmet>
      <h4 className="mb-3 text-2xl font-semibold">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-screen-sm mt-5 mb-5 grid gap-3"
      >
        <input
          {...register("email", {
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="input"
          type="email"
          placeholder="Email"
        />
        <input
          {...register("password")}
          className="input"
          type="password"
          placeholder="Password"
        />
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText="Update Profile"
        />
      </form>
    </div>
  );
};
