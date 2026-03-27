import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class ReachInboxProxyApi implements ICredentialType {
  name = 'reachInboxProxyApi';
  displayName = 'ReachInbox Proxy API';
  documentationUrl = 'https://docs.reachinbox.ai';
  properties: INodeProperties[] = [
    {
      displayName: 'Proxy Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://reachinbox.luxeillum.com',
      description: 'URL of your self-hosted ReachInbox proxy',
    },
  ];
}
