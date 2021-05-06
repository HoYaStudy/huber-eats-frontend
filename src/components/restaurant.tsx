import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  name: string;
  coverImg: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  name,
  coverImg,
  categoryName,
}) => (
  <Link to={`/restaurants/${id}`}>
    <div className="flex flex-col">
      <div
        className="mb-3 py-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImg})` }}
      ></div>
      <h3 className="text-xl font-medium">{name}</h3>
      <span className="mt-2 border-t border-gray-400 py-2 text-xs opacity-60">
        {categoryName}
      </span>
    </div>
  </Link>
);
