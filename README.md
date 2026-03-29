# n8n-nodes-reachinbox-proxy

An [n8n](https://n8n.io) community node package that gives your workflows full access to the [ReachInbox](https://app.reachinbox.ai) cold email platform via a self-hosted proxy — no paid API key required.

## Nodes

### ReachInbox
Action node with 11 resources and 31+ operations:

| Resource | Operations |
|---|---|
| **Campaign** | List, Create, Get Details, Start, Pause, Update, Get Analytics, Get Total Analytics |
| **Sequence** | Get, Save |
| **Subsequence** | List, Get Details, Create, Update |
| **Lead** | Add, Update, Delete |
| **Lead List** | Get All, Create, Add Leads |
| **Account** | List Accounts, Get Warmup Analytics |
| **Analytics** | Get Campaign Analytics, Get Total Analytics |
| **Onebox** | List Threads, Send Reply, Mark All Read, Get Unread Count, Search |
| **Blocklist** | Get Blocklist, Add to Blocklist |
| **Tag** | List Tags |
| **Webhook** | List, Subscribe, Unsubscribe |

### ReachInbox Trigger
Webhook trigger node that listens for ReachInbox events:

- Email Sent
- Email Opened
- Email Clicked
- Reply Received
- Email Bounced
- Lead Interested
- Lead Not Interested
- Campaign Completed

## Requirements

A running instance of [reachinbox-proxy](https://github.com/lutzkind/reachinbox-proxy). The proxy handles session authentication against ReachInbox using your login credentials — no API key needed.

## Installation

### In n8n (GUI)

1. Go to **Settings → Community Nodes**
2. Click **Install**
3. Enter: `n8n-nodes-reachinbox-proxy`

### Manual (self-hosted)

```bash
cd /home/node/.n8n/nodes
npm install n8n-nodes-reachinbox-proxy
```

Restart n8n after installation.

## Credentials

Add a **ReachInbox Proxy API** credential with:

| Field | Description |
|---|---|
| **Proxy Base URL** | URL of your deployed proxy (e.g. `https://reachinbox.luxeillum.com`) |

No API key required — authentication is handled by the proxy.

## Related

- [reachinbox-proxy](https://github.com/lutzkind/reachinbox-proxy) — The self-hosted proxy (deploy this first)
- [reachinbox-mcp](https://github.com/lutzkind/reachinbox-mcp) — MCP server for AI tool access (Claude Code, Gemini CLI, etc.)

## License

MIT
