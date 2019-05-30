import loadConfig from '../load_config';

describe('loadConfig', function () {
  test('defaults', function () {
    const config = loadConfig(process.cwd() + '/src/__tests__/', process.cwd() + '/src/__tests__/fake.func.ts').defaults;

    expect(config.resources.test.type).toEqual('defaults');
    expect(config.resources.function.provider).toEqual(config.providers.tc);
  });

  test('local', function () {
    const config = loadConfig(process.cwd() + '/src/__tests__/', process.cwd() + '/src/__tests__/fake.func.ts').local;

    expect(config.resources.function.type).toEqual('function');
    expect(config.resources.test.type).toEqual('local');
  });

  test('sub local', function () {
    const config = loadConfig(process.cwd() + '/src/__tests__', process.cwd() + '/src/__tests__/sub/fake.func.ts').local;

    expect(config.resources.function.type).toEqual('function');
    expect(config.resources.test.type).toEqual('sublocal');
  });
});
