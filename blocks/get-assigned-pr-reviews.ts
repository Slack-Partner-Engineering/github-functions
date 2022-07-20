export function getBlocks (pullRequestsReviews : any) {
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: ':wave: Here are PR reviews that are assigned to you:',
        emoji: true
      }
    },
    {
      type: 'divider'
    }
  ]

  for (const pr of pullRequestsReviews) {
    const repoStringArray = pr.repository_url.split('/')
    const formattedDate = pr.created_at.split('T')[0]

    blocks.push(
      {
        type: 'section', // @ts-ignore
        text: {
          type: 'mrkdwn',
          text: `*<${pr.html_url}|#${pr.number} ${pr.title}>*`
        }
      },
      {
        type: 'section', // @ts-ignore
        fields: [
          {
            type: 'mrkdwn',
            text: `*Author*\n${pr.user.login}`
          },
          {
            type: 'mrkdwn',
            text: `*Repository*\n${repoStringArray.at(-2)}/${repoStringArray.at(-1)}`
          },
          {
            type: 'mrkdwn',
            text: `*Created on*\n${formattedDate}`
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
