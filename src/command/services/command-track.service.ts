import { Configuration } from '../../configuraton';
import { ContextSanitizeService } from '../../context/context.module';
import { CommandGenerateService } from './command-generate.service';

export const CommandTrackService = {
  call: (
    controller: AbortController,
    options: any,
    configuration: Configuration
  ) => {
    const context = ContextSanitizeService.call(options.context);
    return CommandGenerateService.call(
      controller,
      'track',
      { ...options, ...{ context } },
      'POST',
      configuration
    );
  },
};
