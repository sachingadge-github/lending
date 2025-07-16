import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach access token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Flag to prevent multiple refresh calls at once
let isRefreshing = false;
let refreshSubscribers = [];

// Utility: Retry all requests after refresh
const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Response interceptor to handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only intercept 401 errors once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh-tokens`, {
            refreshToken
          });

          const { token: newAccessToken, refresh: newRefreshToken } = data.access;
          localStorage.setItem('accessToken', newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }

          isRefreshing = false;
          onRefreshed(newAccessToken);
        } catch (refreshError) {
          isRefreshing = false;
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // Wait for token to be refreshed and retry original request
      return new Promise((resolve) => {
        addRefreshSubscriber((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
