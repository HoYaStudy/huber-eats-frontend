import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import {
  CreateRestaurant,
  CreateRestaurantVariables,
} from "../../types/CreateRestaurant";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";
import { useHistory } from "react-router-dom";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation CreateRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

export const AddRestaurant = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const onCompleted = (data: CreateRestaurant) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      const { name, address, categoryName, file } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                id: restaurantId,
                name,
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImg: imageUrl,
                isPromoted: false,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      history.push("/");
    }
  };
  const [CreateRestaurantMutation, { data }] = useMutation<
    CreateRestaurant,
    CreateRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: MY_RESTAURANTS_QUERY }],
  });
  const {
    register,
    getValues,
    formState: { isValid },
    handleSubmit,
  } = useForm<IFormProps>({ mode: "onChange" });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { name, address, categoryName, file } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      setImageUrl(coverImg);
      CreateRestaurantMutation({
        variables: { input: { name, address, categoryName, coverImg } },
      });
    } catch (e) {}
  };

  return (
    <div className="container mt-52 flex flex-col items-center">
      <Helmet>
        <title>Add Restaurant | hUber Eats</title>
      </Helmet>
      <h4 className="mb-3 text-2xl font-semibold">Add Restaurant</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-screen-sm mt-5 mb-5 grid gap-3"
      >
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="Name"
          className="input"
        />
        <input
          {...register("address", { required: "Address is required" })}
          type="text"
          placeholder="Address"
          className="input"
        />
        <input
          {...register("categoryName", {
            required: "Category name is required",
          })}
          type="text"
          placeholder="Category Name"
          className="input"
        />
        <div>
          <input
            {...register("file", { required: true })}
            type="file"
            accept="image/*"
          />
        </div>
        <Button
          loading={uploading}
          canClick={isValid}
          actionText="Create Restaurant"
        />
        {data?.createRestaurant?.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )}
      </form>
    </div>
  );
};
