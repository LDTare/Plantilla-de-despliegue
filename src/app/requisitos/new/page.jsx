import Requisitosform from "@/app/components/Requisitosform";

function newrequisitopage() {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div>
        <h2 className="font-bold text-center text-2xl mb-5 text-black">
          Formulario de captación de datos "Requisitos"
        </h2>
      </div>
      <Requisitosform />
    </div>
  );
}
export default newrequisitopage;
