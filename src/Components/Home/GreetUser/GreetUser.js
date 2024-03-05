'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"

const GreetUser = () => {
    const { data: session } = useSession()
    return (
        <>
            <h3 className="font-semibold text-center text-2xl pb-2 pt-4">Wellcome Mr. {session?.user?.FullName}</h3>
            <p className="text-center "> this is protected page</p>
        </>
    )
}

export default GreetUser
