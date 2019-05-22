import Flow from '@faasjs/flow';
import loadFlow from '../load_flow';

describe('loadFlow', function () {
  test('should work', function () {
    const flow = new Flow({
      triggers: {
        http: {}
      },
      resources: {
        mysql: {}
      }
    }, () => 1);

    loadFlow(flow, process.cwd() + '/src/__tests__/', process.cwd() + '/src/__tests__/fake.flow.ts', 'defaults');

    expect(flow.config.resource).toEqual({
      resource: {
        name: 'function',
        type: 'function'
      }
    });
    expect(flow.config.triggers).toEqual({
      http: {
        resource: {
          name: 'http',
          type: 'http'
        }
      }
    });
    expect(flow.config.resources).toEqual({
      mysql: {
        resource: {
          name: 'mysql',
          type: 'mysql'
        }
      }
    });
  });
});
