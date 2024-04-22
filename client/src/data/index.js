export const disableQuery = {
  staleTime: Infinity,
  cacheTime: Infinity,
  refetchInterval: false,
  refetchIntervalInBackground: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  retryOnMount: false,
};

export const enableQueryOnMount = {
  staleTime: Infinity,
  cacheTime: Infinity,
  refetchInterval: false,
  refetchIntervalInBackground: false,
  refetchOnMount: true,
  refetchOnReconnect: true,
  refetchOnWindowFocus: false,
  retryOnMount: true,
};
