"use client";
import { useEffect, useState } from "react";
import PasswordInput from "./PasswordInput";
import { useParams, useRouter } from "next/navigation";
import SelectRol from "./SelectRol";
import SelectArea from "./SelectArea";

function ProductForm() {

  //Modelo de usuario para almacenamiento de data del formulario 
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    username: "",
    password: "",
    direccion: "",
    Telefono: "",
    email: "",
    rol_id: "",
    area_id: "",
  });

  //Modelo de validación para el contenido de la contraseña
  const [esValida, setEsValida] = useState(true);

  //Función de validación para el contenido de una contraseña
  function validarContraseña(contraseña) {
    const patron = /^(?=.*\d)(?=.*[A-Z]).{7,}$/;
    return patron.test(contraseña);
  }

  //Funcion de navegación 
  const router = useRouter();

  //Funcion para el uso de parametros desde paginas
  const params = useParams();

  //Carga de los datos de un registro por sus parametros 
  useEffect(() => {
    if (params.id) {
      //llamar a la API para cargar el usuario
      fetch("/api/user/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          setUsuario({
            nombre: data.nombre,
            apellido: data.apellido,
            username: data.username,
            password: data.password,
            direccion: data.direccion,
            Telefono: data.Telefono,
            email: data.email,
            rol_id: data.rol_id,
            area_id: data.area_id,
          });
        });
    }
  }, []);

  //Funcion para el almacenamiento del evento que ocurre en los objetos de la pagina
  const HandleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });

    setEsValida(validarContraseña(usuario.password));
  };

  //Funciones de carga y actualizacion 
  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    if (!params.id && esValida) {
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch("/api/user/" + params.id, {
        method: "PUT",
        body: JSON.stringify(usuario),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    }

    router.refresh();
    router.push("/usuarios/dashboard");
  };

  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="p-2 bg-blue-950 shadow w-full rounded-lg divide-y divide-gray-200">
        
      <form className=" px-5 py-5 " onSubmit={HandleOnSubmit}>
      {/* Campo para el nombre del Usuario  */}
      <label className="font-semibold text-sm pb-1 block">Nombre del empleado</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={usuario.nombre}
        onChange={HandleChange}
        className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
        placeholder="Nombre del Usuario"
        required
      />

      {/* Campo para el apellido del Usuario */}
      <label className="font-semibold text-sm pb-1 block">Apellido del empleado</label>
      <input
        type="text"
        id="apellido"
        name="apellido"
        value={usuario.apellido}
        onChange={HandleChange}
        className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
        placeholder="Nombre del Usuario"
        required
      />

      {/* Campo para el nombre de usuario */}
      <label className="font-semibold text-sm pb-1 block">
        Nombre de usuario para el empleado
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={usuario.username}
        onChange={HandleChange}
        className="border rounded-lg px-3 py-2 mt-1 mb-5  w-full text-black"
        placeholder="Username"
        required
      />

      {/* Campo para la contraseña del Usuario */}
      <label className="font-semibold text-sm pb-1 block">
        Contraseña de usuario para el empleado
      </label>
      <PasswordInput handleChange={HandleChange} />
      {!esValida &&  <p className="text-red-700 mt-2">Contraseña no valida</p>}

      {/* Campo para la dirección del Usuario */}
      <label className="font-semibold text-sm pb-1 block">Dirección</label>
      <input
        type="text"
        id="direccion"
        name="direccion"
        value={usuario.direccion}
        onChange={HandleChange}
        className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
        placeholder="Dirección"
      />

      {/* Campo para el Numero del Usuario */}
      <label className="font-semibold text-sm pb-1 block">Telefono</label>
      <input
        type="number"
        id="Telefono"
        name="Telefono"
        value={usuario.Telefono}
        minLength={8}
        onChange={HandleChange}
        className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
        placeholder="Telefono"
      />

      {/* Campo para el E-mail del Usuario */}
      <label className="font-semibold text-sm pb-1 block">E-Mail</label>
      <input
        type="email"
        id="email"
        name="email"
        value={usuario.email}
        onChange={HandleChange}
        className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black"
        placeholder="emmq_user@mail.com"
        required
      />

      {/* Seleccion de rol */}
      <label className="font-semibold text-sm pb-1 block">Seleccion de rol</label>
      <SelectRol handleChange={HandleChange} />

      {/* Seleccion de area */}
      <label className="font-semibold text-sm pb-1 block">Seleccion de area</label>
      <SelectArea handleChange={HandleChange} />

      {/* Boton de creación de Usuario */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold
        py-2 px-4 rounded focus:outline-none shadow-lg mt-6"
      >
        {params.id ? "Actualizar" : "Crear"}
      </button>
      <button
        className="bg-rose-500 hover:bg-rose-700 text-white font-bold
        py-2 px-4 mx-5 rounded focus:outline-none shadow-lg mt-6"
        onClick={() => {
          router.push("/usuarios/dashboard");
        }}
      >
        Cancelar
      </button>
    </form>
      </div>
    </div>
    
  );
}
export default ProductForm;
