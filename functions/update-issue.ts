export default async ({ inputs, env } : any) => {
  const headers = {
    Authorization: 'Bearer ' + env.GITHUB_TOKEN,
    'Content-Type': 'application/json'
  }

  try {
    const owner = inputs.owner
    const repo = inputs.repo
    const issue = inputs.issue
    const title = inputs.title
    const assignees = inputs.assignees?.split(',').map((assignee: string) => { return assignee.trim() })
    const state = inputs.state

    const baseUrl = env.GITHUB_API_URL ?? 'api.github.com'
    const issueEndpoint = `https://${baseUrl}/repos/${owner}/${repo}/issues/${issue}`

    const body = JSON.stringify({
      title,
      assignees,
      state
    })

    const updateResponseStatus = await fetch(issueEndpoint, {
      method: 'PATCH',
      headers,
      body
    })
      .then((response : any) => { return response.status })
      .catch((error) => {
        console.log('Error updating issue:\n', error)
        return false
      })

    const responseMessage = updateResponseStatus === 200
      ? `Issue #${issue} has been successfully updated`
      : updateResponseStatus === 404
        ? `Issue #${issue} could not be found`
        : 'Something went wrong'

    return {
      outputs: { GitHubResponse: responseMessage }
    }
  } catch (err : any) {
    console.log('There was an issue', err)
  }
}
