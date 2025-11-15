const API_URL = "http://localhost:5000";

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("taskifyyToken", token);
  } else {
    localStorage.removeItem("taskifyyToken");
  }
};

export const apiRequest = async (endpoint: string, method = "GET", body?: any) => {
  const token = localStorage.getItem("taskifyyToken");

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(API_URL + endpoint, options);

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erreur HTTP : " + res.status);
  }

  return res.json();
};

export default {
  apiRequest,
  get: (url: string) => apiRequest(url),
  post: (url: string, body: any) => apiRequest(url, "POST", body),
  put: (url: string, body: any) => apiRequest(url, "PUT", body),
  delete: (url: string) => apiRequest(url, "DELETE"),
};
