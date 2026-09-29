export function calculateAge(birthday) {
    const birthdayValues = birthday.split("-");

    // ensure birthday has year, month, and day
    if (!birthdayValues[0] || !birthdayValues[1] || !birthdayValues[2])
        throw new Error("Your birthday is invalid.");

    const birthYear = Number(birthdayValues[0]);
    const birthMonth = Number(birthdayValues[1]);
    const birthDay = Number(birthdayValues[2]);

    // ensure all values are actually numbers
    if (!Number.isInteger(birthYear) || !Number.isInteger(birthMonth) || !Number.isInteger(birthDay))
        throw new Error("Your birthday is invalid.");

    // make sure the date actually exists
    const fullBirthDate = new Date(Date.UTC(birthYear, birthMonth - 1, birthDay));

    if (fullBirthDate.getUTCFullYear() !== birthYear ||
        fullBirthDate.getUTCMonth() !== birthMonth - 1 ||
        fullBirthDate.getUTCDate() !== birthDay)
        throw new Error("Your birthday is invalid.");

    // calculate age
    const today = new Date();

    let age = today.getUTCFullYear() - birthYear;

    const birthdayThisYear = new Date(Date.UTC(today.getUTCFullYear(), birthMonth - 1, birthDay));

    if (today < birthdayThisYear)
        age--;

    return age;
}