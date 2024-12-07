import axiosInstance from '@/utils/axios';
import { AUTH_ENDPOINTS } from '@/constants/api';

export const checkLoginStatus = async () => {
  const response = await axiosInstance.get(AUTH_ENDPOINTS.STATUS);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
  return response.data;
};
