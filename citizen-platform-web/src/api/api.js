import axios from "axios";

const api = axios.create({

  baseURL:
    "http://localhost:3000/api"
});


// Attach JWT automatically
api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);


// Handle expired token
api.interceptors.response.use(

  (response) => response,

  (error) => {

    // Unauthorized
    if (
      error.response?.status === 401
    ) {

      localStorage.clear();

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;