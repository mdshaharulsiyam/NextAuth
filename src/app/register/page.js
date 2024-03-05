"use client";
import DataPost from "@/DataFetch/DataPost";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from 'sweetalert2';

const usePage = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [loading, setloading] = useState(false);
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=5201d474546c521dc75dd9c96eea7a84`;
  const HandelSubmit = async (e) => {
    setloading(true)
    e.preventDefault()
    const form = e.target;
    const FullName = form.FullName.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.files[0];

    const res = await axios.post(
      image_hosting_api,
      { image: photo },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    const PhotoUrl = res.data.data.display_url
    const info = {
      FullName,
      email,
      password,
      photo: PhotoUrl,
      role: 'user',
    }
    // console.log(info)
    if (res.data.data.display_url) {
      const responce = await DataPost('api/user', info)
      console.log(responce)
      if (responce?.success) {
        router.push('/login')
        e.target.reset()
        setloading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `account created succesfuly`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      setloading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "unable to create new user",
      });
    }
  };

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center border-black">
      <div className="flex flex-col max-w-md rounded-md dark:bg-gray-900 dark:text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign up</h1>
          <p className="text-sm dark:text-gray-400">Sign in for explore more</p>
        </div>
        <form onSubmit={HandelSubmit} novalidate="" action="" className="space-y-5">
          <div className="space-y-4">
            <div>
              <label for="email" className="block mb-2 text-sm">Email address</label>
              <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label for="email" className="block mb-2 text-sm">Full Name</label>
              <input type="text" name="FullName" id="FullName" placeholder="shaharul siyam" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label for="image" className="block mb-2 text-sm">profile photo</label>
              <input type="file" name="photo" id="photo" placeholder="" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
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
            <p className="px-6 text-sm text-center dark:text-gray-400">allready have an account yet?
              <Link rel="noopener noreferrer" href="/login" className="hover:underline dark:text-violet-400 text-blue-600 font-semibold">Sign in</Link>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );

}

export default usePage
