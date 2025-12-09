export function timeAgo(timestamp) {
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

    const date = new Date(timestamp);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const currentYear = new Date().getFullYear();
    const postYear = date.getFullYear();

    const month = months[date.getMonth()];
    const day = date.getDate();

    return postYear !== currentYear ? `${month} ${day}, ${postYear}` : `${month} ${day}`;
}