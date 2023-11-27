import Actividadform from "@/app/components/Actividadform";

function newactividadpage() {
  return (
    <div className='min-h-screen flex flex-col justify-center sm:py-12'>
      <div>
        <h2 className='font-bold text-center text-2xl mb-5 text-black'>
          Formulario de captación de datos "Actividades"
        </h2>
      </div>
      <Actividadform />
    </div>
  );
}
export default newactividadpage;
