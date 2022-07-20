export default async ({ inputs, env } : any) => {
  const headers = {
    Authorization: 'Bearer ' + env.GITHUB_TOKEN,
    'Content-Type': 'application/json'
  }

  try {
    const owner = inputs.owner
    const repo = inputs.repo
    const title = inputs.title
    const description = inputs.description
    const assignees = inputs.assignees.split(',').map((assignee: string) => { return assignee.trim() })

    const baseUrl = env.GITHUB_API_URL ?? 'api.github.com'
    const issueEndpoint = `https://${baseUrl}/repos/${owner}/${repo}/issues`

    const body = JSON.stringify({
      title,
      body: description,
      assignees
    })

    const createResponse = await fetch(issueEndpoint, {
      method: 'POST',
      headers,
      body
    })
      .then((response : any) => { return response.json() })
      .catch((error) => {
        console.log('Error creating issue:\n', error)
      })

    return {
      outputs: { GitHubResponse: createResponse ? `Issue #${createResponse.number} has been successfully updated\nLink to issue: ${createResponse.html_url}` : 'Something went wrong' }
    }
  } catch (err : any) {
    console.log('There was an issue', err)
  }
}
