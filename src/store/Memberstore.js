import { create } from "zustand";
import {
  addMember,
  bulkVerify,
  deleteMember,
  editMember,
  getMember,
  getMemberById,
  memberApproval,
  userBlock,
  userUnBlock,
  userVerify,
} from "../api/memberapi";

const useMemberStore = create((set) => ({
  members: [],
  member: [],
  loading: false,
  refreshMember: false,
  memberStatus: "",
  memberInstalled:false,
  setMemStatus: (newStatus) => set({ memberStatus: newStatus }),
  setMemInstalled: (newIns) => set({ memberInstalled: newIns }),
  fetchMember: async (filter) => {
    const allData = await getMember(filter);
    set({ members: allData?.data || [] });
  },
  addMembers: async (data) => {
    await addMember(data);
  },
  bulkUpdate: async (data) => {
    await bulkVerify(data);
  },
  deleteMembers: async (id) => {
    await deleteMember(id);
  },
  fetchMemberById: async (id) => {
    set({ loading: true });
    const allData = await getMemberById(id);
    set({ member: allData?.data || [] });
    set({ loading: false });
  },
  updateMember: async (id, data) => {
    await editMember(id, data);
  },
  
  blockUser: async (id) => {
    await userBlock(id);
  },
  unBlockUser: async (id) => {
    await userUnBlock(id);
  },
  verifyUser: async (id, data) => {
    await userVerify(id, data);
  },
  updateMemberApproval: async (id, data) => {
    await memberApproval(id, data);
  },
  setRefreshMember: () =>
    set((state) => ({ refreshMember: !state.refreshMember })),
}));

export { useMemberStore };
