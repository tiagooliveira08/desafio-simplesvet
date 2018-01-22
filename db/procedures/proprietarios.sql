DELIMITER $$
DROP PROCEDURE IF EXISTS sp_proprietario_ins$$
CREATE PROCEDURE sp_proprietario_ins(IN p_pro_var_nome VARCHAR(50), IN p_pro_var_email VARCHAR(100), IN p_pro_var_telefone VARCHAR(18), INOUT p_status BOOLEAN, INOUT p_msg TEXT, INOUT p_insert_id INT(11))
    SQL SECURITY INVOKER
    COMMENT 'Procedure de Insert'
BEGIN

  DECLARE v_existe boolean;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SET p_status = FALSE;
    SET p_msg = 'Erro ao executar o procedimento.';
  END;

  SET p_msg = '';
  SET p_status = FALSE;

  -- VALIDAÇÕES
  IF p_pro_var_nome IS NULL THEN
    SET p_msg = concat(p_msg, 'Nome não informado.<br />');
  END IF;
  IF p_pro_var_email IS NULL THEN
    SET p_msg = concat(p_msg, 'Email não informado.<br />');
  ELSE
    IF p_pro_var_email NOT REGEXP '^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$' THEN
      SET p_msg = concat(p_msg, 'Email em formato inválido.<br />');
    END IF;
  END IF;
  IF p_pro_var_telefone IS NULL THEN
    SET p_msg = concat(p_msg, 'Telefone não informado.<br />');
  END IF;

  SELECT IF(COUNT(1) > 0, TRUE, FALSE)
  INTO v_existe
  FROM proprietario
  WHERE pro_var_email = p_pro_var_email;
  IF v_existe THEN
    SET p_msg = concat(p_msg, 'Já existe proprietário com este email.<br />');
  END IF;

  IF p_msg = '' THEN

    START TRANSACTION;

    INSERT INTO proprietario (pro_var_nome, pro_var_email, pro_var_telefone)
    VALUES (p_pro_var_nome, p_pro_var_email, p_pro_var_telefone);

    COMMIT;

    SET p_status = TRUE;
    SET p_msg = 'Um novo registro foi inserido com sucesso.';
    SET p_insert_id = LAST_INSERT_ID();

  END IF;

END
$$

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_proprietario_upd$$
CREATE PROCEDURE sp_proprietario_upd(IN p_pro_int_codigo INT(11), IN p_pro_var_nome VARCHAR(50), IN p_pro_var_email VARCHAR(100), IN p_pro_var_telefone VARCHAR(18), INOUT p_status BOOLEAN, INOUT p_msg TEXT)
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
  FROM proprietario
  WHERE pro_int_codigo = p_pro_int_codigo;
  IF NOT v_existe THEN
    SET p_msg = concat(p_msg, 'Registro não encontrado.<br />');
  END IF;

  -- VALIDAÇÕES
  IF p_pro_int_codigo IS NULL THEN
    SET p_msg = concat(p_msg, 'Código não informado.<br />');
  END IF;
  IF p_pro_var_nome IS NULL THEN
    SET p_msg = concat(p_msg, 'Nome não informado.<br />');
  END IF;
  IF p_pro_var_email IS NULL THEN
    SET p_msg = concat(p_msg, 'Email não informado.<br />');
  ELSE
    IF p_pro_var_email NOT REGEXP '^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$' THEN
      SET p_msg = concat(p_msg, 'Email em formato inválido.<br />');
    END IF;
  END IF;
  IF p_pro_var_telefone IS NULL THEN
    SET p_msg = concat(p_msg, 'Telefone não informado.<br />');
  END IF;

  SELECT IF(COUNT(1) > 0, TRUE, FALSE)
  INTO v_existe
  FROM proprietario
  WHERE pro_var_email = p_pro_var_email
        AND pro_int_codigo <> p_pro_int_codigo;
  IF v_existe THEN
    SET p_msg = concat(p_msg, 'Já existe outro proprietário com este email.<br />');
  END IF;

  IF p_msg = '' THEN

    START TRANSACTION;

    UPDATE proprietario
    SET pro_var_nome = p_pro_var_nome,
        pro_var_email = p_pro_var_email,
        pro_var_telefone = p_pro_var_telefone
    WHERE pro_int_codigo = p_pro_int_codigo;

    COMMIT;

    SET p_status = TRUE;
    SET p_msg = 'O registro foi alterado com sucesso';

  END IF;

END
$$

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_proprietario_del$$
CREATE PROCEDURE sp_proprietario_del(IN p_pro_int_codigo INT(11), INOUT p_status BOOLEAN, INOUT p_msg TEXT)
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
  FROM proprietario
  WHERE pro_int_codigo = p_pro_int_codigo;
  IF NOT v_existe THEN
    SET p_msg = concat(p_msg, 'Registro não encontrado.<br />');
  END IF;

  IF p_msg = '' THEN

    START TRANSACTION;

    DELETE FROM proprietario
    WHERE pro_int_codigo = p_pro_int_codigo;

    SELECT ROW_COUNT() INTO v_row_count;

    COMMIT;

    IF (v_row_count > 0) THEN
      SET p_status = TRUE;
      SET p_msg = 'O Registro foi excluído com sucesso';
    END IF;

  END IF;

END
$$
