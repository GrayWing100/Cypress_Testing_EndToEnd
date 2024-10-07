const country = require("../fixtures/country.json");
const example = require("../fixtures/example.json");

describe("Hooks, Fixture Test,Fixture Tests with Require", () => {
  let city;

  /*
1. before()
2. beforeEach()
3. tests
4. afterEach()
5. after()
 */

  before(() => {
    // runs once before all tests in the block
    cy.log("*************** SETUP ***************");
  });

  after(() => {
    // runs once after all tests in the block
    cy.log("*************** TEAR DOWN ***************");
  });

  beforeEach(() => {
    // runs before each test in the block
    cy.log("*************** LOGIN ***************");

    cy.fixture("city").then((c) => {
      city = c;
    });

    // bolji pristup
    cy.fixture("city").as("cityAlias");
  });

  afterEach(() => {
    cy.log("*************** LOGOUT ***************");
  });

  it("Add Customer Test", () => {
    cy.log("*************** ADD CUSTOMER ***************");
  });
  it("Edit Customer Test", () => {
    cy.log("*************** EDIT CUSTOMER ***************");
  });
  it("Delete Customer Test", () => {
    cy.log("*************** DELETE CUSTOMER ***************");
  });

  it("has loaded city - Fixture Test", () => {
    expect(city.name).to.equal("Novi Sad");

    cy.get("@cityAlias").then((city) => {
      expect(city.name).to.equal("Novi Sad");
    });
  });

  it("load city with cy.fixture command - Fixture Test", () => {
    cy.fixture("city").should("deep.equal", { name: "Novi Sad" });
  });

  it("load country with cy.fixture command - Fixture Test", () => {
    // Load the fixture with cy.fixture() and alias it
    cy.fixture("country").as("country"); // This works

    // Use the 'then' function to access fixture data after it's been loaded
    cy.get("@country").then((country) => {
      // Access the first country
      const myCountry = country[0];

      // Assert that the h1 contains the correct country name
      //cy.get("h1").should("contain", myCountry.name);
    });
  });

  it("load country - Fixture Tests with Require", () => {
    expect(country.name).to.equal("Serbia");
  });

  it("load email - Fixture Tests with Require", () => {
    expect(example.email).to.equal("hello@cypress.io");
  });

  it("to demonstrate videos - Fixture Tests", () => {
    expect(city.name).to.equal("Belgrade");
  });
});
