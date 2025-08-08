export function timeAgo(timestamp) {
    const now = Math.floor(Date.now() / 1000); // current timestamp in seconds
    const seconds = now - Math.floor(timestamp / 1000); // convert milliseconds to seconds

    // if second(s), return the amount of second(s)
    if (seconds < 60)
        return `${seconds}s`;

    // if minute(s), return the amount of minute(s)
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
        return `${minutes}m`;

    // if hour(s), return the amount of hour(s)
    const hours = Math.floor(minutes / 60)
    if (hours < 60)
        return `${hours}h`;

    // if day(s), return the amount of days
    const days = Math.floor(hours / 24);
    if (days < 30)
        return `${days}d`;

    // else, just return month/day
    // TO:DO: show year if relevant (we have notes from 2024, better get to that...)
    const date = new Date(timestamp);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}`;
}

window.timeAgo = timeAgo;