"use client"
import { uploadBook } from '@/api/api';
import { GlobalContext } from '@/context/Provider';
import { Books } from '@/types/types';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';

function Modal() {
    const [isOpen, setisOpen] = useState(false);
    const context = useContext(GlobalContext);
    const { register, handleSubmit, formState: { errors } } = useForm<Books>();

    const onSubmit = async (data: any) => {
        console.log(data);
        const formData = new FormData();

        formData.append("file", data.img[0]);
        // data = { ...data, img: data.img[0].name };
        formData.append("book", JSON.stringify(data));

        const bookResponse = await uploadBook(formData);
        
        if (bookResponse.isSuccess) {
            var r = new FileReader();
            r.onloadend = async function () {
                // console.log(r.result);
                context?.initialState["plan"].dispatch({ type: "ADD_ELEMENT", payload: { ...data, img: Buffer.from(await data.img[0].arrayBuffer()) } });
                // console.log("PUSHED");
                setisOpen(false);
                
            };
            r.readAsBinaryString(data.img[0]);
            // context?.initialState["plan"].dispatch({ type: "ADD_ELEMENT", payload: { ...data, img: Buffer.from(data.img[0]) } })
        }
    };

    return (
        <>

            <button onClick={() => setisOpen(!isOpen)} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white fixed bottom-2 right-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Add Book
            </button>
            {isOpen && <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`visible flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Book
                            </h3>
                            <button onClick={() => setisOpen(!isOpen)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input {...register("title", { required: "Title is required!" })} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                                    {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                                    <input {...register("author", { required: "Author is required!" })} type="text" name="author" id="author" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Name" required />
                                    {errors.author && <span className="text-red-500 text-sm">{errors.author.message}</span>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre</label>
                                    <select {...register("genre")} id="genre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value="">Select category</option>
                                        <option value="action">Action</option>
                                        <option value="Fictional">Fictional</option>
                                        <option value="romantic">Romantic</option>
                                        <option value="anime">Anime</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="publishedAt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Published Date</label>
                                    <input {...register("published_at", { required: "Date is required!" })} id="date" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    {errors.published_at && <span className="text-red-500 text-sm">{errors.published_at.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">img</label>
                                    <input {...register("img", { required: "Image is required!" })} type="file" id="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    {errors.img && <span className="text-red-500 text-sm">{errors.img.message}</span>}
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add new product
                            </button>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Modal