import ProductForm from "../../components/User_Form";
import Link from "next/link";

function UsuariosPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div>
        <h2 className="font-bold text-center text-2xl mb-5 text-black">
          Formulario de captación de datos "Usuarios"
        </h2>
      </div>
      <ProductForm />
    </div>
  );
}
export default UsuariosPage;
