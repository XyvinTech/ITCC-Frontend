import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getMember = async (filter) => {
  try {
    const response = await axiosInstance.get(`/user/admin/list`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getSingleUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addMember = async (data) => {
  try {
    const response = await axiosInstance.post("/user/admin", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getMemberById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/admin/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteMember = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/admin/single/${id}`);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const editMember = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/user/admin/single/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const userBlock = async (id) => {
  try {
    const response = await axiosInstance.patch(`/user/admin/block-user/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const userVerify = async (id, data) => {
  try {
    const response = await axiosInstance.patch(
      `/user/admin/verify-user/${id}`,
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const bulkVerify = async (data) => {
  try {
    const response = await axiosInstance.post(`/user/admin/bulk-verify`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const userUnBlock = async (id) => {
  try {
    const response = await axiosInstance.patch(
      `/user/admin/unblock-user/${id}`
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const addMembersBulk = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/user-bulk", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTags = async (filter) => {
  try {
    const response = await axiosInstance.get(`/user/business-tags`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getMembershipApprovals = async (filter) => {
  try {
    const response = await axiosInstance.get("/user/approvals", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const memberApproval = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/user/approval/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const addEnquiry = async (data) => {
  try {
    const response = await axiosInstance.post("/user/enquiry", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getEnquiry = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/enquiry/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
