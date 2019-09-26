import React from 'react';
import './MainContent.scss';

const MainContent = props => (
  <main className="front-page">
    <section>
      <article className="frontpage-picture">
        <img src="/network.png" alt="network" />
      </article>
      <article className="frontpage-text">
        <p>
          <strong>Pytheas</strong> est un outil d’aide à la construction et à l’exploration de corpus de documents scientifiques issus du réservoir ISTEX.
            </p>
        <p>
          Cet outil sera destiné à toute personne qui désire construire un corpus et l’explorer en s’appuyant sur une <strong>représentation thématique de l’information</strong>, à plat (listes de concepts) ou structurée (cartographies de concepts) ainsi que sur des informations quantitatives de <strong>répartition de données bibliographiques.</strong>
        </p>
        <p>
          Cette application fait partie du projet VisaTM dont l’objectif est d’étudier les conditions de production de services de fouille de données textuelles (TDM) à haute valeur ajoutée basés sur l’analyse.
            </p>
      </article>
    </section>

    <section className="frontpage-diagram">
    </section>
  </main>
);

export default MainContent;
