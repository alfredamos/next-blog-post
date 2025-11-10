import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

export type UserContextType = {
    userResponse : UserResponse | null;
    setUserResponse : Dispatch<SetStateAction<UserResponse | null>>;
}


export const authCtx = createContext<UserContextType | undefined>(undefined)

type Props = {
    children: ReactNode;
}

export default function AuthContext({ children }: Props) {
    const [userResponse, setUserResponse] = useState<UserResponse | null>(null);

    return (
        <authCtx.Provider value={{userResponse, setUserResponse}}>{children}</authCtx.Provider>
    );
}