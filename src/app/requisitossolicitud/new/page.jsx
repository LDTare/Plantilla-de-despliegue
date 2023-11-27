import Requisitossolicitudform from "@/app/components/Requisitossolicitudform";
function Req_SolicitudPage(){
    return (
        <div className="min-h-screen flex flex-col justify-center sm:py-12">
          <div>
            <h2 className="font-bold text-center text-2xl mb-5 text-black">
              Asignación de requisitos a un trámite
            </h2>
          </div>
          <Requisitossolicitudform/>
        </div>
      );
}
export default Req_SolicitudPage;