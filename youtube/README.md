# Github Action setup guide

The goal of this Github action is to extract a description from the episode files, then upload it to the relevant Youtube video. It gets triggered when new episodes are added or when existing episodes are modified.

## Project creation

The first step is to create a project and its OAuth credentials.

- Create a new project on the [Google Cloud Platform](https://console.cloud.google.com/projectcreate)
- Enable the [Youtube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com) for the project
- You will be invited to create credentials for it, this includes an OAuth consent screen
- In the "credential type" step, choose "User data"
- In the "scopes" step, make sure the include the youtube.force-ssl scope
- In the OAuth Client ID step, select "Web Application" when prompted for an application type
- In the same step, add a redirect URL of http://localhost:3000

You can now download your credentials as a JSON file.

- Finally, in the consent screen menu, make sure to add your email address to the list of "Test users"

## Token generation

The next step consists of generating access and refresh tokens. This step is performed manually.

- Copy the JSON file you downloaded in the previous step to the youtube/ directory of the project
- Rename it to client_secret.json
- On a new terminal tab (or window), run `nc -l localhost -p 3000`
- In a separate terminal tab (or window), cd to the youtube/ directory and run `node quickstart.js`. It will invite you to visit an OAuth2 consent form
- Log in with the account you previously added to the list of test users
- You will then be redirected to the redirect URL you previously configured. The query string will contain a "code" parameter. Copy its value

![image](https://user-images.githubusercontent.com/1638227/147785146-423b38bf-6e2c-42be-89ab-e12ac76897d4.png)

- Paste the newly acquired code in the `node quickstart.js` prompt. It will then exchange it for access and refresh tokens.

If everything goes well, quickstart.js will store your tokens in the ~/.credentials directory :

![image](https://user-images.githubusercontent.com/1638227/147785008-9aca8a2c-f45f-4344-938c-1fc5ffcb4758.png)

## Github configuration

The final step consists of setting up the required Github secrets. For this, you'll need :

- Access and refresh tokens, retrieved from step #2
- Client ID, client secret and redirect URL

So in total, you'll have to set up five secrets : ACCESS_TOKEN, REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET and REDIRECT_URL

Once that's taken care of, the action can be tested by pushing a new episode or updating an existing one.
