export function timeAgo(timestamp, mode = "short") {
    const date = new Date(timestamp);

    // if verbose, return that function instead
    if (mode === "verbose")
        return formatVerbose(date);

    // else, continue with standard format
    const now = Math.floor(Date.now() / 1000);
    const seconds = now - Math.floor(timestamp / 1000);

    if (seconds < 60)
        return `${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
        return `${minutes}m`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24)
        return `${hours}h`;

    const days = Math.floor(hours / 24);
    if (days < 30)
        return `${days}d`;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const currentYear = new Date().getFullYear();
    const postYear = date.getFullYear();

    const month = months[date.getMonth()];
    const day = date.getDate();

    return postYear !== currentYear ? `${month} ${day}, ${postYear}` : `${month} ${day}`;
}

// to render verbose
function formatVerbose(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // get the dates
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // is it am or pm?
    const ampm = hours >= 12 ? "PM" : "AM";

    // convert from 24h to 12h
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    // get the month, day, and year
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // return final string
    return `${month} ${day}, ${year} • ${hours}:${minutes} ${ampm}`;
}