const core = require('@actions/core')
const github = require('@actions/github')

const Api = require('./api.js')

;(async () => {
    try {
        core.info(`🏳️ Starting JavaScript Test Action`)

        // Debug
        core.startGroup('Debug: github.context')
        console.log(github.context)
        core.endGroup() // Debug github.context
        core.startGroup('Debug: process.env')
        console.log(process.env)
        core.endGroup() // Debug process.env

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
        // https://github.com/actions/toolkit/blob/ddc5fa4ae84a892bfa8431c353db3cf628f1235d/packages/core/src/utils.ts#L11
        core.info('📩 Setting Outputs')
        core.setOutput('sha', sha)

        // Summary
        if (inputs.summary) {
            core.info('📝 Writing Job Summary')
            try {
                await addSummary(inputs, result, sha)
            } catch (e) {
                console.log(e)
                core.error(`Error writing Job Summary ${e.message}`)
            }
        }

        core.info(`✅ \u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()

/**
 * Add Summary
 * @param {Inputs} inputs
 * @param {String} result
 * @param {String} sha
 * @return {Promise<void>}
 */
async function addSummary(inputs, result, sha) {
    core.summary.addRaw('## JavaScript Test Action\n')

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
    const link = 'https://github.com/smashedr/js-test-action'
    core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`)
    await core.summary.write()
}

/**
 * Get Inputs
 * @typedef {Object} Inputs
 * @property {String} tag
 * @property {Boolean} summary
 * @property {String} token
 * @return {Inputs}
 */
function getInputs() {
    return {
        tag: core.getInput('tag', { required: true }),
        summary: core.getBooleanInput('summary'),
        token: core.getInput('token', { required: true }),
    }
}
