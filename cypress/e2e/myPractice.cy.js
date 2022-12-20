/// <reference types="Cypress" />

describe('First cypress test by myself', () => {
beforeEach(() => cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html')
    )
    it('Successfully ordering tickets with only mandatory fields without support', () => {
        var firstName = 'Milos'
        var lastName = 'Kos'
        var email = 'milos.kos@email.com'

        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type(email)
        cy.get('#agree').click()
        

        cy.get('[type="submit"]').click()
        cy.get('.success')
            .should('be.visible')
            .and('contain', 'successfully ordered')
    })

    it('Successfully ordering multiple VIP tickets with all the fields fullfiled', ()=>{
        var firstName = 'Milos'
        var lastName = 'Kos'
        var email = 'milos.kos@email.com'
        var signature = `${firstName} ${lastName}`

        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type(email)
        cy.get('#ticket-quantity').select("3") //this way, it clicks on value 3
        //cy.get('#ticket-quantity').select(3) //this way it click on 3th value on the list, which is 4
        cy.get('#vip').click()

        cy.get('fieldset > p').should('contain', 'I, ' + signature + ', wish to buy 3 VIP tickets. I understand that all ticket sales are final.')

        cy.get("input[type='checkbox']").click({multiple: true})
        cy.get('#signature').type(signature)
        cy.get('[type="submit"]').click()

        cy.get('.success')
            .should('be.visible')
            .and('contain', 'successfully ordered')
    })

    it.only('Reset button bug', ()=>{
        cy.get('.reset').click()
        cy.get('#general').should('not.be.selected')
        cy.get('#vip').should('not.be.selected')
        cy.get('fieldset > p').should('not.contain', 'General Admission')
        //on reset, none of radio buttons are checked, but still in Purchase Agreement is written that General Admission card is selected
    })

    it('Reset button working with input fields', ()=>{
        var firstName = 'Milos'
        var lastName = 'Kos'
        var email = 'milos.kos@email.com'
        var signature = `${firstName} ${lastName}`

        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type(email)
        cy.get('#signature').type(signature)
        cy.get('.reset').click()

        cy.get('[type="text"]').should('be.empty')
    })
})