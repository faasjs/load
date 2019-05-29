import * as load from '../index';

test('should work', function () {
  expect(load).toHaveProperty('loadConfig');
  expect(load).toHaveProperty('loadResource');
  expect(load).toHaveProperty('loadFlow');
  expect(load).toHaveProperty('loadTs');
});
