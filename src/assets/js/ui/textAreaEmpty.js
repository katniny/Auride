// just returns if the text is empty or not
// just send the text here, and it will return true/false
export function isTextareaEmpty(text) {
    const trimmedValue = text.trim();
    return /^\s*$/.test(trimmedValue);
}