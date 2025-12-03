// weakmap to track active listeners for each FollowRef instance
const activeFollowRefListeners = new WeakMap();

class FollowRef {
    /**
     * 
     * @param {Object} auride - Reference to the Auride client 
     * @param {Object} query - Stores query paramters like UID or username 
     */
    constructor(auride, query = {}) {
        this.auride = auride;
        this.query = query;

        // track listeners per instance
        activeFollowRefListeners.set(this, []);
    }

    /**
     * Filter the query by user ID (UID)
     * Returns a new FollowRef instance with updated query
     * @param {string} uid - The user ID 
     * @returns 
     */
    byUid(uid) {
        return new UserRef(this.auride, { ...this.query, uid, reqType: "uid" });
    }

    /**
     * Filter the query by username
     * Returns a new FollowRef instance with updated query
     * @param {string} username - The user's username 
     * @returns 
     */
    byUsername(username) {
        return new FollowRef(this.auride, { ...this.query, username, reqType: "username" });
    }

    /**
     * Fetches user data from the server
     * @param {Object} options - Optional settings like token for authentication 
     * @returns {Promise<Object>} - Resolves with user data or throws an error
     */
    async get({ token } = {}) {
        // set up headers for the request
        const headers = {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        };

        // include correct identifier and request type based on query
        if (this.query.reqType === "username") {
            headers["userIdentifier"] = this.query.username;
            headers["reqType"] = "username";
        } else if (this.query.reqType === "uid") {
            headers["userIdentifier"] = this.query.uid;
            headers["reqType"] = "uid";
        }

        // perform the fetch request to the auride api
        const response = await fetch(`${serverUrl}/api/auride/getUserData`, {
            method: "GET",
            headers
        });

        // if the response is not ok, throw an error
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.error || "Unknown error");
        }

        // return the parsed json data
        return await response.json();
    }
}