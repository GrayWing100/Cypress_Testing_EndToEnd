describe('Test Table Demo', () => {
    beforeEach(() => {
        // izvrsava se pre svakog testa
        cy.visit('https://www.w3schools.com/html/html_tables.asp')
    })

    it('First Field First Row', () => {
        cy.get('#customers')
            .find('tbody>tr').first()
            .next()
            .find('td')
            .first()
            .should('have.text', 'Alfreds Futterkiste')

        /* primer da smo imali button u tom polju koji zelimo kasnije da kliknemo
            .find('button').as('myBtn')

            cy.get('@myBtn').click()
        */
    })

    it('Second Field Last Row', () => {
        cy.get('#customers')
            .find('tbody>tr')
            .last()
            .find('td')
            .first()
            .siblings()
            .first()
            .should('have.text', 'Giovanni Rovelli')
    })
})
