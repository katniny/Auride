// formatted: vYEAR.MONTH.DAY
const updateTime = "v2026.1.TBD";
// formatted: vYEARMONTHDAY
const updateTimeSimple = "v20261TBD"
// the number of updates today (increment by one, unless there was no commits today!)
const numOfUpdatesToday = "1";
// the current auride version. contributors should leave this alone
export const currentAurideVersion = "beta";
// full string
export const versioningString = `
    Auride is in ${currentAurideVersion} (${updateTime}).
    Features are still being added. <a href="/roadmap">See our roadmap</a>.
`;