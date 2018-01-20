<?php
namespace SimplesVet\Lite\Models;

use SimplesVet\Genesis\{GDbMysql, GDbException};
use SimplesVet\Lite\Entities\Proprietario as ProprietarioEntity;

class Proprietario
{
    public static function getAll()
    {
        $return = [];
      
        try {
            $mysql = new GDbMysql();

            $return = $mysql->executeAll("
                SELECT pro_int_codigo as codigo, 
                       pro_var_nome as nome, 
                       pro_var_email as email, 
                       pro_var_telefone as telefone 
                FROM vw_proprietario");
        } catch (GDbException $e) {
            echo $e->getError();
        }
      
        return $return;
    }

    /**
     * @param Proprietario $proprietario
     */
    public static function selectByIdForm(ProprietarioEntity $proprietario)
    {
        $return = [];
      
        try {
            $mysql = new GDbMysql();
            $mysql->execute(
                "
                SELECT pro_int_codigo as codigo, 
                       pro_var_nome as nome, 
                       pro_var_email as email, 
                       pro_var_telefone as telefone 
                FROM vw_proprietario 
                WHERE pro_int_codigo = ? ",
                ["i", $proprietario->getCodigo()],
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
     * @param Proprietario $proprietario
     */
    public static function insert(ProprietarioEntity $proprietario)
    {
        $return = [];
        $param = ["sss",
            $proprietario->getNome(),
            $proprietario->getEmail(),
            $proprietario->getTelefone()
        ];

        try {
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_proprietario_ins(?,?,?, @p_status, @p_msg, @p_insert_id);", $param, false);
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
     * @param Proprietario $proprietario
     */
    public static function update(ProprietarioEntity $proprietario)
    {
        $return = [];
        $param = ["isss",
            $proprietario->getCodigo(),
            $proprietario->getNome(),
            $proprietario->getEmail(),
            $proprietario->getTelefone()
        ];

        try {
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_proprietario_upd(?,?,?,?, @p_status, @p_msg);", $param, false);
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
     * @param Proprietario $proprietario
     */
    public function delete(ProprietarioEntity $proprietario)
    {
        $return = [];
        $param = ["i",
            $proprietario->getCodigo()
        ];
        
        try {
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_proprietario_del(?, @p_status, @p_msg);", $param, false);
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
