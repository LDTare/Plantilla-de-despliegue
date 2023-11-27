import AreaForm from "@/app/components/Area_Form";
import Link from "next/link";

function newAreaPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div>
        <h2 className="font-bold text-center text-2xl mb-5 text-black">
          Formulario de captación de datos "Areas"
        </h2>
      </div>
      <AreaForm />
    </div>
  );
}
export default newAreaPage;
