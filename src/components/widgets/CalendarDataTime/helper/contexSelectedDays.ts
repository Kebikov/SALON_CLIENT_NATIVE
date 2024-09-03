import { createContext } from "react";

interface IcontexSelectedDays {
    selectedDays: string[];
    setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
}

const contexSelectedDays = createContext<IcontexSelectedDays>({selectedDays: [], setSelectedDays: () => {}});

export default contexSelectedDays;

