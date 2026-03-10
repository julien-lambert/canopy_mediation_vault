# Remote Table Mapping

## `public.mediation_content`
- `id` <- DB UUID
- `site_id` <- binding `content_repositories.site_id`
- `source_document_id` <- frontmatter `id`
- `source_path` <- chemin fichier vault
- `content_type` <- frontmatter `content_type`
- `title` <- frontmatter `title`
- `slug` <- frontmatter `slug`
- `status` <- frontmatter `status`
- `language` <- frontmatter `language`
- `summary` <- frontmatter `summary`
- `body_markdown` <- corps markdown
- `body_html` <- rendu HTML compilé
- `search_text` <- titre + summary + texte nettoyé
- `audiences` <- frontmatter `audiences`
- `topics` <- frontmatter `topics`
- `targets` <- frontmatter `targets`
- `version` <- frontmatter `version`
- `published_at` <- frontmatter `published_at`
- `source_updated_at` <- frontmatter `source_updated_at`
- `metadata` <- clés frontmatter non canoniques + source GitHub

## `public.mediation_links`
- 1 ligne par target parsée
- `target_type` / `target_ref` / `role` dérivés de `targets[]`

Formats `targets[]` acceptés:
- `species:prunus-armeniaca`
- `contextual|theme:jardin-foret`
- `theme:jardin-foret#contextual`

## `public.content_sources`
- trace GitHub par document compilé
- clé logique active: `(site_id, source_type, repo_owner, repo_name, branch, source_document_id)`

## `public.content_ingestion_runs`
- journal d’exécution webhook (succès/partiel/échec)
