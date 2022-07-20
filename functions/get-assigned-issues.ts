import { postMessage } from '../slack-api/chat.ts'
import { getBlocks } from '../blocks/get-assigned-issues.ts'

export default async ({ token, inputs, env } : any) => {
  const baseUrl = env.GITHUB_API_URL ?? 'api.github.com'
  const userEndpoint = `https://${baseUrl}/user`
  const searchEndpoint = `https://${baseUrl}/search/issues`

  const headers = {
    Authorization: 'Bearer ' + env.GITHUB_TOKEN,
    'Content-Type': 'application/json'
  }

  try {
    const username : string = await fetch(userEndpoint,
      {
        method: 'GET',
        headers
      })
      .then((response : any) => { return response.json() })
      .then((response : any) => { return response.login })
      .catch((error) => {
        console.log('Error fetching from user endpoint:\n', error)
      })

    const queryParams = `?q=type:issue+assignee:${username}+state:open+sort:updated-desc&per_page=5`
    const results = await fetch(searchEndpoint + queryParams, {
      method: 'GET',
      headers
    })
      .then((response : any) => { return response.json() })
      .then((response : any) => { return response.items })
      .catch((error) => {
        console.log('Error fetching from search endpoint:\n', error)
      })

    const blocks = getBlocks(results)
    const success = await postMessage(token, inputs.channel, blocks)

    return {
      outputs: { GitHubResponse: success ? 'Message successfully posted to channel' : 'Something went wrong' }
    }
  } catch (err : any) {
    console.log('There was an issue', err)
  }
}
