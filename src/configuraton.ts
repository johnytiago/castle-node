import pino from 'pino';
import pretty from 'pino-pretty';
import fetch from 'node-fetch';

import { DEFAULT_API_URL, DEFAULT_TIMEOUT } from './constants';
import { ConfigurationError } from './errors';
import { FailoverStrategy } from './failover/models/failover-strategy';

interface ConfigurationProperties {
  apiSecret: string;
  baseUrl?: string;
  timeout?: number;
  allowlisted?: string[];
  denylisted?: string[];
  overrideFetch?: any;
  failoverStrategy?: FailoverStrategy;
  doNotTrack?: boolean;
  ipHeaders?: string[];
  trustedProxies?: RegExp[];
  trustProxyChain?: boolean;
  trustedProxyDepth?: number;
  logger?: any;
}

export class Configuration {
  apiSecret: string;
  baseUrl?: URL;
  timeout?: number;
  allowlisted?: string[];
  denylisted?: string[];
  overrideFetch?: any;
  failoverStrategy?: FailoverStrategy;
  doNotTrack?: boolean;
  ipHeaders?: string[];
  trustedProxies?: RegExp[];
  trustProxyChain?: boolean;
  trustedProxyDepth?: number;
  logger?: any;

  constructor({
    apiSecret,
    baseUrl = DEFAULT_API_URL,
    timeout = DEFAULT_TIMEOUT,
    allowlisted = [],
    denylisted = [],
    overrideFetch = fetch,
    failoverStrategy = FailoverStrategy.allow,
    doNotTrack = false,
    ipHeaders = [],
    trustedProxies = [],
    trustProxyChain = false,
    trustedProxyDepth = 0,
    logger = pino(pretty({ levelFirst: true })),
  }: ConfigurationProperties) {
    if (!apiSecret) {
      throw new ConfigurationError(
        'Castle: Unable to instantiate Castle client, API secret is missing.'
      );
    }

    this.apiSecret = apiSecret;
    this.baseUrl = new URL(baseUrl);
    this.timeout = timeout;
    this.allowlisted = allowlisted.map((x) => x.toLowerCase());
    this.denylisted = denylisted.map((x) => x.toLowerCase());
    this.overrideFetch = overrideFetch;
    this.failoverStrategy = failoverStrategy;
    this.doNotTrack = doNotTrack;
    this.ipHeaders = ipHeaders;
    this.trustedProxies = trustedProxies.map((proxy) => new RegExp(proxy));
    this.trustProxyChain = trustProxyChain;
    this.trustedProxyDepth = trustedProxyDepth;
    this.logger = logger;
  }
}
