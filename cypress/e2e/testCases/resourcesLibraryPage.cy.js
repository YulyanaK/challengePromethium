describe('Home page', () => {
    beforeEach(() => {
        cy.visit('https://promethium.ai/')
    })
    const testData = {
        pdfDocText1: "Reimagining data analytics",
        pdfDocText2: "Why Promethium +dbt",
        pdfDocText3: "From Traditional to Modern in Days, Not Years",
        pdfDocText4: "Learn more, try for yourself, visit promethium.ai"
    }
    const solutionsForDbtPdfFile = 'solutionsForDbtPdfFile.pdf'

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
