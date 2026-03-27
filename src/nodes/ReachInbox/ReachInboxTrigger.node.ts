import {
  IHookFunctions,
  IWebhookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
  IDataObject,
} from 'n8n-workflow';

export class ReachInboxTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'ReachInbox Trigger',
    name: 'reachInboxTrigger',
    icon: 'file:reachinbox.svg',
    group: ['trigger'],
    version: 1,
    description: 'Triggers on ReachInbox events via webhook',
    defaults: { name: 'ReachInbox Trigger' },
    inputs: [],
    outputs: ['main'],
    credentials: [{ name: 'reachInboxProxyApi', required: true }],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'reachinbox',
      },
    ],
    properties: [
      {
        displayName: 'Campaign ID',
        name: 'campaignId',
        type: 'string',
        required: true,
        default: '',
        description: 'Campaign ID to listen for events. Use 0 for all campaigns.',
      },
      {
        displayName: 'Event',
        name: 'event',
        type: 'options',
        required: true,
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
      },
    ],
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const credentials = await this.getCredentials('reachInboxProxyApi');
        const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
        const webhookUrl = this.getNodeWebhookUrl('default');
        const campaignId = this.getNodeParameter('campaignId') as string;
        const event = this.getNodeParameter('event') as string;

        try {
          const response: any = await this.helpers.request({
            method: 'GET',
            url: `${baseUrl}/api/v1/webhook/list-all`,
            json: true,
          });
          const hooks: any[] = response?.data || [];
          return hooks.some(
            (h) =>
              h.callbackUrl === webhookUrl &&
              h.event === event &&
              String(h.campaignId) === String(campaignId),
          );
        } catch {
          return false;
        }
      },

      async create(this: IHookFunctions): Promise<boolean> {
        const credentials = await this.getCredentials('reachInboxProxyApi');
        const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
        const webhookUrl = this.getNodeWebhookUrl('default');
        const campaignId = this.getNodeParameter('campaignId') as string;
        const event = this.getNodeParameter('event') as string;

        await this.helpers.request({
          method: 'POST',
          url: `${baseUrl}/api/v1/webhook/subscribe`,
          json: true,
          body: {
            campaignId: Number(campaignId),
            event,
            callbackUrl: webhookUrl,
            allCampaigns: campaignId === '0',
          },
        });
        return true;
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        const credentials = await this.getCredentials('reachInboxProxyApi');
        const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
        const webhookUrl = this.getNodeWebhookUrl('default');
        const campaignId = this.getNodeParameter('campaignId') as string;
        const event = this.getNodeParameter('event') as string;

        try {
          await this.helpers.request({
            method: 'DELETE',
            url: `${baseUrl}/api/v1/webhook/unsubscribe`,
            json: true,
            body: {
              campaignId: Number(campaignId),
              event,
              callbackUrl: webhookUrl,
            },
          });
        } catch {}
        return true;
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const body = this.getBodyData() as IDataObject;
    const event = this.getNodeParameter('event') as string;
    const incomingEvent = body?.event as string;

    if (event !== 'ALL_EVENTS' && incomingEvent && incomingEvent !== event) {
      return { noWebhookResponse: true };
    }

    return {
      workflowData: [this.helpers.returnJsonArray([body])],
    };
  }
}
