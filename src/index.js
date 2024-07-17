const core = require('@actions/core')
const github = require('@actions/github')

;(async () => {
    try {
        // console.log('github.context:', github.context)
        // console.log('process.env:', process.env)

        const token = core.getInput('token')
        console.log('token:', token)
        const body = core.getInput('body')
        console.log('body:', body)

        // Set Variables
        const { owner, repo } = github.context.repo
        console.log('owner:', owner)
        console.log('repo:', repo)

        console.log('github.context.ref:', github.context.ref)
        console.log('process.env.TEST_ENV:', process.env.TEST_ENV)

        core.info('Success')
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
