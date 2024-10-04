// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

////////////////////////////////////////////
// Command to log in the user
Cypress.Commands.add("loginUser", (user) => {
  cy.visit("/");
  cy.get("#user-name")
    .clear()
    .type(user.username)
    .should("have.value", user.username);
  cy.get("#password")
    .clear()
    .type(user.password)
    .should("have.value", user.password);
  cy.get("#login-button").click();

  // Verify login success
  cy.url().should("contain", "/inventory.html");
  cy.get(".inventory_list").should("be.visible");
});

//////////////////////////////////////////////
// Command to add an item to the cart
Cypress.Commands.add("addItemToCart", (item) => {
  cy.get(item).click();

  // Verify item added to cart
  cy.get(".shopping_cart_badge").should("exist");
});

//////////////////////////////////////////////
// Command to fill out the checkout form
Cypress.Commands.add("fillCheckoutForm", (firstName, lastName, postalCode) => {
  cy.get("#first-name").clear().type(firstName).should("have.value", firstName);
  cy.get("#last-name").clear().type(lastName).should("have.value", lastName);
  cy.get("#postal-code")
    .clear()
    .type(postalCode)
    .should("have.value", postalCode);
});

//////////////////////////////////////////////
// Command to verify the total price with tax included
Cypress.Commands.add("verifyTotalPriceWithTax", () => {
  let itemTotal = 0;

  // Collect all prices from the cart items and sum them up
  cy.get(".cart_item .inventory_item_price")
    .each(($el) => {
      const priceText = $el.text().trim();
      const priceValue = parseFloat(priceText.replace("$", ""));
      itemTotal += priceValue;
    })
    .then(() => {
      // Get the tax amount
      cy.get(".summary_tax_label")
        .invoke("text")
        .then((taxLabelText) => {
          const taxValue = parseFloat(taxLabelText.split("$")[1].trim());

          // Calculate expected total (item total + tax)
          const expectedTotal = itemTotal + taxValue;

          // Verify total price matches the sum of items + tax
          cy.get(".summary_total_label")
            .invoke("text")
            .then((totalSummary) => {
              const totalValue = parseFloat(totalSummary.split("$")[1].trim());
              cy.wrap(totalValue).should("equal", expectedTotal);
            });
        });
    });
});

//////////////////////////////////////////////
//Command to retrieves all item prices, sums them up, and compares the total to the value found in Content
Cypress.Commands.add("sumPricesAndVerify", () => {
  let totalPrice = 0;
  // Collect all prices from `.item_pricebar` and sum them up
  cy.get(".item_pricebar")
    .each(($el) => {
      // Extract the text price and convert to number
      cy.wrap($el)
        .find(".inventory_item_price") // Assuming prices are in `.inventory_item_price`
        .invoke("text")
        .then((priceText) => {
          const priceValue = parseFloat(priceText.replace("$", "").trim());
          totalPrice += priceValue;
        });
    })
    .then(() => {
      // Once the sum is done, get the value from data-test="subtotal-label
      cy.get(".summary_subtotal_label")
        .invoke("text")
        .then((totalFromContent) => {
          const totalContentValue = parseFloat(
            totalFromContent.split("$")[1].trim()
          );

          // Assert if the sum of prices equals the total content value
          cy.wrap(totalPrice).should("equal", totalContentValue);
        });
    });
});
