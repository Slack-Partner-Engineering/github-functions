# :octocat: GitHub Functions for Slack :octocat:

This project aims to create sample GitHub functions for the Slack Beta Platform. It utilizes the beta Slack CLI to create functions.

## Disclaimer
This project is built using pre-released features on the Slack Platform. It may contain bugs, performance issues, and isn't representative of the final product. The code in this project isn't meant to be a standard template. It may change or become legacy as updates are released to the Slack Beta Platform.

## Supported Functions
1. List my PRs to review: list PRs for which you are tagged as a reviewer

https://user-images.githubusercontent.com/25628075/180052879-35424366-eba0-4650-8b2c-c41e59b39cc1.mp4

2. List my issues: list issues which are assigned to you

https://user-images.githubusercontent.com/25628075/180052872-18261a51-85f2-4152-9478-b38697d17633.mp4

3. Add collaborator to repository: adds a GitHub user as a collaborator to a repo

https://user-images.githubusercontent.com/25628075/180052875-e3fc6cff-beb4-467d-8626-30b40a2f7f4d.mp4

4. Create issue: creates an issue inside of a repository

https://user-images.githubusercontent.com/25628075/180052874-bc7c857c-d651-4908-8c7b-3ffabb272382.mp4

5. Update issue: updates an issue inside of a repository

https://user-images.githubusercontent.com/25628075/180053267-f2dbd457-4faf-49d8-af64-6bba807e36fc.mp4

## Getting Started
1. First, follow step 1 in this [guide](https://api.slack.com/future/quickstart) to make sure that you have the latest Slack CLI on your development machine
2. Create your GitHub `personal access token` [here](https://github.com/settings/tokens). Select the scopes defined in the [scopes section](https://github.com/Slack-Partner-Engineering/github-functions/edit/main/README.md#github-personal-access-token-scopes)
3. Try running a request with your new token, such as [this one](https://docs.github.com/en/rest/users/users#get-the-authenticated-user)
4. Clone this repo
5. Go to the root directory of the project
6. Rename the `.sample.env` to `.env` and paste your access token. If you are an enterprise customer, enter your GitHub API URL without the `https://` (e.g. api.company-github.com)
7. Follow steps 2 and 3 in the [quickstart guide](https://api.slack.com/future/functions#distribute) to run the functions! :rocket:

## GitHub Personal Access Token Scopes
Select the following scopes:
- public_repo, repo:invite
- read:org
- read:user, user:email
- read:enterprise
