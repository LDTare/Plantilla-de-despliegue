import Clientform from "@/app/components/formularioclientes";

function newclientepage() {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div>
        <h2 className="font-bold text-center text-2xl mb-5 text-black">
          Formulario de captación de datos "Clientes"
        </h2>
      </div>
      <Clientform />
    </div>
  );
}
export default newclientepage;
