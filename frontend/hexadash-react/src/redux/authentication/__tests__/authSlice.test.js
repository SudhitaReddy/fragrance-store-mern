import authReducer, { loginUser, auth0Login, registerUser, logoutUser, clearError, setLogin } from '../authSlice';

// Mock the DataService
jest.mock('../../../config/dataService/dataService', () => ({
  DataService: {
    post: jest.fn(),
  },
}));

// Mock js-cookie
jest.mock('js-cookie', () => ({
  set: jest.fn(),
  remove: jest.fn(),
}));

describe('authSlice', () => {
  const initialState = {
    login: false,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(authReducer(undefined, {})).toEqual(initialState);
    });

    test('should handle clearError', () => {
      const previousState = {
        ...initialState,
        error: 'Some error',
      };

      expect(authReducer(previousState, clearError())).toEqual({
        ...previousState,
        error: null,
      });
    });

    test('should handle setLogin', () => {
      expect(authReducer(initialState, setLogin(true))).toEqual({
        ...initialState,
        login: true,
      });
    });
  });

  describe('async thunks', () => {
    test('loginUser.pending should set loading to true', () => {
      const action = { type: loginUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });

    test('loginUser.fulfilled should set login to true and loading to false', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: true,
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        login: true,
        loading: false,
        error: null,
      });
    });

    test('loginUser.rejected should set error and loading to false', () => {
      const action = {
        type: loginUser.rejected.type,
        payload: 'Login failed',
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: 'Login failed',
      });
    });

    test('auth0Login.pending should set loading to true', () => {
      const action = { type: auth0Login.pending.type };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });

    test('auth0Login.fulfilled should set login to true and loading to false', () => {
      const action = {
        type: auth0Login.fulfilled.type,
        payload: true,
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        login: true,
        loading: false,
        error: null,
      });
    });

    test('registerUser.pending should set loading to true', () => {
      const action = { type: registerUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });

    test('registerUser.fulfilled should set login to false and loading to false', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: false,
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        login: false,
        loading: false,
        error: null,
      });
    });

    test('logoutUser.pending should set loading to true', () => {
      const action = { type: logoutUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });

    test('logoutUser.fulfilled should set login to false and loading to false', () => {
      const action = {
        type: logoutUser.fulfilled.type,
        payload: false,
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        login: false,
        loading: false,
        error: null,
      });
    });
  });
});
