<?php
namespace SimplesVet\Lite\Models;

use SimplesVet\Genesis\GDbMysql;
use SimplesVet\Genesis\GDbException;
use SimplesVet\Lite\Entities\Vacina as VacinaEntity;

class Vacina 
{
    public static function getAll() {
        $return = array();
      
        try {
            $mysql = new GDbMysql();

            $return = $mysql->executeCombo("SELECT * FROM vw_vacina", null, true, MYSQLI_ASSOC);
      
        } catch (GDbException $e) {
            echo $e->getError();
        }
      
        return $return;
    }

    /** 
     * @param Vacina $vacina 
     */
    public function selectByIdForm(VacinaEntity $vacina) 
    {
        $ret = array();
        try {
            $mysql = new GDbMysql();
            $mysql->execute("SELECT vac_int_codigo,vac_var_nome FROM vw_vacina WHERE vac_int_codigo = ? ", array("i", $vacina->getCodigo()), true, MYSQLI_ASSOC);
            if ($mysql->fetch()) {
                $ret = $mysql->res;
            }
            $mysql->close();
        } catch (GDbException $e) {
            echo $e->getError();
        }
        return $ret;
    }

    /** 
     * @param Vacina $vacina 
     */
    public function insert(VacinaEntity $vacina) 
    {
        $return = array();
        $param = array("s",$vacina->getNome());
        try{
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_vacina_ins(?, @p_status, @p_msg, @p_insert_id);", $param, false);
            $mysql->execute("SELECT @p_status, @p_msg, @p_insert_id");
            $mysql->fetch();
            $return["status"] = ($mysql->res[0]) ? true : false;
            $return["msg"] = $mysql->res[1];
            $return["insertId"] = $mysql->res[2];
            $mysql->close();
        } catch (GDbException $e) {
            $return["status"] = false;
            $return["msg"] = $e->getError();
        }
        return $return;
    }

    /** 
     * @param Vacina $vacina 
     */
    public function update(VacinaEntity $vacina) 
    {
        $return = array();
        $param = array("is",$vacina->getCodigo(),$vacina->getNome());
        try{
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_vacina_upd(?,?, @p_status, @p_msg);", $param, false);
            $mysql->execute("SELECT @p_status, @p_msg");
            $mysql->fetch();
            $return["status"] = ($mysql->res[0]) ? true : false;
            $return["msg"] = $mysql->res[1];
            $mysql->close();
        } catch (GDbException $e) {
            $return["status"] = false;
            $return["msg"] = $e->getError();
        }
        return $return;
    }

    /** 
     * @param Vacina $vacina 
     */
    public function delete(VacinaEntity $vacina) 
    {
        $return = array();
        $param = array("i",$vacina->getCodigo());
        try {
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_vacina_del(?, @p_status, @p_msg);", $param, false);
            $mysql->execute("SELECT @p_status, @p_msg");
            $mysql->fetch();
            $return["status"] = ($mysql->res[0]) ? true : false;
            $return["msg"] = $mysql->res[1];
            $mysql->close();
        } catch (GDbException $e) {
            $return["status"] = false;
            $return["msg"] = $e->getError();
        }
        return $return;
    }
}
