// formatted: vYEAR.MONTH.DAY
const updateTime = "v2025.12.TBD";
// formatted: vYEARMONTHDAY
const updateTimeSimple = "v202512TBD"
// the number of updates today (increment by one, unless there was no commits today!)
const numOfUpdatesToday = "1";
// the current auride version. contributors should leave this alone
export const currentAurideVersion = "beta";
// full string
export const versioningString = `
    Auride is in ${currentAurideVersion} (${updateTime}).
    Features are still being added. <a href="/roadmap">See our roadmap</a>.
`;