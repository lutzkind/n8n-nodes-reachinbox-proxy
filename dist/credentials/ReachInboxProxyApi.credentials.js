"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReachInboxProxyApi = void 0;
class ReachInboxProxyApi {
    constructor() {
        this.name = 'reachInboxProxyApi';
        this.displayName = 'ReachInbox Proxy API';
        this.documentationUrl = 'https://docs.reachinbox.ai';
        this.properties = [
            {
                displayName: 'Proxy Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://reachinbox.luxeillum.com',
                description: 'URL of your self-hosted ReachInbox proxy',
            },
        ];
    }
}
exports.ReachInboxProxyApi = ReachInboxProxyApi;
//# sourceMappingURL=ReachInboxProxyApi.credentials.js.map