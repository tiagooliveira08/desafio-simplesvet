<?php
namespace SimplesVet\Lite\Entities;

class Raca
{
    private $rac_int_codigo;
    private $rac_var_nome;

    public function getCodigo()
    {
        return $this->rac_int_codigo;
    }

    public function setCodigo($codigo)
    {
        $this->rac_int_codigo = $codigo;
    }

    public function getNome()
    {
        return $this->rac_var_nome;
    }

    public function setNome($nome)
    {
        $this->rac_var_nome = $nome;
    }
}
