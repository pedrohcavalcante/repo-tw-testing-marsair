import mars_air_home_page from '../support/page_objects/main_page_po'
import search_results from '../support/page_objects/search_results'
const main_page = new mars_air_home_page()
const search_page = new search_results()


describe('Link to Home Page', () => {
    beforeEach(() => {
        cy.visit('https://marsair.thoughtworks-labs.net/pedro.henrique.bezerra.cavalcante')
    })
    it('Check if departure and returning fields exists', () => {
        /**
         * Verify if the departing and returning menus are available to click
         */
        main_page.departing_drop_down().should('be.visible')
        main_page.returning_drop_down().should('be.visible')

    })
    it('Check if have flights for at least July and December', () => {
        /**
         * Verify if options to travel on July and December of current year are available
         */
        main_page.departing_drop_down().select('July').should('include.text', 'July')
        main_page.returning_drop_down().select('December').should('include.text', 'December')
    })
    it('Check if trips are available for next two years', () => {
        /**
         * Verify if options to return two years from now are available
         */
        main_page.departing_drop_down().select('July').should('include.text', 'July (next year)')
        main_page.returning_drop_down().select('December').should('include.text', 'December (next year)')
        main_page.departing_drop_down().select('July').should('include.text', 'July (two years from now)')
        main_page.returning_drop_down().select('December').should('include.text', 'December (two years from now)')
    })
    it('Check searching for seats available', () => {
        /**
         * Verify for tickets that are available
         */
        main_page.departing_drop_down().select('July')
        main_page.returning_drop_down().select('December (two years from now)')
        main_page.search_button().click()
        search_page.seats_available().should('be.visible')
    })
    it('Check searching if there are no more seats available', () => {
        /**
         * Verify for tickets that are unavailable
         */
        main_page.departing_drop_down().select('July')
        main_page.returning_drop_down().select('December (next year)')
        main_page.search_button().click()
        search_page.no_more_seats_available().should('be.visible')
    })
    it('Checks if company slogan shows on main page', () => {
        /**
         * Verify if slogan text is showing up within the page
         */
        main_page.book_a_ticket_text().should('be.visible')
    })
    it('Check redirection from top left logo', () => {
        /**
         * Verify scenario which redirects the user to main page after clicking at MarsAir logo after 
         * searching for tickets, valid or not
         */
        main_page.departing_drop_down().select('July')
        main_page.returning_drop_down().select('December (next year)')
        main_page.search_button().click()
        main_page.top_left_logo().click()
        main_page.book_a_ticket_text().should('be.visible')
        cy.url().should('eq', 'https://marsair.thoughtworks-labs.net/pedro.henrique.bezerra.cavalcante')
    })
})

describe('Invalid Return Dates', () => {
    beforeEach(() => {
        cy.visit('https://marsair.thoughtworks-labs.net/pedro.henrique.bezerra.cavalcante')
    })

    it('Check for dates less than 1 year from depature', () => {
        /**
         * All right, accordling to scenarios, the users is not allowed to go back before 1 year
         */
        
        main_page.departing_drop_down().select('July')
        main_page.returning_drop_down().select('December')
        main_page.search_button().click()
        search_page.schedule_not_possible().should('be.visible')
    })

    it('Check for dates with more than 1 year from departure', () => {
        /**
         * Ok to check for no more seats available. It is a regular situation. 
         * But for a better UX, the application would be allowed to suggest months that 
         * can be booked for returning
         */
        main_page.departing_drop_down().select('July')
        main_page.returning_drop_down().select('December (next year)')
        main_page.search_button().click()
        search_page.no_more_seats_available().should('be.visible')
    })

    it('Check for dates with exactly 1 year from departure', () => {
        /**
         * Regular situation, the flight can be completelly booked by now.
         */
        main_page.departing_drop_down().select('July')
        main_page.returning_drop_down().select('July (next year)')
        main_page.search_button().click()
        search_page.no_more_seats_available().should('be.visible')
    })

    it('Check dates with returning date before than departure date', () => {
        /**
         * The results from this scenario would expect the user to get a message
         * telling that that schedule is not possible or, even before submit the form, 
         * the user should not be able to select month less than the departing month. 
         */
        main_page.departing_drop_down().select('December (next year)')
        main_page.returning_drop_down().select('July')
        main_page.search_button().click()
        search_page.no_more_seats_available().should('be.visible')
    })
})

describe('Promotional Codes', () => {
    beforeEach(() => {
        cy.visit('https://marsair.thoughtworks-labs.net/pedro.henrique.bezerra.cavalcante')
    })
    it('Check promotional codes with the correct format', () => {
        /**
         * Expected to give 30% discount on booking tickets to Mars
         */
        let code = 'AF3-FJK-418'
        main_page.departing_drop_down().select('July')
        main_page.returning_drop_down().select('December (two years from now)')
        main_page.promotional_code_text_field().type(code)
        main_page.search_button().click()
        search_page.promo_code().should('contain', `Promotional code ${code} used: 30% discount!`)
    })
    it('Check promotional codes with the wrong format', () => {
        /**
         * Expected behavior to warn user that this code is not a valid one
         */
        let code = 'ABCD'
        main_page.departing_drop_down().select('July')
        main_page.returning_drop_down().select('December (two years from now)')
        main_page.promotional_code_text_field().type(code)
        main_page.search_button().click()
        search_page.promo_code().should('contain', `Sorry, code ${code} is not valid`)
    })
    it('Check promotional code that is invalid', () => {
        /**
         * Expected behavior to warn user that this code is not a valid one
         */
        let code = 'JJ5-OPQ-324'
        main_page.departing_drop_down().select('July')
        main_page.returning_drop_down().select('December (two years from now)')
        main_page.promotional_code_text_field().type(code)
        main_page.search_button().click()
        search_page.promo_code().should('contain', `Sorry, code ${code} is not valid`)
    })
    it('Check the first digit to get 30% discount', () => {
        let code = 'AF3-FJK-418'
        main_page.departing_drop_down().select('July')
        main_page.returning_drop_down().select('December (two years from now)')
        main_page.promotional_code_text_field().type(code)
        main_page.search_button().click()
        search_page.promo_code().should('contain', `Promotional code ${code} used: 30% discount`)
    })
    it('Check digit to validate coupon', () => {
        /**
         * Validates a coupon
         */
        let code = 'JJ5-OPQ-320'
        let code_amount = parseInt(code.charAt(2))
        let random_one = parseInt(code.charAt(8))
        let random_two = parseInt(code.charAt(9))
        let check_digit = parseInt(code.charAt(10))
        expect(check_digit).to.equal((code_amount + random_one + random_two) % 10)
    })
})
