export { default } from "next-auth/middleware"

export const config = { matcher: [
    '/actividad/:path*',
    '/asignacinoes/:path*',
    '/clientes/:path*',
    '/departamento/:path*',
    '/estadoticket/:path*',
    '/estadotramite/:path*',
    '/permiso/:path*',
    '/pasos/:path*',
    'requisitos/:path*',
    '/requisitossolicitud/:path*',
    '/registro/:path*',
    '/solicitudes/:path*',
    '/tickets/:path*',
    '/tipotramite/:path*',
    '/tramite/:path*',
    '/usuarios/:path*', 
] };