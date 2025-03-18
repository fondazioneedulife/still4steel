# Documentazione Tecnica di Memo

Questa web app è una piattaforma intuitiva progettata per supportare micro e piccole imprese nella gestione quotidiana delle loro attività operative. L'obiettivo è offrire uno strumento semplice, accessibile e intuitivo, senza la complessità tipica di altri software di gestione aziendale.

---

## ✨ Funzionalità principali:
✅ **Gestione del magazzino** - Monitoraggio degli articoli disponibili e aggiornamento delle quantità in tempo reale.  
✅ **Gestione delle spedizioni** - Tracciamento delle spedizioni per una gestione efficiente delle consegne.  
✅ **Gestione degli ordini e forniture** - Gestione degli ordini ai fornitori e monitoraggio dello stato delle forniture.  
✅ **Gestione delle vendite** - Registro delle transazioni e monitoraggio delle entrate (in arrivo).  

---

## 🛠️ Architettura Tecnologica
L'app è costruita con un'architettura basata su microservizi, containerizzata con **Docker**, e utilizza le seguenti tecnologie:

- **Backend**: Node.js con Express.js
- **Frontend**: React con Bootstrap
- **Database**: PostgreSQL
- **Strumenti di amministrazione**: pgAdmin per la gestione del database
- **Documentazione API**: Swagger
- **Client HTTP**: Axios per le richieste API
- **Autenticazione**: JSON Web Token (JWT)
- **Sicurezza**: CORS per il controllo degli accessi tra frontend e backend

### 🔧 Struttura dei Container Docker  
| Container  | Descrizione |
|------------|------------|
| **Frontend**  | Interfaccia utente basata su React |
| **Backend**  | API sviluppate con Node.js ed Express |
| **Database**  | PostgreSQL per la gestione dei dati |
| **pgAdmin**  | Interfaccia grafica per la gestione del database |

---

## 🚀 Installazione e Configurazione  

### ⚙️ Requisiti  
Prima di avviare il progetto, assicurati di avere installati:  
- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

### 📌 Avvio dell'applicazione  
1. Clona il repository:  
   ```sh
   git clone https://github.com/fondazioneedulife/still4steel.git
   cd still4steel
   ```
2. Avvia i container con Docker Compose:
   ```sh
   docker-compose up -d
   ```
3. Accedi alla web app dal browser: http://127.0.0.1:3002/
4. Per accedere a pgAdmin, vai su http://127.0.0.1:8080/ e usa le credenziali definite nel file docker-compose.yml.

### 📡 API Backend
Le chiamate HTTP dal frontend al backend vengono gestite tramite Axios.
Axios è un client HTTP che permette di effettuare richieste in modo semplice e gestire automaticamente risposte JSON e gestione errori.

Le API sono documentate con Swagger e possono essere esplorate accedendo a: http://127.0.0.1:3001/api-docs/

🔹 **Esempio di chiamata API**

**Richiesta:**

```http
GET /api/category
```

**Risposta:**

```json
[
  {
    "id": 1,
    "name": "Tecnologia",
    "description": "Dispositivi elettronico e accessori" 
  },
  {
    "id": 2,
    "name": "Cartoleria",
    "description": "Articoli per ufficio e scuola"
  }
]
```

---

## 📂 Struttura del Progetto
Ecco la struttura dei file principali:
```sh
/still4steel
│── /frontend   # Codice React + Bootstrap
│── /backend    # Node.js + Express
│── docker-compose.yml
│── init.sql    
│── README.md
```

---

## ⚠️ Gestione degli Errori
L'API utilizza codici di stato HTTP per segnalare gli errori:
| Codice  | Descrizione |
|------------|------------|
| **200 OK**  | 	Richiesta riuscita |
| **400 Bad Request**  | Parametri non validi |
| **401 Unauthorized**  | Accesso negato |
| **404 Not Found**  | Risorsa non trovata |
| **500 Internal Server Error**  | Errore generico lato server |

---

## 🔐 Trattamento dei Dati e Privacy

L'uso della piattaforma richiede l'accettazione del trattamento dei dati personali. Tutte le informazioni fornite dagli utenti sono gestite in conformità con le normative sulla privacy. L'autenticazione avviene tramite JSON Web Token (JWT) per garantire la sicurezza degli accessi.

---

## 👥 Contributi e Manutenzione

### 🤝 Contribuire
Se vuoi contribuire al progetto:
1. Fai un fork del repository
2. Crea un nuovo branch
3. Apporta le modifiche
4. Invia una pull request

### 🐞 Segnalazione Bug
Per segnalare un bug, apri un issue nel repository GitHub.