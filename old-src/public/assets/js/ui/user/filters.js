// allow swapping between achievements/notes
function swapFilter(to) {
    const notesBtn = document.getElementById("filterNotes");
    const achievementsBtn = document.getElementById("filterAchievements");
    const notesContent = document.getElementById("notes");
    const achievementsContent = document.getElementById("achievementsContent");

    if (to === "achievements") {
        // swap button active states
        achievementsBtn.classList.add("active");
        notesBtn.classList.remove("active");

        // show/hide content
        achievementsContent.style.display = "block";
        notesContent.style.display = "none";
    } else if (to === "notes") {
        // swap button active states
        notesBtn.classList.add("active");
        achievementsBtn.classList.remove("active");

        // show/hide content
        notesContent.style.display = "block";
        achievementsContent.style.display = "none";
    }
}