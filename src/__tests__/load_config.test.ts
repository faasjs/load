import loadConfig from '../load_config';

describe('loadConfig', function () {
  test('defaults', function () {
    const config = loadConfig(process.cwd() + '/src/__tests__/', process.cwd() + '/src/__tests__/fake.flow.ts').defaults;

    expect(config.resources.test.type).toEqual('defaults');
  });

  test('local', function () {
    const config = loadConfig(process.cwd() + '/src/__tests__/', process.cwd() + '/src/__tests__/fake.flow.ts').local;

    expect(config.resources.test.type).toEqual('local');
  });

  test('sub local', function () {
    const config = loadConfig(process.cwd() + '/src/__tests__/', process.cwd() + '/src/__tests__/sub/fake.flow.ts').local;

    expect(config.resources.test.type).toEqual('sublocal');
  });
});
