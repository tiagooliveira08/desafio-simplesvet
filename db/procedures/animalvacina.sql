DELIMITER $$
DROP PROCEDURE IF EXISTS sp_animalvacina_ins$$
CREATE PROCEDURE sp_animalvacina_ins(
    IN p_ani_int_codigo INT(11), 
    IN p_vac_int_codigo INT(11), 
    IN p_anv_dat_programacao DATE,
    IN p_anv_dti_aplicacao DATETIME,
    IN p_usu_int_codigo INT(11), 
    INOUT p_status BOOLEAN, 
    INOUT p_msg TEXT,
    INOUT p_insert_id INT(11))
    SQL SECURITY INVOKER
    COMMENT 'Procedure de Insert'
BEGIN

  DECLARE v_existe boolean;
  DECLARE v_ani_cha_vivo char(1);

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SET p_status = FALSE;
    SET p_msg = 'Erro ao executar o procedimento.';
  END;

  SET p_msg = '';
  SET p_status = FALSE;


  -- VALIDAÇÕES  
  SELECT a.ani_cha_vivo
  INTO v_ani_cha_vivo
  FROM animal a
  WHERE a.ani_int_codigo = p_ani_int_codigo;
  IF v_ani_cha_vivo = 'N' THEN
    SET p_msg = CONCAT(p_msg, 'Não pode ser programada uma vacina para um animal morto. <br />');
   END IF;


  IF p_msg = '' THEN

    START TRANSACTION;

	INSERT INTO animal_vacina (ani_int_codigo, vac_int_codigo, anv_dat_programacao, anv_dti_aplicacao,usu_int_codigo)
    VALUES (p_ani_int_codigo, p_vac_int_codigo, p_anv_dat_programacao, p_anv_dti_aplicacao,p_usu_int_codigo);

    COMMIT;

    SET p_status = TRUE;
    SET p_msg = 'Um novo registro foi inserido com sucesso.';
    SET p_insert_id = LAST_INSERT_ID();

  END IF;

END
$$


DELIMITER $$
DROP PROCEDURE IF EXISTS sp_animalvacina_del$$
CREATE PROCEDURE sp_animalvacina_del(IN p_anv_int_codigo INT(11), INOUT p_status BOOLEAN, INOUT p_msg TEXT)
    SQL SECURITY INVOKER
    COMMENT 'Procedure de Delete'
BEGIN

  DECLARE v_existe BOOLEAN;
  DECLARE v_row_count int DEFAULT 0;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SET p_status = FALSE;
    SET p_msg = 'Erro ao executar o procedimento.';
  END;

  SET p_msg = '';
  SET p_status = FALSE;

  -- VALIDAÇÕES
  SELECT IF(count(1) = 0, FALSE, TRUE)
  INTO v_existe
  FROM animal_vacina
  WHERE anv_int_codigo = p_anv_int_codigo;
  IF NOT v_existe THEN
    SET p_msg = concat(p_msg, 'Registro não encontrado.<br />');
  END IF;

  IF p_msg = '' THEN

    START TRANSACTION;

    DELETE FROM animal_vacina
    WHERE anv_int_codigo = p_anv_int_codigo;

    SELECT ROW_COUNT() INTO v_row_count;

    COMMIT;

    IF (v_row_count > 0) THEN
      SET p_status = TRUE;
      SET p_msg = 'O Registro foi excluído com sucesso';
    END IF;

  END IF;

END$$


DELIMITER $$
DROP PROCEDURE IF EXISTS sp_animalvacina_aplica$$
CREATE PROCEDURE sp_animalvacina_aplica(IN p_anv_int_codigo INT(11), IN p_ani_int_codigo INT(11), IN p_usu_int_codigo INT(11), IN p_aplica CHAR(1), INOUT p_status BOOLEAN, INOUT p_msg TEXT)
    SQL SECURITY INVOKER
    COMMENT 'Procedure de Update'
BEGIN

  DECLARE v_existe boolean;
  DECLARE v_ani_cha_vivo char(1);

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SET p_status = FALSE;
    SET p_msg = 'Erro ao executar o procedimento.';
  END;

  SET p_msg = '';
  SET p_status = FALSE;


    -- VALIDACOES
   SELECT IF(count(1) = 0, FALSE, TRUE)
  INTO v_existe
  FROM animal_vacina
  WHERE anv_int_codigo = p_anv_int_codigo;
  IF NOT v_existe THEN
    SET p_msg = concat(p_msg, 'Registro não encontrado.<br />');
  END IF;

  -- VALIDAÇÕES
  SELECT a.ani_cha_vivo
  INTO v_ani_cha_vivo
  FROM animal a
  WHERE a.ani_int_codigo = p_ani_int_codigo;
  IF v_ani_cha_vivo = 'N' THEN
    SET p_msg = CONCAT(p_msg, 'Não pode ser programada uma vacina para um animal morto. <br />');
   END IF;

  IF p_aplica NOT IN ('S', 'N') THEN
    SET p_msg = CONCAT(p_msg, 'Tipo de Aplicação Inválido. <br />');
  END IF;

  IF p_msg = '' THEN

    START TRANSACTION;

    UPDATE animal_vacina SET
      anv_dti_aplicacao = IF(p_aplica = 'S', CURRENT_TIMESTAMP(), NULL),
      usu_int_codigo = IF(p_aplica = 'S',  p_usu_int_codigo, NULL)
    WHERE anv_int_codigo = p_anv_int_codigo;

    COMMIT;

    SET p_status = TRUE;
    SET p_msg = 'O registro foi alterado com sucesso.';

  END IF;

END
$$
