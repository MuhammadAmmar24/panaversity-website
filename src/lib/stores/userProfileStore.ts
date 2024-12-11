import { create } from "zustand";

import { UserProfile } from "@/src/lib/schemas/user";

interface ProfileState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    profile:  null,
  setProfile: (profile) => set({ profile: profile }),
}));
