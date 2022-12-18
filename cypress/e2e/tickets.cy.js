/// <reference types="Cypress" />

describe('Ticketbox', () => {
    beforeEach(() => cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html')
    )
    it('Fills all the text input fields', () => {
        const firstName = 'Milos'
        const lastName = 'Kos'
        
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type('mojmail@mail.com')
        cy.get('#requests').type('I do not know')
        cy.get('#signature').type(`${firstName} ${lastName}`)
    })

    it('Selects two tickets', () => {
        cy.get('#ticket-quantity').select("2")
    })

    it('Selects the VIP ticket type', () => {
        cy.get('#vip').check()
    })

    it('Selects Social Media checkbox', () => {
        cy.get('#social-media').check()
    })

    it('Checks Friend, and Publiccation, then unchecks Friend', () => {
        cy.get('#friend').check()
        cy.get('#publication').check()
        cy.get('#friend').uncheck()
    })

    it('Resets the form after filling the first name', () => {
        const firstName = 'Milos'

        cy.get('#first-name').type(firstName)
        cy.get('.agreement > fieldset').should('contain', firstName)

        cy.get('.reset').click()
        cy.get('.agreement > fieldset').should('not.contain', firstName) 
    })

    it('Has TICKETBOX heading', () => {
        cy.get('h1').should('contain', 'TICKETBOX')
    })

    it.only('Successfully submits the form', () => {
        const firstName = 'Milos'
        const lastName = 'Kos'
        const fullName = `${firstName} ${lastName}`

        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type('mojmail@mail.com')
        cy.get('#ticket-quantity').select("3")
        cy.get('#vip').check()

        cy.get('.agreement > fieldset')
            .should("contain", `I, ${fullName}, wish to buy 3 VIP tickets.`)

        cy.get('#friend').check()
        cy.get('#requests').type('I do not know')
        cy.get('#agree').click()
        cy.get('#signature').type(fullName)
        cy.contains('Confirm Tickets').click()

        cy.get('.success > p').should('contain', 'Ticket(s) successfully ordered.')
    })

    it('Successfully submits the form using a support command', () => {
        const customer = {
            firstName: 'Pera',
            lastName: 'Peric',
            email: 'peraperic@detlic.com'
        }

        cy.fillMandatoryFields(customer)

        cy.contains('Confirm Tickets').click()
        cy.get('.success > p').should('contain', 'Ticket(s) successfully ordered.')
    })
})