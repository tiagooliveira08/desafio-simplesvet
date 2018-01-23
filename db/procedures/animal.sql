DELIMITER $$
DROP PROCEDURE IF EXISTS sp_animal_ins$$
CREATE PROCEDURE sp_animal_ins(IN p_ani_var_nome VARCHAR(50), IN p_ani_dec_peso DECIMAL(8,3), IN p_rac_int_codigo INT(11), IN p_ani_cha_vivo CHAR(1), IN p_pro_int_codigo INT(11), IN p_ani_var_foto CHAR(45), INOUT p_status BOOLEAN, INOUT p_msg TEXT, INOUT p_insert_id INT(11))
    SQL SECURITY INVOKER
    COMMENT 'Procedure de Insert'
BEGIN

  DECLARE v_existe boolean;
  DECLARE pro_existe boolean;
  DECLARE rac_existe boolean;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SET p_status = FALSE;
    SET p_msg = 'Erro ao executar o procedimento.';
  END;

  SET p_msg = '';
  SET p_status = FALSE;

  -- VALIDAÇÕES
  IF p_ani_var_nome IS NULL THEN
    SET p_msg = concat(p_msg, 'Nome não informado.<br />');
  END IF;
  IF p_ani_cha_vivo IS NULL THEN
    SET p_msg = concat(p_msg, 'Status não informado.<br />');
  ELSE
    IF p_ani_cha_vivo NOT IN ('S','N') THEN
      SET p_msg = concat(p_msg, 'Status inválido.<br />');
    END IF;
  END IF;
    IF p_rac_int_codigo IS NULL THEN
    SET p_msg = concat(p_msg, 'Raca não informada.<br />');
  END IF;
     IF p_pro_int_codigo IS NULL THEN
    SET p_msg = concat(p_msg, 'Proprietario não informado.<br />');
  END IF;
  
    SELECT IF(count(1) = 0, FALSE, TRUE)
  INTO pro_existe
  FROM proprietario
  WHERE pro_int_codigo = p_pro_int_codigo;
  IF NOT pro_existe THEN
    SET p_msg = concat(p_msg, 'Proprietario não encontrado.<br />');
  END IF;
  
      SELECT IF(count(1) = 0, FALSE, TRUE)
  INTO rac_existe
  FROM raca
  WHERE rac_int_codigo = p_rac_int_codigo;
  IF NOT rac_existe THEN
    SET p_msg = concat(p_msg, 'Raca não encontrada.<br />');
  END IF;

  IF p_msg = '' THEN

    START TRANSACTION;

    INSERT INTO animal (ani_var_nome, ani_dec_peso, rac_int_codigo, ani_cha_vivo, pro_int_codigo, ani_var_foto)
    VALUES (p_ani_var_nome, p_ani_dec_peso, p_rac_int_codigo, p_ani_cha_vivo, p_pro_int_codigo, p_ani_var_foto);

    COMMIT;

    SET p_status = TRUE;
    SET p_msg = 'Um novo registro foi inserido com sucesso.';
    SET p_insert_id = LAST_INSERT_ID();

  END IF;

END
$$

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_animal_upd$$
CREATE PROCEDURE sp_animal_upd(
    IN p_ani_int_codigo INT(11), 
    IN p_ani_var_nome VARCHAR(50), 
    IN p_ani_dec_peso DECIMAL(8, 3), 
    IN p_rac_int_codigo INT(11), 
    IN p_ani_cha_vivo CHAR(1), 
    IN p_pro_int_codigo INT(11),
    IN p_ani_var_foto CHAR(45),
    INOUT p_status BOOLEAN, 
    INOUT p_msg TEXT)
    SQL SECURITY INVOKER
    COMMENT 'Procedure de Update'
BEGIN
  DECLARE v_existe BOOLEAN;

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
  FROM animal
  WHERE ani_int_codigo = p_ani_int_codigo;
  IF NOT v_existe THEN
    SET p_msg = concat(p_msg, 'Registro não encontrado.<br />');
  END IF;

  -- VALIDAÇÕES
  IF p_ani_int_codigo IS NULL THEN
    SET p_msg = concat(p_msg, 'Código não informado.<br />');
  END IF;
  
  IF p_ani_var_nome IS NULL THEN
    SET p_msg = concat(p_msg, 'Nome não informado.<br />');
  END IF;
  
  IF p_ani_cha_vivo IS NULL THEN
    SET p_msg = concat(p_msg, 'Status não informado.<br />');
  ELSE
    IF p_ani_cha_vivo NOT IN ('S','N') THEN
      SET p_msg = concat(p_msg, 'Status inválido.<br />');
    END IF;
  END IF;
  
  IF p_ani_dec_peso IS NULL THEN
    SET p_msg = concat(p_msg, 'Peso não informado.<br />');
  END IF;

    IF p_rac_int_codigo IS NULL THEN
    SET p_msg = concat(p_msg, 'Raca não informada.<br />');
  END IF;
  
     IF p_pro_int_codigo IS NULL THEN
    SET p_msg = concat(p_msg, 'Proprietario não informado.<br />');
  END IF;


  IF p_msg = '' THEN

    START TRANSACTION;

    UPDATE animal
    SET ani_var_nome = p_ani_var_nome,
        ani_cha_vivo = p_ani_cha_vivo,
        ani_dec_peso = p_ani_dec_peso,
        rac_int_codigo = p_rac_int_codigo,
        pro_int_codigo = p_pro_int_codigo,
        ani_var_foto = p_ani_var_foto 
    WHERE ani_int_codigo = p_ani_int_codigo;

    COMMIT;

    SET p_status = TRUE;
    SET p_msg = 'O registro foi alterado com sucesso';

  END IF;

END
$$

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_animal_del$$
CREATE PROCEDURE sp_animal_del(IN p_ani_int_codigo INT(11), INOUT p_status BOOLEAN, INOUT p_msg TEXT)
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
  FROM animal
  WHERE ani_int_codigo = p_ani_int_codigo;
  IF NOT v_existe THEN
    SET p_msg = concat(p_msg, 'Registro não encontrado.<br />');
  END IF;

  IF p_msg = '' THEN

    START TRANSACTION;

    DELETE FROM animal
    WHERE ani_int_codigo = p_ani_int_codigo;

    SELECT ROW_COUNT() INTO v_row_count;

    COMMIT;

    IF (v_row_count > 0) THEN
      SET p_status = TRUE;
      SET p_msg = 'O Registro foi excluído com sucesso';
    END IF;

  END IF;

END
$$