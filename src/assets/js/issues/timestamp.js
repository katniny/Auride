export function githubTimestamp(date) {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

    // define time units (years, months, weeks, etc., etc.)
    // TODO: auride and github use different timestamps, but we could use this for notes, much cleaner than current solution
    const units = [
        { label: "year", secs: 60 * 60 * 24 * 365 },
        { label: "month", secs: 60 * 60 * 24 * 30 },
        { label: "week", secs: 60 * 60 * 24 * 7 },
        { label: "day", secs: 60 * 60 * 24 },
        { label: "hour", secs: 60 * 60 },
        { label: "minute", secs: 60 },
        { label: "second", secs: 1 }
    ];

    // return correct unit
    for (const unit of units) {
        const value = Math.floor(seconds / unit.secs);
        if (value >= 1) {
            return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
        }
    }

    // otherwise, it was "just now"
    return "Just now";
}