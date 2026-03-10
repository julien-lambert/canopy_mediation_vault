# Workflow Vault -> Ingestion

Ce vault est un artefact de développement.

## Structure
- `10_corpus/`, `20_nodes/`, `30_paths/`, `40_fragments/`: source éditoriale auteur.
- `content/`: sortie normalisée pour l'Edge Function `ingest-github-vault`.

## Règle
- On édite dans les dossiers source.
- Avant commit/push du repo vault, on régénère `content/`.
- L'ingestion lit uniquement `content/` (binding `root_path = content`).

## Commandes
```bash
npm install
npm run build:content
```

## Contrat cible (content)
Frontmatter minimal garanti:
- `id`
- `kind` = `mediation`
- `content_type`
- `title`
- `slug`
- `status` (`draft|review|published|archived`)
- `site_ref`
- `language`
- `version`
- `summary`
- `audiences[]`
- `topics[]`
- `targets[]`
