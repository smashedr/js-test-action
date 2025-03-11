const core = require('@actions/core')
const github = require('@actions/github')

const Tags = require('./tags')

;(async () => {
    try {
        core.info(`🏳️ Starting JS Test Action`)

        // Debug
        core.startGroup('Debug: github.context')
        console.log(github.context)
        core.endGroup() // Debug github.context
        core.startGroup('Debug: process.env')
        console.log(process.env)
        core.endGroup() // Debug process.env

        // Process Inputs
        const inputs = parseInputs()
        core.startGroup('Parsed Inputs')
        console.log(inputs)
        core.endGroup() // Inputs

        // Context
        const { owner, repo } = github.context.repo
        core.info(`owner: "${owner}"`)
        core.info(`repo: "${repo}"`)
        core.endGroup() // Context

        const sha = github.context.sha
        core.info(`Target sha: \u001b[32m${sha}`)

        const tags = new Tags(inputs.token, owner, repo)

        // Action
        core.startGroup(`Processing tag: "${inputs.tag}"`)
        let result
        const reference = await tags.getRef(inputs.tag)
        // console.log('reference.data:', reference?.data)
        if (reference) {
            core.info(`current sha: ${reference.data.object.sha}`)
            if (sha !== reference.data.object.sha) {
                core.info(`\u001b[35mUpdating tag "${inputs.tag}" to: ${sha}`)
                await tags.updateRef(inputs.tag, sha, true)
                result = 'Updated'
            } else {
                core.info(
                    `\u001b[36mTag "${inputs.tag}" already points to: ${sha}`
                )
                result = 'Not Changed'
            }
        } else {
            core.info(`\u001b[33mCreating new tag "${inputs.tag}" to: ${sha}`)
            await tags.createRef(inputs.tag, sha)
            result = 'Created'
        }
        core.endGroup() // Processing

        // Outputs
        core.info('📩 Setting Outputs')
        core.setOutput('sha', sha)

        // Summary
        if (inputs.summary) {
            core.info('📝 Writing Job Summary')
            await addSummary(inputs, result, sha)
        }

        core.info(`✅ \u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()

/**
 * Get inputs
 * @return {{tag: string, summary: boolean, token: string}}
 */
function parseInputs() {
    return {
        tag: core.getInput('tag', { required: true }),
        summary: core.getBooleanInput('summary'),
        token: core.getInput('token', { required: true }),
    }
}

/**
 * Get inputs
 * @param {Object} inputs
 * @param {String} result
 * @param {String} sha
 */
async function addSummary(inputs, result, sha) {
    core.summary.addRaw('## JS Test Action\n')
    const url = `https://github.com/${github.context.payload.repository.full_name}/releases/tag/${inputs.tag}`
    core.summary.addRaw(
        `${result}: [${inputs.tag}](${url}) :arrow_right: \`${sha}\`\n`
    )

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
