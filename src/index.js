const core = require('@actions/core')
const github = require('@actions/github')

;(async () => {
    try {
        console.log('github.context:', github.context)
        console.log('url:', github.context.repository.url)
        console.log('clone_url:', github.context.repository.clone_url)

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
