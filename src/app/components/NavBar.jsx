"use client"
import Link from "next/link";
import DropdownMenu from "./drop_Menu";
import { signIn, useSession, signOut } from "next-auth/react";

const dropClientes = [

  { name: 'Inicio', link: '/usuarios/dashboard' },
  { name: 'Permisos', link: '/permiso/dashboard'},
  { name: 'Roles', link: '/roles/dashboard'},
]

const dropDepartamentos = [
  {name: 'Inicio', link: '/departamento/dashboard'},
  {name: 'Puestos', link: '/areas/dashboard'},
]

const dropTramites = [
  { name: 'Inicio', link: '/tramite/dashboard'},
  { name: 'Solicitudes', link: '/solicitudes/dashboard'},
  { name: 'Requisitos solicitud', link: '/requisitossolicitud/dashboard'},
  { name: 'Requisitos', link: '/requisitos/dashboard'},
  { name: 'Estados', link: '/estadotramite/dashboard'},
  { name: 'Tipos de tramite', link: '/tipotramite/dashboard'}
]

const Navbar = () => {
  const {data: session, status} = useSession();
  return (
    <nav className="bg-blue-950 py-5 ">
      <div className="container mx-auto flex justify-between items-center">
        <h3 className="font-bold text-3xl">EEMQ Trámites</h3>
        { session?.user ? (
        <ul className="flex gap-x-2 text-lg font-bold">
          <li>
            <Link href="/">Inicio</Link>
          </li>
         <li>
          <Link href="/asignaciones/dashboard">Asignaciones</Link>
         </li>
          <li>
            <Link href="/clientes/dashboard"> Clientes</Link>
          </li>
          <li>
            <Link href="/actividad/dashboard"> Actividades </Link>
          </li>
          <li>
          <DropdownMenu items={dropClientes} nombre={'Usuarios'}/>
          </li>
          <li>
            <Link rel="stylesheet" href="/pasos/dashboard">Procesos</Link>
          </li>
          <li>
            <DropdownMenu items={dropDepartamentos} nombre={'Departamentos'} />
          </li>
          <li>
            <DropdownMenu items={dropTramites} nombre={'Trámites'} />
          </li>
          <button onClick={()=>signOut({callbackUrl:'/'})}>Cerrar Sesión</button>
        </ul>
        ): (
          <ul className="flex gap-x-2 text-lg font-bold">
            <li>
            <Link href="/"> Inicio</Link>
            </li>
          <li>
            <button onClick={()=> signIn()}>
            Iniciar sesion
          </button>
          </li>
          <li>
          <button>
            <Link href="/auth/register"> Registrarse </Link>
          </button>
          </li>
          </ul>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
