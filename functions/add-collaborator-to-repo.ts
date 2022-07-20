export default async ({ inputs, env } : any) => {
  const headers = {
    Authorization: 'Bearer ' + env.GITHUB_TOKEN,
    'Content-Type': 'application/json'
  }

  try {
    const owner = inputs.owner
    const repo = inputs.repo
    const username = inputs.username

    const baseUrl = env.GITHUB_API_URL ?? 'api.github.com'
    const collaboratorEndpoint = `https://${baseUrl}/repos/${owner}/${repo}/collaborators/${username}`

    // first check if user is already a collaborator
    const isCollaborator : boolean = await fetch(collaboratorEndpoint, {
      method: 'GET',
      headers
    })
      .then((response : any) => {
        return response.status === 204
      }).catch((error) => {
        console.log('Error verifying collaborator:\n', error)
        return false
      })

    // if not already a collaborator, add them
    if (!isCollaborator) {
      const success = await fetch(collaboratorEndpoint, {
        method: 'PUT',
        headers
      })
        .then((response : any) => {
          return response.status === 201
        }).catch((error) => {
          console.log('Error verifying collaborator:\n', error)
          return false
        })

      return {
        outputs: { GitHubResponse: success ? `Invitation to join repository has been sent to user ${username}` : 'Something went wrong' }
      }
    } else {
      return {
        outputs: { GitHubResponse: 'User is already a collaborator' }
      }
    }
  } catch (err : any) {
    console.log('There was an issue', err)
  }
}
