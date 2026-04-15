"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReachInbox = void 0;
class ReachInbox {
    constructor() {
        this.description = {
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
                        { name: 'Sequence', value: 'sequence' },
                        { name: 'Subsequence', value: 'subsequence' },
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
                        { name: 'Delete', value: 'delete', description: 'Delete a campaign', action: 'Delete a campaign' },
                        { name: 'Get All', value: 'getAll', description: 'Get all campaigns', action: 'Get all campaigns' },
                        { name: 'Get Details', value: 'details', description: 'Get a campaign with its subsequences', action: 'Get campaign details' },
                        { name: 'Get Options', value: 'options', description: 'Get campaign configuration options', action: 'Get campaign options' },
                        { name: 'Get Schedule', value: 'schedule', description: 'Get campaign schedule details', action: 'Get campaign schedule' },
                        { name: 'List Accounts', value: 'listAccounts', description: 'List accounts attached to the campaign', action: 'List campaign accounts' },
                        { name: 'List Account Errors', value: 'listAccountErrors', description: 'List account errors for the campaign', action: 'List campaign account errors' },
                        { name: 'Start', value: 'start', description: 'Start a campaign', action: 'Start a campaign' },
                        { name: 'Pause', value: 'pause', description: 'Pause a campaign', action: 'Pause a campaign' },
                        { name: 'Update', value: 'update', description: 'Update campaign settings', action: 'Update a campaign' },
                        { name: 'Get Analytics', value: 'analytics', description: 'Get campaign analytics', action: 'Get campaign analytics' },
                        { name: 'Get Total Analytics', value: 'totalAnalytics', description: 'Get total analytics summary', action: 'Get total analytics' },
                    ],
                    default: 'getAll',
                },
                // ═══════════════════════════════════════════════════════════════
                // SEQUENCE OPERATIONS
                // ═══════════════════════════════════════════════════════════════
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: { show: { resource: ['sequence'] } },
                    options: [
                        { name: 'Get', value: 'get', description: 'Get campaign sequences', action: 'Get campaign sequences' },
                        { name: 'Save', value: 'save', description: 'Save campaign sequences', action: 'Save campaign sequences' },
                    ],
                    default: 'get',
                },
                // ═══════════════════════════════════════════════════════════════
                // SUBSEQUENCE OPERATIONS
                // ═══════════════════════════════════════════════════════════════
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: { show: { resource: ['subsequence'] } },
                    options: [
                        { name: 'List', value: 'list', description: 'List subsequences for a campaign', action: 'List subsequences' },
                        { name: 'Get Details', value: 'details', description: 'Get subsequence details', action: 'Get subsequence details' },
                        { name: 'Create', value: 'create', description: 'Create a subsequence', action: 'Create a subsequence' },
                        { name: 'Update', value: 'update', description: 'Update a subsequence', action: 'Update a subsequence' },
                    ],
                    default: 'list',
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
                        { name: 'Get', value: 'get', description: 'Get a single lead by email', action: 'Get a lead' },
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
                        { name: 'Update', value: 'update', description: 'Rename or update a lead list', action: 'Update lead list' },
                        { name: 'Get All', value: 'getAll', description: 'Get all lead lists', action: 'Get all lead lists' },
                        { name: 'Get Leads', value: 'getLeads', description: 'Get leads in a list', action: 'Get leads in list' },
                        { name: 'Add Leads', value: 'addLeads', description: 'Add leads to a list', action: 'Add leads to list' },
                        { name: 'Add To Campaign', value: 'addToCampaign', description: 'Add all leads from a list to a campaign', action: 'Add lead list to campaign' },
                        { name: 'Delete', value: 'delete', description: 'Delete a lead list', action: 'Delete lead list' },
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
                        { name: 'Get', value: 'get', description: 'Get blocklist entries', action: 'Get blocklist' },
                        { name: 'Delete', value: 'delete', description: 'Remove entries from blocklist', action: 'Delete from blocklist' },
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
                        { name: 'Unsubscribe', value: 'unsubscribe', description: 'Unsubscribe from a webhook', action: 'Unsubscribe webhook' },
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
                            operation: ['details', 'options', 'schedule', 'listAccounts', 'listAccountErrors', 'start', 'pause', 'update', 'analytics'],
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
                            operation: ['add', 'get', 'update', 'delete'],
                        },
                    },
                },
                // ─── LEAD: Get ────────────────────────────────────────────────
                {
                    displayName: 'Lead Email',
                    name: 'leadEmail',
                    type: 'string',
                    required: true,
                    default: '',
                    description: 'Email address of the lead to retrieve',
                    displayOptions: { show: { resource: ['lead'], operation: ['get'] } },
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
                // ─── CAMPAIGN: Details/Diagnostics ───────────────────────────
                {
                    displayName: 'Account Limit',
                    name: 'campaignAccountLimit',
                    type: 'number',
                    default: 5,
                    displayOptions: { show: { resource: ['campaign'], operation: ['listAccounts', 'listAccountErrors'] } },
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
                // ─── SEQUENCE ────────────────────────────────────────────────
                {
                    displayName: 'Campaign ID',
                    name: 'campaignId',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { resource: ['sequence'], operation: ['get', 'save'] } },
                },
                {
                    displayName: 'Sequences',
                    name: 'sequences',
                    type: 'json',
                    required: true,
                    default: '[{"steps":[]}]',
                    description: 'Full sequence payload as returned by ReachInbox',
                    displayOptions: { show: { resource: ['sequence'], operation: ['save'] } },
                },
                {
                    displayName: 'Core Variables',
                    name: 'coreVariables',
                    type: 'json',
                    default: '[]',
                    description: 'Optional core variables payload',
                    displayOptions: { show: { resource: ['sequence'], operation: ['save'] } },
                },
                // ─── SUBSEQUENCE ─────────────────────────────────────────────
                {
                    displayName: 'Campaign ID',
                    name: 'campaignId',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { resource: ['subsequence'], operation: ['list', 'create'] } },
                },
                {
                    displayName: 'Subsequence ID',
                    name: 'subsequenceId',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { resource: ['subsequence'], operation: ['details', 'update'] } },
                },
                {
                    displayName: 'Name',
                    name: 'name',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { resource: ['subsequence'], operation: ['create', 'update'] } },
                },
                {
                    displayName: 'Subject',
                    name: 'subject',
                    type: 'string',
                    default: '',
                    displayOptions: { show: { resource: ['subsequence'], operation: ['create', 'update'] } },
                },
                {
                    displayName: 'Body',
                    name: 'body',
                    type: 'string',
                    typeOptions: { rows: 6 },
                    default: '',
                    displayOptions: { show: { resource: ['subsequence'], operation: ['create', 'update'] } },
                },
                {
                    displayName: 'Additional Fields',
                    name: 'subsequenceAdditionalFields',
                    type: 'collection',
                    placeholder: 'Add Field',
                    default: {},
                    displayOptions: { show: { resource: ['subsequence'], operation: ['create', 'update'] } },
                    options: [
                        { displayName: 'Lead Status Condition', name: 'leadStatusCondition', type: 'string', default: '' },
                        { displayName: 'Lead Activity Condition', name: 'leadActivityCondition', type: 'string', default: '' },
                        { displayName: 'Lead Reply Text', name: 'leadReplyText', type: 'string', default: '' },
                        { displayName: 'Lead Reply Context', name: 'leadReplyContext', type: 'string', default: '' },
                    ],
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
                    displayOptions: { show: { resource: ['leadList'], operation: ['create', 'update'] } },
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
                {
                    displayName: 'Fetch Limit',
                    name: 'leadListLimit',
                    type: 'number',
                    default: 50,
                    typeOptions: { minValue: 1 },
                    description: 'Number of leads to fetch per request',
                    displayOptions: { show: { resource: ['leadList'], operation: ['getLeads', 'addToCampaign'] } },
                },
                {
                    displayName: 'Offset',
                    name: 'leadListOffset',
                    type: 'number',
                    default: 0,
                    typeOptions: { minValue: 0 },
                    displayOptions: { show: { resource: ['leadList'], operation: ['getLeads'] } },
                },
                {
                    displayName: 'Return All',
                    name: 'leadListReturnAll',
                    type: 'boolean',
                    default: true,
                    description: 'Whether to fetch every lead in the list',
                    displayOptions: { show: { resource: ['leadList'], operation: ['getLeads'] } },
                },
                {
                    displayName: 'Max Leads',
                    name: 'leadListMaxLeads',
                    type: 'number',
                    default: 100,
                    typeOptions: { minValue: 1 },
                    description: 'Maximum number of leads to return when Return All is off',
                    displayOptions: { show: { resource: ['leadList'], operation: ['getLeads'], leadListReturnAll: [false] } },
                },
                // ─── LEAD LIST: Add Leads ─────────────────────────────────────
                {
                    displayName: 'List ID',
                    name: 'listId',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { resource: ['leadList'], operation: ['addLeads', 'getLeads', 'addToCampaign', 'update', 'delete'] } },
                },
                {
                    displayName: 'Leads (JSON)',
                    name: 'listLeads',
                    type: 'json',
                    required: true,
                    default: '[{"email":"example@domain.com","firstName":"John","lastName":"Doe"}]',
                    displayOptions: { show: { resource: ['leadList'], operation: ['addLeads'] } },
                },
                {
                    displayName: 'Campaign ID',
                    name: 'targetCampaignId',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { resource: ['leadList'], operation: ['addToCampaign'] } },
                },
                {
                    displayName: 'Duplicates',
                    name: 'leadListDuplicates',
                    type: 'options',
                    options: [
                        { name: 'Skip', value: 'skip' },
                        { name: 'Update', value: 'update' },
                        { name: 'Add', value: 'add' },
                        { name: 'Error', value: 'error' },
                    ],
                    default: 'skip',
                    displayOptions: { show: { resource: ['leadList'], operation: ['addToCampaign'] } },
                },
                {
                    displayName: 'Last Lead',
                    name: 'lastLead',
                    type: 'boolean',
                    default: false,
                    description: 'Whether to request the final page cursor variant used by ReachInbox',
                    displayOptions: { show: { resource: ['leadList'], operation: ['getLeads', 'addToCampaign'] } },
                },
                // ─── LEAD LIST: Delete ────────────────────────────────────────
                {
                    displayName: 'List ID',
                    name: 'listId',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { resource: ['leadList'], operation: ['delete'] } },
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
                // ─── BLOCKLIST: Get ───────────────────────────────────────────
                {
                    displayName: 'Table',
                    name: 'blocklistTable',
                    type: 'options',
                    options: [
                        { name: 'All', value: '' },
                        { name: 'Emails', value: 'emails' },
                        { name: 'Domains', value: 'domains' },
                        { name: 'Keywords', value: 'keywords' },
                        { name: 'Reply Keywords', value: 'repliesKeywords' },
                    ],
                    default: '',
                    displayOptions: { show: { resource: ['blocklist'], operation: ['get', 'delete'] } },
                },
                {
                    displayName: 'IDs / Values to Delete (comma-separated)',
                    name: 'blocklistIds',
                    type: 'string',
                    default: '',
                    description: 'Email addresses, domains, or keywords to remove',
                    displayOptions: { show: { resource: ['blocklist'], operation: ['delete'] } },
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
                // ─── WEBHOOK: Unsubscribe ─────────────────────────────────────
                {
                    displayName: 'Webhook ID',
                    name: 'webhookId',
                    type: 'string',
                    required: true,
                    default: '',
                    description: 'ID of the webhook subscription to remove (from Get All output)',
                    displayOptions: { show: { resource: ['webhook'], operation: ['unsubscribe'] } },
                },
            ],
        };
    }
    async execute() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('reachInboxProxyApi');
        const baseUrl = credentials.baseUrl.replace(/\/$/, '');
        for (let i = 0; i < items.length; i++) {
            const resource = this.getNodeParameter('resource', i);
            const operation = this.getNodeParameter('operation', i);
            try {
                let result = {};
                // ─── CAMPAIGN ──────────────────────────────────────────────
                if (resource === 'campaign') {
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', i, 50);
                        const filter = this.getNodeParameter('filter', i, 'all');
                        const sort = this.getNodeParameter('sort', i, 'newest');
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/campaign/list?limit=${limit}&filter=${filter}&sort=${sort}`);
                    }
                    else if (operation === 'details') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/campaign/details?campaignId=${Number(campaignId)}`);
                    }
                    else if (operation === 'options') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/campaign/options?campaignId=${Number(campaignId)}`);
                    }
                    else if (operation === 'schedule') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/campaign/schedule?campaignId=${Number(campaignId)}`);
                    }
                    else if (operation === 'listAccounts') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        const limit = this.getNodeParameter('campaignAccountLimit', i, 5);
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/campaign/list-accounts?campaignId=${Number(campaignId)}&limit=${limit}`);
                    }
                    else if (operation === 'listAccountErrors') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        const limit = this.getNodeParameter('campaignAccountLimit', i, 5);
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/campaign/list-accounts-errors?campaignId=${Number(campaignId)}&limit=${limit}`);
                    }
                    else if (operation === 'create') {
                        const name = this.getNodeParameter('name', i);
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/create', { name });
                    }
                    else if (operation === 'start') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/start', { campaignId: Number(campaignId) });
                    }
                    else if (operation === 'pause') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/pause', { campaignId: Number(campaignId) });
                    }
                    else if (operation === 'update') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        const updateFields = this.getNodeParameter('updateFields', i, {});
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/update', { campaignId: Number(campaignId), ...updateFields });
                    }
                    else if (operation === 'delete') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        result = await apiRequest.call(this, baseUrl, 'DELETE', `/api/v1/campaign/delete?campaignId=${Number(campaignId)}`);
                    }
                    else if (operation === 'analytics') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/analytics', { campaignId: Number(campaignId) });
                    }
                    else if (operation === 'totalAnalytics') {
                        const startDate = this.getNodeParameter('startDate', i, '');
                        const endDate = this.getNodeParameter('endDate', i, '');
                        const qs = [startDate && `startDate=${startDate}`, endDate && `endDate=${endDate}`].filter(Boolean).join('&');
                        result = await apiRequest.call(this, baseUrl, 'POST', `/api/v1/campaign/total-analytics${qs ? '?' + qs : ''}`, {});
                    }
                }
                // ─── SEQUENCE ──────────────────────────────────────────────
                else if (resource === 'sequence') {
                    if (operation === 'get') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/campaign/sequences?campaignId=${Number(campaignId)}`);
                    }
                    else if (operation === 'save') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        const sequences = this.getNodeParameter('sequences', i);
                        const coreVariables = this.getNodeParameter('coreVariables', i, []);
                        const payload = {
                            campaignId: String(campaignId),
                            sequences,
                        };
                        if (coreVariables && (Array.isArray(coreVariables) ? coreVariables.length > 0 : Object.keys(coreVariables).length > 0)) {
                            payload.coreVariables = coreVariables;
                        }
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/sequences/add', payload);
                    }
                }
                // ─── SUBSEQUENCE ────────────────────────────────────────────
                else if (resource === 'subsequence') {
                    if (operation === 'list') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/subsequence/list?campaignId=${Number(campaignId)}`);
                    }
                    else if (operation === 'details') {
                        const subsequenceId = this.getNodeParameter('subsequenceId', i);
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/subsequence/details?subsequenceId=${Number(subsequenceId)}`);
                    }
                    else if (operation === 'create') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        const name = this.getNodeParameter('name', i);
                        const subject = this.getNodeParameter('subject', i, '');
                        const body = this.getNodeParameter('body', i, '');
                        const extra = this.getNodeParameter('subsequenceAdditionalFields', i, {});
                        const payload = { campaignId: Number(campaignId), name, subject, body, ...extra };
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/subsequence/create', payload);
                    }
                    else if (operation === 'update') {
                        const subsequenceId = this.getNodeParameter('subsequenceId', i);
                        const name = this.getNodeParameter('name', i);
                        const subject = this.getNodeParameter('subject', i, '');
                        const body = this.getNodeParameter('body', i, '');
                        const extra = this.getNodeParameter('subsequenceAdditionalFields', i, {});
                        const payload = { subsequenceId: Number(subsequenceId), name, subject, body, ...extra };
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/subsequence/update', payload);
                    }
                }
                // ─── LEAD ──────────────────────────────────────────────────
                else if (resource === 'lead') {
                    const campaignId = this.getNodeParameter('campaignId', i);
                    if (operation === 'add') {
                        const leadsRaw = this.getNodeParameter('leads', i);
                        const leads = typeof leadsRaw === 'string' ? JSON.parse(leadsRaw) : leadsRaw;
                        const duplicates = this.getNodeParameter('duplicates', i, 'skip');
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads/add', { campaignId: Number(campaignId), leads, duplicates });
                    }
                    else if (operation === 'get') {
                        const leadEmail = this.getNodeParameter('leadEmail', i);
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/leads/get?campaignId=${Number(campaignId)}&email=${encodeURIComponent(leadEmail)}`);
                    }
                    else if (operation === 'update') {
                        const leadId = this.getNodeParameter('leadId', i);
                        const fields = this.getNodeParameter('leadUpdateFields', i, {});
                        if (fields.attributes && typeof fields.attributes === 'string')
                            fields.attributes = JSON.parse(fields.attributes);
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads/update', { campaignId: Number(campaignId), leadId, ...fields });
                    }
                    else if (operation === 'delete') {
                        const leadIdsStr = this.getNodeParameter('leadIds', i, '');
                        const statusFilter = this.getNodeParameter('statusFilter', i, '');
                        const body = { campaignId: Number(campaignId) };
                        if (leadIdsStr)
                            body.leadIds = leadIdsStr.split(',').map((s) => s.trim());
                        if (statusFilter)
                            body.status = statusFilter;
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads/delete', body);
                    }
                }
                // ─── LEAD LIST ─────────────────────────────────────────────
                else if (resource === 'leadList') {
                    if (operation === 'create') {
                        const name = this.getNodeParameter('name', i);
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads-list/create', { name });
                    }
                    else if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', i, 50);
                        const search = this.getNodeParameter('search', i, '');
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/leads-list/all?limit=${limit}&contains=${search}`);
                    }
                    else if (operation === 'addLeads') {
                        const listId = this.getNodeParameter('listId', i);
                        const leadsRaw = this.getNodeParameter('listLeads', i);
                        const leads = typeof leadsRaw === 'string' ? JSON.parse(leadsRaw) : leadsRaw;
                        const normalizedLeads = leads.map((lead) => normalizeLeadForImport(lead));
                        const newCoreVariables = [...new Set(normalizedLeads.flatMap((lead) => Object.keys(lead).filter((key) => key !== 'email')))];
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads-list/add-leads', {
                            leadsListId: Number(listId),
                            leads: normalizedLeads,
                            newCoreVariables,
                            duplicates: [],
                        });
                    }
                    else if (operation === 'getLeads') {
                        const listId = this.getNodeParameter('listId', i);
                        const limit = this.getNodeParameter('leadListLimit', i, 50);
                        const offset = this.getNodeParameter('leadListOffset', i, 0);
                        const returnAll = this.getNodeParameter('leadListReturnAll', i, true);
                        const maxLeads = this.getNodeParameter('leadListMaxLeads', i, 100);
                        const lastLead = this.getNodeParameter('lastLead', i, false);
                        result = await fetchLeadListLeads.call(this, baseUrl, {
                            listId: Number(listId),
                            limit,
                            offset,
                            returnAll,
                            maxLeads,
                            lastLead,
                        });
                    }
                    else if (operation === 'addToCampaign') {
                        const listId = this.getNodeParameter('listId', i);
                        const campaignId = this.getNodeParameter('targetCampaignId', i);
                        const leadListId = Number(listId);
                        const targetCampaignId = Number(campaignId);
                        try {
                            result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/lead-list/copy-leads-to-campaign', {
                                campaignId: targetCampaignId,
                                leadsListId: leadListId,
                            });
                        }
                        catch (error) {
                            const statusCode = (_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) !== null && _b !== void 0 ? _b : error === null || error === void 0 ? void 0 : error.statusCode) !== null && _c !== void 0 ? _c : (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.status;
                            if (statusCode !== 404) {
                                throw error;
                            }
                            try {
                                result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/leads-list/copy-leads-to-campaign', {
                                    campaignId: targetCampaignId,
                                    leadsListId: leadListId,
                                });
                            }
                            catch (pluralError) {
                                const pluralStatusCode = (_g = (_f = (_e = pluralError === null || pluralError === void 0 ? void 0 : pluralError.response) === null || _e === void 0 ? void 0 : _e.statusCode) !== null && _f !== void 0 ? _f : pluralError === null || pluralError === void 0 ? void 0 : pluralError.statusCode) !== null && _g !== void 0 ? _g : (_h = pluralError === null || pluralError === void 0 ? void 0 : pluralError.response) === null || _h === void 0 ? void 0 : _h.status;
                                if (pluralStatusCode !== 404) {
                                    throw pluralError;
                                }
                                const leadListResponse = await fetchLeadListLeads.call(this, baseUrl, {
                                    listId: leadListId,
                                    limit: 100,
                                    offset: 0,
                                    returnAll: true,
                                    maxLeads: Number.POSITIVE_INFINITY,
                                    lastLead: false,
                                });
                                const rows = Array.isArray((_j = leadListResponse.data) === null || _j === void 0 ? void 0 : _j.rows)
                                    ? leadListResponse.data.rows
                                    : [];
                                const uniqueEmails = [...new Set(rows
                                        .map((lead) => { var _a, _b, _c; return String(((_c = (_a = lead.email) !== null && _a !== void 0 ? _a : (_b = lead.attributes) === null || _b === void 0 ? void 0 : _b.email) !== null && _c !== void 0 ? _c : '')).trim().toLowerCase(); })
                                        .filter((email) => email.includes('@')))];
                                if (!uniqueEmails.length) {
                                    result = {
                                        status: 200,
                                        message: 'No valid emails found in lead list to add to campaign.',
                                        data: [],
                                    };
                                }
                                else {
                                    const batchSize = 100;
                                    const responses = [];
                                    for (let emailIndex = 0; emailIndex < uniqueEmails.length; emailIndex += batchSize) {
                                        const emails = uniqueEmails.slice(emailIndex, emailIndex + batchSize);
                                        const response = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaigns/add-email', {
                                            campaignId: targetCampaignId,
                                            emails,
                                        });
                                        responses.push(response);
                                    }
                                    result = {
                                        status: 200,
                                        message: 'Added lead list emails to campaign using add-email fallback.',
                                        data: {
                                            leadsListId: leadListId,
                                            campaignId: targetCampaignId,
                                            totalEmails: uniqueEmails.length,
                                            batches: responses.length,
                                            responses,
                                        },
                                    };
                                }
                            }
                        }
                    }
                    else if (operation === 'update') {
                        const listId = this.getNodeParameter('listId', i);
                        const name = this.getNodeParameter('name', i);
                        result = await apiRequest.call(this, baseUrl, 'PUT', '/api/v1/leads-list/update', {
                            leadsListId: Number(listId),
                            name,
                        });
                    }
                    else if (operation === 'delete') {
                        const listId = this.getNodeParameter('listId', i);
                        result = await apiRequest.call(this, baseUrl, 'DELETE', `/api/v1/leads-list/delete?leadsListId=${Number(listId)}`);
                    }
                }
                // ─── ACCOUNT ───────────────────────────────────────────────
                else if (resource === 'account') {
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', i, 50);
                        const status = this.getNodeParameter('status', i, 'all');
                        result = await apiRequest.call(this, baseUrl, 'GET', `/api/v1/account/list?limit=${limit}&status=${status}&sortField=created_at&order=DESC`);
                    }
                    else if (operation === 'warmupAnalytics') {
                        result = await apiRequest.call(this, baseUrl, 'GET', '/api/v1/account/warmup-analytics');
                    }
                }
                // ─── ANALYTICS ─────────────────────────────────────────────
                else if (resource === 'analytics') {
                    if (operation === 'campaign') {
                        const campaignId = this.getNodeParameter('campaignId', i);
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/campaign/analytics', { campaignId: Number(campaignId) });
                    }
                    else if (operation === 'total') {
                        const startDate = this.getNodeParameter('startDate', i, '');
                        const endDate = this.getNodeParameter('endDate', i, '');
                        const qs = [startDate && `startDate=${startDate}`, endDate && `endDate=${endDate}`].filter(Boolean).join('&');
                        result = await apiRequest.call(this, baseUrl, 'POST', `/api/v1/campaign/total-analytics${qs ? '?' + qs : ''}`, {});
                    }
                }
                // ─── ONEBOX ────────────────────────────────────────────────
                else if (resource === 'onebox') {
                    if (operation === 'list') {
                        const limit = this.getNodeParameter('limit', i, 50);
                        const offset = this.getNodeParameter('offset', i, 0);
                        const inbox = this.getNodeParameter('inbox', i, 'Inbox');
                        const status = this.getNodeParameter('statusFilter', i, 'All');
                        const q = this.getNodeParameter('searchQuery', i, '');
                        const campaignIdsStr = this.getNodeParameter('campaignIds', i, '');
                        const campaigns = campaignIdsStr ? campaignIdsStr.split(',').map((s) => Number(s.trim())) : [];
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/onebox/list', { limit, offset, status, inbox, campaigns, q });
                    }
                    else if (operation === 'send') {
                        const from = this.getNodeParameter('fromEmail', i);
                        const to = this.getNodeParameter('toEmail', i);
                        const subject = this.getNodeParameter('subject', i);
                        const body = this.getNodeParameter('body', i, '');
                        const extra = this.getNodeParameter('sendAdditionalFields', i, {});
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/onebox/send', { emaildata: JSON.stringify({ from, to, subject, body, ...extra }) });
                    }
                    else if (operation === 'markAllRead') {
                        const campaignIdsStr = this.getNodeParameter('campaignIds', i, '');
                        const campaigns = campaignIdsStr ? campaignIdsStr.split(',').map((s) => Number(s.trim())) : [];
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/onebox/mark-all-read', { campaigns });
                    }
                    else if (operation === 'unreadCount') {
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/onebox/unread-count', {});
                    }
                    else if (operation === 'search') {
                        const q = this.getNodeParameter('searchQuery', i, '');
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/onebox/liveInbox/unifiedSearch', { q });
                    }
                }
                // ─── BLOCKLIST ─────────────────────────────────────────────
                else if (resource === 'blocklist') {
                    if (operation === 'add') {
                        const emailsStr = this.getNodeParameter('emails', i, '');
                        const domainsStr = this.getNodeParameter('domains', i, '');
                        const keywordsStr = this.getNodeParameter('keywords', i, '');
                        const repliesStr = this.getNodeParameter('repliesKeywords', i, '');
                        const body = {};
                        if (emailsStr)
                            body.emails = emailsStr.split(',').map((s) => s.trim());
                        if (domainsStr)
                            body.domains = domainsStr.split(',').map((s) => s.trim());
                        if (keywordsStr)
                            body.keywords = keywordsStr.split(',').map((s) => s.trim());
                        if (repliesStr)
                            body.repliesKeywords = repliesStr.split(',').map((s) => s.trim());
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/blocklist/add', body);
                    }
                    else if (operation === 'get') {
                        const table = this.getNodeParameter('blocklistTable', i, '');
                        const path = table ? `/api/v1/blocklist/${table}` : '/api/v1/blocklist';
                        result = await apiRequest.call(this, baseUrl, 'GET', path);
                    }
                    else if (operation === 'delete') {
                        const table = this.getNodeParameter('blocklistTable', i, '');
                        const idsStr = this.getNodeParameter('blocklistIds', i, '');
                        const ids = idsStr.split(',').map((s) => s.trim()).filter(Boolean);
                        result = await apiRequest.call(this, baseUrl, 'DELETE', `/api/v1/blocklist/${table}`, { ids });
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
                        const campaignId = this.getNodeParameter('webhookCampaignId', i);
                        const event = this.getNodeParameter('webhookEvent', i);
                        const callbackUrl = this.getNodeParameter('callbackUrl', i);
                        result = await apiRequest.call(this, baseUrl, 'POST', '/api/v1/webhook/subscribe', {
                            campaignId: Number(campaignId),
                            event,
                            callbackUrl,
                            allCampaigns: false,
                        });
                    }
                    else if (operation === 'unsubscribe') {
                        const webhookId = this.getNodeParameter('webhookId', i);
                        result = await apiRequest.call(this, baseUrl, 'DELETE', `/api/v1/webhook/unsubscribe/${webhookId}`);
                    }
                }
                returnData.push(result);
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ error: error.message });
                    continue;
                }
                throw error;
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}
exports.ReachInbox = ReachInbox;
async function apiRequest(baseUrl, method, path, body) {
    const url = `${baseUrl}${path}`;
    const options = {
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        json: true,
    };
    if (body && Object.keys(body).length > 0)
        options.body = body;
    const response = await this.helpers.request(options);
    return response;
}
function normalizeLeadForImport(lead) {
    const normalizedLead = {};
    const ignoredKeys = new Set([
        'id',
        'leadsListId',
        'leadFinderId',
        'validationStatus',
        'createdAt',
        'updatedAt',
        'deletedAt',
    ]);
    for (const [key, value] of Object.entries(lead)) {
        if (ignoredKeys.has(key))
            continue;
        if (key === 'attributes' && value && typeof value === 'object' && !Array.isArray(value)) {
            for (const [attributeKey, attributeValue] of Object.entries(value)) {
                if (attributeValue !== undefined && attributeValue !== null && attributeValue !== '') {
                    normalizedLead[attributeKey] = attributeValue;
                }
            }
            continue;
        }
        if (value !== undefined && value !== null && value !== '') {
            normalizedLead[key] = value;
        }
    }
    return normalizedLead;
}
async function fetchLeadListLeads(baseUrl, options) {
    var _a, _b;
    const rows = [];
    let analytics = {};
    let currentOffset = options.offset;
    const pageSize = Math.max(1, options.limit);
    const targetCount = options.returnAll ? Number.POSITIVE_INFINITY : Math.max(1, options.maxLeads);
    while (rows.length < targetCount) {
        const path = `/api/v1/leads-list/all-leads?leadsListId=${options.listId}&lastLead=${options.lastLead ? 'true' : 'false'}&limit=${pageSize}&offset=${currentOffset}`;
        const response = await apiRequest.call(this, baseUrl, 'GET', path);
        const data = ((_a = response.data) !== null && _a !== void 0 ? _a : {});
        const pageRows = Array.isArray(data.rows) ? data.rows : [];
        analytics = ((_b = data.analytics) !== null && _b !== void 0 ? _b : {});
        rows.push(...pageRows);
        if (!options.returnAll) {
            break;
        }
        if (pageRows.length < pageSize) {
            break;
        }
        currentOffset += pageRows.length;
    }
    const slicedRows = rows.slice(0, targetCount);
    return {
        status: 200,
        message: 'Lead list leads',
        data: {
            analytics,
            rows: slicedRows,
            count: slicedRows.length,
            leadsListId: options.listId,
        },
    };
}
//# sourceMappingURL=ReachInbox.node.js.map