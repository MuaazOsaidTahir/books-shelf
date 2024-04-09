"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Input, LabelInputContainer } from '../ui/input'
import { Label } from '../ui/label'
import { GlobalContext } from '@/context/Provider'
import { deleteUser } from '@/api/api'
import { useRouter } from 'next/navigation'

const types = ['READING', 'COMPLETED', 'PLAN']

function SearchBar() {
    const [search, setsearch] = useState("");
    const context = useContext(GlobalContext);
    const router = useRouter();
    const [isOpen, setisOpen] = useState(false);

    useEffect(() => {
        if (!search) {
            types.forEach(e => {
                context?.initialState[e.toLowerCase()].dispatch({ type: 'CLEAR_FILTER' });
            })
            return;
        }
        const timeOut = setTimeout(() => {
            types.forEach(e => {
                context?.initialState[e.toLowerCase()].dispatch({ type: 'FILTER_BOOKS', payload: search });
            })
        }, 1000);

        return () => {
            clearTimeout(timeOut);
        }
    }, [search])

    const deleteUserProfile = async () => {
        const isDelete = await deleteUser()

        if (isDelete) {
            router.push("/signup");
            return;
        }
    }

    const sortBooks = (type: string) => {
        types.forEach(e => {
            context?.initialState[e.toLowerCase()].dispatch({ type: "SORT_ELEMENTS", payload: type });
        })
    }

    return (
        <div className='flex flex-col items-center' >
            <div className='flex items-center w-full' >
                <form className="w-full flex-1">
                    <LabelInputContainer className="mb-4">
                        <Label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</Label>
                        <div className="relative border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <Input onChange={(e) => setsearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 " placeholder="Search books by title..." required />
                            {/* <button type="submit" className="text-white absolute end-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        </div>
                    </LabelInputContainer>
                </form>
                <div className='flex flex-col items-center' >
                    <p>Hey {context?.user?.name}</p>
                    <button onClick={deleteUserProfile} className='bg-red-500 p-3 rounded-md' >Delete Account</button>
                </div>
            </div>
            <div className="relative inline-block text-left">
                <div>
                    <button onClick={() => setisOpen(!isOpen)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        Sort By Name
                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {isOpen && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <div className="py-1" role="none">
                        <a href="#" onClick={() => sortBooks("asc")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">Sort Ascendingly</a>
                        <a href="#" onClick={() => sortBooks("dsec")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">Sort Descendingly</a>
                    </div>
                </div>}
            </div>

        </div>
    )
}

export default SearchBar