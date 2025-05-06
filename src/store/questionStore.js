import { create } from "zustand";

const useQuestionStore = create((set) => ({
    questionToEdit: null,
    setQuestionToEdit: (data) => set({ questionToEdit: data }),
    clearQuestionToEdit: () => set({ questionToEdit: null }),
}));

export default useQuestionStore;
