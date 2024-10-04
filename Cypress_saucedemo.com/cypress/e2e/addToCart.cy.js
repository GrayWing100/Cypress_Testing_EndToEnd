beforeEach(() => {
  cy.fixture("user.json").then((config) => {
    cy.loginUser(config.users.standard_user);
  });
});

describe("Add products to cart with standard_user", () => {
  it("Purchase a product - backpack", () => {
    // Add backpack to the cart
    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");
    cy.get("#remove-sauce-labs-backpack").should("have.text", "Remove");

    // Capture item name and price
    cy.get(".inventory_item_name").first().invoke("text").as("itemName");
    cy.get(".inventory_item_price").first().invoke("text").as("itemPrice");

    // Go to cart and verify checkout
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");
    cy.get(".cart_item").should("have.length", 1);

    cy.get("@itemName").then((itemName) => {
      cy.get(".cart_item_label .inventory_item_name").should(
        "have.text",
        itemName
      );
    });

    cy.get("@itemPrice").then((itemPrice) => {
      cy.get(".cart_item .inventory_item_price").should("have.text", itemPrice);

      // Proceed to checkout
      cy.get("#checkout").click();
      cy.url().should("include", "/checkout-step-one.html");

      // Fill out checkout form
      cy.fillCheckoutForm("Milan", "Jovanovic", "AG 66722");

      cy.get("#continue").click();
      cy.url().should("include", "/checkout-step-two.html");

      // Verify total prices (including tax)
      cy.get(".summary_subtotal_label")
        .invoke("text")
        .should("contain", itemPrice);
      cy.get(".summary_tax_label")
        .invoke("text")
        .then((taxLabelText) => {
          const taxAmount = parseFloat(taxLabelText.split("$")[1].trim());
          const itemTotal = parseFloat(itemPrice.split("$")[1].trim());
          const expectedTotalPrice = taxAmount + itemTotal;

          cy.get(".summary_total_label")
            .invoke("text")
            .then((totalSummary) => {
              const actualTotal = parseFloat(totalSummary.split("$")[1].trim());
              cy.expect(actualTotal).to.equal(expectedTotalPrice);
            });
        });
    });

    // Complete the purchase
    cy.get("#finish").click();
    cy.url().should("include", "/checkout-complete.html");
    cy.get(".complete-header").should("have.text", "Thank you for your order!");

    // Return to inventory page
    cy.get("#back-to-products").click();
    cy.url().should("include", "/inventory.html");
  });

  it("Add and remove product from cart", () => {
    // Add backpack to the cart
    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");

    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");

    // Continue shopping and remove item
    cy.get("#continue-shopping").click();
    cy.get("#remove-sauce-labs-backpack").click();
    cy.get("#add-to-cart-sauce-labs-backpack").should(
      "have.text",
      "Add to cart"
    );
    cy.get(".shopping_cart_badge").should("not.exist");

    // Verify cart is empty
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");
    cy.get(".cart_item").should("have.length", 0);
  });

  it("Login and remove items from cart", () => {
    // Add two items to the cart
    cy.get(".inventory_item").first().contains("Add to cart").click();
    cy.get(".inventory_item").eq(2).contains("Add to cart").click();

    // Verify two items in the cart
    cy.get(".shopping_cart_badge").should("have.text", "2");

    // Remove one item from the cart
    cy.get(".shopping_cart_link").click();
    cy.get(".cart_item").first().find(".cart_button").click();

    // Verify only one item remains
    cy.get(".cart_item").should("have.length", 1);
    cy.get(".shopping_cart_badge").should("have.text", "1");

    cy.get("#checkout").click();

    // Fill out checkout form
    cy.fillCheckoutForm("Milan", "Jovanovic", "AG 66722");

    cy.get("#continue").click();
    cy.url().should("include", "/checkout-step-two.html");
  });

  it("Purchase multiple products with dynamic item count", () => {
    // Add multiple items to the cart
    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");
    cy.addItemToCart("#add-to-cart-sauce-labs-bike-light");
    cy.addItemToCart("#add-to-cart-sauce-labs-bolt-t-shirt");

    // Empty array to store item prices
    let itemPrices = [];

    // Collect the prices of all items added to the cart
    cy.get(".inventory_item_price").each(($el) => {
      cy.wrap($el)
        .invoke("text")
        .then((price) => {
          itemPrices.push(price); // Add price to the array
        });
    });

    // Proceed to checkout
    cy.get(".shopping_cart_link").click();
    cy.get("#checkout").click();

    // Fill out checkout form and continue
    cy.fillCheckoutForm("User", "Name", "AG 66722");
    cy.get("#continue").click();

    // Use the custom command to sum prices and verify against the total price, with out taxes
    cy.sumPricesAndVerify();
    cy.verifyTotalPriceWithTax();

    // Complete the purchase
    cy.get("#finish").click();

    // Verify the checkout complete page
    cy.url().should("contain", "/checkout-complete.html");

    // Check for the completion message
    cy.get(".complete-header").should("have.text", "Thank you for your order!");

    // Return to the products page
    cy.get("#back-to-products").click();
    cy.url().should("contain", "/inventory.html");
  });
});
