const core = require('@actions/core')
const github = require('@actions/github')

;(async () => {
    try {
        console.log('github.context:', github.context)

        // Set Variables
        const { owner, repo } = github.context.repo
        console.log('owner:', owner)
        console.log('repo:', repo)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
