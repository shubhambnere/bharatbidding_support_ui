// import axios from 'axios';
// // config
// import { HOST_API } from '../config';

// // ----------------------------------------------------------------------

// const axiosInstance = axios.create({
//   baseURL: HOST_API,
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const response = await axiosInstance.post('/api/userauth/v1/login/refresh/', {
//           refresh: localStorage.getItem('refreshToken')
//         });
//         const { access } = response.data;
//         localStorage.setItem('accessToken', access);
//         axiosInstance.defaults.headers.common.Authorization = `Bearer ${access}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     return Promise.reject((error.response && error.response.data) || 'Something went wrong');
//   }
// );

// export default axiosInstance;











import axios from 'axios';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
