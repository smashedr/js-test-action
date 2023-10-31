const core = require('@actions/core')
const github = require('@actions/github')

try {
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)

    const chromeFile = core.getInput('chrome')
    const firefoxFile = core.getInput('firefox')

    console.log(`chromeFile ${chromeFile}!`)
    if (chromeFile) {
        console.log('chromeFile is TRUE')
    }
    console.log(`firefoxFile ${firefoxFile}!`)
    if (firefoxFile) {
        console.log('firefoxFile is TRUE')
    }

    // core.setOutput("time", time);
} catch (error) {
    core.setFailed(error.message)
}
