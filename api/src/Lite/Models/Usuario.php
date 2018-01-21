<?php
namespace SimplesVet\Lite\Models;

use SimplesVet\Genesis\{GDbMysql, GDbException};
use SimplesVet\Lite\Entities\Usuario as UsuarioEntity;

class Usuario
{
    public static function findByEmail(UsuarioEntity $usuario)
    {
        $result = null;

        try {
            $mysql = new GDbMysql;
            $mysql->execute(
                "
                SELECT usu_int_codigo as codigo, 
                       usu_var_nome as nome, 
                       usu_var_email as email, 
                       usu_var_senha as senha,
                       usu_cha_status as user_status 
                FROM vw_usuario
                WHERE usu_var_email = ? AND usu_cha_status = ?",
                ["ss", $usuario->getEmail(), 'A'],
                true,
                MYSQLI_ASSOC
            );

            if ($mysql->fetch()) {
                $result = $mysql->res;
            }
            
            $mysql->close();
        } catch (GDbException $e) {
            echo $e->getError();
        }

        return $result;
    }

    /**
     * @param Usuario $usuario
     */
    public static function selectByIdForm(UsuarioEntity $usuario)
    {
        $ret = [];
        try {
            $mysql = new GDbMysql();
            $mysql->execute(
                "
                SELECT usu_int_codigo as codigo, 
                       usu_var_nome as nome, 
                       usu_var_email as email, 
                       usu_cha_status as user_status 
                FROM vw_usuario 
                WHERE usu_int_codigo = ? ",
                ["i", $usuario->getCodigo()],
                true,
                MYSQLI_ASSOC
            );
            
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
     * @param Usuario $usuario
     */
    public static function insert(UsuarioEntity $usuario)
    {
        $return = [];
        $param = ["ssss",
            $usuario->getNome(),
            $usuario->getEmail(),
            $usuario->getStatus(),
            $usuario->getSenha()
        ];

        try {
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_usuario_ins(?,?,?,?, @p_status, @p_msg, @p_insert_id);", $param, false);
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
     * @param Usuario $usuario
     */
    public static function update(UsuarioEntity $usuario)
    {
        $return = [];
        $param = ["issss",
            $usuario->getCodigo(),
            $usuario->getNome(),
            $usuario->getEmail(),
            $usuario->getStatus(),
            $usuario->getSenha()
        ];

        try {
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_usuario_upd(?,?,?,?,?, @p_status, @p_msg);", $param, false);
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
     * @param Usuario $usuario
     */
    public static function delete(UsuarioEntity $usuario)
    {
        $return = [];
        $param = ["i",$usuario->getCodigo()];

        try {
            $mysql = new GDbMysql();
            $mysql->execute("CALL sp_usuario_del(?, @p_status, @p_msg);", $param, false);
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
