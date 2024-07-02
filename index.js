const core = require('@actions/core')
const github = require('@actions/github')
const semver = require('semver')
const { parse } = require('csv-parse/sync')

;(async () => {
    try {
        // Parse Ref
        console.log('github.context:', github.context)
        console.log('github.context.eventName:', github.context.eventName)
        console.log('github.context.event_name:', github.context.event_name)
        console.log('github.context.ref:', github.context.ref)
        console.log('github.context.payload.ref:', github.context.payload.ref)

        const value = github.context.ref.split('/', 2).join('/') + '/'
        console.log('value:', value)
        const ref = github.context.ref.replace(value, '')
        console.log('ref:', ref)

        // Process Inputs
        const images = core.getInput('images')
        console.log('images:', images)
        const extra = core.getInput('extra')
        console.log('extra:', extra)
        const prefix = core.getInput('prefix')
        console.log('prefix:', prefix)
        const seperator = core.getInput('seperator')
        console.log('seperator:', seperator)

        // Set Variables
        const { owner, repo } = github.context.repo
        console.log('owner:', owner)
        console.log('repo:', repo)
        const version = semver.parse(ref)
        console.log('version:', version)

        // Collect Tags
        let extraTags = []
        if (extra) {
            const parsedTags = parse(extra, {
                delimiter: ',',
                trim: true,
                relax_column_count: true,
            }).flat()
            console.log('parsedTags:', parsedTags)
            if (parsedTags) {
                extraTags = [...new Set(parsedTags)]
            }
        }
        console.log('extraTags:', extraTags)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
