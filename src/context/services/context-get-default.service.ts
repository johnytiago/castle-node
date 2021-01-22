import { Configuration } from '../../models';
import { HeadersExtractService } from '../../headers/headers.module';
import { version } from '../../../package.json';

export const ContextGetDefaultService = {
  call: (context: any, configuration: Configuration) => {
    return {
      client_id: context.client_id || false,
      headers: HeadersExtractService.call(context.headers, configuration),
      library: {
        name: 'castle-node',
        version,
      },
    };
  },
};