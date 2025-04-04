import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface RecordContextProps {
    error?: string,
    setError: Dispatch<SetStateAction<string>>
}

const RecordContext = createContext<RecordContextProps | undefined>(undefined);

export const RecordProvider = ({ children } : { children : ReactNode}) => {
    const [error, setError] = useState<string>("");

    return (
        <RecordContext.Provider value={{ error, setError }}>
            { children }
        </RecordContext.Provider>
    )
}

export const useRecord = () => {
    const context = useContext(RecordContext);
    if(!context) {
        throw new Error('useRecord must be used within a RecordProvider');
    }
    return context;
}