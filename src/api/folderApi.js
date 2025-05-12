import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";
import { da } from "date-fns/locale";

export const getFolder = async (id, filter) => {
  try {
    const response = await axiosInstance.get(`/folder/admin/list/${id}`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const deleteFolder = async (id) => {
  try {
    const response = await axiosInstance.delete(`/folder/single/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const createFolder = async (data) => {
  try {
    const response = await axiosInstance.post(`/folder`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getFolderById = async (id, filter) => {
  try {
    const response = await axiosInstance.get(`/folder/single/${id}`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const createFile = async (id, data) => {
  try {
    const response = await axiosInstance.post(`/folder/file/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteFile = async (id, data) => {
  try {
    const response = await axiosInstance.post(`/folder/remove/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
