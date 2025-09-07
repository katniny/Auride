# Storage server

This simple TUS + nginx deployment is the setup used for our blob storage.

## Usage

Simply run `docker compose up` to start the storage server on port `6979`.

Update utils.js to use `http://localhost:6979` as TUS endpoint to use with Auride.
