import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";

export const Header: React.FC = () => {
  const { data } = useMe();

  return (
    <header className="py-4">
      <div className="w-full max-w-screen-xl mx-auto px-5 flex justify-between items-center xl:px-0">
        <div className="w-24">
          <span className="text-2xl font-medium font-sans mr-2">hUber</span>
          <span className="text-2xl font-medium font-sans text-lime-500">
            Eats
          </span>
        </div>
        <span>
          <Link to="/my-profile">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>
        </span>
      </div>
    </header>
  );
};
