import loadTs from '../load_ts';
import { execSync } from 'child_process';

describe('loadTs', function () {
  test('should work', async function () {
    const version = execSync('npm view @faasjs/deep_merge version').toString();

    expect(await loadTs(require.resolve('./base.ts'))).toEqual({
      dependencies: new Map([['@faasjs/deep_merge', version]]),
      module: 1
    })
  })
});
