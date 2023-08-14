"use client";

import { useFormik } from "formik";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState<any | null>(null);
  const router = useRouter();

  /**
   * handle login using next auth credential signin measures
   * @param {any} values:any
   * @param {any} {setSubmitting}:any
   * @returns {Promise<void>}
   */
  const handleLogin = async (
    values: any,
    { setSubmitting }: any
  ): Promise<void> => {
    const res: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });
    if (res?.error) {
      setError(res.error);
    } else {
      setError(null);
    }
    if (res?.url) {
      router.push(res.url);
    }
    setSubmitting(false);
  };

  const initialValues = {
    username: "mor_2314",
    password: "83r5^_",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleLogin,
  });

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          User Name
        </label>
        <div className="mt-2">
          <input
            onChange={formik.handleChange}
            id="username"
            name="username"
            value={formik.values.username}
            required
            className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        {formik.isSubmitting ? (
          <>Loading</>
        ) : (
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        )}
      </div>
      {error && <p>{error}</p>}
    </form>
  );
}
