async function calculateAge(birthYear, birthMonth, birthDay) {
    const today = new Date();

    let age = today.getUTCFullYear() - birthYear;

    // if their birthday hasnt happened yet this year, subtract their age by one
    if (today.getUTCMonth() + 1 < birthMonth || (today.getUTCMonth() + 1 === birthMonth && today.getUTCDate() < birthDay))
        age--;

    return age;
}

module.exports = { calculateAge };