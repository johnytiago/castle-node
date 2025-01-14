import type { IncomingHttpHeaders } from 'http2';

export interface FilterPayload {
  request_token: string;
  event: string;
  status?: string;
  user?: {
    id?: string;
    email?: string;
  };
  properties?: object;
  context: {
    ip: string;
    headers: IncomingHttpHeaders | { [key: string]: string | boolean };
  };
}
