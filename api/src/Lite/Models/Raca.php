<?php
namespace SimplesVet\Lite\Models;

use SimplesVet\Genesis\GDbMysql;
use SimplesVet\Genesis\GDbException;
use SimplesVet\Lite\Entities\Raca as RacaEntity;

class Raca
{
    public static function getAll()
    {
        $return = [];
      
        try {
            $mysql = new GDbMysql();

            $return = $mysql->executeAll("
                SELECT rac_int_codigo as codigo, 
                       rac_var_nome as nome 
                FROM vw_raca");
        } catch (GDbException $e) {
            echo $e->getError();
        }
      
        return $return;
    }

    /**
     * @param Raca $raca
     */
    public static function selectByIdForm(RacaEntity $raca)
    {
        $return = [];
      
        try {
            $mysql = new GDbMysql();
            $mysql->execute(
                "
                SELECT rac_int_codigo as codigo, 
                       rac_var_nome as nome 
                FROM vw_raca WHERE rac_int_codigo = ? ",
                ["i", $raca->getCodigo()],
                true,
                MYSQLI_ASSOC
            );
    
            $return = ($mysql->fetch()) ? $mysql->res : [];
      
            $mysql->close();
        } catch (GDbException $e) {
            echo $e->getError();
        }
      
        return $return;
    }

    
    /**
     * @param Raca $raca
     */
    public static function insert(RacaEntity $raca)
    {
        $return = [];
        $param = ["s",
            $raca->getNome()
        ];

        try {
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_raca_ins(?, @p_status, @p_msg, @p_insert_id);", $param, false);
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
}
