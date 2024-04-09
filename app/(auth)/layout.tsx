import React from 'react'

function AuthRootLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <div className='h-screen flex items-center justify-center' >
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input border bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Welcome to Books Shelf
                </h2>
                {children}
            </div>
        </div>
    )
}

export default AuthRootLayout