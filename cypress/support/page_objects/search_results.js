class search_results {
    no_more_seats_available() {
        return cy.xpath("//p[contains(text(),'Sorry, there are no more seats available.')]")
    }

    seats_available() {
        return cy.xpath("//p[contains(text(),'Seats available!')]")
    }

    call_marsair_to_book() {
        return cy.xpath("//p[contains(text(),'Call now on 0800 MARSAIR to book!')]")
    }

    schedule_not_possible() {
        return cy.xpath("//p[contains(text(),'Unfortunately, this schedule is not possible. Plea')]")
    }

    back_link() {
        return cy.xpath("//a[contains(text(),'Back')]")
    }
    promo_code() {
        return cy.get('.promo_code')
    }
}

export default search_results