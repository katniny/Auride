function isAdmin(uid) {
    // get admin uids
    const uidsBeforeSplit = process.env.ADMIN_ACCOUNT_UIDS;
    const adminUids = uidsBeforeSplit.split(",");

    return adminUids.includes(uid);
}
module.exports = { isAdmin };