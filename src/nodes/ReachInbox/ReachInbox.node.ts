import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IDataObject,
  NodeOperationError,
} from 'n8n-workflow';

export class ReachInbox implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'ReachInbox',
    name: 'reachInbox',
    icon: 'file:reachinbox.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
    description: 'Interact with ReachInbox via self-hosted proxy',
    defaults: { name: 'ReachInbox' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'reachInboxProxyApi', required: true }],
    properties: [
      // ─── RESOURCE ────────────────────────────────────────────────
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Campaign', value: 'campaign' },
          { name: 'Lead', value: 'lead' },
          { name: 'Lead List', value: 'leadList' },
          { name: 'Account', value: 'account' },
          { name: 'Analytics', value: 'analytics' },
          { name: 'Onebox', value: 'onebox' },
          { name: 'Blocklist', value: 'blocklist' },
          { name: 'Tag', value: 'tag' },
          { name: 'Webhook', value: 'webhook' },
        ],
        default: 'campaign',
      },

      // ═══════════════════════════════════════════════════════════════
      // CAMPAIGN OPERATIONS
      // ═══════════════════════════════════════════════════════════════
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['campaign'] } },
        options: [
          { name: 'Create', value: 'create', description: 'Create a new campaign', action: 'Create a campaign' },
          { name: 'Get All', value: 'getAll', description: 'Get all campaigns', action: 'Get all campaigns' },
          { name: 'Start', value: 'start', description: 'Start a campaign', action: 'Start a campaign' },
          { name: 'Pause', value: 'pause', description: 'Pause a campaign', action: 'Pause a campaign' },
          { name: 'Update', value: 'update', description: 'Update campaign settings', action: 'Update a campaign' },
          { name: 'Get Analytics', value: 'analytics', description: 'Get campaign analytics', action: 'Get campaign analytics' },
          { name: 'Get Total Analytics', value: 'totalAnalytics', description: 'Get total analytics summary', action: 'Get total analytics' },
        ],
        default: 'getAll',
      },

      // ═══════════════════════════════════════════════════════════════
      // LEAD OPERATIONS
      // ═══════════════════════════════════════════════════════════════
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['lead'] } },
        options: [
          { name: 'Add', value: 'add', description: 'Add leads to a campaign', action: 'Add leads to campaign' },
          { name: 'Update', value: 'update', description: 'Update a lead', action: 'Update a lead' },
          { name: 'Delete', value: 'delete', description: 'Delete leads from campaign', action: 'Delete leads' },
        ],
        default: 'add',
      },

      // ═══════════════════════════════════════════════════════════════
      // LEAD LIST OPERATIONS
      // ═══════════════════════════════════════════════════════════════
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['leadList'] } },
        options: [
          { name: 'Create', value: 'create', description: 'Create a lead list', action: 'Create lead list' },
          { name: 'Get All', value: 'getAll', description: 'Get all lead lists', action: 'Get all lead lists' },
          { name: 'Add Leads', value: 'addLeads', description: 'Add leads to a list', action: 'Add leads to list' },
        ],
        default: 'getAll',
      },

      // ═══════════════════════════════════════════════════════════════
      // ACCOUNT OPERATIONS
      // ═══════════════════════════════════════════════════════════════
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['account'] } },
        options: [
          { name: 'Get All', value: 'getAll', description: 'Get all email accounts', action: 'Get all accounts' },
          { name: 'Get Warmup Analytics', value: 'warmupAnalytics', description: 'Get warmup analytics', action: 'Get warmup analytics' },
        ],
        default: 'getAll',
      },

      // ═══════════════════════════════════════════════════════════════
      // ANALYTICS OPERATIONS
      // ═══════════════════════════════════════════════════════════════
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['analytics'] } },
        options: [
          { name: 'Get Campaign Analytics', value: 'campaign', description: 'Get analytics for a campaign', action: 'Get campaign analytics' },
          { name: 'Get Total Analytics', value: 'total', description: 'Get total analytics across campaigns', action: 'Get total analytics' },
        ],
        default: 'campaign',
      },

      // ═══════════════════════════════════════════════════════════════
      // ONEBOX OPERATIONS
      // ═══════════════════════════════════════════════════════════════
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['onebox'] } },
        options: [
          { name: 'List Emails', value: 'list', description: 'List emails in unified inbox', action: 'List onebox emails' },
          { name: 'Send Email', value: 'send', description: 'Send an email via onebox', action: 'Send email' },
          { name: 'Mark All Read', value: 'markAllRead', description: 'Mark all emails as read', action: 'Mark all as read' },
          { name: 'Get Unread Count', value: 'unreadCount', description: 'Get unread email counts', action: 'Get unread count' },
          { name: 'Search', value: 'search', description: 'Search inbox', action: 'Search inbox' },
        ],
        default: 'list',
      },

      // ═══════════════════════════════════════════════════════════════
      // BLOCKLIST OPERATIONS
      // ═══════════════════════════════════════════════════════════════
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['blocklist'] } },
        options: [
          { name: 'Add', value: 'add', description: 'Add emails/domains/keywords to blocklist', action: 'Add to blocklist' },
        ],
        default: 'add',
      },

      // ═══════════════════════════════════════════════════════════════
      // TAG OPERATIONS
      // ═══════════════════════════════════════════════════════════════
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['tag'] } },
        options: [
          { name: 'Get All', value: 'getAll', description: 'Get all tags', action: 'Get all tags' },
        ],
        default: 'getAll',
      },

      // ═══════════════════════════════════════════════════════════════
      // WEBHOOK OPERATIONS
      // ═══════════════════════════════════════════════════════════════
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['webhook'] } },
        options: [
          { name: 'Get All', value: 'getAll', description: 'List all webhook subscriptions', action: 'Get all webhooks' },
          { name: 'Subscribe', value: 'subscribe', description: 'Subscribe to a webhook event', action: 'Subscribe to webhook' },
        ],
        default: 'getAll',
      },

      // ═══════════════════════════════════════════════════════════════
      // SHARED PARAMETERS
      // ═══════════════════════════════════════════════════════════════

      // Campaign ID (used by many resources)
      {
        displayName: 'Campaign ID',
        name: 'campaignId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
          show: {
            resource: ['campaign'],
            operation: ['start', 'pause', 'update', 'analytics'],
          },
        },
      },
      {
        displayName: 'Campaign ID',
        name: 'campaignId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
          show: {
            resource: ['lead'],
            operation: ['add', 'update', 'delete'],
          },
        },
      },
      {
        displayName: 'Campaign ID',
        name: 'campaignId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
          show: { resource: ['analytics'], operation: ['campaign'] },
        },
      },

      // ─── CAMPAIGN: Create ─────────────────────────────────────────
      {
        displayName: 'Campaign Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['campaign'], operation: ['create'] } },
      },

      // ─── CAMPAIGN: Get All ────────────────────────────────────────
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 50,
        displayOptions: { show: { resource: ['campaign'], operation: ['getAll'] } },
      },
      {
        displayName: 'Filter',
        name: 'filter',
        type: 'options',
        options: [
          { name: 'All', value: 'all' },
          { name: 'Active', value: 'active' },
          { name: 'Paused', value: 'paused' },
          { name: 'Completed', value: 'completed' },
          { name: 'Draft', value: 'draft' },
        ],
        default: 'all',
        displayOptions: { show: { resource: ['campaign'], operation: ['getAll'] } },
      },
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'options',
        options: [
          { name: 'Newest', value: 'newest' },
          { name: 'Oldest', value: 'oldest' },
          { name: 'A-Z', value: 'a-z' },
          { name: 'Z-A', value: 'z-a' },
        ],
        default: 'newest',
        displayOptions: { show: { resource: ['campaign'], operation: ['getAll'] } },
      },

      // ─── CAMPAIGN: Update ─────────────────────────────────────────
      {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['campaign'], operation: ['update'] } },
        options: [
          { displayName: 'Daily Limit', name: 'dailyLimit', type: 'number', default: 50 },
          { displayName: 'Track Opens', name: 'tracking', type: 'boolean', default: true },
          { displayName: 'Track Clicks', name: 'linkTracking', type: 'boolean', default: true },
          { displayName: 'Stop on Reply', name: 'stopOnReply', type: 'boolean', default: true },
          { displayName: 'Delay (minutes)', name: 'delay', type: 'number', default: 0 },
          { displayName: 'Random Delay (minutes)', name: 'randomDelay', type: 'number', default: 0 },
          { displayName: 'Blockquote', name: 'blockquote', type: 'boolean', default: false },
          { displayName: 'Global Unsubscribe', name: 'globalUnsubscribe', type: 'boolean', default: false },
          { displayName: 'Prioritize New Leads', name: 'prioritizeNewLeads', type: 'boolean', default: false },
          { displayName: 'AI Replies', name: 'aiReplies', type: 'boolean', default: false },
        ],
      },

      // ─── CAMPAIGN: Analytics ─────────────────────────────────────
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'string',
        default: '',
        placeholder: 'YYYY-MM-DD',
        displayOptions: { show: { resource: ['campaign', 'analytics'], operation: ['totalAnalytics', 'total'] } },
      },
      {
        displayName: 'End Date',
        name: 'endDate',
        type: 'string',
        default: '',
        placeholder: 'YYYY-MM-DD',
        displayOptions: { show: { resource: ['campaign', 'analytics'], operation: ['totalAnalytics', 'total'] } },
      },

      // ─── LEAD: Add ────────────────────────────────────────────────
      {
        displayName: 'Leads (JSON)',
        name: 'leads',
        type: 'json',
        required: true,
        default: '[{"email":"example@domain.com","firstName":"John","lastName":"Doe"}]',
        description: 'Array of lead objects with email, firstName, lastName, and custom attributes',
        displayOptions: { show: { resource: ['lead'], operation: ['add'] } },
      },
      {
        displayName: 'Duplicate Handling',
        name: 'duplicates',
        type: 'options',
        options: [
          { name: 'Skip', value: 'skip' },
          { name: 'Overwrite', value: 'overwrite' },
        ],
        default: 'skip',
        displayOptions: { show: { resource: ['lead'], operation: ['add'] } },
      },

      // ─── LEAD: Update ─────────────────────────────────────────────
      {
        displayName: 'Lead ID',
        name: 'leadId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['lead'], operation: ['update'] } },
      },
      {
        displayName: 'Update Fields',
        name: 'leadUpdateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['lead'], operation: ['update'] } },
        options: [
          { displayName: 'Email', name: 'email', type: 'string', default: '' },
          { displayName: 'First Name', name: 'firstName', type: 'string', default: '' },
          { displayName: 'Last Name', name: 'lastName', type: 'string', default: '' },
          { displayName: 'Lead Status', name: 'leadStatus', type: 'string', default: '' },
          { displayName: 'Attributes (JSON)', name: 'attributes', type: 'json', default: '{}' },
        ],
      },

      // ─── LEAD: Delete ─────────────────────────────────────────────
      {
        displayName: 'Lead IDs',
        name: 'leadIds',
        type: 'string',
        default: '',
        description: 'Comma-separated lead IDs. Leave empty to delete all.',
        displayOptions: { show: { resource: ['lead'], operation: ['delete'] } },
      },
      {
        displayName: 'Filter by Status',
        name: 'statusFilter',
        type: 'options',
        options: [
          { name: 'All', value: '' },
          { name: 'Opened', value: 'emails_opened' },
          { name: 'Bounced', value: 'bounced' },
          { name: 'Replied', value: 'replied' },
          { name: 'Interested', value: 'interested' },
          { name: 'Not Interested', value: 'not_interested' },
        ],
        default: '',
        displayOptions: { show: { resource: ['lead'], operation: ['delete'] } },
      },

      // ─── LEAD LIST: Create ────────────────────────────────────────
      {
        displayName: 'List Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['leadList'], operation: ['create'] } },
      },

      // ─── LEAD LIST: Get All ───────────────────────────────────────
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 50,
        displayOptions: { show: { resource: ['leadList'], operation: ['getAll'] } },
      },
      {
        displayName: 'Search',
        name: 'search',
        type: 'string',
        default: '',
        displayOptions: { show: { resource: ['leadList'], operation: ['getAll'] } },
      },

      // ─── LEAD LIST: Add Leads ─────────────────────────────────────
      {
        displayName: 'List ID',
        name: 'listId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['leadList'], operation: ['addLeads'] } },
      },
      {
        displayName: 'Leads (JSON)',
        name: 'listLeads',
        type: 'json',
        required: true,
        default: '[{"email":"example@domain.com","firstName":"John","lastName":"Doe"}]',
        displayOptions: { show: { resource: ['leadList'], operation: ['addLeads'] } },
      },

      // ─── ACCOUNT: Get All ─────────────────────────────────────────
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 50,
        displayOptions: { show: { resource: ['account'], operation: ['getAll'] } },
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'All', value: 'all' },
          { name: 'Active', value: 'active' },
          { name: 'Paused', value: 'paused' },
          { name: 'Error', value: 'error' },
        ],
        default: 'all',
        displayOptions: { show: { resource: ['account'], operation: ['getAll'] } },
      },

      // ─── ONEBOX: List ─────────────────────────────────────────────
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 50,
        displayOptions: { show: { resource: ['onebox'], operation: ['list'] } },
      },
      {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        default: 0,
        displayOptions: { show: { resource: ['onebox'], operation: ['list'] } },
      },
      {
        displayName: 'Inbox',
        name: 'inbox',
        type: 'options',
        options: [
          { name: 'Inbox', value: 'Inbox' },
          { name: 'Archive', value: 'Archive' },
          { name: 'All', value: 'All' },
        ],
        default: 'Inbox',
        displayOptions: { show: { resource: ['onebox'], operation: ['list'] } },
      },
      {
        displayName: 'Status Filter',
        name: 'statusFilter',
        type: 'options',
        options: [
          { name: 'All', value: 'All' },
          { name: 'Unread', value: 'unread' },
          { name: 'Read', value: 'read' },
        ],
        default: 'All',
        displayOptions: { show: { resource: ['onebox'], operation: ['list'] } },
      },
      {
        displayName: 'Search Query',
        name: 'searchQuery',
        type: 'string',
        default: '',
        displayOptions: { show: { resource: ['onebox'], operation: ['list', 'search'] } },
      },
      {
        displayName: 'Campaign IDs (comma-separated)',
        name: 'campaignIds',
        type: 'string',
        default: '',
        description: 'Filter by campaign IDs (leave empty for all)',
        displayOptions: { show: { resource: ['onebox'], operation: ['list', 'markAllRead'] } },
      },

      // ─── ONEBOX: Send ─────────────────────────────────────────────
      {
        displayName: 'From Email',
        name: 'fromEmail',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['onebox'], operation: ['send'] } },
      },
      {
        displayName: 'To Email',
        name: 'toEmail',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['onebox'], operation: ['send'] } },
      },
      {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['onebox'], operation: ['send'] } },
      },
      {
        displayName: 'Body (HTML)',
        name: 'body',
        type: 'string',
        typeOptions: { rows: 5 },
        default: '',
        displayOptions: { show: { resource: ['onebox'], operation: ['send'] } },
      },
      {
        displayName: 'Additional Fields',
        name: 'sendAdditionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['onebox'], operation: ['send'] } },
        options: [
          { displayName: 'CC', name: 'cc', type: 'string', default: '' },
          { displayName: 'BCC', name: 'bcc', type: 'string', default: '' },
          { displayName: 'In Reply To (Message ID)', name: 'inReplyTo', type: 'string', default: '' },
          { displayName: 'References', name: 'references', type: 'string', default: '' },
        ],
      },

      // ─── BLOCKLIST: Add ───────────────────────────────────────────
      {
        displayName: 'Emails (comma-separated)',
        name: 'emails',
        type: 'string',
        default: '',
        displayOptions: { show: { resource: ['blocklist'], operation: ['add'] } },
      },
      {
        displayName: 'Domains (comma-separated)',
        name: 'domains',
        type: 'string',
        default: '',
        displayOptions: { show: { resource: ['blocklist'], operation: ['add'] } },
      },
      {
        displayName: 'Keywords (comma-separated)',
        name: 'keywords',
        type: 'string',
        default: '',
        displayOptions: { show: { resource: ['blocklist'], operation: ['add'] } },
      },
      {
        displayName: 'Reply Keywords (comma-separated)',
        name: 'repliesKeywords',
        type: 'string',
        default: '',
        displayOptions: { show: { resource: ['blocklist'], operation: ['add'] } },
      },

      // ─── WEBHOOK: Subscribe ───────────────────────────────────────
      {
        displayName: 'Campaign ID',
        name: 'webhookCampaignId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['webhook'], operation: ['subscribe'] } },
      },
      {
        displayName: 'Event',
        name: 'webhookEvent',
        type: 'options',
        options: [
          { name: 'All Events', value: 'ALL_EVENTS' },
          { name: 'Email Sent', value: 'EMAIL_SENT' },
          { name: 'Email Opened', value: 'EMAIL_OPENED' },
          { name: 'Email Clicked', value: 'EMAIL_CLICKED' },
          { name: 'Reply Received', value: 'REPLY_RECEIVED' },
          { name: 'Email Bounced', value: 'EMAIL_BOUNCED' },
          { name: 'Lead Interested', value: 'LEAD_INTERESTED' },
          { name: 'Lead Not Interested', value: 'LEAD_NOT_INTERESTED' },
          { name: 'Campaign Completed', value: 'CAMPAIGN_COMPLETED' },
        ],
        default: 'ALL_EVENTS',
        displayOptions: { show: { resource: ['webhook'], operation: ['subscribe'] } },
      },
      {
        displayName: 'Callback URL',
        name: 'callbackUrl',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['webhook'], operation: ['subscribe'] } },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: IDataObject[] = [];
    const credentials = await this.getCredentials('reachInboxProxyApi');
    const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter('resource', i) as string;
      const operation = this.getNodeParameter('operation', i) as string;

      try {
        let result: IDataObject = {};

        // ─── CAMPAIGN ──────────────────────────────────────────────
        if (resource === 'campaign') {
          if (operation === 'getAll') {
            const limit = this.getNodeParameter('limit', i, 50) as number;
            const filter = this.getNodeParameter('filter', i, 'all') as string;
            const sort = this.getNodeParameter('sort', i, 'newest') as string;
            result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/campaign/list?limit=${limit}&filter=${filter}&sort=${sort}`);
          }
          else if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/create', { name });
          }
          else if (operation === 'start') {
            const campaignId = this.getNodeParameter('campaignId', i) as string;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/start', { campaignId: Number(campaignId) });
          }
          else if (operation === 'pause') {
            const campaignId = this.getNodeParameter('campaignId', i) as string;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/pause', { campaignId: Number(campaignId) });
          }
          else if (operation === 'update') {
            const campaignId = this.getNodeParameter('campaignId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/update', { campaignId: Number(campaignId), ...updateFields });
          }
          else if (operation === 'analytics') {
            const campaignId = this.getNodeParameter('campaignId', i) as string;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/analytics', { campaignId: Number(campaignId) });
          }
          else if (operation === 'totalAnalytics') {
            const startDate = this.getNodeParameter('startDate', i, '') as string;
            const endDate = this.getNodeParameter('endDate', i, '') as string;
            const qs = [startDate && `startDate=${startDate}`, endDate && `endDate=${endDate}`].filter(Boolean).join('&');
            result = await apiRequest.call(this, baseUrl, 'POST', `/api/v1/campaign/total-analytics${qs ? '?' + qs : ''}`, {});
          }
        }

        // ─── LEAD ──────────────────────────────────────────────────
        else if (resource === 'lead') {
          const campaignId = this.getNodeParameter('campaignId', i) as string;
          if (operation === 'add') {
            const leadsRaw = this.getNodeParameter('leads', i) as string | IDataObject[];
            const leads = typeof leadsRaw === 'string' ? JSON.parse(leadsRaw) : leadsRaw;
            const duplicates = this.getNodeParameter('duplicates', i, 'skip') as string;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads/add', { campaignId: Number(campaignId), leads, duplicates });
          }
          else if (operation === 'update') {
            const leadId = this.getNodeParameter('leadId', i) as string;
            const fields = this.getNodeParameter('leadUpdateFields', i, {}) as IDataObject;
            if (fields.attributes && typeof fields.attributes === 'string') fields.attributes = JSON.parse(fields.attributes as string);
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads/update', { campaignId: Number(campaignId), leadId, ...fields });
          }
          else if (operation === 'delete') {
            const leadIdsStr = this.getNodeParameter('leadIds', i, '') as string;
            const statusFilter = this.getNodeParameter('statusFilter', i, '') as string;
            const body: IDataObject = { campaignId: Number(campaignId) };
            if (leadIdsStr) body.leadIds = leadIdsStr.split(',').map((s) => s.trim());
            if (statusFilter) body.status = statusFilter;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads/delete', body);
          }
        }

        // ─── LEAD LIST ─────────────────────────────────────────────
        else if (resource === 'leadList') {
          if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads-list/create', { name });
          }
          else if (operation === 'getAll') {
            const limit = this.getNodeParameter('limit', i, 50) as number;
            const search = this.getNodeParameter('search', i, '') as string;
            result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/leads-list/all?limit=${limit}&contains=${search}`);
          }
          else if (operation === 'addLeads') {
            const listId = this.getNodeParameter('listId', i) as string;
            const leadsRaw = this.getNodeParameter('listLeads', i) as string | IDataObject[];
            const leads = typeof leadsRaw === 'string' ? JSON.parse(leadsRaw) : leadsRaw;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads-list/add-leads', { leadsListId: Number(listId), leads });
          }
        }

        // ─── ACCOUNT ───────────────────────────────────────────────
        else if (resource === 'account') {
          if (operation === 'getAll') {
            const limit = this.getNodeParameter('limit', i, 50) as number;
            const status = this.getNodeParameter('status', i, 'all') as string;
            result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/account/list?limit=${limit}&status=${status}&sortField=created_at&order=DESC`);
          }
          else if (operation === 'warmupAnalytics') {
            result = await apiRequest.call(this, baseUrl, 'GET', '/api/v1/account/warmup-analytics');
          }
        }

        // ─── ANALYTICS ─────────────────────────────────────────────
        else if (resource === 'analytics') {
          if (operation === 'campaign') {
            const campaignId = this.getNodeParameter('campaignId', i) as string;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/analytics', { campaignId: Number(campaignId) });
          }
          else if (operation === 'total') {
            const startDate = this.getNodeParameter('startDate', i, '') as string;
            const endDate = this.getNodeParameter('endDate', i, '') as string;
            const qs = [startDate && `startDate=${startDate}`, endDate && `endDate=${endDate}`].filter(Boolean).join('&');
            result = await apiRequest.call(this, baseUrl, 'POST', `/api/v1/campaign/total-analytics${qs ? '?' + qs : ''}`, {});
          }
        }

        // ─── ONEBOX ────────────────────────────────────────────────
        else if (resource === 'onebox') {
          if (operation === 'list') {
            const limit = this.getNodeParameter('limit', i, 50) as number;
            const offset = this.getNodeParameter('offset', i, 0) as number;
            const inbox = this.getNodeParameter('inbox', i, 'Inbox') as string;
            const status = this.getNodeParameter('statusFilter', i, 'All') as string;
            const q = this.getNodeParameter('searchQuery', i, '') as string;
            const campaignIdsStr = this.getNodeParameter('campaignIds', i, '') as string;
            const campaigns = campaignIdsStr ? campaignIdsStr.split(',').map((s) => Number(s.trim())) : [];
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/onebox/list', { limit, offset, status, inbox, campaigns, q });
          }
          else if (operation === 'send') {
            const from = this.getNodeParameter('fromEmail', i) as string;
            const to = this.getNodeParameter('toEmail', i) as string;
            const subject = this.getNodeParameter('subject', i) as string;
            const body = this.getNodeParameter('body', i, '') as string;
            const extra = this.getNodeParameter('sendAdditionalFields', i, {}) as IDataObject;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/onebox/send', { emaildata: JSON.stringify({ from, to, subject, body, ...extra }) });
          }
          else if (operation === 'markAllRead') {
            const campaignIdsStr = this.getNodeParameter('campaignIds', i, '') as string;
            const campaigns = campaignIdsStr ? campaignIdsStr.split(',').map((s) => Number(s.trim())) : [];
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/onebox/mark-all-read', { campaigns });
          }
          else if (operation === 'unreadCount') {
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/onebox/unread-count', {});
          }
          else if (operation === 'search') {
            const q = this.getNodeParameter('searchQuery', i, '') as string;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/onebox/liveInbox/unifiedSearch', { q });
          }
        }

        // ─── BLOCKLIST ─────────────────────────────────────────────
        else if (resource === 'blocklist') {
          if (operation === 'add') {
            const emailsStr = this.getNodeParameter('emails', i, '') as string;
            const domainsStr = this.getNodeParameter('domains', i, '') as string;
            const keywordsStr = this.getNodeParameter('keywords', i, '') as string;
            const repliesStr = this.getNodeParameter('repliesKeywords', i, '') as string;
            const body: IDataObject = {};
            if (emailsStr) body.emails = emailsStr.split(',').map((s) => s.trim());
            if (domainsStr) body.domains = domainsStr.split(',').map((s) => s.trim());
            if (keywordsStr) body.keywords = keywordsStr.split(',').map((s) => s.trim());
            if (repliesStr) body.repliesKeywords = repliesStr.split(',').map((s) => s.trim());
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads/block-list', body);
          }
        }

        // ─── TAG ───────────────────────────────────────────────────
        else if (resource === 'tag') {
          if (operation === 'getAll') {
            result = await apiRequest.call(this, baseUrl, 'GET', '/api/v1/others/listAllTags');
          }
        }

        // ─── WEBHOOK ───────────────────────────────────────────────
        else if (resource === 'webhook') {
          if (operation === 'getAll') {
            result = await apiRequest.call(this, baseUrl, 'GET', '/api/v1/webhook/list-all');
          }
          else if (operation === 'subscribe') {
            const campaignId = this.getNodeParameter('webhookCampaignId', i) as string;
            const event = this.getNodeParameter('webhookEvent', i) as string;
            const callbackUrl = this.getNodeParameter('callbackUrl', i) as string;
            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/webhook/subscribe', {
              campaignId: Number(campaignId),
              event,
              callbackUrl,
              allCampaigns: false,
            });
          }
        }

        returnData.push(result);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: (error as Error).message });
          continue;
        }
        throw error;
      }
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}

async function apiRequest(
  this: IExecuteFunctions,
  baseUrl: string,
  method: string,
  path: string,
  body?: IDataObject,
): Promise<IDataObject> {
  const url = `${baseUrl}${path}`;
  const options: any = {
    method,
    url,
    headers: { 'Content-Type': 'application/json' },
    json: true,
  };
  if (body && Object.keys(body).length > 0) options.body = body;

  const response = await this.helpers.request(options);
  return response as IDataObject;
}
