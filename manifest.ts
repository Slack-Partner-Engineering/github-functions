import { DefineFunction, Manifest, Schema } from 'deno-slack-sdk/mod.ts'

export const getAssignedIssues = DefineFunction({
  callback_id: 'get-assigned-issues',
  title: 'List my issues',
  description: 'List issues which are assigned to you',
  source_file: 'functions/get-assigned-issues.ts',
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
        description: 'Select channel to post results in'
      }
    },
    required: ['channel']
  },
  output_parameters: {
    properties: {
      GitHubResponse: {
        type: Schema.types.string,
        description: ''
      }
    },
    required: ['GitHubResponse']
  }
})

export const getPrReviewsAssignedToUser = DefineFunction({
  callback_id: 'get-assigned-pr-reviews',
  title: 'List my PRs to review',
  description: 'List PRs for which you are tagged as a reviewer',
  source_file: 'functions/get-assigned-pr-reviews.ts',
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
        description: 'Select channel to post results in'
      }
    },
    required: ['channel']
  },
  output_parameters: {
    properties: {
      GitHubResponse: {
        type: Schema.types.string,
        description: ''
      }
    },
    required: ['GitHubResponse']
  }
})

export const addCollaboratorToRepo = DefineFunction({
  callback_id: 'add-collaborator-to-repo',
  title: 'Add Collaborator to Repository',
  description: 'Adds a GitHub user as a collaborator to a repo',
  source_file: 'functions/add-collaborator-to-repo.ts',
  input_parameters: {
    properties: {
      owner: {
        type: 'string',
        description: 'Repository owner'
      },
      repo: {
        type: 'string',
        description: 'Repository name'
      },
      username: {
        type: 'string',
        description: 'GitHub username of the user to be added'
      }
    },
    required: ['owner', 'repo', 'username']
  },
  output_parameters: {
    properties: {
      GitHubResponse: {
        type: Schema.types.string,
        description: ''
      }
    },
    required: ['GitHubResponse']
  }
})

export const updateIssue = DefineFunction({
  callback_id: 'update-issue',
  title: 'Update Issue',
  description: 'Updates an issue inside of a repository',
  source_file: 'functions/update-issue.ts',
  input_parameters: {
    properties: {
      owner: {
        type: 'string',
        description: 'Repository owner'
      },
      repo: {
        type: 'string',
        description: 'Repository name'
      },
      issue: {
        type: 'number',
        description: 'Issue number'
      },
      title: {
        type: 'string',
        description: 'Title of the issue'
      },
      assignees: {
        type: 'string',
        description: 'Comma-separated list of assignees'
      },
      state: {
        type: 'string',
        description: 'State of the issue',
        enum: ['open', 'closed'],
        choices: [{
          title: 'Open',
          value: 'open'
        }, {
          title: 'Closed',
          value: 'closed'
        }]
      }
    },
    required: ['owner', 'repo', 'issue']
  },
  output_parameters: {
    properties: {
      GitHubResponse: {
        type: Schema.types.string,
        description: ''
      }
    },
    required: ['GitHubResponse']
  }
})

export const createIssue = DefineFunction({
  callback_id: 'create-issue',
  title: 'Create Issue',
  description: 'Creates an issue inside of a repository',
  source_file: 'functions/create-issue.ts',
  input_parameters: {
    properties: {
      owner: {
        type: 'string',
        description: 'Repository owner'
      },
      repo: {
        type: 'string',
        description: 'Repository name'
      },
      title: {
        type: 'string',
        description: 'Title of the issue'
      },
      description: {
        type: 'string',
        description: 'Description of the issue'
      },
      assignees: {
        type: 'string',
        description: 'Comma-separated list of assignees'
      }
    },
    required: ['owner', 'repo', 'title']
  },
  output_parameters: {
    properties: {
      GitHubResponse: {
        type: Schema.types.string,
        description: ''
      }
    },
    required: ['GitHubResponse']
  }
})

export default Manifest({
  name: 'GitHub Functions',
  description: 'A collection of GitHub run-on-slack functions built using hermes-dev',
  icon: 'assets/icon.png',
  functions: [getAssignedIssues, getPrReviewsAssignedToUser, addCollaboratorToRepo, updateIssue, createIssue],
  outgoingDomains: [],
  botScopes: ['commands', 'chat:write', 'chat:write.public', 'channels:read', 'users:read']
})
