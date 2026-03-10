# Canopy Mediation Vault — dépôt éditorial de travail

Ce vault est un dépôt éditorial compatible avec le système défini : Obsidian comme source de visibilité,
Git/GitHub comme transport, Edge Function Supabase comme compilateur, tables SQL comme modèle publié.

Le vault ne contient que des objets éditoriaux.
Il ne remplace ni les tables métier, ni les objets techniques de l'application.

Pipeline attendu :

`Vault Obsidian -> GitHub -> Edge Function ingest-github-vault -> tables SQL -> applications`

L'app iOS, le site public et le back-office ne lisent jamais le vault directement.
# canopy_mediation_vault
# canopy_mediation_vault
