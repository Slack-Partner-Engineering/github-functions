import { SlackAPI } from 'deno-slack-api/mod.ts'

export async function postMessage (token : string, channel: string, blocks: any) : Promise<boolean> {
  const client = SlackAPI(token, {})
  const results : any = await client.apiCall('chat.postMessage', {
    channel,
    blocks
  })

  return !!results.ts
};
