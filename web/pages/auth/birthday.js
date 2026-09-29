import { faIcon } from "../../utils/faIcon.js";
import { currentUserData, userData } from "../../users/current.js";
import { navigate } from "../../router.js";
import { registerUser } from "../../methods/auth/register.js";
import { setDisplayName } from "../../methods/setDisplayName.js";
import { setUsername } from "../../methods/setUsername.js";
import { setBirthday } from "../../methods/setBirthday.js";
import { calculateAge } from "../../methods/calculateAge.js";

export default async function aboutPage() {
    document.title = "Enter Your Birthday | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="authForm">
            <div class="info">
                <h1>${faIcon("solid", "cake-candles").outerHTML} Your Birthday</h1>
                <p class="description">
                    To access certain content and to comply with local laws, Auride requires your birthday.
                    This won't be shown to anyone on Auride.
                </p>
            </div>
            <div class="form">
                <div class="birthHolders">
                    <select name="birthMonth" id="birthMonth"></select>
                    <select name="birthDay" id="birthDay"></select>
                    <select name="birthYear" id="birthYear"></select>
                </div>

                <p class="errorTxt caution"></p>
                <button class="setBirthBtn">${faIcon("solid", "cake-candles").outerHTML} Set Birthday</button>
            </div>
        </div>
    `;

    // is user logged in? if so, make sure their account isnt missing data.
    // if it is, navigate correctly
    const currentUsersData = await currentUserData();
    if (!currentUsersData)
        navigate("/auth/register");

    // remove the sidebar
    if (document.getElementById("sidebar"))
        document.getElementById("sidebar").remove();

    // prevent nav from header
    const aurideHeaderLogo = document.getElementById("aurideHeaderLogo");
    const aurideHeaderLink = aurideHeaderLogo.closest("a");
    aurideHeaderLink.href = "#";

    // generate birth dates dynamically
    const birthMonth = el.querySelector("#birthMonth");
    const birthDay = el.querySelector("#birthDay");
    const birthYear = el.querySelector("#birthYear");

    // generate months
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    for (let month = 0; month < months.length; month++) {
        const option = document.createElement("option");
        option.value = month + 1;
        option.textContent = months[month];
        birthMonth.appendChild(option);
    }

    // generate years
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1850; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        birthYear.appendChild(option);
    }

    // generate days
    function generateDays() {
        const month = Number(birthMonth.value);
        const year = Number(birthYear.value);

        // day 0 of the next month would be the last selected day of the month
        const daysInMonth = new Date(year, month, 0).getDate();
        const previousDay = Number(birthDay.value);
        birthDay.innerHTML = "";
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement("option");
            option.value = day;
            option.textContent = day;
            birthDay.appendChild(option);
        }

        // preserve the selected day if possible
        if (previousDay >= 1 && previousDay <= daysInMonth)
            birthDay.value = previousDay;
        else
            birthDay.value = "1";
    }

    birthMonth.addEventListener("change", generateDays);
    birthYear.addEventListener("change", generateDays);

    // initialize
    birthMonth.value = "1";
    birthYear.value = currentYear.toString();

    generateDays();

    // set birthday button
    const setBirthBtn = el.querySelector(".setBirthBtn");
    setBirthBtn.onclick = async () => {
        const month = Number(birthMonth.value);
        const day = Number(birthDay.value);
        const year = Number(birthYear.value);

        // create a date based on values
        const birthDate = `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

        console.log(birthDate);
        const errorTxt = el.querySelector(".errorTxt");
        try {
            errorTxt.textContent = "";
            setBirthBtn.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Setting birthday...`;
            setBirthBtn.style.opacity = "0.7";
            const birthdaySet = await setBirthday(birthDate);
            if (birthdaySet) {
                // make sure we set the birthInfo so we can progress
                userData.birthdayInfo ??= {
                    birthday: "",
                    ageRange: ""
                };
                userData.birthdayInfo.birthday += birthDate;
                // set age range appropriately
                const ageRangeNum = calculateAge(birthDate);
                let ageRange;
                if (ageRangeNum >= 13 && ageRangeNum < 18)
                    ageRange = "teen"
                else if (ageRangeNum >= 18)
                    ageRange = "adult";
                userData.birthdayInfo.ageRange = ageRange;

                navigate("/auth/done");
            }
        } catch (error) {
            errorTxt.textContent = error.message;
        } finally {
            setBirthBtn.style.opacity = "1";
            setBirthBtn.innerHTML = `${faIcon("solid", "cake-candles").outerHTML} Set Birthday`;
        }
    };

    return el;
}