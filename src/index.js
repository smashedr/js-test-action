const core = require('@actions/core')
const github = require('@actions/github')

;(async () => {
    try {
        // console.log('github.context:', github.context)
        // console.log('process.env:', process.env)

        const body = core.getInput('body', { required: true })
        console.log('body:', body)

        // Example GitHub Context
        const { owner, repo } = github.context.repo
        console.log('owner:', owner)
        console.log('repo:', repo)

        const result = body + ' - updated by js-test-action'
        core.setOutput('result', result)

        console.log('Test')

        core.info(`\u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
