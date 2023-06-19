# test_code_appart

I developed the application on Linux Ubuntu 22.04 with a virtual machine using VMWare Workstation.

## Project context

L'objectif est de créer un mini carnet d'adresse pour "Pangolin" sur Express.js (sous forme d'API) avec un front sur angular &  DB Mongo de préférence.

- (Inscription/Connexion/Déconnexion) du "Pangolin" par login/mot de passe
- (Afficher/Modifier) son rôle (Guerrier, Alchimiste, Sorcier, Espions, Enchanteur)
- (Ajouter/Supprimer) en amis un autre "Pangolin" à partir d'une liste des autres Pangolins inscrits.

## Access to the application

- `http://localhost:4200` OR `http://localhost` if production

## Install node packages

- `npm install`
- `cd front && npm install && cd ..`

## Note (with Docker)

- Install Docker && Docker compose
- `sudo chmod 755 ./install-docker.sh`
- `sudo chmod 755 ./install-docker-compose.sh`

Please review the files before to execute them

- `./install-docker.sh`
- `./install-docker-compose.sh`

1/ Deploy Local Dev Environment

- `sudo service docker start` to start the docker service
- `docker-compose -f 'docker-compose-dev.yml' build`
- OR `docker-compose build` for production

2/ Run containers

- `docker-compose -f 'docker-compose-dev.yml' up -d`
  - this will pull all the images : mongo && mongo-express
  - wait that all containers are running
- OR `docker-compose up -d` for production
- `docker ps` to list all running docker containers

## Services docker

| Services        | Version                       | Path access             |
|:---------------:|:-----------------------------:|:-----------------------:|
| mongo-db        | MongoDB                       | localhost:27017         |
| mongo-express   | latest                        | <http://localhost:8081> |
| server          | Node 20 / Express.js          | <http://localhost:3000> |
| frontend (dev)  | Node 20 / Angular 16          | <http://localhost:4200> |
| frontend (prod) | Node 20 / Angular 16 / Nginx  | <http://localhost>      |

### mongo-express : Admin interface

mongo-express is a web-based MongoDB admin interface, [More info...](https://hub.docker.com/_/mongo-express/)

- mongo-express server : `mongo-db`
- mongo-express username / password : `mongoUser` / `ChangeMe`

4/ Stopping all containers or specific

- `docker stop <container name>` to stop specific container
- `docker-compose -f 'docker-compose-dev.yml' stop` to stop all containers inside the project
- OR `docker-compose stop`

5/ Down all containers

- `docker-compose -f 'docker-compose-dev.yml' down` to remove the containers network
- OR `docker-compose down`

-------

## Note (without Docker)

You need to replace in the file `.env` the `DB_CONNECTION` environment variable with your own mongodb.

- `npm i -g nodemon` to install nodemon
- `npm i -g @angular/cli` to install Angular CLI
- `npm run dev` this will start the express server and the frontend
- Access server `http://localhost:3000`
- Access frontend `http://localhost:4200`
