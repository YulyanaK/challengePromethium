const { defineConfig } = require('cypress');
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');

// const { readPdf } = require('./cypress/scripts/readPDF');

const fs = require('fs')
const path = require('path')
const pdf = require('pdf-parse');

const repoRoot = path.join(__dirname, '..', '..')

const parsePdf = async (pdfName) => {
  const pdfPathname = path.join(repoRoot, pdfName)
  let dataBuffer = fs.readFileSync(pdfPathname);
  return await pdf(dataBuffer)
}
module.exports = defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config)  {
      on('task',
          {downloadFile},
      )
      on('task', {
        getPdfContent(pdfName) {
          return parsePdf(pdfName)
        }
      })
    },
    baseUrl: 'https://www.pm61data.com/',
    trashAssetsBeforeRuns: false,
  },
});
