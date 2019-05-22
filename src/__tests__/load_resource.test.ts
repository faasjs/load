import loadResource from '../load_resource';

describe('loadResource', function () {
  test('empty target', function () {
    const target = {};
    loadResource(target, {
      resources: {},
      providers: {}
    });

    expect(target).toEqual({});
  });

  test('key as name', function () {
    const target = {
      test: {}
    };
    loadResource(target, {
      resources: {
        test: {
          type: 'test'
        }
      },
      providers: {}
    });

    expect(target.test).toEqual({
      resource: {
        type: 'test',
        name: 'test'
      }
    })
  });

  test('resource name', function () {
    const target = {
      test: {
        resource: {
          name: 'a'
        }
      }
    };
    loadResource(target, {
      resources: {
        a: {
          type: 'a'
        }
      },
      providers: {}
    });

    expect(target.test).toEqual({
      resource: {
        type: 'a',
        name: 'a'
      }
    })
  });

  test('defaults name', function () {
    const target = {
      test: {}
    };
    loadResource(target, {
      resources: {
        defaults: {
          test: 'a'
        },
        a: {
          type: 'a'
        }
      },
      providers: {}
    });

    expect(target.test).toEqual({
      resource: {
        type: 'a',
        name: 'a'
      }
    })
  });

  test('provider', function () {
    const target = {
      test: {
        resource: {
          provider: 'a'
        }
      }
    };
    loadResource(target, {
      resources: {
        test: {
          type: 'test'
        }
      },
      providers: {
        a: {
          type: 'a'
        }
      }
    });

    expect(target.test).toEqual({
      resource: {
        type: 'test',
        name: 'test',
        provider: {
          type: 'a'
        }
      }
    });
  });

  test('not found resource', function () {
    const target = {
      test: {}
    };
    expect(() => {
      loadResource(target, {
        resources: {},
        providers: {}
      });
    }).toThrowError('Resource not found: test#test');
  });

  test('not found provider', function () {
    const target = {
      test: {
        resource: {
          provider: 'a'
        }
      }
    };
    expect(() => {
      loadResource(target, {
        resources: {
          test: {}
        },
        providers: {}
      });
    }).toThrowError('Provider not found: a');
  });
});
