---
title: "Self-Hosting : Installer sa première application"
description: "Un guide pragmatique et complet sur la manière d'installer Jellyfin et d'y afficher sa collection de film"
date: 2024-04-23T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - web
  - self-hosting
  - débutant
---

## Rappel sur l'univers du self-hosting avant de démarrer :

> Je suis très loin de me considérer comme un expert du self-hosting, tout au plus j'ai essuyé quelques plâtres dans mon aventure mais j'estime qu'il y a matière à partager. Sentez vous libre de compléter votre lecture avec d'autres sources, de tester, de valider ou d'invalider mes propos et de m'en faire des feedbacks via Linkedin ou par Mail :)

Cette série d’articles autour du self-hosting est rédigée au fil de l’eau. Je vous invite à [démarrer cette série par le sommaire]({{< ref "/Self-Hosting-tour-rapide-question" >}})

## Jellyfin

[Jellyfin](https://jellyfin.org/) est une application qui peut être comparée à [Ember](https://emby.media/), [Kodi](https://kodi.tv/) ou encore son plus sérieux concurrent : [Plex](https://www.plex.tv/). C'est un centre de gestion des médias.

Films, Séries, Musiques et même photos peuvent y être centralisés et mis en page à la manière d'un Netflix ou d'un Google Photos.

J'ai choisi cette application car elle est suffisamment complète à mettre en place pour aborder beaucoup de concepts sans pour autant imposer de creuser des concepts trop poussés pour un débutant.

Nous allons évidemment nous appuyer sur un setup Self-Hosting déjà en place et nous allons (arbitrairement) partir du principe que pour cette installation les emplacements des médias seront situés dans : `/mnt/Medias` (considérez qu'il s'agit là d'un montage NFS vers votre NAS ou d'un répertoire local plein à craquer de films de vacances)

Je part du principe donc que vous avez votre setup de prêt, Docker déjà fonctionnel et prêt à démarrer. Si ce n'est pas le cas, je vous invite à suivre mon tutoriel pour [monter son setup Self-Hosting en 1 heure]({{< ref "/Self-Hosting-setup-en-1-heure" >}}) :)

## Préparer son environnement.

### Les répertoires à configurer

Pour vous contextualiser, nous allons réaliser cette arborescence au sein de notre système

```bash
/
 ├─home
 │  ├─root
 │  ├─alice
 │  └─dock
 │     ├─compose
 │     │  └─jellyfin
 │     └─data
 │        └─jellyfin
 └─mnt
    └─Medias
       ├─movies
       ├─series
       └─photos
```

Nous avons `/mnt/Medias/` qui contient vos répertoires médias qui sont bien remplis ou qui représente un montage NFS, dans tous les cas nous allons y accéder en **lecture seule**

Nous avons également `/home/dock` qui est le répertoire de prédilection pour l'utilisateur unix **dock**. Il nous faut créer donc ces deux dernières arborescences

```bash
sudo su dock
mkdir -p /home/dock/compose/jellyfin
mkdir -p /home/dock/data/jellyfin
```

Le répertoire `compose` contiendra évidemment le `docker-compose.yml` et les éventuels autres fichiers de configuration associés (les fichiers `.env` notamment).
Le répertoire `data` contiendra évidemment les données générées par nos applications, ce sont des [données chaudes]({{< ref "/Self-Hosting-strategies-stockage-sauvegarde-donnees" >}}) et sont nécessairement au plus proche de l'OS. On ne doit uniquement y stocker des données dont la perte ne serait pas irrémédiable. On peut y trouver des miniatures d'images, du cache, des données compressées,...

Bref du re-générable.

### Connaitre l'ip de la machine

Ce sera intéressant de la connaître pour la suite.

Pour connaitre l'ip de votre setup : `ip a`

### Le network

J'ai pris soin de créer un network dédié pour mes applications docker afin de manager celui-ci à ma convenance. Pour ce faire j'ai créé un network de type Bridge ce qui permet d'exposer les applications sur l'extérieur du setup (j'ai pas dit exposé sur internet)

Ce network s'appel `home`

```shell
docker network create -d bridge home
```

## Exploiter le docker-compose.yml

Nous allons exploiter Docker présent sur notre setup en allant récupérer [le docker-compose.yml disponible sur la documentation de Jellyfin](https://jellyfin.org/docs/general/installation/container#using-docker-compose).

```yml
version: '3.5'
services:
  jellyfin:
  image: jellyfin/jellyfin
  container_name: jellyfin
  user: uid:gid
  network_mode: 'host'
  volumes:
    - /path/to/config:/config
    - /path/to/cache:/cache
    - type: bind
      source: /path/to/media
      target: /media
    - type: bind
      source: /path/to/media2
      target: /media2
      read_only: true
  restart: 'unless-stopped'
  # Optional - alternative address used for autodiscovery
  environment:
    - JELLYFIN_PublishedServerUrl=http://example.com
  # Optional - may be necessary for docker healthcheck to pass if running in host network mode
  extra_hosts:
    - 'host.docker.internal:host-gateway'
```

**Attention :** Ceci est la version issue de la documentation au moment de l'écriture de mon article, pensez toujours à vous baser sur la source de vérité, ne recopiez pas tel quel mon code :)

Ma version avec mon contexte appliqué sera le suivant.

Le fichier est à créer dans `/home/dock/compose/jellyfin/docker-compose.yml`

```yml
# Notez que depuis début 2024 il n'est plus imposé d'avoir la node version. 
# Un warning vous propose même de supprimer celle ci
services:
  jellyfin:
    # J'ai opté pour une autre image au début de mon installation, elle me parait + légère. C'est un choix purement perso
    image: lscr.io/linuxserver/jellyfin:latest
    # Le nom du container
    container_name: jellyfin
    environment:
      # Ces deux variables sont directement liées à l'usage de l'image lscr.io/linuxserver
      # les UID sont ceux du user / group dock, vous pouvez valider les vôtres en faisant les commandes
      #  > id -u dock
      #  > id -g dock
      - PUID=1001
      - PGID=1001
      # La timezone de Paris
      - TZ=Etc/UTC+2
    volumes:
      # Je fais un lien entre les répertoires de l'OS et les répertoires accessibles au sein du container
      - /home/dock/data/jellyfin/config:/config
      - /home/dock/data/jellyfin/cache:/cache
      # Je protège mes films, j'ajoutes :ro pour signifier à Docker que l'accès est en lecture seule (read only)
      - /mnt/Medias/:/medias:ro
    ports:
    # Nous mappons le port 8096 pour l'exposer vers l'extérieur du réseau.
    # l'application sera donc accessible sur le setup sur
    #  - localhost:8096
    #  - 127.0.0.1:8096
    # Mais également depuis un autre pc de la maison sur
    #  -192.168.1.99:8096 (si c'est l'ip du setup)
      - 8096:8096
    # Docker tentera de redémarrer le container sauf si j'ai explicitement demandé à le couper
    restart: unless-stopped
    # Docker va "brancher" ce container sur le network bridge que j'ai créé pour l'occasion
    networks:
      - home

# Précision pour docker que le network home possède une configuration externe à ce fichier.
networks:
  home:
    external: true
```

On lance une première fois la commande suivante qui va s'occuper de tout

```shell
docker compose up
```

Les logs apparaissent à l'écran et si tout va bien vous devriez accéder à Jellyfin depuis un autre ordinateur en allant sur http://192.168.1.99:8096 (selon l'ip de votre setup)

Tapez Ctrl+c pour couper l'application.

Relancez maintenant la même commande en ajoutant -d comme paramètre afin de nous détacher du processus et le laisser tourner en fond.

```shell
docker compose up -d
```

Au passage si vous allez consulter le contenu du répertoire `/home/dock/data/jellyfin/config` vous y verrez les premiers fichiers apparaître.

Il est temps maintenant de configurer votre instance Jellyfin. Je ne vais pas faire de documentation sur ce point, ce n'est pas vraiment mon but et la documentation de Jollyfin est très bien pour cela.

Gardez en tête que dans le contexte de votre container il existe un répertoire en lecture seule : `/medias` et que vous allez maintenant pouvoir ajouter dans Jellyfin les bibliothèques Films, Séries, ... avec des répertoires du type `/medias/movies` ou `/medias/series`

## Conclusion

Avec ce petit exemple on aborde déjà de nombreuses notions, je n'ai volontairement fait que survoler ces notions, je vous remets le lien vers chaque documentation dédiée pour vous inciter à creuser le sujet.
 - [Docker Compose](https://docs.docker.com/get-started/08_using_compose/)
 - [Les types de network sur Docker](https://docs.docker.com/network/network-tutorial-standalone/)
 - [Les types de volumes sur Docker](https://docs.docker.com/get-started/05_persisting_data/)
 - [Le mappage de port sur Docker](https://docs.docker.com/desktop/networking/#port-mapping)
 - [CheatSheet des commandes Docker les plus utiles](https://docs.docker.com/get-started/docker_cheatsheet.pdf)
 - [CheatSheet des commandes Docker Compose les plus utiles](https://gist.github.com/jonlabelle/bd667a97666ecda7bbc4f1cc9446d43a)

## Bonus : Gérer avec Docker comme un pro

Des petites commandes sympas à conserver en tête

#### Accéder aux logs d’un container :

```bash
# Lister les containers démarrés
docker ps
# Afficher les logs du container x
docker logs -f <idContainer|container_name|jellyfin>
```

#### Lancer un container + rebuild au passage avec docker compose

```bash
docker-compose up --build
```

#### Se connecter à un container en shell

```bash
# Lister les containers démarrés
docker ps
# Se connecter au container x
docker exec -ti <container_name|jellyfin> /bin/bash
```

#### Connaître l’usage CPU / Mémoire de ses containers

```bash
docker stats
docker <container_name|jellyfin> stats
```

{{< image src="/imgs/dogsAndComputer.avif" alt="Des chiens et un ordinateur" position="center" style="border-radius: 8px;width: 650px;">}}
