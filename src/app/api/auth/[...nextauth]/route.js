import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { prisma } from "@/libs/prisma";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type:"email", placeholder:" EEMQ MAIL"},
                password: { label: "Contraseña", type: "password"}, 
            },
            
            async authorize(credentials)
            {
                //verficiar las credenciales ingresadas
                if(!credentials.email || !credentials.password)
                {
                    throw new Error('Ingrese credenciales por favor')
                }
    
                //verificar si el usuario existe
                const user = await prisma.tbl_usuarios.findUnique({
                    where:{
                        email: credentials.email
                    }
                });
    
                if(!user){
                    throw new Error('Usuario no encontrado');
                }
    
                const passwordsValidate = await bcrypt.compare(credentials.password, user.password);
                if (!passwordsValidate){
                    throw new Error("Contraseña incorrecta");
                }

                return user;
            },
        })
    ],
    
    callbacks: {

        //Funcion para añadir nuevos campos al token "session"
        async jwt({ token, user, session}){
            if(user){
                return{
                    ...token,
                    id: Number(user.id),
                    nombre: user.nombre,
                    apellido: user.apellido,
                    rol_id: user.rol_id,
                }
            }
            return token;
        },

        //Funcion para exportar los campos deseados a el metodo session de react
        async session({ session, token, user}){
            return{
                ...session,
                user: {
                    id: token.id,
                    nombre: token.nombre,
                    apellido: token.apellido,
                    rol_id: token.rol_id,
                }
            };
        },
    },

    session: {
        strategy: "jwt",
        maxAge: 4 * 60 * 60, // Duración maxima de la sessión formato [horas, minutos, segundos]
    },

    pages:{
        signIn:'/auth/login',
    },
    

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}