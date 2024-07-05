const core = require('@actions/core')
const github = require('@actions/github')

;(async () => {
    try {
        console.log('github.context:', github.context)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
