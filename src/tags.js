const github = require('@actions/github')

class Tags {
    /**
     * Tags
     * @param {String} token
     */
    constructor(token) {
        this.repo = github.context.repo
        this.octokit = github.getOctokit(token)
    }

    async getRef(tag) {
        console.debug(`getRef: tags/${tag}`)
        try {
            return await this.octokit.rest.git.getRef({
                ...this.repo,
                ref: `tags/${tag}`,
            })
        } catch (e) {
            if (e.status === 404) {
                return null
            }
            throw new Error(e)
        }
    }

    async createRef(tag, sha) {
        console.debug(`createRef: refs/tags/${tag}`, sha)
        return await this.octokit.rest.git.createRef({
            ...this.repo,
            ref: `refs/tags/${tag}`,
            sha,
        })
    }

    async updateRef(tag, sha, force = false) {
        console.debug(`updateRef: tags/${tag}`, sha, force)
        await this.octokit.rest.git.updateRef({
            ...this.repo,
            ref: `tags/${tag}`,
            sha,
            force,
        })
    }
}

module.exports = Tags
