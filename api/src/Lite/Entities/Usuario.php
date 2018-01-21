<?php
namespace SimplesVet\Lite\Entities;

class Usuario
{
    private $usu_int_codigo;
    private $usu_var_nome;
    private $usu_var_email;
    private $usu_cha_status;
    private $usu_dti_inclusao;
    private $usu_var_senha;

    public function getCodigo()
    {
        return $this->usu_int_codigo;
    }

    public function setCodigo($codigo)
    {
        $this->usu_int_codigo = $codigo;
    }

    public function getNome()
    {
        return $this->usu_var_nome;
    }

    public function setNome($nome)
    {
        $this->usu_var_nome = $nome;
    }

    public function getEmail()
    {
        return $this->usu_var_email;
    }

    public function setEmail($email)
    {
        $this->usu_var_email = $email;
    }

    public function getStatus()
    {
        return $this->usu_cha_status;
    }

    public function setStatus($status)
    {
        $this->usu_cha_status = $status;
    }

    public function getDataInclusao()
    {
        return $this->usu_dti_inclusao;
    }

    public function setDataInclusao($dataInclusao)
    {
        $this->usu_dti_inclusao = $dataInclusao;
    }

    public function getSenha()
    {
        return $this->usu_var_senha;
    }

    public function setSenha($senha)
    {
        $this->usu_var_senha = password_hash($senha, PASSWORD_DEFAULT);
    }
}
