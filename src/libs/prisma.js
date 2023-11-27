

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

//const { PrismaClient } = require('@prisma/client')
//
//const globalForPrisma = global

//export const prisma =
// globalForPrisma.prisma ||
// new PrismaClient({
 //})

//if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

