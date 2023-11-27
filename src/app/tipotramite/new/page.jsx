import Tipotramiteform from "@/app/components/Tipotramite_form";

function newtipotramitepage() {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12  ">
      <div>
        <h2 className="font-bold text-center text-2xl mb-5 text-black">
          Formulario para captación de datos "Tipos de trámite"
        </h2>
      </div>
      <Tipotramiteform />
    </div>
  );
}
export default newtipotramitepage;
