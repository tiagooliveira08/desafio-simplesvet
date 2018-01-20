<?php
namespace SimplesVet\Lite\Entities;

class AnimalVacina
{
    private $anv_int_codigo;
    /* @var $animal Animal */
    private $animal;
    /* @var $vacina Vacina */
    private $vacina;
    private $anv_dat_programacao;
    private $anv_dti_aplicacao;
    /* @var $usuario Usuario */
    private $usuario;

    public function getCodigo()
    {
        return $this->anv_int_codigo;
    }

    public function setCodigo($anv_int_codigo)
    {
        $this->anv_int_codigo = $anv_int_codigo;
    }

    /** @return Animal */
    public function getAnimal()
    {
        return $this->animal;
    }

    /** @param Animal $animal */
    public function setAnimal(Animal $animal)
    {
        $this->animal = $animal;
    }

    /** @return Vacina */
    public function getVacina()
    {
        return $this->vacina;
    }

    /** @param Vacina $vacina */
    public function setVacina(Vacina $vacina)
    {
        $this->vacina = $vacina;
    }

    public function getDataProgramacao()
    {
        return $this->anv_dat_programacao;
    }

    public function setDataProgramacao($dataProgramacao)
    {
        $this->anv_dat_programacao = $dataProgramacao;
    }

    public function getDataAplicacao()
    {
        return $this->anv_dti_aplicacao;
    }

    public function setDataAplicacao($dataAplicacao)
    {
        $this->anv_dti_aplicacao = $dataAplicacao;
    }

    /** @return Usuario */
    public function getUsuario()
    {
        return $this->usuario;
    }

    /** @param Usuario $usuario */
    public function setUsuario(Usuario $usuario)
    {
        $this->usuario = $usuario;
    }
}
