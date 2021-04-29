import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";

export const Header: React.FC = () => {
  const { data } = useMe();

  return (
    <>
      {!data?.whoami.verified && (
        <div className="bg-red-500 p-3 text-center text-white">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full max-w-screen-xl mx-auto px-5 flex justify-between items-center xl:px-0">
          <Link to="/">
            <div className="w-24">
              <span className="text-2xl font-medium font-sans mr-2">hUber</span>
              <span className="text-2xl font-medium font-sans text-lime-500">
                Eats
              </span>
            </div>
          </Link>
          <span>
            <Link to="/my-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
