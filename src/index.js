const core = require('@actions/core')
const github = require('@actions/github')

const Tags = require('./tags')

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

        // Config
        const config = getConfig()
        core.startGroup('Config')
        console.log(config)
        core.endGroup() // Config

        // Variables
        const tags = new Tags(config.token)
        const sha = github.context.sha
        core.info(`Target sha: \u001b[33;1m${sha}`)

        // Processing
        core.startGroup(`Processing tag: "${config.tag}"`)
        let result
        const reference = await tags.getRef(config.tag)
        // console.log('reference.data:', reference?.data)
        if (reference) {
            core.info(`current sha: ${reference.data.object.sha}`)
            if (sha !== reference.data.object.sha) {
                core.info(`\u001b[35mUpdating tag "${config.tag}" to: ${sha}`)
                await tags.updateRef(config.tag, sha, true)
                result = 'Updated'
            } else {
                core.info(
                    `\u001b[36mTag "${config.tag}" already points to: ${sha}`
                )
                result = 'Not Changed'
            }
        } else {
            core.info(`\u001b[33mCreating new tag "${config.tag}" to: ${sha}`)
            await tags.createRef(config.tag, sha)
            result = 'Created'
        }
        core.endGroup() // Processing

        // Outputs
        core.info('📩 Setting Outputs')
        core.setOutput('sha', sha)

        // Summary
        if (config.summary) {
            core.info('📝 Writing Job Summary')
            try {
                await addSummary(config, result, sha)
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

// /**
//  * Get Multiline Input or CSV
//  * @param {String} name
//  * @param {Boolean} required
//  * @param {Boolean} trimWhitespace
//  * @return {String[]}
//  */
// function getMultiCsv(name, required = false, trimWhitespace = true) {
//     let input = core.getMultilineInput(name, { required, trimWhitespace })
//     if (input.length === 1 && input[0].includes(',')) {
//         input = input[0].split(',')
//     }
//     if (trimWhitespace) {
//         input = input.map((item) => item.trim())
//     }
//     input = input.filter((i) => {
//         return i
//     })
//     if (!input.length && required) {
//         throw new Error(`Missing Required Input: ${name}`)
//     }
//     return input
// }

/**
 * Add Summary
 * @param {Config} config
 * @param {String} result
 * @param {String} sha
 * @return {Promise<void>}
 */
async function addSummary(config, result, sha) {
    core.summary.addRaw('## JavaScript Test Action\n')

    const url = `https://github.com/${github.context.payload.repository.full_name}/releases/tag/${config.tag}`
    core.summary.addRaw(
        `${result}: [${config.tag}](${url}) :arrow_right: \`${sha}\`\n`
    )

    delete config.token
    const yaml = Object.entries(config)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join('\n')
    core.summary.addRaw('<details><summary>Config</summary>')
    core.summary.addCodeBlock(yaml, 'yaml')
    core.summary.addRaw('</details>\n')

    const text = 'View Documentation, Report Issues or Request Features'
    const link = 'https://github.com/smashedr/js-test-action'
    core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`)
    await core.summary.write()
}

/**
 * Get Config
 * @typedef {Object} Config
 * @property {String} tag
 * @property {Boolean} summary
 * @property {String} token
 * @return {Config}
 */
function getConfig() {
    return {
        tag: core.getInput('tag', { required: true }),
        summary: core.getBooleanInput('summary'),
        token: core.getInput('token', { required: true }),
    }
}
