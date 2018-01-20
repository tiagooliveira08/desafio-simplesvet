<?php
namespace SimplesVet\Lite\Models;

use SimplesVet\Genesis\GDbMysql;
use SimplesVet\Genesis\GDbException;
use SimplesVet\Lite\Entities\AnimalVacina as AnimalVacinaEntity;

class AnimalVacina
{
    /** 
     * @param AnimalVacina $animalVacina 
     */
    public function selectByAnimalIdForm(AnimalVacinaEntity $animalVacina) 
    {
        $return = array();
      
        try {
            $mysql = new GDbMysql();

            $mysql->execute("SELECT anv_int_codigo as codigo, ani_int_codigo as codigo_animal, vac_int_codigo as codigo_vacina, anv_dat_programacao as data_programacao, anv_dti_aplicacao as data_aplicacao, usu_int_codigo as codigo_usuario FROM vw_animal_vacina WHERE ani_int_codigo = ?", array("i", $animalVacina->getAnimal()->getCodigo()), true, MYSQLI_ASSOC);

            while($mysql->fetch()) {
                $return[] = $mysql->res;
            }
      
        } catch (GDbException $e) {
            echo $e->getError();
        }
      
        return $return;
    }

    /** 
     * @param AnimalVacina $animalVacina 
     */
    public function selectByIdForm(AnimalVacinaEntity $animalVacina) 
    {
        $ret = array();
        try {
            $mysql = new GDbMysql();
            $mysql->execute("SELECT anv_int_codigo as codigo, ani_int_codigo as codigo_animal, vac_int_codigo as codigo_vacina, anv_dat_programacao as data_programacao, anv_dti_aplicacao as data_aplicacao, usu_int_codigo as codigo_usuario FROM vw_animal_vacina WHERE anv_int_codigo = ? ", array("i", $animalVacina->getCodigo()), true, MYSQLI_ASSOC);
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
     * @param AnimalVacina $animalVacina 
     */
    public function insert(AnimalVacinaEntity $animalVacina) 
    {
        $return = array();
        $param = array("iissi",
            $animalVacina->getAnimal()->getCodigo(),
            $animalVacina->getVacina()->getCodigo(),
            $animalVacina->getDataProgramacao(),
            $animalVacina->getDataAplicacao(),
            $animalVacina->getUsuario()->getCodigo()
        );

        try{
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_animalvacina_ins(?,?,?,?,?, @p_status, @p_msg, @p_insert_id);", $param, false);
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
     * @param AnimalVacina $animalVacina 
    */
    public function delete(AnimalVacinaEntity $animalVacina) 
    {

        $return = array();
        $param = array("i",$animalVacina->getCodigo());
        try {
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_animalvacina_del(?, @p_status, @p_msg);", $param, false);
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
     * @param AnimalVacina $animalVacina 
    */
    public function aplicar(AnimalVacinaEntity $animalVacina) 
    {
        $return = array();
        $param = array("iiis",
            $animalVacina->getCodigo(),
            $animalVacina->getAnimal()->getCodigo(),
            $animalVacina->getUsuario()->getCodigo(),
            'S'
        );
        try {
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_animalvacina_aplica(?,?,?,?, @p_status, @p_msg);", $param, false);
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
