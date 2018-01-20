<?php
namespace SimplesVet\Lite\Entities;

class Vacina
{
	private $vac_int_codigo;
	private $vac_var_nome;

	public function getCodigo() 
	{
		return $this->vac_int_codigo;
	}

	public function setCodigo($codigo) 
	{
		$this->vac_int_codigo = $codigo;
	}

	public function getNome() 
	{
		return $this->vac_var_nome;
	}

	public function setNome($nome) 
	{
		$this->vac_var_nome = $nome;
	}
}
