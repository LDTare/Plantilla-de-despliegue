-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `image` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `Telefono` INTEGER NOT NULL,
    `rol_id` INTEGER NOT NULL,
    `area_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `tbl_usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tramites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `correlativo` VARCHAR(191) NOT NULL,
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NULL,
    `id_estado` INTEGER NOT NULL,
    `tt_id` INTEGER NOT NULL,
    `sol_id` INTEGER NOT NULL,
    `client_id` DOUBLE NOT NULL,

    UNIQUE INDEX `tbl_tramites_correlativo_key`(`correlativo`),
    PRIMARY KEY (`id`, `correlativo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL DEFAULT 'Rol EMMQ',
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_area` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL DEFAULT 'Area EMMQ',
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_requisitott` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tt_id` INTEGER NOT NULL,
    `requisito_id` INTEGER NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_estadosolicitud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_solicitud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Motivo` VARCHAR(191) NOT NULL,
    `Fecha` DATE NOT NULL,
    `tipotra_id` INTEGER NOT NULL,
    `cliente_dpi` DOUBLE NOT NULL,
    `estadosolicitud_id` INTEGER NOT NULL,
    `comentario` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tipotramites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Nomenclatura` VARCHAR(45) NOT NULL,
    `tiempo_promedio` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL DEFAULT 'Descripcion tipo de trámite',
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_requisito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL DEFAULT 'Descripcion requisito',
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `DPI` DOUBLE NOT NULL,
    `Nombre` CHAR(200) NOT NULL,
    `Apellido` CHAR(200) NOT NULL,
    `Correo` VARCHAR(200) NOT NULL,
    `Telefono` DOUBLE NOT NULL,
    `NIM` DOUBLE NOT NULL,
    `NIT` DOUBLE NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `tbl_clientes_DPI_key`(`DPI`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tipotramite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` CHAR(200) NOT NULL,
    `Nomenclatura` VARCHAR(200) NOT NULL,
    `Tiempopromedio` DOUBLE NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_estadotramite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` CHAR(200) NOT NULL,
    `Color` VARCHAR(200) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_departamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` CHAR(200) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_permiso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` CHAR(200) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_actividad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` CHAR(200) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,
    `departamento_id` INTEGER NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_paso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` CHAR(200) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,
    `departamento_id` INTEGER NOT NULL,
    `actividad_id` INTEGER NOT NULL,
    `tipoTramite_id` INTEGER NOT NULL,
    `secuencia` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_Remitentes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Usuario_id` INTEGER NOT NULL,
    `Fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tarasignaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL,
    `paso_id` INTEGER NOT NULL,
    `Correlativo` VARCHAR(191) NOT NULL,
    `Destinatarios` INTEGER NOT NULL,
    `Remitente_id` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_tarasignaciones_Remitente_id_key`(`Remitente_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_asignaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL,
    `paso_id` INTEGER NOT NULL,
    `Correlativo` VARCHAR(191) NOT NULL,
    `Destinatarios` INTEGER NOT NULL,
    `Remitente_id` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_asignaciones_Remitente_id_key`(`Remitente_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tbl_usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tbl_usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_usuarios` ADD CONSTRAINT `tbl_usuarios_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `tbl_rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_usuarios` ADD CONSTRAINT `tbl_usuarios_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `tbl_area`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_tramites` ADD CONSTRAINT `tbl_tramites_tt_id_fkey` FOREIGN KEY (`tt_id`) REFERENCES `tbl_tipotramites`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_tramites` ADD CONSTRAINT `tbl_tramites_sol_id_fkey` FOREIGN KEY (`sol_id`) REFERENCES `tbl_solicitud`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_tramites` ADD CONSTRAINT `tbl_tramites_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `tbl_clientes`(`DPI`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_requisitott` ADD CONSTRAINT `tbl_requisitott_tt_id_fkey` FOREIGN KEY (`tt_id`) REFERENCES `tbl_tipotramites`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_requisitott` ADD CONSTRAINT `tbl_requisitott_requisito_id_fkey` FOREIGN KEY (`requisito_id`) REFERENCES `tbl_requisito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_solicitud` ADD CONSTRAINT `tbl_solicitud_estadosolicitud_id_fkey` FOREIGN KEY (`estadosolicitud_id`) REFERENCES `tbl_estadosolicitud`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_solicitud` ADD CONSTRAINT `tbl_solicitud_tipotra_id_fkey` FOREIGN KEY (`tipotra_id`) REFERENCES `tbl_tipotramites`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_solicitud` ADD CONSTRAINT `tbl_solicitud_cliente_dpi_fkey` FOREIGN KEY (`cliente_dpi`) REFERENCES `tbl_clientes`(`DPI`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_actividad` ADD CONSTRAINT `tbl_actividad_departamento_id_fkey` FOREIGN KEY (`departamento_id`) REFERENCES `tbl_departamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_paso` ADD CONSTRAINT `tbl_paso_departamento_id_fkey` FOREIGN KEY (`departamento_id`) REFERENCES `tbl_departamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_paso` ADD CONSTRAINT `tbl_paso_actividad_id_fkey` FOREIGN KEY (`actividad_id`) REFERENCES `tbl_actividad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_paso` ADD CONSTRAINT `tbl_paso_tipoTramite_id_fkey` FOREIGN KEY (`tipoTramite_id`) REFERENCES `tbl_tipotramites`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_Remitentes` ADD CONSTRAINT `tbl_Remitentes_Usuario_id_fkey` FOREIGN KEY (`Usuario_id`) REFERENCES `tbl_usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_tarasignaciones` ADD CONSTRAINT `tbl_tarasignaciones_paso_id_fkey` FOREIGN KEY (`paso_id`) REFERENCES `tbl_paso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_tarasignaciones` ADD CONSTRAINT `tbl_tarasignaciones_Correlativo_fkey` FOREIGN KEY (`Correlativo`) REFERENCES `tbl_tramites`(`correlativo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_tarasignaciones` ADD CONSTRAINT `tbl_tarasignaciones_Destinatarios_fkey` FOREIGN KEY (`Destinatarios`) REFERENCES `tbl_usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_tarasignaciones` ADD CONSTRAINT `tbl_tarasignaciones_Remitente_id_fkey` FOREIGN KEY (`Remitente_id`) REFERENCES `tbl_Remitentes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_asignaciones` ADD CONSTRAINT `tbl_asignaciones_paso_id_fkey` FOREIGN KEY (`paso_id`) REFERENCES `tbl_paso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_asignaciones` ADD CONSTRAINT `tbl_asignaciones_Correlativo_fkey` FOREIGN KEY (`Correlativo`) REFERENCES `tbl_tramites`(`correlativo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_asignaciones` ADD CONSTRAINT `tbl_asignaciones_Destinatarios_fkey` FOREIGN KEY (`Destinatarios`) REFERENCES `tbl_usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_asignaciones` ADD CONSTRAINT `tbl_asignaciones_Remitente_id_fkey` FOREIGN KEY (`Remitente_id`) REFERENCES `tbl_Remitentes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
