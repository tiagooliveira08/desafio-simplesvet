<?php
namespace SimplesVet\Lite\Models;

use SimplesVet\Genesis\GDbMysql;
use SimplesVet\Genesis\GDbException;
use SimplesVet\Lite\Entities\Animal as AnimalEntity;

class Animal 
{
    public static function getAll() {
        $return = array();
      
        try {
            $mysql = new GDbMysql();

            $return = $mysql->executeAll("SELECT ani_int_codigo as codigo, ani_var_nome as nome, ani_cha_vivo as vivo, ani_dec_peso as peso, rac_int_codigo as raca, pro_int_codigo as proprietario FROM vw_animal");
        
        } catch (GDbException $e) {
            echo $e->getError();
        }
      
        return $return;
    }

    /** 
     * @param Animal $animal 
     */
    public function selectByIdForm(AnimalEntity $animal) 
    {
        $ret = array();
        try {
            $mysql = new GDbMysql();
            $mysql->execute("SELECT ani_int_codigo as codigo, ani_var_nome as nome, ani_cha_vivo as vivo, ani_dec_peso as peso, rac_int_codigo as raca, pro_int_codigo as proprietario FROM vw_animal WHERE ani_int_codigo = ? ", array("i", $animal->getCodigo()), true, MYSQLI_ASSOC);
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
     * @param Animal $animal 
     */
    public function insert(AnimalEntity $animal) 
    {
        $return = array();
        $param = array("sdisi",
            $animal->getNome(),
            $animal->getPeso(),
            $animal->getRaca()->getCodigo(),
            $animal->getVivo(),
            $animal->getProprietario()->getCodigo()
        );

        try{
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_animal_ins(?,?,?,?,?, @p_status, @p_msg, @p_insert_id);", $param, false);
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
     * @param Animal $animal 
     */
    public function update(AnimalEntity $animal) 
    {
        $return = array();
        $param = array("isdisi",
            $animal->getCodigo(),
            $animal->getNome(),
            $animal->getPeso(),
            $animal->getRaca()->getCodigo(),
            $animal->getVivo(),
            $animal->getProprietario()->getCodigo()
        );

        try{
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_animal_upd(?,?,?,?,?,?, @p_status, @p_msg);", $param, false);
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
     * @param Animal $animal 
     */
    public function delete(AnimalEntity $animal) 
    {
        $return = array();
        $param = array("i",$animal->getCodigo());
        try {
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_animal_del(?, @p_status, @p_msg);", $param, false);
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