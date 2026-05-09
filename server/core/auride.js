const express = require("express");
const router = express.Router();
const { getTokenAndUid } = require("../auride/functions/getToken.js");
const { isAdmin } = require("../auride/functions/checkIfAdmin.js");

// the default options for a server call,
// explainations by each
const defaultOptions = {
    requireToken: false, // whether the user has to be authenticated or not
    requireAdmin: false, // whether the user has to be an admin or not
    requireActiveAccount: true, // whether a suspended user can call this or not - TODO: add me!
    rateLimit: null, // the amount of times per hour one user can call this - TODO: add me!
    internalOnly: true // if other apps are allowed to called this endpoint (assuming they have an API key, of course!)
}

// create a method
function createMethod(method) {
    return (path, options, handler) => {
        // allow skipping options
        if (typeof options === "function") {
            handler = options;
            options = {};
        }

        // the final options using the servers requested options,
        // and a mix of any that may have been left as default
        const finalOptions = { ...defaultOptions, ...options };

        router[method](path, async (req, res) => {
            // this gets filled in by code
            const ctx = {
                currentUser: {}
            };

            // get token
            const auth = await getTokenAndUid(req.headers.authorization);

            // if endpoint is internal only and someone else calls it,
            // block!
            // TODO: add HMAC to secure further & make native mobile apps possible
            if (finalOptions.internalOnly && req.headers.origin !== process.env.HOST_URL)
                return res.status(403).json({ error: "You are attempting to access a restricted API. Please do not do this." });

            // if not signed in, check
            if (!auth?.userToken) {
                // does method require auth? if so, error out
                if (finalOptions.requireToken)
                    return res.status(403).json({ error: "You must be logged in." });
                // if method doesnt require auth, just mark user as signed out
                else
                    ctx.currentUser.isSignedIn = false;
            } else {
                // else, user is signed in
                ctx.currentUser.uid = auth.userIdFromRequest;
                ctx.currentUser.isSignedIn = true;
            }

            // if endpoint requests admin, check if current user is admin
            ctx.currentUser.isAdmin = isAdmin(ctx.currentUser.uid);
            if (finalOptions.requireAdmin && !ctx.currentUser.isAdmin)
                return res.status(403).json({ error: "You are not permitted to do this." });

            try {
                await handler(req, res, ctx);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: "Internal error." });
            }
        });
    };
}

module.exports = {
    router: router,
    get: createMethod("get"),
    post: createMethod("post"),
    delete: createMethod("delete"),
    put: createMethod("put")
};