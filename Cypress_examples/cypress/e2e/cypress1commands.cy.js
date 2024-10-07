describe("Return values & Multi locator", () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit("https://www.calculator.net/");
  });

  it("Return values", () => {
    cy.get("#bluebtn").then((btn) => {
      // store the button's text
      const txt = btn.text();

      // click on the link
      cy.contains("Loan Calculator").click();

      // compare the two buttons' text and make sure they are the same
      cy.get("#bluebtn").should("have.text", txt);
    });
  });

  it("Return values with class", () => {
    cy.get("#bluebtn").then((btn) => {
      const btnClass = btn.attr("class");

      cy.wrap(btn).click().should("not.have.class", btnClass);
    });
  });

  it('Multi locator should locate all "a" tags.', () => {
    // Check how many links are on the page
    cy.get("a").should("have.length", 55);

    cy.get("a").each((el, index) => {
      console.log(index + " " + el.text());
      if (el.text() === "Mortgage Calculator") {
        cy.wrap(el).click();
      }
    });
  });
});
