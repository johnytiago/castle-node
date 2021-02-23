import { Configuration } from '../../configuraton';
import { CommandGenerateService } from './command-generate.service';

export const CommandApproveDeviceService = {
  call: (
    controller,
    options: { device_token: string },
    configuration: Configuration
  ) => {
    return CommandGenerateService.call(
      controller,
      `devices/${options.device_token}/approve`,
      {},
      'PUT',
      configuration
    );
  },
};
