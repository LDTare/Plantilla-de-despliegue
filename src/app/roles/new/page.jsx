import RolForm from "@/app/components/Rol_Form";
import Link from "next/link";

function newRolPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <h2 className="font-bold text-center text-2xl mb-5 text-black">
          Formulario de captación de datos "Areas"
        </h2>
        </div>
      <RolForm />
    </div>
  );
}
export default newRolPage;
