Soft Etudes JM App

Application metier CVC/plomberie organisee en architecture frontend/backend.

Architecture du depot local

```text
.
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── config.js
│   ├── app.js
│   └── docs/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   │   ├── calculations.js
│   │   └── catalog-data.js
│   └── calculators/
│       ├── aeraulique.js
│       ├── bibliotheque.js
│       ├── combustion-pci-pcs.js
│       ├── conversions.js
│       ├── evacuations.js
│       ├── fluides.js
│       ├── hydraulique.js
│       ├── plumbing.js
│       ├── quantitatifs.js
│       ├── runtime.js
│       ├── thermique.js
│       └── ventilation.js
├── README.md
└── LICENSE
```

Architecture de deploiement Debian 12

```text
/var/www/html/soft-etudes/
├── index.html
├── styles.css
├── config.js
├── app.js
└── docs/

/opt/soft-etudes/backend/
├── server.js
├── package.json
├── routes/
└── calculators/
```

Principe

Le frontend reste statique et peut etre servi par GitHub Pages ou Nginx.
Les moteurs de calcul sont dans `backend/calculators/`.
Le navigateur ne charge plus les fichiers calculateurs directement : il appelle l'API avec `fetch()`.
En preproduction, seul le contenu de `frontend/` va dans `/var/www/html/soft-etudes`.
Le backend Node.js reste hors racine web, dans `/opt/soft-etudes/backend`.

Configuration API frontend

`frontend/config.js` determine automatiquement l'URL API :

```js
const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname.startsWith("192.168.") ||
  window.location.hostname.endsWith(".local")
    ? ""
    : "https://api.mon-domaine.fr";
```

En local ou preproduction Nginx, `/api` est sur la meme origine.
En production GitHub Pages, remplacer `https://api.mon-domaine.fr` par le domaine API OVH.

Installation backend locale

```bash
cd backend
npm install
npm start
```

Commande de demarrage backend :

```bash
cd backend
npm start
```

L'API ecoute par defaut sur `http://localhost:3000`.

Pour servir aussi le frontend depuis Node en developpement ponctuel :

```bash
cd backend
SERVE_FRONTEND=true npm start
```

En preproduction, ne pas utiliser `SERVE_FRONTEND=true` : Nginx sert le frontend.

Routes API

```text
GET  /api/health
GET  /api/catalog
POST /api/calculate/:calculator
```

Le corps JSON de calcul est de la forme :

```json
{
  "values": {
    "convFamily": "pressure",
    "convValue": "1",
    "convFrom": "bar",
    "convTo": "pa"
  },
  "datasets": {}
}
```

Copie preproduction Debian 12

```bash
sudo mkdir -p /var/www/html/soft-etudes
sudo mkdir -p /opt/soft-etudes

sudo rsync -av --delete frontend/ /var/www/html/soft-etudes/
sudo rsync -av --delete backend/ /opt/soft-etudes/backend/

cd /opt/soft-etudes/backend
sudo npm install --omit=dev
sudo chown -R www-data:www-data /opt/soft-etudes/backend
sudo chown -R www-data:www-data /var/www/html/soft-etudes
```

Exemple Nginx preproduction Debian 12

```nginx
server {
    listen 80;
    server_name soft-etudes.local;

    root /var/www/html/soft-etudes;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Service systemd backend

```ini
[Unit]
Description=Soft Etudes JM API
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/soft-etudes/backend
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
User=www-data
Group=www-data

[Install]
WantedBy=multi-user.target
```

Installation du service :

```bash
sudo cp deploy/soft-etudes-api.service /etc/systemd/system/soft-etudes-api.service
sudo systemctl daemon-reload
sudo systemctl enable --now soft-etudes-api
sudo systemctl status soft-etudes-api
```

Activation Nginx :

```bash
sudo cp deploy/nginx-soft-etudes.conf /etc/nginx/sites-available/soft-etudes.conf
sudo ln -s /etc/nginx/sites-available/soft-etudes.conf /etc/nginx/sites-enabled/soft-etudes.conf
sudo nginx -t
sudo systemctl reload nginx
```

Validation

Les formules metier sont conservees cote backend.
Le module `Combustion PCI/PCS` est cale sur le tableau fourni :

* fioul : 3000 litres -> 30240 kWh PCI / 32054,4 kWh PCS
* gaz : 1000 Nm3 -> 9450 kWh PCI / 10489,5 kWh PCS, et 3000 kWh PCI -> 317,460317 Nm3
* propane : 3000 kg -> 38640 kWh PCI / 41731,2 kWh PCS, et 3000 kWh PCI -> 232,919255 kg
* butane : 3000 kg -> 36900 kWh PCI / 40107 kWh PCS, et 3000 kWh PCI -> 243,902439 kg
