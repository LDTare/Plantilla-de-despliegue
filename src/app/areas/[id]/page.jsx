import { prisma } from "@/libs/prisma";
import Buttons from "./buttons";

async function loadArea(areaID) {
  const res = await prisma.tbl_area.findUnique({
    where: {
      id: Number(areaID),
    },
  });
  return res;
}

async function areaPage({ params }) {
  const areaD = await loadArea(params.id);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-slate-800 p-10 w-1/4">
        <label name="Nombre" className=" font-bold text-sm">
          Nombre de Area
        </label>
        <input
          type="text"
          id="nombre"
          className=" border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Nombre del area"
          defaultValue={areaD.nombre}
          required
        />
        <label name="Descripcion" className=" font-bold text-sm">
          Descripción
        </label>
        <textarea
          name="Descripcion"
          id="descripcion"
          rows="3"
          defaultValue={areaD.descripcion}
          className=" border border-gray-400 p-2 mb-4 w-full text-black"
        ></textarea>

        {/* Boton de creación de Area */}
        <Buttons areaID = {areaD.id}/>
      </div>
    </div>
  );
}
export default areaPage;
