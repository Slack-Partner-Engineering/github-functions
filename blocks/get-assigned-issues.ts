export function getBlocks (issues : any) {
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: ':wave: Here are issues that are assigned to you:',
        emoji: true
      }
    },
    {
      type: 'divider'
    }
  ]

  for (const issue of issues) {
    const repoStringArray = issue.repository_url.split('/')
    const formattedDate = issue.created_at.split('T')[0]

    blocks.push(
      {
        type: 'section', // @ts-ignore
        text: {
          type: 'mrkdwn',
          text: `*<${issue.html_url}|#${issue.number} ${issue.title}>*`
        }
      },
      {
        type: 'section', // @ts-ignore
        fields: [
          {
            type: 'mrkdwn',
            text: `*Author*\n${issue.user.login}`
          },
          {
            type: 'mrkdwn',
            text: `*Repository*\n${repoStringArray.at(-2)}/${repoStringArray.at(-1)}`
          },
          {
            type: 'mrkdwn',
            text: `*Created on*\n${formattedDate}`
          },
          {
            type: 'mrkdwn',
            text: `*Labels*\n${issue.labels.map((label: any) => label.name).join(', ')}`
          }
        ]
      },
      {
        type: 'divider'
      }
    )
  }

  return blocks
}
