import React from 'react';
import {
  PageHeader,
  Page,
} from '../../components';

export default () => (
  <div className="page--home">
    <PageHeader title="Bem-Vindo" />
    <Page>
      <p>SimplesVet App em React :)</p>
      <p>Essa é uma aplicação bastante simples e com possíveis
          falhas pois foi feita com muita pressa para prova de conceito.
      </p>
    </Page>
  </div>
);
