import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile } from "@/src/lib/schemas/user";


interface ProfieError {
    isVerified: boolean, 
    redirectTo: string 
}
interface AuthState {

  profile: UserProfile | ProfieError;
  login: (user_profile: UserProfile) => void;
  logout: () => void;

}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({

      profile: { isVerified: false, redirectTo: "/login" },
      login: (user_profile: UserProfile) =>
        set({
          profile: user_profile,
        }),
      logout: () =>
        set({
          profile:{ isVerified: false, redirectTo: "/login" },
        }),
    }),
    { name: "auth-storage" } // Key in localStorage
  )
);
