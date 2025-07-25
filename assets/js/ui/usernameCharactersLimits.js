export function usernameCharacters() {
   // prevent characters "`~!@#$%^&*()-+=\|]}{[;:'",/?"
   event.target.value = event.target.value.replace(/[^a-z 1-9 . _]/g, '');
   // prevent spaces
   event.target.value = event.target.value.replace(/[ ]/g, '');
}

window.usernameCharacters = usernameCharacters;