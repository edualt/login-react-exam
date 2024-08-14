import { axiosInstance } from "../apiConfig";

const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      username,
      password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export { login, getProfile };
