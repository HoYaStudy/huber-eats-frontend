import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "../header";
import { WHOAMI_QUERY } from "../../hooks/useMe";

describe("<Header />", () => {
  it("render verify banner", async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: { query: WHOAMI_QUERY },
              result: {
                data: {
                  whoami: { id: 1, email: "", role: "", verified: false },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      getByText("Please verify your email");
    });
  });

  it("render without verify banner", async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: { query: WHOAMI_QUERY },
              result: {
                data: {
                  whoami: { id: 1, email: "", role: "", verified: true },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(queryByText("Please verify your email")).toBeNull();
    });
  });
});
