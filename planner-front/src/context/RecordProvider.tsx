import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface RecordContextProps {
    error?: string,
    setError: Dispatch<SetStateAction<string>>,
    showConfirmation: boolean,
    setShowConfirmation: Dispatch<SetStateAction<boolean>>,
    confirmMessage: string,
    setConfirmMessage: Dispatch<SetStateAction<string>>,
    functionConfirm: () => void,
    setFunctionConfirm: Dispatch<SetStateAction<() => void>>,
    defaultFunction: () => void
}

const RecordContext = createContext<RecordContextProps | undefined>(undefined);

export const RecordProvider = ({ children } : { children : ReactNode}) => {
    const [error, setError] = useState<string>("");
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [confirmMessage, setConfirmMessage] = useState<string>("");
    const [functionConfirm, setFunctionConfirm] = useState<() => void>(() => defaultFunction);

    function defaultFunction() {
        setShowConfirmation(false);
    }

    return (
        <RecordContext.Provider value={{ 
            error, 
            setError,
            showConfirmation,
            setShowConfirmation,
            confirmMessage,
            setConfirmMessage,
            functionConfirm,
            setFunctionConfirm,
            defaultFunction
        }}>
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