const core = require('@actions/core')
const github = require('@actions/github')

const Tags = require('./tags')

;(async () => {
    try {
        core.info(`🏳️ Starting JS Test Action`)

        // Debug
        // console.log('github.context:', github.context)
        // console.log('process.env:', process.env)

        // Inputs
        const tag = core.getInput('tag', { required: true })
        core.info(`tag: "${tag}"`)
        const summary = core.getBooleanInput('summary', { required: true })
        core.info(`summary: "${summary}"`)
        const token = core.getInput('token', { required: true })
        core.info(`token: "${token}"`)

        // Context
        const { owner, repo } = github.context.repo
        core.info(`owner: "${owner}"`)
        core.info(`repo: "${repo}"`)
        const sha = github.context.sha
        core.info(`sha: "${sha}"`)
        const tags = new Tags(token, owner, repo)

        // Action
        core.info(`⌛ Processing tag: "${tag}"`)
        let result
        const reference = await tags.getRef(tag)
        // console.log('reference.data:', reference?.data)
        if (reference) {
            console.log('reference.data.object.sha:', reference.data.object.sha)
            if (sha !== reference.data.object.sha) {
                core.info(`\u001b[35mUpdating tag "${tag}" to: ${sha}`)
                await tags.updateRef(tag, sha, true)
                result = 'Updated'
            } else {
                core.info(`\u001b[36mTag "${tag}" already points to: ${sha}`)
                result = 'Not Changed'
            }
        } else {
            core.info(`\u001b[33mCreating new tag "${tag}" to: ${sha}`)
            await tags.createRef(tag, sha)
            result = 'Created'
        }

        // Outputs
        core.info('📩 Setting Outputs')
        core.setOutput('sha', sha)

        // Summary
        if (summary) {
            core.info('📝 Writing Job Summary')
            core.summary.addHeading('JS Test Action', '2')
            core.summary.addRaw(
                `<p>${result}: <strong>${tag}</strong> :arrow_right: <code>${sha}</code></p>`,
                true
            )
            core.summary.addDetails(
                'Inputs',
                `<table><tr><th>Input</th><th>Value</th></tr><tr><td>tag</td><td>${tag}</td></tr><tr><td>summary</td><td>${summary}</td></tr></table>`
            )
            core.summary.addRaw(
                '<p><a href="https://github.com/smashedr/js-test-action/issues">Report an issues or request a feature</a></p>',
                true
            )
            await core.summary.write()
        } else {
            core.info('⏩ Skipping Job Summary')
        }

        core.info(`✅ \u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
