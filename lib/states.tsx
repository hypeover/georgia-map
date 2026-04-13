import { create } from "zustand";

export const useData = create((set) => ({
    data: [],
    setData: (data) => set({ data }),

    addDataFromFile: (data) => {
        set({data});
        localStorage.setItem('myData', JSON.stringify(data));
    }



}))