import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="h-screen flex flex-col justify-center items-center">
    <h2 className="mb-3 text-3xl font-semibold">Nothing to eat here...</h2>
    <h4 className="mb-5">Let’s discover something delicious.</h4>
    <Link to="/" className="hover:underline">
      Go back to <span className="text-lime-600">home</span> &rarr;
    </Link>
  </div>
);
