# VisaTM Application Pilote



## Installation locale hors docker



### Changement fichiers .env
dans back/.env :
pour galaxy vdvisatm
```
GALAXY_INSTANCE_URL=http://vdvisatm.intra.inist.fr:8086
GALAXY_INSTANCE_API_KEY=170a96af06c5d11f050c9041f6118a2d
GALAXY_HISTORY_ID=f2db41e1fa331b3e
```
pour galaxy Scodex
```
GALAXY_INSTANCE_URL=http://scodex.ads.intra.inist.fr:8080
GALAXY_HISTORY_ID=42a2c611109e5ed3
GALAXY_INSTANCE_API_KEY=9eef5cbe9e82d7343744526c28b2bd45

dans front/.env :
```
SASS_PATH=node_modules:src
REACT_APP_GALAXY_API=http://localhost:5000
REACT_APP_ISTEX_API=https://api.istex.fr
```

Variables d'environnement et route
```
back/pip3 install -r requirements.txt
export FLASK_APP=galaxy
```
### demarrage du back
```
back/flask run 

tester: http://localhost:5000/workflows/
```
### demarrage du front
```
front/npm install 
(si message "audit' lancer npm audit fix)

front/npm start 
(si demandé, accepter choix nouveau port, se connecter en localhost:<port_choisi>)
```

## Installation mode Developpement

Prerequisites: [NodeJS](https://nodejs.org/en/download/package-manager/) & [Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) & Docker-compose

```
make install
make run-debug
```
Then open http://127.0.0.1:9000 to access VisaTm.


To simulate a production run, you can just type these commandes:

```
make build
make run-prod
```

## Déploiement  en production
* Pull la dernière version depuis le répertoire
* Construire les images
`docker-compose build`
* Arrêter les conteneurs en cours d'éxécution et les supprimer
`docker-compose stop`
`docker-compose rm`
* Lancer les nouvelles images
`docker-compose up -d`
