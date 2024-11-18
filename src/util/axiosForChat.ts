import axios from "axios";

const instanceChat = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER_CHAT,
  withCredentials: true,
  timeout: +import.meta.env.VITE_TIMEOUT_AXIOS,
});

instanceChat.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instanceChat.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const isError = error?.response?.data;
    const customError = {
      EC: isError?.EC,
      EM: isError?.EM,
    };
    return error && error.response ? customError : Promise.reject(error);
  }
);
export default instanceChat;
