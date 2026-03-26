# Formattazione **BASE** proposta per il backend

## Formattazione JSON delle Opere

```JSON
[
    {
        "id": 1,
        "title": "",
        "year": 2026,
        "image": ""
    },
    {
        "id": 2,
        "title": "",
        "year": 2026,
        "image": ""
    }
]
```

### Esempio Opere

```JSON
[
    {
        "id": 1,
        "title": "Papà Rumeno",
        "year": 1932,
        "image": "https://femboy.com/images/ţigan.jpg"
    },
    {
        "id": 2,
        "title": "Lore San",
        "year": 1954,
        "image": "https://femboy.com/images/lore_san.jpg"
    },
    {
        "id": 3,
        "title": "Nevy Chan",
        "year": 1986,
        "image": "https://femboy.com/images/nevy_chan.jpg"
    }
]
```

## Formattazione JSON delle Mostre

```JSON
[
    {
        "id": 1,
        "title": "",
        "location": "",
        "coordinates": {
            "lat": 0.0,
            "lng": 0.0
        },
        "maps_url": "",
        "status": "",
        "start_date": "",
        "end_date": "",
        "description": "",
        "artworks_included": []
    }
]
```

### Esempio Mostre

```JSON
[
    {
        "id": 1,
        "title": "I biscotti di Allen",
        "location": "Museo del Louvre, Parigi",
        "coordinates": {
            "lat": 45.45262345,
            "lng": 9.16123454
        },
        "maps_url": "https://maps.app.goo.gl/Louvre",
        "status": "past",
        "start_date": "2025-09-15",
        "end_date": "2026-01-28",
        "description": "",
        "artworks_included": [1, 2, 5, 8]
    },
    {
        "id": 2,
        "title": "Mi piacciono le nere",
        "location": "CDS, Pordenone",
        "coordinates": {
            "lat": 452.4844,
            "lng": 9.2341772
        },
        "maps_url": "https://maps.app.goo.gl/CDS",
        "status": "ongoing",
        "start_date": "2026-02-10",
        "end_date": "2026-05-30",
        "description": "Tony mio amore artista bellissimo",
        "artworks_included": [3, 4, 9, 12, 15]
    },
    {
        "id": 3,
        "title": "Non ho piu idee",
        "location": "Via via via via",
        "coordinates": {
            "lat": 45.4654238906733,
            "lng": 9675.1910
        },
        "maps_url": "https://maps.app.goo.gl/BOH",
        "status": "upcoming",
        "start_date": "2026-06-15",
        "end_date": "2026-10-10",
        "description": "sladhjvgbkasjrdvfblsadkfvblskdfvhoaisdfb",
        "artworks_included": [6, 7, 10, 11]
    }
]
```

## Descrizione degli attributi

### Opere

- `id`: ID univoco dell'opera (**_number_**)
- `title`: Titolo dell'opera (**_string_**)
- `year`: Anno di creazione dell'opera (**_number_**)
- `image`: URL dell'immagine dell'opera, che sia url da siti strani o proprio del backend (**_string_**)

### Mostre

- `id`: ID univoco della mostra (**_number_**)
- `title`: Titolo della mostra (**_string_**)
- `location`: Luogo della mostra (**_string_**)
- `coordinates`: Oggetto contenente latitudine (lat) e longitudine (lng) per l'integrazione con mappe interattive (**_object_**)
    - `lat`: latitudine (**_number_**)
    - `lon`: longitudine (**_number_**)
- `maps_url`: Luogo della mostra (**_string_**)
- `status`: Stato della mostra (**_upcoming, ongoing, past_**)
- `start_date`: Data di inizio della mostra (**_date_**)
- `end_date`: Data di fine della mostra (**_date_**)
- `description`: Descrizione della mostra (**_string_**)

## Note per l'Implementazione Logica

Il backend dovrà gestire il campo status dinamicamente in base alla data odierna:

- **_upcoming_**: La start_date è maggiore della data di oggi.
- **_ongoing_**: La data di oggi è compresa tra start_date e end_date (incluse).
- **_past_**: La end_date è minore della data di oggi.

## Endpoint API (REST)

| Metodo | Endpoint              | Descrizione                                                                               |
| ------ | --------------------- | ----------------------------------------------------------------------------------------- |
| GET    | /api/artworks         | Recupera la lista di tutte le opere.                                                      |
| GET    | /api/exhibitions      | Recupera tutte le mostre (possibilità di filtrare via query string, es. ?status=ongoing). |
| GET    | /api/exhibitions/{id} | Recupera i dettagli di una singola mostra (inclusi i dati espansi delle opere collegate). |
