const core = require('@actions/core')
const github = require('@actions/github')

;(async () => {
    try {
        console.log('github.context:', github.context)

        const token = core.getInput('token')
        console.log('token:', token)
        const body = core.getInput('body')
        console.log('url:', body)

        // Set Variables
        const { owner, repo } = github.context.repo
        console.log('owner:', owner)
        console.log('repo:', repo)

        core.info('Done')
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
