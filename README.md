E2E test suite with Cypress

application under test: https://www.pm61data.com/

🥅 Goals
Complete automation testing challenge: https://docs.google.com/spreadsheets/d/1GsUzyKopV2gPNVqKfI6pk4z-skBEnOTruNbKeKcJoAw/edit#gid=0


⚙️ Setup
git clone 
cd to the project 
✔️ Run tests
npx cypress open
cypress headless mode (cypress run):
npx cypress run

💡 Details
📁 Tests are located in cypress/e2e folder

📁 Custom commands are located in cypress/support folder 


🛠️ Configuration
Config files:

cypress.config.js - Main config file where default behavior of Cypress can be modified. 

Additional comments:
  
  - Since Cypress doesn't support multiple tabs the workaround was to invoke the href from a element and navigate to the url
  - Long selectors should be replaced with data-cy attributes added to elements
  - Sign up test is making multiple calls to check whether onboarding status has changed to successful.
    There are other approaches for this verification:
      - use time out instead
      - handle the verification outside of e2e tests
  - Bonus test case: added cypress-downloadfile npm package to download a pdf and pdf-parse to read it. 
    Unfortunately, there is no native way for Cypress to read the contents of a pdf file

