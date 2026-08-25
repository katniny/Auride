import { faIcon } from "../utils/faIcon.js";
import { alreadyLoadedAchievements } from "../users/current.js"
import { achievementDefs } from "../components/achievementDefs.js";

export async function showUnlockedAchievement(achievement, timeUnlocked) {
    await achievementDefs;
    
    // add achievement to alreadyLoadedAchievements, as to not double unlock
    alreadyLoadedAchievements.add(achievement);
    
    // create div
    const achievementShow = document.createElement("div");
    achievementShow.className = "unlockAchievement";
    achievementShow.innerHTML = `
        <h2>${faIcon("solid", achievementDefs?.[achievement].icon).outerHTML} ${achievementDefs?.[achievement].fancyName}</h2>
        <p>${achievementDefs?.[achievement].description}</p>
        <p class="hero">Achievement Unlock!</p>
    `;

    // play animation
    achievementShow.classList.add("show");

    document.body.appendChild(achievementShow);

    // then, after 3.5 seconds, close & delete
    setTimeout(() => {
        achievementShow.classList.remove("show");
        achievementShow.classList.add("hide");
        setTimeout(() => {
            achievementShow.remove();
        }, 425);
    }, 3500);
}