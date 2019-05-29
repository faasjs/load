import loadTs from '../load_ts';
import { execSync } from 'child_process';

describe('loadTs', function () {
  test('should work', async function () {
    const version = execSync('npm view @faasjs/deep_merge version').toString().replace('\n', '');

    expect(await loadTs(require.resolve('./base.ts'))).toEqual({
      dependencies: { '@faasjs/deep_merge': version },
      module: 1
    })
  })
});
