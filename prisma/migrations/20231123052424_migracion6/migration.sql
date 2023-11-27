/*
  Warnings:

  - You are about to drop the `tbl_tarasignaciones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_tarasignaciones` DROP FOREIGN KEY `tbl_tarasignaciones_Correlativo_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_tarasignaciones` DROP FOREIGN KEY `tbl_tarasignaciones_Destinatarios_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_tarasignaciones` DROP FOREIGN KEY `tbl_tarasignaciones_Remitente_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_tarasignaciones` DROP FOREIGN KEY `tbl_tarasignaciones_paso_id_fkey`;

-- DropTable
DROP TABLE `tbl_tarasignaciones`;
