# SQL Target Sketch

## Vérifier les 20 derniers runs
```sql
select id, status, files_seen, files_ingested, files_failed, started_at, finished_at
from public.content_ingestion_runs
order by started_at desc
limit 20;
```

## Vérifier les contenus actifs
```sql
select source_document_id, content_type, title, status, language, updated_at
from public.mediation_content
where deleted_at is null
order by updated_at desc
limit 50;
```

## Vérifier les liens compilés
```sql
select mc.source_document_id, ml.target_type, ml.target_ref, ml.role
from public.mediation_links ml
join public.mediation_content mc on mc.id = ml.content_id
where ml.deleted_at is null and mc.deleted_at is null
order by mc.source_document_id, ml.role, ml.target_type, ml.target_ref;
```

## Vérifier erreurs de compilation
```sql
select run_id, path, error_code, message, created_at
from public.content_ingestion_errors
order by created_at desc
limit 50;
```
