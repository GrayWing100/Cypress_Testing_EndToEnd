describe("Demo za .request na SauceDemo", () => {
  it("Test response-a", () => {
    cy.request("https://www.saucedemo.com/inventory.html").should(
      (response) => {
        console.log(response);
        expect(response.status).to.eq(200);
        // Since we are not using an API, we can just check the response structure
        expect(response.body).to.include("Sauce Labs Backpack"); // Check if the response body includes a known item
      }
    );
  });

  it("Cuvanje odgovora", () => {
    cy.request("https://www.saucedemo.com/inventory.html")
      .its("body") // uzimamo ceo body
      .as("inventoryPage") // čuvamo objekat u okviru testa
      .then(function () {
        // Simuliramo dodavanje proizvoda u korpu
        cy.visit("https://www.saucedemo.com/");
        cy.get('[data-test="username"]').type("standard_user");
        cy.get('[data-test="password"]').type("secret_sauce");
        cy.get('[data-test="login-button"]').click();

        // Dodajemo proizvod u korpu
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Verifikujemo da se proizvod dodao u korpu
        cy.get(".shopping_cart_badge").should("have.text", "1");
      });
  });
});

describe("The Dashboard Page", () => {
  beforeEach(() => {
    // Resetovanje i seeding baze pre svakog testa nije moguće ovde,
    // pa ćemo samo osigurati da se korisnik može prijaviti.
    cy.visit("https://www.saucedemo.com/");
  });

  it("logs in programmatically without using the UI", function () {
    // Simuliramo prijavu preko UI-a
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    // Verifikujemo da smo na stranici sa inventarom
    cy.url().should("include", "/inventory.html");

    // Proveravamo da je korisnik uspešno prijavljen
    cy.get(".shopping_cart_link").should("exist");

    // Verifikujemo da je na stranici korisničko ime vidljivo
    cy.get("h2").should("contain", "Products");
  });

  //////////
  //   it("Test response-a", () => {
  //     cy.request("https://jsonplaceholder.cypress.io/comments").should(
  //       (response) => {
  //         console.log(response);
  //         expect(response.status).to.eq(200);
  //         expect(response.body).to.have.length(500);
  //         expect(response).to.have.property("headers");
  //         expect(response).to.have.property("duration");
  //       }
  //     );
  //   });

  //   it("Cuvanje odgovora", () => {
  //     cy.request("https://jsonplaceholder.cypress.io/users?_limit=1")
  //       .its("body.0") // uzimamo prvi element
  //       .as("user") // cuvamo objekat u okviru testa
  //       .then(function () {
  //         // da bismo pristupili sacuvanom objektu koristimo "function () { ... }" callback
  //         cy.request("POST", "https://jsonplaceholder.cypress.io/posts", {
  //           userId: this.user.id,
  //           title: "Cypress Test Runner",
  //           body: "Fast, easy and reliable testing for anything that runs in a browser.",
  //         })
  //           .its("body")
  //           .as("objava"); // cuvamo kreirani post
  //       })
  //       .then(function () {
  //         console.log(this.objava);
  //         // kada se pokrene callback .request komande su se izvrsile i mozemo da pristupimo user-u i post-u
  //         expect(this.objava, "post has the right user id")
  //           .property("userId")
  //           .to.equal(this.user.id);
  //       });
  //   });
  // });

  // describe("The Dashboard Page", () => {
  //   beforeEach(() => {
  //     // reset and seed the database prior to every test
  //     cy.exec("npm run db:reset && npm run db:seed");

  //     // seed a user in the DB that we can control from our tests
  //     // assuming it generates a random password for us
  //     cy.request("POST", "/test/seed/user", { username: "jane.lane" })
  //       .its("body")
  //       .as("currentUser");
  //   });

  //   it("logs in programmatically without using the UI", function () {
  //     // destructuring assignment of the this.currentUser object
  //     const { username, password } = this.currentUser;

  //     // programmatically log us in without needing the UI
  //     cy.request("POST", "/login", {
  //       username,
  //       password,
  //     });

  //     // now that we're logged in, we can visit
  //     // any kind of restricted route!
  //     cy.visit("/dashboard");

  //     // our auth cookie should be present
  //     cy.getCookie("your-session-cookie").should("exist");

  //     // UI should reflect this user being logged in
  //     cy.get("h1").should("contain", "jane.lane");
  //   });
});
