"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    username: "",
    password: "",
    direccion: "",
    Telefono: "",
    email: "",
    rol_id: "1",
    area_id: "1",
  });

  const [esValida, setEsValida] = useState(true);

  function validarContraseña(contraseña) {
    const patron = /^(?=.*\d)(?=.*[A-Z]).{7,}$/;
    return patron.test(contraseña);
  }

  const HandleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });

    setEsValida(validarContraseña(usuario.password));
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();

    if (!esValida) {
      return alert("Contraseña debil ingrese otra");
    }

    if (usuario.password !== e.target.password_confirm.value) {
      return alert("Las contraseñas no coinciden");
    }

    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      console.log("La respuesta del servidor no fue exitosa.");
      // A continuación, vamos a leer la respuesta del servidor
      const serverResponse = await res.json();
      // Imprimimos la próxima respuesta en la consola
      setError(serverResponse);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div>
        <h2 className="font-bold text-center text-2xl mb-5 text-black">
          Registrarse en el sistema
        </h2>
      </div>
      <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="p-2 bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          {error && (
            <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
              {error?.message}
            </p>
          )}
          <form className="px-5 py-5 text-black" onSubmit={HandleOnSubmit}>
            <div>
              <label
                htmlFor="nombre"
                className="font-semibold text-sm text-gray-600 pb-1 block"
              >
                Nombre completo
              </label>
              <div className=" mt-2">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  onChange={HandleChange}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  placeholder="EEMQ Nombre"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="apellido"
                className="font-semibold text-sm text-gray-600 pb-1 block"
              >
                Apellidos
              </label>
              <div className="mt-2">
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  required
                  onChange={HandleChange}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  placeholder="EEMQ Apellidos"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="direccion"
                className="font-semibold text-sm text-gray-600 pb-1 block"
              >
                Direccion
              </label>
              <div className="mt-2">
                <input
                  id="direccion"
                  name="direccion"
                  type="text"
                  required
                  onChange={HandleChange}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  placeholder="EEMQ Direccion"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="Telefono"
                className="bfont-semibold text-sm text-gray-600 pb-1 block"
              >
                Telefono
              </label>
              <div className="mt-2">
                <input
                  id="Telefono"
                  name="Telefono"
                  type="tel"
                  required
                  onChange={HandleChange}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  placeholder="EEMQ Direccion"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="font-semibold text-sm text-gray-600 pb-1 block"
              >
                Nombre de usuario
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={HandleChange}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  placeholder="EEMQ Username"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="font-semibold text-sm text-gray-600 pb-1 block"
              >
                Email corporativo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={HandleChange}
                  required
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  placeholder="EEMQ@mail.example"
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={HandleChange}
                  autoComplete="current-password"
                  placeholder="***********"
                  required
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password_confirm"
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                >
                  Confirmación de contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password_confirm"
                  name="password_confirm"
                  type="password"
                  onChange={HandleChange}
                  placeholder="***********"
                  required
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
              </div>
            </div>

            <div>
              <button className="flex w-full justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Registrarse
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            EEMQ Sistema para el control de procesos 2023
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
