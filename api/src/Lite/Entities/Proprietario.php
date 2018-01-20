<?php
namespace SimplesVet\Lite\Entities;

class Proprietario
{
    private $pro_int_codigo;
	private $pro_var_nome;
	private $pro_var_email;
	private $pro_var_telefone;

	public function getCodigo() {
		return $this->pro_int_codigo;
	}

	public function setCodigo($codigo) {
		$this->pro_int_codigo = $codigo;
	}

	public function getNome() {
		return $this->pro_var_nome;
	}

	public function setNome($nome) {
		$this->pro_var_nome = $nome;
	}

    public function getEmail() {
		return $this->pro_var_email;
	}

	public function setEmail($email) {
		$this->pro_var_email = $email;
    }
    
    public function getTelefone() {
		return $this->pro_var_telefone;
	}

	public function setTelefone($telefone) {
		$this->pro_var_telefone = $telefone;
	}
}