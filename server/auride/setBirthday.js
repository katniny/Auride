const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const { calculateAge } = require("./functions/getAge.js");
const db = admin.database();
const auth = admin.auth();

auride.post("/api/auride/setBirthday", {
    rateLimit: 2000,
    requireToken: true
}, async (req, res, ctx) => {
    try {
        // TODO: check for already existing birthday and make sure a minor
        // isnt trying to change their birthday to an adult

        // get birthday
        const birthday = req.body.birthday;

        // split up birthday
        const birthdayValues = birthday.split("-");

        // ensure birthday is valid
        // firstly, check that the month/day/year exists
        console.log(birthday);
        console.log(birthdayValues);
        if (!birthdayValues[0] || !birthdayValues[1] || !birthdayValues[2])
            return res.status(403).json({ error: "Your birthday is invalid." });

        // then, check the date is a real one
        const birthYear = Number(birthdayValues[0]);
        const birthMonth = Number(birthdayValues[1]);
        const birthDay = Number(birthdayValues[2]);
        const fullBirthDate = new Date(Date.UTC(birthYear, birthMonth - 1, birthDay));
        
        if (fullBirthDate.getUTCFullYear() !== birthYear ||
            fullBirthDate.getUTCMonth() !== birthMonth - 1 || fullBirthDate.getUTCDate() !== birthDay)
            return res.status(403).json({ error: "Your birthday is invalid." });
        
        console.log(fullBirthDate);
        console.log(`${birthYear}-${birthMonth}-${birthDay}`);
        const birthDateFormatted = `${birthYear}-${birthMonth}-${birthDay}`;

        const age = await calculateAge(birthYear, birthMonth, birthDay);
        console.log(`age: ${age}`);

        // make sure user is 13+
        if (age < 13)
            return res.status(403).json({ error: "Your birthday is invalid." });

        // make sure user isnt unrealistically old (obviously someone born in 1850 isnt alive..)
        // if scientists ever figure out immortality or something, we'll need to update this, but for now, that isnt the case!
        if (age > 120)
            return res.status(403).json({ error: "Your birthday is invalid." });

        // put user into an age range
        let userAgeRange;
        if (age >= 13 && age < 18)
            userAgeRange = "teen";
        else if (age >= 18)
            userAgeRange = "adult";

        // change the users birthday
        await db.ref(`/users/${ctx.currentUser.uid}`).update({
            birthdayInfo: {
                birthday: birthDateFormatted,
                ageRange: userAgeRange
            }
        });

        // then, finish
        return res.status(200).json({ success: "Birthday set successfully.", info: { age: age, birthday: birthDateFormatted } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});