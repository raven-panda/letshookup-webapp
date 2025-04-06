const shouldLogApiCallsError = import.meta.env.MODE !== 'production';

export const Log = {
  apiFails: (...args) => shouldLogApiCallsError && console.error(...args),
};
