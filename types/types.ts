export interface logIn {
    id?: string,
    email: string,
    password?: string
}

export interface SignUp extends logIn {
    name: string,
}

export interface Books {
    _id: string
    genre: string,
    title: string
    author: string,
    status: types,
    user: string,
    published_at: string,
    img: Buffer
}

export type types = 'READING' | 'COMPLETED' | 'PLAN';

export type Action =
    | { type: 'SET_BOOKS'; payload: Books[] }
    | { type: 'FILTER_BOOKS'; payload: string }
    | { type: 'CLEAR_FILTER' }
    | { type: 'ADD_ELEMENT', payload: Books }
    | { type: 'REMOVE_ELEMENT', payload: string }
    | { type: 'SORT_ELEMENTS', payload: string }

export type State = {
    books: Books[];
    filteredBooks: Books[] | null; 
};