/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 442:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 671:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 88:
/***/ ((module) => {

module.exports = eval("require")("csv-parse/sync");


/***/ }),

/***/ 134:
/***/ ((module) => {

module.exports = eval("require")("semver");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(442)
const github = __nccwpck_require__(671)
const semver = __nccwpck_require__(134)
const { parse } = __nccwpck_require__(88)

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

})();

module.exports = __webpack_exports__;
/******/ })()
;