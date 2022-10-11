/// <reference types="cypress" />
// ***********************************************************
// This example plugins/e2e.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
const fs = require('fs')
const path = require('path')
const pdf = require('pdf-parse');

const repoRoot = path.join(__dirname, '..', '..')

const parsePdf = async (pdfName) => {
    const pdfPathname = path.join(repoRoot, pdfName)
    let dataBuffer = fs.readFileSync(pdfPathname);
    return await pdf(dataBuffer)
}

const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');
// const { readPdf } = require('cypress/scripts/readPDF');

module.exports = (on, config) => {
    on('task',
        {downloadFile},
    )
    on('task', {
        getPdfContent(pdfName) {
            return parsePdf(pdfName)
        }
    })
}


