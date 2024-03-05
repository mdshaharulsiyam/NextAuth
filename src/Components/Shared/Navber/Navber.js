'use client'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navber = () => {
    const { data: session, status } = useSession()
    const path = usePathname()
    console.log(path)
    return (
        <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
            <div className="container flex justify-between h-16 mx-auto">
                <div className="flex justify-start items-center gap-2">
                    <ul className="items-stretch hidden space-x-3 lg:flex ">
                        <li className="flex">
                            <Link href={'/'} className='uppercase font-bold text-lg'>
                                Next App
                            </Link>
                        </li>
                        <li className="flex">
                            <Link href={"/"} className={`flex items-center ${path === '/' && 'border-black'} hover:border-black transition-all  px-4 -mb-1 border-b-2 dark:border-transparent`}>home</Link>
                        </li>
                        <li className="flex">
                            <Link href={"#"} className={`flex items-center hover:border-black transition-all  px-4 -mb-1 border-b-2 dark:border-transparent`}>about</Link>
                        </li>
                        <li className="flex">
                            <Link href={"#"} className={`flex items-center hover:border-black transition-all  px-4 -mb-1 border-b-2 dark:border-transparent`}>contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {
                        status === "loading" ? <span>loading...</span> : session?.user?.email ? <>
                            <Image src={session?.user?.photo} height={30} width={30} alt={'profile photo'} className='rounded-full h-10 w-10' />
                            <button onClick={signOut} className="px-8 py-3 ml-3 hover:scale-110 active:scale-95 transition-all font-semibold bg-cyan-200  rounded dark:bg-violet-400 dark:text-gray-900">sign out</button>
                        </> : <li className="flex">
                            <Link href={"/login"} className={`flex items-center ${path === '/login' && 'border-black'} hover:border-black transition-all  px-4 -mb-1 border-b-2 dark:border-transparent`}>sign in</Link>
                        </li>
                    }
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </header >
    )
}

export default Navber
