import { create } from "zustand";
import {getStudentCourses} from '@/src/lib/getStudentCourses';

interface CourseState {
  courses: any[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: (profileId: string) => Promise<void>;
  revalidateCourses: (profileId: string) => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async (profileId: string) => {
    set({ isLoading: true, error: null });
    try {

      const data = await getStudentCourses('e1e88e2a-e9a6-4284-9eb5-efaf86dcbe31');
      console.log("API Called in Store", data);
      set({ courses: data.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  revalidateCourses: async (profileId: string) => {
    const state = get();
    if (!profileId) {
      set({ error: "Profile ID is missing" });
      return;
    }
    await state.fetchCourses(profileId);
  },
}));
