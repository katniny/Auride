// create loading indicator to give some visual feedback
function createLoadingIndicator(size, appendTo) {
    // get the size requested
    let loadingIndicator = null;
    switch (size) {
        case "xs":
            loadingIndicator = document.createElement("p");
            break;
        case "sm":
            loadingIndicator = document.createElement("h3");
            break;
        case "lg":
            loadingIndicator = document.createElement("h2");
            break;
        case "xl":
            loadingIndicator = document.createElement("h1");
            break;
        default:
            break;
    }
    // insert the fontawesome  html
    loadingIndicator.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin"></i>
    `;
    // apply styling
    loadingIndicator.style.textAlign = "center";
    loadingIndicator.style.marginTop = "15px";
    loadingIndicator.id = "noteLoadingIndicator";

    // append element
    // should an id, NOT a class!
    document.getElementById(appendTo).appendChild(loadingIndicator);
}