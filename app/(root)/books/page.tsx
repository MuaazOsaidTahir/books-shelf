import { getBooks } from '@/api/api';
import ListBooks from '@/components/shared/ListBooks'
import Modal from '@/components/shared/Modal';
import SearchBar from '@/components/shared/SearchBar'
import React from 'react'

async function BooksPage() {
  // const context = useContext(GlobalContext)
  const data = await getBooks();

  if(!data.isSuccess){
    return <h1>Error occurred while fetching books</h1>
  }

  return (
    <>
      <SearchBar />
      <div className='p-5' >
        <ListBooks data={data?.books["READING"]} type="READING" />
        <ListBooks data={data?.books["COMPLETED"]} type='COMPLETED' />
        <ListBooks data={data?.books["PLAN"]} type='PLAN' />
      </div>
      <Modal />
    </>
  )
}

export default BooksPage