# 🖋️ Auride Methods
Auride Methods is a new way of calling Auride's backend without too much complexity.

## 📞 Calls
Auride uses function calls starting with `auride.` to expose them without conflicting other methods.

Below will be a list of what we support, separated by category and with examples.

### 🧑 Users
- `auride.getUserInfo()`, which supports the following subcalls:
    - If you want to use a user's token (recommended for permissions), you can do so by adding this to your call: `.get({ token: token })` (token needs to be defined).
    - `byUid(uid)` - get a user's info from their user ID, useful if you know their ID but not their username (e.g., note rendering).
    - `byUsername(username)` - gets a user's info from their username, useful if you know their username but not their UID (e.g., /u/{username} pages).

A sample call of this would look like:
```js
    auride.getUserInfo().byUsername("katniny").get({ token: "exampletoken" }).then(user => {
        console.log(user);
    }).catch(error => {
        console.error(error);
    });
```

### 📕 Notes
WIP