import SolicitudForm from "@/app/components/Solicitud_Form";
import Link from "next/link";

function newSolicitudPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div>
        <h2 className="font-bold text-center text-2xl mb-5 text-black">
          Formulario de captación de solicitudes
        </h2>
      </div>
      <SolicitudForm />
    </div>
  );
}
export default newSolicitudPage;
