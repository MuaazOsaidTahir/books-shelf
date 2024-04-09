"use client"
import { Action, SignUp, State } from '@/types/types';
import React, { useEffect, useReducer, useState } from 'react'
import planReducer from './planReducer';
import readingReducer from './readingReducer';
import completedReducer from './completedReducer';
import { getCurrentUser } from '@/api/api';

interface BooksState {
    books: State;
    dispatch: React.Dispatch<Action>;
}

interface BooksStateMap {
    [key: string]: BooksState;
}

interface globalProvider {
    user: SignUp | null,
    setUser: React.Dispatch<React.SetStateAction<SignUp | null>>,
    initialState: BooksStateMap
}

export const GlobalContext = React.createContext<globalProvider | null>(null);

function Provider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<SignUp | null>(null);
    const [planBooks, planDispatch] = useReducer(planReducer, { books: [], filteredBooks: null })
    const [readingBooks, readingDispatch] = useReducer(readingReducer, { books: [], filteredBooks: null })
    const [completedBooks, completedDispatch] = useReducer(completedReducer, { books: [], filteredBooks: null })

    const initialState: BooksStateMap = {
        plan: { books: planBooks, dispatch: planDispatch },
        reading: { books: readingBooks, dispatch: readingDispatch },
        completed: { books: completedBooks, dispatch: completedDispatch },
    };

    useEffect(() => {
        (async () => {
            const data = await getCurrentUser();
            setUser(data);
        })()
    }, [])

    return (
        <GlobalContext.Provider value={{
            user,
            setUser,
            initialState
        }} >
            {children}
        </GlobalContext.Provider>
    )
}

export default Provider