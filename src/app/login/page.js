"use client"
import { signIn } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
const usePage = () => {
  const router = useRouter();
  const [show, setShow] = useState(false)
  const [loading, setloading] = useState(false)
  const handleLogin = async (e) => {
    setloading(true)
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const response = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false
    })
    setloading(false)
    if (response?.ok) {
      router.push('/')
    }
    // console.log(response)
  }

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center border-black">
      <div className="flex flex-col max-w-md rounded-md dark:bg-gray-900 dark:text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm dark:text-gray-400">Sign in to access your account</p>
        </div>
        <form onSubmit={handleLogin} novalidate="" action="" className="space-y-5">
          <div className="space-y-4">
            <div>
              <label for="email" className="block mb-2 text-sm">Email address</label>
              <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
            </div>
            <div className="relative">
              <div className="flex justify-between mb-2">
                <label for="password" className="text-sm">Password</label>
              </div>
              <input type={`${show ? 'text' : 'password'}`} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
              <span
                className="absolute top-10 right-3"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEye className="cursor-pointer"></FaEye> : <FaEyeSlash className="cursor-pointer"></FaEyeSlash>}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button type="submit" className="w-full px-8 py-3 font-semibold bg-black bg-opacity-25 rounded-md dark:bg-violet-400 dark:text-gray-900">{loading ? 'loading...' : 'Sign in'}</button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-400">Don't have an account yet?
              <Link rel="noopener noreferrer" href="/register" className="hover:underline dark:text-violet-400 font-semibold text-blue-600">register</Link>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
{/* <span
className="absolute top-10 right-3"
onClick={() => setShow(!show)}
>bg-[url('https://i.ibb.co/3rsz41m/6cbb36a34afe45944dc1280aed5f9c0c.jpg')] 
{show ? <FaEyeSlash className="cursor-pointer"></FaEyeSlash> : <FaEye className="cursor-pointer"></FaEye>}
</span> */}

export default usePage;