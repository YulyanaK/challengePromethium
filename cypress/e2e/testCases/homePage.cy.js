describe('Home page', () => {
    beforeEach(() => {
        cy.visit('https://promethium.ai/')
    })
    const testData = {
        homePageText1: "Promethium Collaborative Data Analytics",
        homePageText2: "Never miss an opportunity",
        }

    it('displays Promethium logo and correct texts', () => {
        cy.get('[alt="Promehtium Black New Logo.png"]').should('be.visible');
        cy.contains(testData.homePageText1).should('be.visible');
        cy.contains(testData.homePageText2).should('be.visible');
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
})
