DELIMITER ;

DROP VIEW IF EXISTS vw_animal CASCADE;
CREATE OR REPLACE
    SQL SECURITY INVOKER 
    VIEW vw_animal 
        AS 
            select 
                `animal`.`ani_int_codigo` AS `ani_int_codigo`,
                `animal`.`ani_var_nome` AS `ani_var_nome`,
                `animal`.`ani_dec_peso` AS `ani_dec_peso`,
                `animal`.`rac_int_codigo` AS `rac_int_codigo`,
                `animal`.`pro_int_codigo` AS `pro_int_codigo`,
                `animal`.`ani_var_foto` AS `ani_var_foto`,
                `animal`.`ani_cha_vivo` AS `ani_cha_vivo`,
                (case `animal`.`ani_cha_vivo` when 'S' then 'Sim' when 'N' then 'Não' end) AS `ani_var_vivo`,
                `animal`.`ani_dti_inclusao` AS `ani_dti_inclusao`,
                date_format(`animal`.`ani_dti_inclusao`,'%d/%m/%Y %H:%i:%s') AS `ani_dtf_inclusao`
            from `animal`;

DROP VIEW IF EXISTS vw_animal_vacina CASCADE;
CREATE OR REPLACE
    SQL SECURITY INVOKER 
    VIEW vw_animal_vacina 
        AS 
            select 
                `animal_vacina`.`anv_int_codigo` AS `anv_int_codigo`,
                `animal_vacina`.`ani_int_codigo` AS `ani_int_codigo`,
                `animal_vacina`.`vac_int_codigo` AS `vac_int_codigo`,
                `animal_vacina`.`anv_dat_programacao` AS `anv_dat_programacao`,
                `animal_vacina`.`anv_dti_aplicacao` AS `anv_dti_aplicacao`,
                `animal_vacina`.`usu_int_codigo` AS `usu_int_codigo`,
                `animal_vacina`.`anv_dti_inclusao` AS `anv_dti_inclusao`,
                date_format(`animal_vacina`.`anv_dat_programacao`,'%d/%m/%Y %H:%i:%s') AS `anv_dtf_programacao`,
                date_format(`animal_vacina`.`anv_dti_inclusao`,'%d/%m/%Y %H:%i:%s') AS `anv_dif_inclusao` 
            from `animal_vacina`;

DROP VIEW IF EXISTS vw_proprietario CASCADE;
CREATE OR REPLACE
    SQL SECURITY INVOKER 
    VIEW vw_proprietario 
        AS 
            select 
                `proprietario`.`pro_int_codigo` AS `pro_int_codigo`,
                `proprietario`.`pro_var_nome` AS `pro_var_nome`,
                `proprietario`.`pro_var_email` AS `pro_var_email`,
                `proprietario`.`pro_var_telefone` AS `pro_var_telefone`,
                `proprietario`.`pro_dti_inclusao` AS `pro_dti_inclusao`,
                date_format(`proprietario`.`pro_dti_inclusao`,'%d/%m/%Y %H:%i:%s') AS `pro_dtf_inclusao` 
            from `proprietario`;

DROP VIEW IF EXISTS vw_raca CASCADE;
CREATE OR REPLACE
    SQL SECURITY INVOKER 
    VIEW vw_raca
        AS 
            select 
                `raca`.`rac_int_codigo` AS `rac_int_codigo`,
                `raca`.`rac_var_nome` AS `rac_var_nome`,
                `raca`.`rac_dti_inclusao` AS `rac_dti_inclusao`,
                date_format(`raca`.`rac_dti_inclusao`,'%d/%m/%Y %H:%i:%s') AS `rac_dtf_inclusao` 
            from `raca`;


DROP VIEW IF EXISTS vw_usuario CASCADE;
CREATE OR REPLACE
    SQL SECURITY INVOKER 
    VIEW vw_usuario 
        AS 
            select 
                `usuario`.`usu_int_codigo` AS `usu_int_codigo`,
                `usuario`.`usu_var_nome` AS `usu_var_nome`,
                `usuario`.`usu_var_email` AS `usu_var_email`,
                `usuario`.`usu_var_senha` AS `usu_var_senha`,
                `usuario`.`usu_cha_status` AS `usu_cha_status`,
                (case `usuario`.`usu_cha_status` when 'A' then 'Ativo' when 'I' then 'Inativo' end) AS `usu_var_status`,
                `usuario`.`usu_dti_inclusao` AS `usu_dti_inclusao`,
                date_format(`usuario`.`usu_dti_inclusao`,'%d/%m/%Y %H:%i:%s') AS `usu_dtf_inclusao` 
            from `usuario`;


DROP VIEW IF EXISTS vw_vacina CASCADE;
CREATE OR REPLACE
    SQL SECURITY INVOKER 
    VIEW vw_vacina 
        AS 
            select 
                `vacina`.`vac_int_codigo` AS `vac_int_codigo`,
                `vacina`.`vac_var_nome` AS `vac_var_nome`,
                `vacina`.`vac_dti_inclusao` AS `vac_dti_inclusao`,
                date_format(`vacina`.`vac_dti_inclusao`,'%d/%m/%Y %H:%i:%s') AS `vac_dtf_inclusao` 
            from `vacina`;
