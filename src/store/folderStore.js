import { create } from "zustand";
import {
  createFile,
  createFolder,
  deleteFile,
  deleteFolder,
  getFolderById,
  updateFolder,
} from "../api/folderApi";

const useFolderStore = create((set) => ({
  folder: [],
  loading: false,
  deleteFolders: async (id) => {
    await deleteFolder(id);
  },
  addFolder: async (data) => {
    await createFolder(data);
  },
    updateFolders: async (id, data) => {
    await updateFolder(id, data);
  },
  addFile: async (id, data) => {
    await createFile(id, data);
  },
  getFolder: async (id, filter) => {
    set({ loading: true });
    const response = await getFolderById(id, filter);
    set({ folder: response?.data || [] });
    set({ loading: false });
  },
  deleteFiles: async (id, data) => {
    await deleteFile(id, data);
  },
}));
export { useFolderStore };
