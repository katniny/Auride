import { Router } from "@vaadin/router";
import "./components/header.js";
import "./pages/home.js";
import "./pages/about.js";

const outlet = document.getElementById("app");
const router = new Router(outlet);

router.setRoutes([
    { path: "/", component: "home-page" },
    { path: "/about", component: "about-page" }
]);