import { CommandRiskService } from '../../../src/command/command.module';
import { Configuration } from '../../../src/configuraton';
import AbortController from 'abort-controller';
import MockDate from 'mockdate';

describe('CommandRiskService', () => {
  beforeEach(() => {
    MockDate.set(new Date('2021-01-25T00:00:00.000Z'));
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe('call', () => {
    const controller = new AbortController();
    const expected = {
      requestUrl: new URL('https://castle.io/v1/risk'),
      requestOptions: {
        signal: controller.signal,
        method: 'POST',
        headers: {
          Authorization: 'Basic OnRlc3Q=',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sent_at: '2021-01-25T00:00:00.000Z',
          request_token: 'token',
          event: '$login',
          status: '$succeeded',
          user: { id: 'user_id', email: 'user_email' },
          context: {
            ip: '127.0.0.1',
            headers: {
              'x-castle-client-id': 'client_id',
            },
          },
        }),
      },
    };

    const config = new Configuration({
      apiSecret: 'test',
      baseUrl: 'https://castle.io/v1',
    });

    const context = {
      ip: '127.0.0.1',
      headers: {
        'x-castle-client-id': 'client_id',
      },
    };

    it('generates payload', () => {
      const received = CommandRiskService.call(
        controller,
        {
          request_token: 'token',
          event: '$login',
          status: '$succeeded',
          user: { id: 'user_id', email: 'user_email' },
          context,
        },
        config
      );
      expect(received.requestUrl.href).toEqual(expected.requestUrl.href);
      expect(received).toMatchObject(expected);
    });
  });
});
