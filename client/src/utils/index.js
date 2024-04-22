export const noAuthFetcher = async (url) => {
  const res = await fetch(process.env.APP_BASE_API + url, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });
  if (!res.ok) {
    try {
      return Promise.reject(await res.json());
    } catch (error) {
      return Promise.reject({ message: res.statusText });
    }
  }
  return await res.json();
};

export const fetcher = async (url) => {
  const token = localStorage.getItem("silpasathiToken");

  if (!token) throw new Error("There is no token");

  const res = await fetch(process.env.APP_BASE_API + url, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
  });

  if (!res.ok) {
    try {
      return Promise.reject(await res.json());
    } catch (error) {
      return Promise.reject({ message: res.statusText });
    }
  }
  return await res.json();
};

export const updater = async ({ url, method, body }) => {
  const token = localStorage.getItem("silpasathiToken");

  if (!token) throw new Error("There is no token");
  const options = {
    method: method,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
  };
  if (method !== "GET" && method !== "HEAD") options.body = JSON.stringify(body);
  const res = await fetch(process.env.APP_BASE_API + url, options);
  if (!res.ok) {
    try {
      return Promise.reject(await res.json());
    } catch (error) {
      return Promise.reject({ message: res.statusText });
    }
  }
  return await res.json();
};

export const noAuthUpdater = async ({ url, method, body }) => {
  const options = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  };
  if (method !== "GET" && method !== "HEAD") options.body = JSON.stringify(body);
  const res = await fetch(process.env.APP_BASE_API + url, options);
  if (!res.ok) {
    try {
      return Promise.reject(await res.json());
    } catch (error) {
      return Promise.reject({ message: res.statusText });
    }
  }
  return await res.json();
};
