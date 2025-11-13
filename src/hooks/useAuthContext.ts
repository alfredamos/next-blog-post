"use client"

import {useContext} from 'react';
import {authCtx } from "@/app/authContext";

export const useAuthContext = () => {
    const context = useContext(authCtx);

    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }

    return context;
};