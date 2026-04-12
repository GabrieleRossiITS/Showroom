# Rapporto di Audit di Sicurezza - Progetto Showroom

## Sintesi Esecutiva

Questo rapporto dettaglia i risultati di un audit di sicurezza completo del progetto Showroom. L'audit ha identificato diverse vulnerabilità di gravità **Critica** e **Alta**, riguardanti principalmente l'esposizione di chiavi API sensibili, la gestione insicura delle sessioni e la presenza di backdoor per sviluppatori. È necessaria una riparazione immediata per mettere in sicurezza l'applicazione.

---

## Metodologia

L'audit è stato condotto utilizzando:

- **Analisi Statica (SAST)**: Revisione manuale del codice sorgente.
- **Corrispondenza di Pattern**: Ricerca di parole chiave sensibili (chiavi API, segreti, funzioni insicure).
- **Revisione dell'Architettura**: Analisi dei flussi di autenticazione e autorizzazione.

---

## Classificazione delle Vulnerabilità

| ID | Gravità | Titolo | Categoria |
| :--- | :--- | :--- | :--- |
| **SEC-001** | 🔴 CRITICA | Esposizione della Chiave API Lato Client | Autenticazione Debole |
| **SEC-002** | 🔴 CRITICA | Segreti Cablati nel Repository | Divulgazione di Informazioni |
| **SEC-003** | 🟡 ALTA | Backdoor Sviluppatore nel Root Route | Controllo degli Accessi Interrotto |
| **SEC-004** | 🟡 ALTA | Archiviazione Sessione Utente Insicura | Fallimento Crittografico |
| **SEC-005** | 🟠 MEDIA | Perdita di Informazioni tramite Log di Console | Divulgazione di Informazioni |
| **SEC-006** | 🟠 MEDIA | URL di Fallback API Insicuri | Configurazione di Sicurezza Errata |
| **SEC-007** | 🔵 BASSA | Mancanza di Header di Sicurezza (CSP/HSTS) | Configurazione di Sicurezza Errata |

---

## Risultati Dettagliati

### SEC-001: Esposizione della Chiave API Lato Client

- **Descrizione**: L'applicazione utilizza `VITE_API_KEY` per autenticare le richieste al backend. In Vite, le variabili con prefisso `VITE_` vengono automaticamente incluse nel codice lato client, rendendole visibili a chiunque ispezioni il traffico di rete o il codice sorgente.
- **File Interessati**:
  - [auth.ts](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/components/auth.ts) (Righe 22, 43)
  - [ProtectedImage.tsx](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/components/ui/ProtectedImage.tsx) (Riga 21)
- **Rimediazione**: Rimuovere la chiave API dal frontend. L'autenticazione dovrebbe essere gestita tramite token di sessione lato server (es. JWT) memorizzati in cookie HttpOnly.

### SEC-002: Segreti Cablati nel Repository

- **Descrizione**: Il file `.env` contenente `VITE_API_KEY` è presente nella root del repository. Sebbene ignorato da `.gitignore`, la sua presenza nello spazio di lavoro suggerisce che potrebbe essere stato salvato o gestito in modo insicuro.
- **File Interessati**:
  - [.env](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/.env)
- **Rimediazione**: Utilizzare un Secrets Manager o variabili d'ambiente fornite dalla piattaforma di hosting. Non caricare mai i file `.env` nel controllo di versione.

### SEC-003: Backdoor Sviluppatore nel Root Route

- **Descrizione**: Una funzione globale `window.forceAdminOverride()` è definita nel componente root. L'esecuzione di questa funzione nella console del browser consente agli utenti di bypassare il nascondiglio della rotta `/admin`.
- **File Interessati**:
  - [__root.tsx](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/routes/__root.tsx) (Righe 61-67)
- **Rimediazione**: Rimuovere tutte le backdoor di debug e gli override di `window` insicuri prima di passare alla produzione.

### SEC-004: Archiviazione Sessione Utente Insicura

- **Descrizione**: L'`AuthContext` memorizza l'intero oggetto `user` nel `localStorage`. Questi dati non sono crittografati né firmati, rendendo banale per un utente modificare la propria identità localmente se il frontend si affida a questo oggetto per l'autorizzazione.
- **File Interessati**:
  - [AuthContext.tsx](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/components/contexts/AuthContext.tsx) (Righe 24, 36, 41)
- **Rimediazione**: Memorizzare solo dati utente non sensibili nel `localStorage`. L'autenticazione sensibile dovrebbe basarsi su token sicuri e firmati (come JWT) memorizzati in cookie HttpOnly.

### SEC-005: Perdita di Informazioni tramite Log di Console

- **Descrizione**: L'applicazione registra informazioni sensibili sul sistema di autenticazione interno e fornisce "Suggerimenti" su come bypassare la sicurezza nella console.
- **File Interessati**:
  - [__root.tsx](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/routes/__root.tsx) (Righe 58-63)
- **Rimediazione**: Rimuovere tutte le chiamate a `console.warn` e `console.info` relative alla sicurezza/logica interna durante il processo di build.

### SEC-006: URL di Fallback API Insicuri

- **Descrizione**: Gli URL `localhost` cablati vengono utilizzati come fallback per l'URL di base dell'API. Questo trapela informazioni sull'ambiente di sviluppo.
- **File Interessati**:
  - [auth.ts](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/components/auth.ts) (Riga 14)
- **Rimediazione**: Utilizzare variabili d'ambiente per tutti gli endpoint API senza fallback locali nel codice di produzione.

### SEC-007: Mancanza di Header di Sicurezza

- **Descrizione**: L'applicazione manca di una Content Security Policy (CSP), essenziale per mitigare gli attacchi XSS e l'iniezione di dati.
- **File Interessati**:
  - [__root.tsx](file:///c:/Users/Gabriele/Documents/GitHub/Showroom/src/routes/__root.tsx)
- **Rimediazione**: Implementare una CSP rigorosa e altri header di sicurezza (X-Frame-Options, X-Content-Type-Options).

---

## Conclusione

Il progetto Showroom presenta attualmente diverse falle di sicurezza significative che potrebbero portare ad accessi non autorizzati e all'esposizione dei dati. L'azione più urgente è **mettere in sicurezza la chiave API** e **rimuovere le backdoor per gli sviluppatori**. Seguire i passaggi di rimedio sopra elencati migliorerà significativamente la sicurezza dell'applicazione.
