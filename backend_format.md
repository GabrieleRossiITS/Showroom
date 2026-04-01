1. Architettura Generale e Database

Il backend funzionerà come una RESTful API stateless. Poiché il sistema girerà in container Docker isolati (senza connessione internet), tutte le risorse (immagini incluse) dovranno essere servite localmente o i path nel DB dovranno puntare agli asset del frontend.

Scelte Architetturali (Dapper + PostgreSQL)
Sicurezza SQL: Qualsiasi query al database DEVE essere fatta tramite Dapper usando query parametrizzate (es. new { Param = value }) per prevenire nativamente le SQL Injection.

Gestione JSON: Sfrutteremo il tipo JSONB di PostgreSQL per dati molto variabili (come le specifiche tecniche dei souvenir), riducendo il numero di tabelle relazionali inutili.

Pattern Multilingua: Useremo il pattern "Entity Translation". Le entità principali (es. Artworks) avranno una tabella figlia associata (es. ArtworkTranslations) con le traduzioni.

1. Gestione Multilingua (Internazionalizzazione)
   Il frontend in React gestisce 7 lingue tramite i18next. Il backend dovrà rispondere in base alla lingua richiesta.

Come funziona: Il frontend invierà la lingua tramite l'header HTTP standard Accept-Language (es. it, fr, en).

Fallback Logic: Se l'header manca o se una traduzione specifica non esiste nel DB, la query SQL restituirà di default il testo in Inglese ('en') e imposterà un flag booleano isFallback = true. Questo permetterà al frontend di avvisare l'utente.

1. Specifiche degli Endpoint (API REST)
   Tutte le API dovranno essere esposte sotto il prefisso /api/v1/.

3.1. Opere d'Arte e Archivio (Artworks)

**`GET /api/v1/artworks`**

Descrizione: Restituisce la lista ridotta delle opere per la galleria principale.

Input: Header Accept-Language

Output (JSON):

```JSON
[
    {
        "id": 1,
        "imageUrl": "/images/archive/rd-0001.jpg",
        "title": "La première maîtresse",
        "description": "Breve descrizione...",
        "isFallback": false
    }
]
```

**`GET /api/v1/artworks/{id}`**

Descrizione: Restituisce i dettagli completi di una singola opera. I dati tecnici e di contesto sono raggruppati in sotto-oggetti per pulizia del frontend.

Output (JSON):

```JSON
{
    "archiveId": "RD-0001",
    "title": "La première maîtresse",
    "year": 1933,
    "isOriginal": true,
    "imageUrl": "/images/archive/rd-0001.jpg",
    "description": "Descrizione completa tradotta...",
    "context": {
        "location": "Scuola elementare, Parigi",
        "historicalPeriod": "Primi Reportage"
    },
    "technicalInfo": {
        "support": "Stampa vintage alla gelatina",
        "camera": "Rolleiflex Standard",
        "dimensions": "24 x 30 cm"
    }
}
```

3.2. Esposizioni e Biglietteria (Exhibitions)
Per ottimizzare le prestazioni, i dati statici dell'esposizione sono separati dalla disponibilità dinamica dei biglietti.

**`GET /api/v1/exhibitions/{id}`**

Descrizione: Dati statici e listino prezzi (Tier) dei biglietti.

Output (JSON):

```JSON
{
    "id": 101,
    "title": "Robert Doisneau: Paris",
    "location": "Galerie de la Photographie, Parigi",
    "ticketTiers": [
        { "id": "std_01", "name": "Entrée Standard", "price": 18.00 },
        { "id": "red_01", "name": "Tarif Réduit", "price": 12.00 }
    ]
}
```

**`GET /api/v1/exhibitions/{id}/slots?date=YYYY-MM-DD`**

Descrizione: Interroga il DB per calcolare quanti posti rimangono per una determinata giornata.

Output (JSON):

```JSON
{
    "requestedDate": "2026-04-01",
    "slots": [
        { "time": "10:00", "remainingTickets": 15, "isAvailable": true },
        { "time": "19:00", "remainingTickets": 0, "isAvailable": false }
    ]
}
```

3.3. Negozio Souvenir (E-Commerce)
**`GET /api/v1/souvenirs/{id}`**

Descrizione: Dettaglio prodotto. Sfrutta il JSONB su PostgreSQL per il campo specifications, permettendo ad esempio di avere chiavi diverse se il prodotto è un "Libro" (Pagine, Lingua) o una "Stampa" (Cornice, Materiale).

Output (JSON):

```JSON
{
    "id": "sov_print_001",
    "name": "Le Baiser de l'Hôtel de Ville (Large Print)",
    "category": "STAMPE",
    "price": 45.00,
    "inventory": { "inStock": true, "quantityAvailable": 12 },
    "images": ["/images/shop/main.jpg", "/images/shop/detail.jpg"],
    "shortDescription": "Premium print...",
    "specifications": {
        "Dimensioni": "50 x 70 cm",
        "Materiale": "Carta Fine Art"
    },
    "relatedItems": [ 1, 2, 3, 4, 5 ]
}
```
