import { auth } from "../../firebase/config";
import { navigate } from "../../router.js";

export async function loginToAcc(email, password) {
    // ensure the email and password are there
    if (!email || !password)
        throw new Error("You're missing the email or password to login.");

    // then, attempt to login
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // navigate to home & reload the page
            navigate("/home");
            window.location.reload();
        }).catch((error) => {
            // an error occurred, throw
            throw new Error(`Error ${error.code} occurred with message ${error.message}`);
        });
}