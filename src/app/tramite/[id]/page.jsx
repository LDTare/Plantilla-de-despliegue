import { prisma } from "@/libs/prisma";

async function loadTramite(tramiteId) {
  const res = await prisma.tbl_tramites.findUnique({
    where: {
      id: Number(tramiteId),
    },
  });
  return res;
}

async function tramitePage({ params }) {
  const rolD = await loadTramite(params.id);
  return (
    <div>
      Pagina en construccion...
    </div>
  );
}
export default tramitePage;