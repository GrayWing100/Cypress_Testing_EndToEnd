describe("Test Example for Viewports", () => {
  it("show different screen sizes", () => {
    cy.visit("https://example.cypress.io/");
    /* U beforeEach postavimo rezoluciju i onda pišemo testove.
           test može npr. da proveri da li je neki element vidljiv:
               cy.get('someElement').should('be.visible')
        */
    // Set viewports and log the device names or viewports being tested

    cy.log("Testing on small screen: 320x480");
    cy.viewport(320, 480);

    cy.log("Testing on extra large screen: 2999x2999");
    cy.viewport(2999, 2999);

    // Create a screenshot for testing purposes
    cy.screenshot("my-image2");

    // Viewports for popular devices
    cy.log("Testing on Samsung Note 9");
    cy.viewport("samsung-note9");
    cy.wait(2000);

    cy.log("Testing on Samsung S10");
    cy.viewport("samsung-s10");
    cy.wait(2000);

    cy.log("Testing on MacBook 16-inch");
    cy.viewport("macbook-16");
    cy.wait(2000);

    cy.log("Testing on Surface Duo");
    cy.viewport(540, 720); // Custom dimensions for Surface Duo
    cy.wait(2000);

    cy.log("Testing on Galaxy Fold");
    cy.viewport(768, 1280); // Custom dimensions for Galaxy Fold
    cy.wait(2000);

    cy.log("Testing on iPhone X");
    cy.viewport("iphone-x");
    cy.wait(2000);

    cy.log("Testing on iPad 2 in portrait mode");
    cy.viewport("ipad-2", "portrait");
    cy.wait(2000);

    cy.log("Testing on iPhone 4 in landscape mode");
    cy.viewport("iphone-4", "landscape");
    cy.wait(2000);
  });
});
