import { getNotifications } from "../methods/getNotifications.js";
import { getUserData } from "../methods/getUserData.js";
import { getNoteData } from "../methods/getNoteData.js";
import { format } from "../text/format.js";
import { faIcon } from "../utils/faIcon.js";
import { storageLink } from "../utils/storageLink.js";
import { navigate } from "../router.js";
import { timeAgo } from "../ui/timeAgo.js";
import { createLoadingIndicator } from "../ui/createLoadingIndicator.js";

export default async function notificationsPage() {
    document.title = "Notifications | Auride";
    const el = document.createElement("div");
    const pathname = window.location.pathname;
    el.innerHTML = `
        <div class="notificationCenter">

        </div>
    `;

    let canLoadMoreNotifications = true;
    let lastLoadedNotification = null;
    let loadingNotifications = false;
    async function appendNotifications() {
        // if cannot load more notifications, cancel
        if (!canLoadMoreNotifications)
            return;
        if (loadingNotifications)
            return;

        loadingNotifications = true;

        // create loading indicator
        await createLoadingIndicator("lg", "app", "append");
        const loadingIndicator = document.getElementById("noteLoadingIndicator");

        // get notifications
        const notifications = await getNotifications("batch", lastLoadedNotification);

        console.log(notifications);
        const fragment = document.createDocumentFragment();

        const notificationEntries = Object.entries(notifications).filter(([key]) => key !== "unread");

        // do we have enough notifications to load again?
        if (notificationEntries.length < 16)
            canLoadMoreNotifications = false;

        const notificationElements = await Promise.all(
            notificationEntries.filter(([key]) => !document.getElementById(key)).map(async ([key, data]) => {
                // get user/note data
                const [userData, noteData] = await Promise.all([
                    data.who ? getUserData(data.who, "uid") : null,
                    data.postId ? getNoteData(data.postId.replace("#", "/")) : null
                ]);

                // add text & icon
                let typeText = null;
                switch (data.type) {
                    case "Reply":
                        typeText = `<span class="icon reply">${faIcon("solid", "comment").outerHTML}</span> ${format(userData.display)} replied to your note!`;
                        break;
                    case "Love":
                        typeText = `<span class="icon love">${faIcon("solid", "heart").outerHTML}</span> ${format(userData.display)} loved your note!`;
                        break;
                    case "Renote":
                        typeText = `<span class="icon renote">${faIcon("solid", "retweet").outerHTML}</span> ${format(userData.display)} renoted your note!`;
                        break;
                    case "Mention":
                        typeText = `<span class="icon mention">${faIcon("solid", "at").outerHTML}</span> ${format(userData.display)} mentioned you!`;
                        break;
                    case "Follow":
                        typeText = `<span class="icon follow">${faIcon("solid", "user-plus").outerHTML}</span> ${format(userData.display)} followed you!`;
                        break;
                }

                // if the notification has a time sent, display it
                if (data.sent) {
                    const timeSent = document.createElement("span");
                    timeSent.className = "timeSent";
                    timeSent.textContent = `• ${timeAgo(data.sent)}`;
                    typeText += timeSent.outerHTML;
                }

                // create div
                const notificationDiv = document.createElement("div");
                notificationDiv.className = "notification";
                notificationDiv.id = key;

                // create pfp
                const senderPfp = await storageLink(`images/pfp/${userData.uid}/${userData.pfp}`);
                const senderImgPfp = document.createElement("img");
                senderImgPfp.src = senderPfp;
                senderImgPfp.draggable = false;
                senderImgPfp.className = "senderPfp";

                // create content
                const content = document.createElement("div");
                content.className = "notificationContent";

                // create notification header
                const notificationHeader = document.createElement("div");
                notificationHeader.className = "notificationHeader";
                notificationHeader.innerHTML = typeText;

                content.innerHTML = notificationHeader.outerHTML;

                // TODO: and load more notifications on scroll

                // if note data, show text
                if (noteData)
                    content.innerHTML += `<p class="noteContent">${noteData.text}</p>`;

                // make notification clickable
                if (noteData)
                    notificationDiv.onclick = () => { navigate(`/note/${noteData.id}`); }
                else
                    // assume its just the user
                    notificationDiv.onclick = () => { navigate(`/u/${userData.username}`); }

                // append notification div
                notificationDiv.append(senderImgPfp, content);

                return notificationDiv;
            })
        );

        // append everything at once
        fragment.append(...notificationElements);
        el.querySelector(".notificationCenter").prepend(fragment);
        loadingIndicator.remove();
        lastLoadedNotification = notificationEntries[0]?.[0];
        loadingNotifications = false;
        console.log(lastLoadedNotification);
    }

    appendNotifications();

    // at the bottom of the page, load more notifications if possible
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            appendNotifications();
        }
    });

    return el;
}