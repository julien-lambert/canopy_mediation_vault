# Compiler contract

L'Edge Function `ingest-github-vault` doit :
1. lire le front matter ;
2. valider les champs obligatoires ;
3. extraire les sections Carte / Court / Moyen / Long / Notes internes ;
4. résoudre attachments, related, edges ;
5. produire des enregistrements canoniques pour les tables.

Invariants :
- le vault est la source éditoriale ;
- les tables sont le modèle compilé ;
- le compilateur doit être idempotent.
