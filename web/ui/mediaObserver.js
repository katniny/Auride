// observer to only show images/videos/etc. when about to be visible for performance
export const mediaObserver = new IntersectionObserver((entries, _observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.visibility = "visible";
            entry.target.style.opacity = "1";
        } else {
            entry.target.style.visibility = "hidden";
            entry.target.style.opacity = "0";
        }
    });
}, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
});