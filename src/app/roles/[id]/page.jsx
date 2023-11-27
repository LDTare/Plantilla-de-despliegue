import { prisma } from "@/libs/prisma";

async function loadRol(rolID) {
  const res = await prisma.tbl_rol.findUnique({
    where: {
      id: Number(rolID),
    },
  });
  return res;
}

async function rolPage({ params }) {
  const rolD = await loadRol(params.id);
  return (
    <div>
      Pagina en construccion...
    </div>
  );
}
export default rolPage;