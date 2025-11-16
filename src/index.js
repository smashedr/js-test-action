const path = require('node:path')
const { readFileSync } = require('node:fs')

const core = require('@actions/core')
const exec = require('@actions/exec')
const github = require('@actions/github')

const Api = require('./api.js')

async function main() {
    core.info(`🏳️ Starting JavaScript Action`)

    // Debug
    core.startGroup('Debug: github.context')
    console.log(github.context)
    core.endGroup() // Debug github.context
    core.startGroup('Debug: process.env')
    console.log(process.env)
    core.endGroup() // Debug process.env
    core.startGroup('Debug: event.json')
    const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
    console.log(event)
    core.endGroup() // Debug event.json

    console.log(`__dirname: ${__dirname}`)
    const srcPath = path.resolve(__dirname, '../src')
    console.log(`srcPath: ${srcPath}`)
    core.startGroup('ls srcPath')
    await exec.exec('ls', ['-lah', srcPath], { ignoreReturnCode: true })
    core.endGroup() // ls srcPath

    // Inputs
    const inputs = getInputs()
    core.startGroup('Inputs')
    console.log(inputs)
    core.endGroup() // Inputs

    // Variables
    const api = new Api(inputs.token)
    const sha = github.context.sha
    core.info(`Target sha: \u001b[33;1m${sha}`)

    // Processing
    core.startGroup(`Processing tag: "${inputs.tag}"`)
    let result
    const reference = await api.getRef(inputs.tag)
    console.log('reference:', reference)
    if (reference) {
        core.info(`current sha: ${reference.object.sha}`)
        if (sha === reference.object.sha) {
            core.info(`\u001b[36mTag "${inputs.tag}" already points to: ${sha}`)
            result = 'Not Changed'
        } else {
            core.info(`\u001b[35mUpdating tag "${inputs.tag}" to: ${sha}`)
            await api.updateRef(inputs.tag, sha, true)
            result = 'Updated'
        }
    } else {
        core.info(`\u001b[33mCreating new tag "${inputs.tag}" to: ${sha}`)
        await api.createRef(inputs.tag, sha)
        result = 'Created'
    }
    core.endGroup() // Processing

    // Outputs - JSON.stringify is applied to the output values
    // https://github.com/actions/toolkit/blob/main/packages/core/src/utils.ts#L11
    core.info('📩 Setting Outputs')
    core.setOutput('sha', sha)

    // Summary
    if (inputs.summary) {
        core.info('📝 Writing Job Summary')
        try {
            await addSummary(inputs, result, sha)
        } catch (e) {
            console.log(e)
            core.error(`Error writing Job Summary: ${e.message}`)
        }
    }

    core.info(`✅ \u001b[32;1mFinished Success`)
}

/**
 * Add Summary
 * @param {Inputs} inputs
 * @param {string} result
 * @param {string} sha
 * @return {Promise<void>}
 */
async function addSummary(inputs, result, sha) {
    core.summary.addRaw('## JavaScript Action\n')

    const url = `https://github.com/${github.context.payload.repository.full_name}/releases/tag/${inputs.tag}`
    core.summary.addRaw(`${result}: [${inputs.tag}](${url}) :arrow_right: \`${sha}\`\n`)

    delete inputs.token
    const yaml = Object.entries(inputs)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join('\n')
    core.summary.addRaw('<details><summary>Inputs</summary>')
    core.summary.addCodeBlock(yaml, 'yaml')
    core.summary.addRaw('</details>\n')

    const text = 'View Documentation, Report Issues or Request Features'
    const link = 'https://github.com/smashedr/javascript-action'
    core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`)
    await core.summary.write()
}

/**
 * Get Inputs
 * @typedef {object} Inputs
 * @property {string} tag
 * @property {boolean} summary
 * @property {string} token
 * @return {Inputs}
 */
function getInputs() {
    return {
        tag: core.getInput('tag', { required: true }),
        summary: core.getBooleanInput('summary'),
        token: core.getInput('token', { required: true }),
    }
}

main().catch((e) => {
    core.debug(e)
    core.info(e.message)
    core.setFailed(e.message)
})
