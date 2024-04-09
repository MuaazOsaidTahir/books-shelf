"use client"
import { Books, types } from '@/types/types'
import React, { useContext, useEffect } from 'react'
import BackgroundGradientDemo from '../ui/Card'
import { GlobalContext } from '@/context/Provider'


function ListBooks({ data, type }: { data: Books[], type: types }) {
    const context = useContext(GlobalContext)

    useEffect(() => {
        context?.initialState[type.toLowerCase()].dispatch({ type: "SET_BOOKS", payload: data });
    }, [])
    
    return (
        <>
            <h1 className='text-center p-5' >{type}</h1>
            <div className='flex items-center flex-wrap' >
                {
                    (context?.initialState[type.toLowerCase()].books.filteredBooks !== null ? context?.initialState[type.toLowerCase()].books.filteredBooks : context?.initialState[type.toLowerCase()].books.books)?.map(e => {
                        return <BackgroundGradientDemo key={e._id || e.title} _id={e._id} author={e.author} genre={e.genre} status={e.status} title={e.title} user={e.user} img={e.img} published_at={e.published_at} />
                    })
                }
            </div>
        </>
    )
}

export default ListBooks