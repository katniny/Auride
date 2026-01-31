import { auth } from "../../firebase/config";
import { navigate } from "../../router.js";

export async function loginToAcc(email, password) {
    // ensure the email and password are there
    if (!email || !password)
        throw new Error("You're missing the email or password to login.");

    // then, attempt to login
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        
        // navigate to home & reload the page
        navigate("/home");
        window.location.reload();
    } catch (err) {
        // remove the firebase message
        // TODO: when i get around to adding language support, i can just replace
        // these with my own error codes :P
        const msg = err.message.replace(/^Firebase:\s*/, "");
        throw new Error(msg);
    }
}