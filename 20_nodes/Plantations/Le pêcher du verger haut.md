---
id: med-node-pecher-verger-haut-001
node_kind: node
site: devey
title: Le pêcher du verger haut
slug: pecher-du-verger-haut
status: draft
language: fr
version: 1
phrase_essence: >
  Ce pêcher n'est pas seulement une espèce ; c'est un individu situé, exposé, attendu, pris dans une histoire locale.
card_text: >
  En scannant ce point, on ne lit pas « le pêcher » en général, mais ce pêcher-ci :
  placé ici, dans ce verger, avec cette lumière, cette pente et cette promesse.
summary_short: >
  Ce nœud sert d'entrée par scan vers une plantation précise.
attachments:
  - ref: planting:devey-verger-haut-pecher-001
    role: primary
  - ref: species:prunus-persica
    role: contextual
  - ref: zone:verger-haut
    role: located_in
  - ref: scan:qr-devey-pecher-001
    role: scan_entry
related:
  - med-node-pecher-espece-001
edges:
  - to: med-node-pecher-espece-001
    role: extends
tags: [pecher, planting, qr, verger]
visibility: public
priority: 90
sort_key: 90
---

## Carte

Ici, le pêcher n'est plus une idée générale. Il devient un individu.

## Court

Ce point du jardin permet de passer de l'espèce à l'individu. Le pêcher n'est pas seulement « un fruitier » :
il est cet arbre-ci, implanté dans le verger haut.

## Moyen

La médiation change quand on quitte la catégorie générale pour rejoindre un être situé. Ce pêcher du verger haut
n'est pas interchangeable. Même s'il relève de l'espèce prunus persica, il a sa place propre dans le site.

## Long

Lire une plantation concrète, c'est accepter qu'un jardin soit fait d'individus et pas seulement de catégories.
L'espèce donne un cadre. La plantation donne une situation. Entre les deux, il y a toute la matière du jardin :
le lieu exact, les gestes, les accidents, la croissance, les espoirs, les ajustements.

## Notes internes

Ce nœud doit rester synchronisé avec un vrai identifiant de plantation côté tables.
