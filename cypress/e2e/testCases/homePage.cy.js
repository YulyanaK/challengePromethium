describe('Home page', () => {
    beforeEach(() => {
        cy.visit('http://promethium.ai/')
    })
    const testData = {
        homePageText1: "Promethium Collaborative Data Analytics",
        homePageText2: "Never miss an opportunity",
        pdfDocText1: "Reimagining data analytics",
        pdfDocText2: "Why Promethium +dbt",
        pdfDocText3: "From Traditional to Modern in Days, Not Years",
        pdfDocText4: "Learn more, try for yourself, visit promethium.ai"
        }
    const solutionsForDbtPdfFile = 'solutionsForDbtPdfFile.pdf'

    it('displays Promethium logo and correct texts', () => {
        cy.get('[alt="Promehtium Black New Logo.png"]').should('be.visible');
        cy.contains(testData.homePageText1).should('be.visible');
        cy.contains(testData.homePageText2).should('be.visible');
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
                    cy.get('#UserRegister_root_user').type(`${Math.floor(Math.random() * 10000)}new@fashion.com`);
                    cy.get('#UserRegister_first_name').type('Mark');
                    cy.get('#UserRegister_last_name').type('Fitzerald');
                    cy.get('#UserRegister_company_name').type('fashion');
                    cy.get('#UserRegister_job_function').click();
                    cy.contains('Data Architecture').click();
                    cy.get('button').contains('Sign Up').click();
                    cy.get('span[class="ant-btn-loading-icon"]').should('exist');
                    function waitForSuccessfulOnboarding(routeAlias, retries = 10) {
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
    it('displays Product menu', () => {
        cy.get('ul[aria-hidden="true"]').invoke('show')
        cy.contains('Product').realHover();
        cy.contains('Data Connectors').click();
        cy.url().should('contain', 'promethium-data-connectors');
        cy.get('#comp-ktbxs3dg > .font_5 > span').contains('Database').parent().parent().parent()
            .within(() => {
                return cy.get('img').should('have.length', 17) &&
                cy.contains('Microsoft SQL Server').should('exist') &&
                    cy.contains('MySQL').should('exist') &&
                    cy.contains('Teradata').should('exist') &&
                    cy.contains('PostgreSQL').should('exist');
            })
    })
    it('downloads a PDF and verifies content', () => {
        cy.get('ul[aria-hidden="true"]').invoke('show')
        cy.contains('Resources').realHover();
        cy.contains('Collateral').click();
        cy.contains('Solution For dbt™').parent().parent()
            .within(() => {
                cy.get('#comp-khxrjo87__item-l4epj00h > [data-testid="linkElement"]')
                    .invoke('attr','href')
                    .then(href=>{
                        cy.downloadFile(href,'cypress/downloads',solutionsForDbtPdfFile);
                        cy.task('getPdfContent', `/WebstormProjects/challengePromethium/cypress/downloads/${solutionsForDbtPdfFile}`)
                            .then(content=>{
                                expect(content.numpages).to.eq(4);
                                expect(content.text).to.contain(testData.pdfDocText1,
                                    testData.pdfDocText2, testData.pdfDocText3,
                                    testData.pdfDocText4);
                            })
                        })
            })
    })
})
