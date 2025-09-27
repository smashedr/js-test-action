const github = require('@actions/github')

class Api {
    /**
     * GitHub Octokit Api
     * https://octokit.github.io/rest.js/
     * @param {String} token
     */
    constructor(token) {
        this.repo = github.context.repo
        this.octokit = github.getOctokit(token)
    }

    /**
     * Get Ref
     * https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#get-a-reference
     * @param {String} tag
     * @return {Promise<Object|undefined>}
     */
    async getRef(tag) {
        console.debug(`getRef: tags/${tag}`)
        try {
            const result = await this.octokit.rest.git.getRef({
                ...this.repo,
                ref: `tags/${tag}`,
            })
            return result.data
        } catch (e) {
            if (e.status === 404) {
                return
            }
            throw new Error(e)
        }
    }

    /**
     * Create Ref
     * https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#create-a-reference
     * @param {String} tag
     * @param {String} sha
     * @return {Promise<Object>}
     */
    async createRef(tag, sha) {
        console.debug(`createRef: refs/tags/${tag}`, sha)
        return this.octokit.rest.git.createRef({
            ...this.repo,
            ref: `refs/tags/${tag}`,
            sha,
        })
    }

    /**
     * Update Ref
     * https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#update-a-reference
     * @param {String} tag
     * @param {String} sha
     * @param {Boolean} [force]
     * @return {Promise<Object>}
     */
    async updateRef(tag, sha, force = false) {
        console.debug(`updateRef: tags/${tag}`, sha, force)
        return this.octokit.rest.git.updateRef({
            ...this.repo,
            ref: `tags/${tag}`,
            sha,
            force,
        })
    }
}

module.exports = Api
