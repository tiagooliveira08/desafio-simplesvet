DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
  `usu_int_codigo` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Código',
  `usu_var_nome` varchar(50) NOT NULL COMMENT 'Nome',
  `usu_var_email` varchar(100) NOT NULL COMMENT 'Email',
  `usu_cha_status` char(1) NOT NULL DEFAULT 'A' COMMENT 'Status|A:Ativo;I:Inativo',
  `usu_dti_inclusao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Inclusão',
  `usu_var_senha` varchar(255) NOT NULL,
  PRIMARY KEY (`usu_int_codigo`),
  UNIQUE KEY `UK_usuario_usu_var_email` (`usu_var_email`),
  KEY `IDX_usuario_usu_dti_inclusao` (`usu_dti_inclusao`),
  KEY `IDX_usuario_usu_var_nome` (`usu_var_nome`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 AVG_ROW_LENGTH=16384 COMMENT='Usuario';

DROP TABLE IF EXISTS raca;
CREATE TABLE raca (
  `rac_int_codigo` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Código',
  `rac_var_nome` varchar(50) NOT NULL COMMENT 'Nome',
  `rac_dti_inclusao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Inclusão',
  PRIMARY KEY (`rac_int_codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 AVG_ROW_LENGTH=5461 COMMENT='Raça';

DROP TABLE IF EXISTS proprietario;
CREATE TABLE proprietario (
  `pro_int_codigo` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Código',
  `pro_var_nome` varchar(50) NOT NULL COMMENT 'Nome',
  `pro_var_email` varchar(100) NOT NULL COMMENT 'Email',
  `pro_var_telefone` varchar(18) NOT NULL COMMENT 'Telefone',
  `pro_dti_inclusao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Inclusão',
  PRIMARY KEY (`pro_int_codigo`),
  UNIQUE KEY `UK_proprietario_pro_var_email` (`pro_var_email`),
  KEY `IDX_proprietario_pro_dti_inclusao` (`pro_dti_inclusao`),
  KEY `IDX_proprietario_pro_var_nome` (`pro_var_nome`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 AVG_ROW_LENGTH=16384 COMMENT='Proprietario';

DROP TABLE IF EXISTS animal;
CREATE TABLE animal(
  `ani_int_codigo` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Código',
  `ani_var_nome` varchar(50) NOT NULL COMMENT 'Nome',
  `ani_cha_vivo` char(1) NOT NULL DEFAULT 'S' COMMENT 'Vivo|S:Sim;N:Não',
  `ani_dec_peso` decimal(8,3) DEFAULT NULL COMMENT 'Peso',
  `rac_int_codigo` int(11) unsigned NOT NULL COMMENT 'Raça',
  `pro_int_codigo` int(11) unsigned NOT NULL COMMENT 'Proprietario',
  `ani_dti_inclusao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Inclusão',
  `ani_var_foto` varchar(45) DEFAULT NULL COMMENT 'Foto',
  PRIMARY KEY (`ani_int_codigo`),
  KEY `FK_animal_raca_rac_int_codigo` (`rac_int_codigo`),
  KEY `FK_animal_proprietario_pro_int_codigo` (`pro_int_codigo`),
  CONSTRAINT `FK_animal_proprietario_pro_int_codigo` FOREIGN KEY (`pro_int_codigo`) REFERENCES `proprietario` (`pro_int_codigo`),
  CONSTRAINT `FK_animal_raca_rac_int_codigo` FOREIGN KEY (`rac_int_codigo`) REFERENCES `raca` (`rac_int_codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 AVG_ROW_LENGTH=8192 COMMENT='Animal';

DROP TABLE IF EXISTS vacina;
CREATE TABLE vacina (
  `vac_int_codigo` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Código',
  `vac_var_nome` varchar(50) NOT NULL COMMENT 'Nome',
  `vac_dti_inclusao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Inclusão',
  PRIMARY KEY (`vac_int_codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 AVG_ROW_LENGTH=5461 COMMENT='Vacina';

DROP TABLE IF EXISTS animal_vacina;
CREATE TABLE animal_vacina (
  `anv_int_codigo` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Codigo',
  `ani_int_codigo` int(11) unsigned NOT NULL COMMENT 'Animal',
  `vac_int_codigo` int(11) unsigned NOT NULL COMMENT 'Vacina',
  `anv_dat_programacao` date NOT NULL COMMENT 'Data Programacao',
  `anv_dti_aplicacao` datetime DEFAULT NULL COMMENT 'Data Aplicacao',
  `usu_int_codigo` int(11) unsigned DEFAULT NULL COMMENT 'Usuario que aplicou',
  `anv_dti_inclusao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Inclusao',
  PRIMARY KEY (`anv_int_codigo`),
  KEY `FK_animal_vacina_usuario_usu_int_codigo` (`usu_int_codigo`),
  KEY `FK_animal_vacina_vacina_vac_int_codigo` (`vac_int_codigo`),
  KEY `FK_animal_vacina_animal_ani_int_codigo` (`ani_int_codigo`),
  CONSTRAINT `FK_animal_vacina_animal_ani_int_codigo` FOREIGN KEY (`ani_int_codigo`) REFERENCES `animal` (`ani_int_codigo`) ON DELETE CASCADE,
  CONSTRAINT `FK_animal_vacina_usuario_usu_int_codigo` FOREIGN KEY (`usu_int_codigo`) REFERENCES `usuario` (`usu_int_codigo`),
  CONSTRAINT `FK_animal_vacina_vacina_vac_int_codigo` FOREIGN KEY (`vac_int_codigo`) REFERENCES `vacina` (`vac_int_codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 AVG_ROW_LENGTH=16384 COMMENT='AnimalVacina||Agenda de Vacinação';
