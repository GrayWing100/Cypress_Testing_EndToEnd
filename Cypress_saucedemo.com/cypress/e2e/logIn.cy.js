beforeEach(() => {
  cy.visit("/");
});

describe("Testing login for all users in SauceDemo", () => {
  it("Login with standard user", () => {
    // Login with standard user
    cy.fixture("user.json").then((config) => {
      cy.loginUser(config.users.standard_user); // Using custom login command
    });

    // Verify successful login
    cy.get(".shopping_cart_link").should("be.visible");
    cy.url().should("contain", "/inventory.html");
  });

  it("Login with locked_out_user", () => {
    // Login with locked-out user
    cy.fixture("user.json").then((config) => {
      cy.loginUser(config.users.locked_out_user); // Using custom login command
    });

    // Verify error message for locked-out user
    cy.get('[data-test="error"]').should(
      "contain",
      "Sorry, this user has been locked out."
    );
  });

  it("Login with problem_user", () => {
    cy.fixture("user.json").then((config) => {
      cy.loginUser(config.users.problem_user);
    });

    // Test fails if the images load correctly
    cy.get("img.inventory_item_img")
      .should("have.length", 6)
      .each(($img) => {
        cy.wrap($img).should("have.attr", "src").and("include", "sl-404");
      });
  });

  it("Login with performance_glitch_user", () => {
    cy.fixture("user.json").then((config) => {
      cy.loginUser(config.users.performance_glitch_user);
    });

    // Verify successful login
    cy.get(".shopping_cart_link", { timeout: 10000 }).should("be.visible");
    cy.url().should("contain", "/inventory.html");
  });

  it("Login with error_user", () => {
    cy.fixture("user.json").then((config) => {
      cy.loginUser(config.users.error_user);
    });

    // Verify successful login
    cy.get(".shopping_cart_link").should("be.visible");
    cy.url().should("contain", "/inventory.html");
  });

  it("Login with visual_user", () => {
    cy.fixture("user.json").then((config) => {
      cy.loginUser(config.users.visual_user);
    });

    // Verify successful login
    cy.get(".shopping_cart_link").should("be.visible");
    cy.url().should("contain", "/inventory.html");
  });

  it("Can not login with invalid credentials", () => {
    cy.fixture("user.json").then((config) => {
      cy.loginUser(config.users.wrong_user);
    });

    cy.get('[data-test="error"]').should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
