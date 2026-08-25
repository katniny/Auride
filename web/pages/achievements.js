import { createLoadingIndicator } from "../ui/createLoadingIndicator";
import { alreadyLoadedAchievements, currentUserData } from "../users/current";
import { achievementDefs } from "../components/achievementDefs";
import { faIcon } from "../utils/faIcon";
import { timeAgo } from "../ui/timeAgo";
import { navigate } from "../router";

export default async function achievementsPage() {
    document.title = "Achievements | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h2>Your Achievements</h2>
        <p class="description">Interact across Auride and unlock achievements!</p>

        <div id="allAchievementsDiv">
            <!-- achievements are dynamically added here -->
        </div>
        <p>and more achievements coming soon!</p>
    `;

    const currentUsersData = await currentUserData();

    if (!currentUsersData) {
        navigate("/home");
        return;
    }

    // get current unlocked achievements
    const hasAchievement = await alreadyLoadedAchievements;
    // get all achievements
    const achievements = await achievementDefs;

    // create document fragment so we can append all these at once
    const allAchievementsDiv = el.querySelector("#allAchievementsDiv");
    const fragment = document.createDocumentFragment();

    // go through all the achievements and see what the user has unlocked
    Object.entries(achievements).forEach(async ([id, achievement]) => {
        // create achievement div
        const achievementDiv = document.createElement("div");
        achievementDiv.className = "achievementDiv";
        achievementDiv.innerHTML = `
            <h3 class="achievementName">${faIcon("solid", achievement.icon).outerHTML} ${achievement.fancyName}</h3>
            <p class="achievementDesc">Loading...</p>
            <p class="achievementUnlocked description">Loading...</p>
        `;

        const achievementDivDesc = achievementDiv.querySelector(".achievementDesc");
        const achievementDivUnlocked = achievementDiv.querySelector(".achievementUnlocked");

        // if the user has the achievement, we can show them when they unlocked it and the description
        if (hasAchievement.has(id)) {
            // get when the achievement was unlocked
            const currentAchievement = currentUsersData.achievements?.transsocial?.[id];
            console.log(currentAchievement);

            achievementDivDesc.textContent = achievement.description;
            achievementDivUnlocked.textContent = `Unlocked ${timeAgo(currentAchievement?.unlockedWhen, "verbose")}`;
        } else {
            // otherwise, hide them
            achievementDivDesc.textContent = "Unlock this achievement to see its description.";
            achievementDivUnlocked.textContent = "Not unlocked";
            achievementDiv.classList.add("notUnlocked");
        }

        fragment.appendChild(achievementDiv);
    });

    allAchievementsDiv.appendChild(fragment);

    return el;
}