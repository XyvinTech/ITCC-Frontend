import { create } from "zustand";
import {
  addMember,
  deleteMember,
  editMember,
  getMember,
  getMemberById,
  memberApproval,
  userBlock,
  userUnBlock,
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
  updateMemberApproval: async (id, data) => {
    await memberApproval(id, data);
  },
  setRefreshMember: () =>
    set((state) => ({ refreshMember: !state.refreshMember })),
}));

export { useMemberStore };
