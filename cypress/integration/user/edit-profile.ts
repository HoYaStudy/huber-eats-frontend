describe("Edit Profile", () => {
  const user = cy;

  beforeEach(() => {
    user.login("testClient@cypress.com", "testClient");
  });

  it("can go to /edit-profile using the header", () => {
    user.get("a[href='/edit-profile']").click();
    user.title().should("eq", "Edit Profile | hUber Eats");
  });

  it("can change email", () => {
    user.intercept("POST", "http://localhost:4000/graphql", (req) => {
      if (req.body?.operationName === "EditProfile") {
        req.body?.variables?.input?.email = "testClient@cypress.com";
      }
    });
    user.visit("/edit-profile");
    user.findByPlaceholderText(/email/i).clear().type("newClient@cypress.com");
    user.findByRole("button").click();
  });
});
