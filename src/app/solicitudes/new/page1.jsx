import SolicitudUpdate_Form from "@/app/components/SolicitudUpdate_Form";
import Link from "next/link";

function newSolicitudPage(){
    return(
        <div className="h-screen flex justify-center items-center">
            <SolicitudUpdate_Form />
        </div>
    )
}
export default newSolicitudPage;