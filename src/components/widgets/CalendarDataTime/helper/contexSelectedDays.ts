import { createContext } from "react";

interface IcontexSelectedDays {
    selectedDays: string[];
    setContexSelectedDays: (data: string) => void;
}

const contexSelectedDays = createContext<IcontexSelectedDays>({selectedDays: [], setContexSelectedDays: () => {}});

export default contexSelectedDays;

