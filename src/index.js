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
        core.startGroup('Inputs')
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
        core.endGroup() // Inputs

        const sha = github.context.sha
        core.info(`Target sha: \u001b[32m${sha}`)

        const tags = new Tags(token, owner, repo)

        // Action
        // core.info(`⌛ Processing tag: "${tag}"`)
        core.startGroup(`Processing tag: "${tag}"`)
        let result
        const reference = await tags.getRef(tag)
        // console.log('reference.data:', reference?.data)
        if (reference) {
            core.info(`current sha: ${reference.data.object.sha}`)
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
        core.endGroup() // Processing

        // Outputs
        core.info('📩 Setting Outputs')
        core.setOutput('sha', sha)

        // Summary
        if (summary) {
            core.info('📝 Writing Job Summary')

            core.summary.addRaw('## JS Test Action\n')
            core.summary.addRaw(
                `${result}: [${tag}](https://github.com/${owner}/${repo}/releases/tag/${tag}) :arrow_right: \`${sha}\`\n`
            )

            core.summary.addRaw('<details><summary>Inputs</summary>')
            core.summary.addTable([
                [
                    { data: 'Input', header: true },
                    { data: 'Value', header: true },
                ],
                [{ data: 'tag' }, { data: `<code>${tag}</code>` }],
                [{ data: 'summary' }, { data: `<code>${summary}</code>` }],
            ])
            core.summary.addRaw('</details>\n')

            const text = 'View Documentation, Report Issues or Request Features'
            const link = 'https://github.com/smashedr/js-test-action'
            core.summary.addRaw(
                `\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`
            )
            await core.summary.write()
        }

        core.info(`✅ \u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
