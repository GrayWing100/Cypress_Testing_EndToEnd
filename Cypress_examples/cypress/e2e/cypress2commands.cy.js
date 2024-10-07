describe("Return values & Multi locator", () => {
  beforeEach(() => {
    // Runs before each test in the block
    cy.visit("https://example.cypress.io/");
  });

  it("with list of items", () => {
    // Verify that the dropdown is not visible or inactive before clicking
    cy.get(".dropdown-menu").should("not.be.visible");
    // Click on the dropdown toggle
    cy.get(".dropdown-toggle").click();
    // Verify that the dropdown becomes visible after clicking
    cy.get(".dropdown-menu").should("be.visible");

    cy.get(".dropdown-menu > li").then(function (lis) {
      expect(lis).to.have.length(17); // Ensure dropdown has 17 items
      expect(lis.eq(0)).to.contain("Querying");
      expect(lis.eq(1)).to.contain("Traversal");
      expect(lis.eq(2)).to.contain("Actions");
    });

    // Click on the 10th item in the dropdown menu
    cy.get(".dropdown-menu > :nth-child(10) > a").click();

    // Check items in the list under ".connectors-list"
    cy.get(".connectors-list>li").then(function (lis) {
      expect(lis).to.have.length(3);
      expect(lis.eq(0)).to.contain("Walk the dog");
      expect(lis.eq(1)).to.contain("Feed the cat");
      expect(lis.eq(2)).to.contain("Write JavaScript");
    });
  });

  it("with chaining on example site", () => {
    // Test chaining with the first header (h1)
    cy.get("h1")
      .then((title) => {
        // Log and assert the first message (h1 text)
        console.log("First message: " + title.text());
        expect(title.text()).to.equal("Kitchen Sink");

        return "This is the second message"; // Return custom text for the next .then()
      })
      .then((text) => {
        // Log and assert the second message
        console.log("Second message: " + text);
        expect(text).to.equal("This is the second message");
      });

    // Test chaining with an existing element (h1)
    cy.get("h1")
      .then((title) => {
        // Log and assert the first message (h1 text)
        console.log("First message: " + title.text());
        expect(title.text()).to.equal("Kitchen Sink");
      })
      .then((title) => {
        // Log and assert the second message (we still deal with 'title')
        console.log("Second message: " + title.text());
        expect(title.text()).to.equal("Kitchen Sink");
      });

    // Test chaining with a second element (h2) after h1
    cy.get("h1")
      .then((title) => {
        // Log and assert the first message (h1 text)
        console.log("First message: " + title.text());
        expect(title.text()).to.equal("Kitchen Sink");

        // Return h2 element for the next .then()
        return cy.get("h2");
      })
      .then((title2) => {
        // Log and assert the second message (h2 text)
        console.log("Second message: " + title2.text());
        expect(title2.text()).to.equal("CommandsUtilitiesCypress API");
      });

    // Test chaining with the second header (h2)
    cy.get("h2")
      .first()
      .then((title) => {
        // Log and assert the first message (h2 text)
        console.log("First message: " + title.text());
        expect(title.text()).to.equal("Commands");

        // Return h2 element for the next .then()
        return cy.get("h2");
      })
      .then((text) => {
        // Log and assert the second message
        console.log("Second message: " + text);
        expect(text).to.contain("Commands");
      });
  });
});
