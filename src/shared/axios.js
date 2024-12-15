import axios from "axios";

export const masdrDevApi = axios.create({
  baseURL: import.meta.env.VITE_APP_MASDR_DEV_API,
});

// Setting up interceptors
masdrDevApi.interceptors.request.use(
  (config) => {
    const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRJZCI6InRlbmFudDA5MDkiLCJ1c2VySWQiOiJtbyIsInN1YiI6Im1vIiwiaWF0IjoxNzM0MjU3Nzc2LCJleHAiOjE3MzQzNDQxNzZ9.-n53yjdEBwvsN_PCO9bdRx9hDfqY1guCzXbNpPdlTYE"; //TODO: replace token with url later on
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

masdrDevApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized response
      localStorage.clear();
      window.location.replace("/login"); // redirect when token expired
    }
    return Promise.reject(error);
  }
);
