import {CirclePlus,PackageSearch} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <section className='fixed h-screen w-1/5 border-r-2 border-accent-foreground'>
            <div className="flex flex-col">
                <h1 className='text-xl py-5 px-4 mb-5 bg-gray-200 font-bold'>ADMIN PANNEL</h1>
                <main className='flex flex-col gap-2'>
                    <Link href={"/products"} className='flex py-2 hover:bg-gray-200 px-4 items-center gap-2'>
                        <PackageSearch className='w-6 h-6' />
                        <span className='text-lg'>All Products</span>
                    </Link>
                    <Link href={"/addproduct"} className='flex py-2 hover:bg-gray-200 px-4 items-center gap-2'>
                        <CirclePlus className='w-6 h-6' />
                        <span className='text-lg'>Add Product</span>
                    </Link>
                </main>
            </div>
        </section>
    )
}

export default Sidebar
