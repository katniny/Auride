export async function getUpdate(version) {
    try {
        const response = await fetch("/updates.jsonc");
        const data = await response.json();

        if (data[version] == null)
            return false;

        return data[version];
    } catch (error) {
        return error;
    }
}