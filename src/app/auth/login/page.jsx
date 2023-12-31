"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginPage() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    console.log(res);
    if (res.error) {
      setError(res.error);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          <img
            className="mx-auto h-auto w-auto"
            src="https://eemq.org/wp-content/uploads/2020/04/image-3.png"
            alt="Your Company"
          />
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12 lg:w-1/2">
        <div>
        <h2 className="font-bold text-center text-2xl mb-5 text-black">
          Iniciar sesión
        </h2>
        </div>
        <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="p-2 bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        {error && (
            <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
              {error}
            </p>
          )}
        <form className="px-5 py-5 text-black" onSubmit={loginUser}>
          <div>
            <label
              htmlFor="email"
              className="font-semibold text-sm text-gray-600 pb-1 block"
            >
              Correo electronico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                required
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="font-semibold text-sm text-gray-600 pb-1 block"
              >
                Contraseña
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-gray-600 hover:text-gray-800"
                >
                  ¿Olvido su contraseña?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                autoComplete="current-password"
                required
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar sesion
            </button>
          </div>
        </form>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
        EEMQ Sistema para el control de procesos 2023
        </p>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
