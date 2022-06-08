class mars_air_home_page {
    book_a_ticket_text() {
        return cy.xpath("//h3[contains(text(),'Book a ticket to the red planet now!')]")
    }

    departing_drop_down() {
        return cy.xpath("//select[@id='departing']") 
    }

    returning_drop_down() {
        return cy.xpath("//select[@id='returning']")
    }

    promotional_code_text_field() {
        return cy.xpath("//input[@id='promotional_code']")
    }

    search_button() {
        return cy.xpath("//input[contains(@value, 'Search')]")
    }
    top_left_logo() {
        return cy.xpath("//a[contains(text(),'MarsAir')]")
    }
}

export default mars_air_home_page