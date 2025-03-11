const github = require('@actions/github')

class Tags {
    constructor(token, owner, repo) {
        this.owner = owner
        this.repo = repo
        this.octokit = github.getOctokit(token)
    }

    async getRef(tag) {
        console.debug(`getRef: tags/${tag}`)
        try {
            return await this.octokit.rest.git.getRef({
                owner: this.owner,
                repo: this.repo,
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
            owner: this.owner,
            repo: this.repo,
            ref: `refs/tags/${tag}`,
            sha,
        })
    }

    async updateRef(tag, sha, force = false) {
        console.debug(`updateRef: tags/${tag}`, sha, force)
        await this.octokit.rest.git.updateRef({
            owner: this.owner,
            repo: this.repo,
            ref: `tags/${tag}`,
            sha,
            force,
        })
    }
}

module.exports = Tags
