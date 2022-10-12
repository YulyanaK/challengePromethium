describe('Sign up page', () => {
    beforeEach(() => {
        cy.visit('https://promethium.ai/')
    })

    it('can not sign up with empty required fields', () => {
        cy.get('#comp-jixneksf > [data-testid="linkElement"]')
            .invoke('attr','href')
            .then((href) => {
                cy.visit(href)
                cy.origin(href, () => {
                    cy.get('button').contains('Sign Up').click();
                    cy.get('[role="alert"]')
                        .should('have.length', 5)
                        .should('contain.text', 'is required')
                })
            })

    })

    it('can sign up with valid inputs', () => {
        cy.intercept('**/preview/poll?execution_id=**').as('getShortenedUrl');
        cy.get('#comp-jixneksf > [data-testid="linkElement"]')
            .invoke('attr','href')
            .then((href)=>{
                cy.visit(href);
                cy.origin(href, () => {
                    // generating random email and typing it into the field
                    cy.get('#UserRegister_root_user').type(`${Math.floor(Math.random() * 10000)}new@fashion.com`);
                    cy.get('#UserRegister_first_name').type('Mark');
                    cy.get('#UserRegister_last_name').type('Fitzerald');
                    cy.get('#UserRegister_company_name').type('fashion');
                    cy.get('#UserRegister_job_function').click();
                    cy.contains('Data Architecture').click();
                    cy.get('button').contains('Sign Up').click();
                    cy.get('span[class="ant-btn-loading-icon"]').should('exist');
                    function waitForSuccessfulOnboarding(routeAlias, retries = 15) {
                        cy.wait(routeAlias).then(alias => {
                            if (alias.response.body.onboarding_status === 'Success') return
                            // waiting for the next response until exceed the number of attempts
                            else if (retries > 0) waitForSuccessfulOnboarding(routeAlias, retries - 1);
                            else throw "All requests returned non-success for onboarding";
                        })
                    }
                    waitForSuccessfulOnboarding('@getShortenedUrl');
                    cy.contains('Thank you for signing up.').should('be.visible');
                    cy.url().should('include', '/user/confirmation?email=');
                })
            })
    })
})
