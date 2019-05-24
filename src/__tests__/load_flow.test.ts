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

    expect(flow.resource.name).toEqual('function');
    expect(flow.resource.type).toEqual('function');
    expect(flow.triggers).toEqual({
      http: {
        resource: {
          name: 'http',
          type: 'http'
        }
      }
    });
    expect(flow.resources).toEqual({
      mysql: {
        resource: {
          name: 'mysql',
          type: 'mysql'
        }
      }
    });
  });
});
