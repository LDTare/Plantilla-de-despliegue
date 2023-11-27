import { prisma } from "@/libs/prisma";

async function loadTramite(solicitudId) {
  const res = await prisma.tbl_solicitud.findUnique({
    where: {
      id: Number(solicitudId),
    },
  });
  return res;
}

async function tramitePage({ params }) {
  const solID = await loadTramite(params.id);
  return (
    <div>
      Pagina en construccion...
    </div>
  );
}
export default tramitePage;
