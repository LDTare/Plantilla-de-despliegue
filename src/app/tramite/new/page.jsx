import TramiteForm from "@/app/components/Tramite_Form";
import Link from "next/link";

function newTramitePage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <button className=" rounded bg-indigo-500 hover:bg-indigo-700 px-5 py-2 w-1/4 my-5">
        <Link href="/tramite/dashboard"> Regresar</Link>
      </button>
      <TramiteForm />
    </div>
  );
}
export default newTramitePage;
