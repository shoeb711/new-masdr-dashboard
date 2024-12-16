import axios from "axios";

export const masdrDevApi = axios.create({
  baseURL: import.meta.env.VITE_APP_MASDR_DEV_API,
});

// Setting up interceptors
masdrDevApi.interceptors.request.use(
  (config) => {
    const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRJZCI6InRlbmFudDAiLCJ1c2VySWQiOiJtbyIsInN1YiI6Im1vIiwiaWF0IjoxNzM0MzUwOTg5LCJleHAiOjE3MzQ0MzczODl9.kU1G-S8xSYIihI9olc_nSQb0buZJ7t7rqTY4n5i5p5U"; //TODO: replace token with url later on
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
