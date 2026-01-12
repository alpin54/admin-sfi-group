// --- zustand
import { create } from "zustand";

const useStateHeader = create((set) => ({
	menu: "",
	setMenu: (val) => set({ menu: val }),
}));

export default useStateHeader;
