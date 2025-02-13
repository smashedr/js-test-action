const github = require('@actions/github')

class Tags {
    constructor(token, owner, repo) {
        this.owner = owner
        this.repo = repo
        this.octokit = github.getOctokit(token)
    }

    async getRef(tag) {
        console.log(`getRef: tags/${tag}`)
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
        console.log(`createRef: refs/tags/${tag}`)
        console.log('sha:', sha)
        return await this.octokit.rest.git.createRef({
            owner: this.owner,
            repo: this.repo,
            ref: `refs/tags/${tag}`,
            sha,
        })
    }

    async updateRef(tag, sha, force = false) {
        console.log(`updateRef: tags/${tag}`)
        console.log('sha:', sha, force)
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
