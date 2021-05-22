import React from "react";
import { Restaurant_restaurant_restaurant_menu_options } from "../types/Restaurant";

interface IDishProps {
  id?: number;
  name: string;
  description: string;
  price: number;
  isCustomer?: boolean;
  options?: Restaurant_restaurant_restaurant_menu_options[] | null;
  isSelected?: boolean;
  orderStarted?: boolean;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
}

export const Dish: React.FC<IDishProps> = ({
  id = 0,
  name,
  description,
  price,
  isCustomer = false,
  options,
  isSelected,
  orderStarted = false,
  addItemToOrder,
  removeFromOrder,
  children: dishOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };

  return (
    <div
      className={`px-8 py-4 border cursor-pointer transition-all ${
        isSelected ? "border-gray-800" : "hover:border-gray-800"
      }`}
    >
      <div className="mb-5">
        <h3 className="text-lg font-medium flex items-center">
          {name}{" "}
          {orderStarted && (
            <button
              className={`ml-3 px-3 py-1 text-sm text-white focus:outline-none ${
                isSelected ? "bg-red-500" : "bg-lime-600"
              }`}
              onClick={onClick}
            >
              {isSelected ? "Remove" : "Add"}
            </button>
          )}
        </h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>₩{price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="mt-8 mb-3 font-medium">Dish Options:</h5>
          <div className="ml-2 grid gap-2 justify-start">{dishOptions}</div>
        </div>
      )}
    </div>
  );
};
