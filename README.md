# Documentazione Tecnica di Memo

Questa web app è una piattaforma intuitiva progettata per supportare micro e piccole imprese nella gestione quotidiana delle loro attività operative. L'obiettivo è offrire uno strumento semplice, accessibile e intuitivo, senza la complessità tipica di altri software di gestione aziendale.

---

## ✨ Funzionalità principali:
✅ **Gestione del magazzino** – Monitoraggio degli articoli disponibili e aggiornamento delle quantità in tempo reale.  
✅ **Gestione delle spedizioni** – Tracciamento delle spedizioni per una gestione efficiente delle consegne.  
✅ **Gestione delle vendite** – Registro delle transazioni e monitoraggio delle entrate.  
✅ **Gestione degli ordini e forniture** – Gestione degli ordini ai fornitori e monitoraggio dello stato delle forniture.  

---

## 🛠️ Architettura Tecnologica
L'app è costruita con un'architettura basata su microservizi, containerizzata con **Docker**, e utilizza le seguenti tecnologie:

- **Backend**: Node.js con Express.js
- **Frontend**: React con Bootstrap
- **Database**: PostgreSQL
- **Strumenti di amministrazione**: pgAdmin per la gestione del database
- **Documentazione API**: Swagger

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
   ```bash
   git clone https://github.com/fondazioneedulife/still4steel.git
   cd still4steel
   ```
2. Avvia i container con Docker Compose:
   ```bash
   docker-compose up -d
   ```
3. Accedi alla web app dal browser:
   http://127.0.0.1:3002/
4. Per accedere a pgAdmin, vai su:
   http://127.0.0.1:8080/
   e usa le credenziali definite nel file docker-compose.yml.

### 📡 API Backend
Le API sono documentate con Swagger e possono essere esplorate accedendo a:
http://127.0.0.1:3001/api-docs/

🔹 **Esempio di chiamata API**

**Richiesta:**

```http
GET /api/products
```

**Risposta:**

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "quantity": 50,
    "price": 1200.00
  },
  {
    "id": 2,
    "name": "Stampante",
    "quantity": 20,
    "price": 200.00
  }
]
```

---

## 📂 Struttura del Progetto
Ecco la struttura dei file principali:
```bash
/still4steel
│── /frontend   # Codice React + Bootstrap
│── /backend    # Node.js + Express
│── /database   # Configurazioni PostgreSQL
│── docker-compose.yml
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

## 👥 Contributi e Manutenzione

### 🤝 Contribuire
Se vuoi contribuire al progetto:
1. Fai un fork del repository
2. Crea un nuovo branch
3. Apporta le modifiche
4. Invia una pull request

### 🐞 Segnalazione Bug
Per segnalare un bug, apri un issue nel repository GitHub.