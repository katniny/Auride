let isSidebarOpen = false;
const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburgerMenu");

if (hamburger)
    hamburger.onclick = sidebarStatus;

function sidebarStatus () {
    if (isSidebarOpen === false) {
        sidebar.classList.add("open");
        isSidebarOpen = true;
        sidebar.style.animation = "openSidebar 0.15s linear";
    } else if (isSidebarOpen === true) {
        sidebar.classList.remove("open");
        isSidebarOpen = false;
    }
}

// This should run on mobile to hide the sidebar.
document.body.addEventListener('click', function(event) {
	if (sidebar.contains(event.target) || hamburger.contains(event.target)) {
        isSidebarOpen = true;
		return;
	} else {
        sidebar.classList.remove("open");
        isSidebarOpen = false;
	}
});