// Mock data service for development when API is unavailable
class MockDataService {
  static get(path = '') {
    return Promise.resolve({
      data: { message: 'Mock GET response', path },
      status: 200,
    });
  }

  static post(path = '', data = {}) {
    // Mock login response
    if (path.includes('login')) {
      return Promise.resolve({
        data: {
          success: true,
          token: 'mock-jwt-token',
          user: {
            id: 1,
            email: 'admin@example.com',
            name: 'Admin User',
          },
        },
        status: 200,
      });
    }

    return Promise.resolve({
      data: { message: 'Mock POST response', path, data },
      status: 200,
    });
  }

  static put(path = '', data = {}) {
    return Promise.resolve({
      data: { message: 'Mock PUT response', path, data },
      status: 200,
    });
  }

  static patch(path = '', data = {}) {
    return Promise.resolve({
      data: { message: 'Mock PATCH response', path, data },
      status: 200,
    });
  }

  static delete(path = '') {
    return Promise.resolve({
      data: { message: 'Mock DELETE response', path },
      status: 200,
    });
  }
}

export default MockDataService;
