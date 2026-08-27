# 🗄️ 02 - Modelagem de Dados & Schema PostgreSQL

## 1. Diagrama Entidade-Relacionamento (ERD)

```mermaid
erDiagram
    TENANTS ||--o{ USERS : "possui"
    TENANTS ||--o{ CALENDAR_EVENTS : "agenda"
    TENANTS ||--o{ BEFORE_AFTER_ITEMS : "publica"
    TENANTS ||--o{ ADVANTAGE_PARTNERS : "disponibiliza"
    TENANTS ||--o{ BANNER_ADS : "exibe"
    TENANTS ||--o{ BOARD_MEMBERS : "composto_por"
    
    TENANTS {
        uuid id PK
        string slug UK "damha1"
        string name "Residencial Damha 1"
        string association_name
        string city "Araraquara"
        string state "SP"
        int resident_count
        int unit_count
        string logo_url
        jsonb theme_colors
        jsonb emergency_contacts
        jsonb widget_settings
        boolean active
        timestamp created_at
    }
    
    USERS {
        uuid id PK
        uuid tenant_id FK
        string email UK
        string full_name
        string role "super_admin | sindico | morador"
        string unit_lot "Lote 142 - Alameda das Acácias"
        boolean mfa_enabled
        timestamp created_at
    }
    
    CALENDAR_EVENTS {
        uuid id PK
        uuid tenant_id FK
        string title
        string type "evento | acao | obra | assembleia"
        date event_date
        string time_info
        string location
        text description
        string organizer
        string status "agendado | em_andamento | concluido"
        jsonb attachments
        timestamp created_at
    }
    
    BEFORE_AFTER_ITEMS {
        uuid id PK
        uuid tenant_id FK
        string title
        string category "Infraestrutura | Esportes | Sustentabilidade"
        text description
        string before_image_url
        string after_image_url
        string completion_date
        decimal investment_value
        string supplier_name
        int duration_days
        text detailed_report
        jsonb benefits_list
        timestamp created_at
    }
    
    ADVANTAGE_PARTNERS {
        uuid id PK
        uuid tenant_id FK "nullable para parceiros globais Storne"
        string folder_category "ofertas | brindes | sorteios | cashback | indicador_morador | servicos"
        string name
        string business_name
        text description
        string discount_badge
        string phone
        string whatsapp_message
        string address
        string instagram
        string website
        string image_url
        boolean is_resident
        string resident_lot
        decimal rating
        date valid_until
        boolean active
        timestamp created_at
    }
    
    BANNER_ADS {
        uuid id PK
        uuid tenant_id FK "nullable para banners nacionais"
        string title
        string subtitle
        string image_url
        string cta_text
        string target_whatsapp
        string whatsapp_message
        string position "top | bottom"
        int click_count
        boolean active
        timestamp created_at
    }
    
    BOARD_MEMBERS {
        uuid id PK
        uuid tenant_id FK
        string name
        string role "sindico | subsindico | diretoria | conselho_fiscal"
        string role_title
        string contact
        string email
        string avatar_url
        int display_order
        timestamp created_at
    }
```

---

## 2. Isolamento de Segurança (Row-Level Security - RLS)

No PostgreSQL do Supabase, o isolamento multi-tenant é garantido no nível do banco através de políticas RLS:

```sql
-- Exemplo de política de segurança RLS para eventos
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Moradores e visitantes podem visualizar eventos do seu condomínio"
ON calendar_events FOR SELECT
USING (
  tenant_id = (SELECT id FROM tenants WHERE slug = current_setting('app.current_tenant', true))
  OR auth.jwt()->>'tenant_id' = tenant_id::text
);

CREATE POLICY "Apenas síndicos do condomínio podem inserir ou editar eventos"
ON calendar_events FOR ALL
USING (
  auth.jwt()->>'tenant_id' = tenant_id::text 
  AND (auth.jwt()->>'role' = 'sindico' OR auth.jwt()->>'role' = 'super_admin')
);
```
