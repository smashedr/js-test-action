const core = require('@actions/core')
const github = require('@actions/github')

;(async () => {
    try {
        // console.log('github.context:', github.context)
        // console.log('process.env:', process.env)

        const token = core.getInput('token', { required: true })
        console.log('token:', token)
        const body = core.getInput('body', { required: true })
        console.log('body:', body)

        // Set Variables
        const { owner, repo } = github.context.repo
        console.log('owner:', owner)
        console.log('repo:', repo)

        // console.log('github.context.ref:', github.context.ref)
        // console.log('process.env.TEST_ENV:', process.env.TEST_ENV)

        core.setOutput('result', body)

        core.info(`\u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
