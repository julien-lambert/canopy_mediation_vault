# Contrat éditorial

## Front matter obligatoire

- id
- node_kind
- site
- title
- status
- language
- version
- phrase_essence
- card_text
- attachments

## Sections de corps recommandées

- Carte
- Court
- Moyen
- Long
- Notes internes

## Exemple minimal

```yaml
---
id: med-node-thym-central-001
node_kind: node
site: devey
title: Le thym, petit mais central
slug: thym-petit-mais-central
status: draft
language: fr
version: 1
phrase_essence: >
  Une plante minuscule peut tenir ensemble cuisine, soin, pollinisation et couverture du sol.
card_text: >
  Le thym paraît modeste, mais il relie plusieurs mondes du jardin.
attachments:
  - ref: species:thymus-vulgaris
    role: primary
  - ref: theme:jardin-foret
    role: contextual
---
```
