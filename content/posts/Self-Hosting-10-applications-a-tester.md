---
title: "Self-Hosting : 10 applications à tester"
description: "Mon top 10 des applications à tester avec toutes les astuces associées"
date: 2024-04-24T00:00:00+01:00
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



{{< image src="/imgs/dogsAndComputer.avif" alt="Des chiens et un ordinateur" position="center" style="border-radius: 8px;width: 650px;">}}

## Avant de démarrer sur ce guide

Le monde du Self-Hosting, de Docker et de unix en général évolue très rapidement, il est possible que dans quelques mois, années, certaines parties de ce guide deviennent obsolètes. Je vous invite systématiquement à vous rapprocher de la documentation officielle des applications si vous avez le moindre doute :)

En cas de suspicion d'anomalie contactez moi par mail ou via [Linkedin](https://www.linkedin.com/in/kevin-danezis/) pour me signaler l'erreur

Ci dessous vous retrouverez une liste éprouvée d'applications que j'utilise au quotidien, je vous fournit également les configurations utilisées, je vous invite préalablement à lire mes articles sur [la manière d'installer votre setup]({{< ref "/Self-Hosting-setup-en-1-heure" >}}) ainsi que mon [guide de la première installation d'application sur son setup]({{< ref "/Self-Hosting-installer-sa-premiere-application" >}}) afin de comprendre les nuances présentes dans mes configurations, notamment pour ce qui touche de l'usage et l'organisation des répertoires et des volumes Docker.

## Immich

Mon coup de cœur, il remplace allégrement Google Photo et toutes ces solutions payantes que l'on trouve sur le net. Vous pouvez indexer comme moi +34 000 photos, +1000 vidéos pour plus de 200Go de données sans aucun souci de latence.

J'utilise depuis Novembre 2023 sans aucun soucis.

**Attention :** à date d'écriture de ces lignes immich est un projet qui se définit lui-même comme un projet en développement intensif, il faut donc s'attendre à de fréquentes modifications majeures qui peuvent casser votre installation si vous n'y prêtez pas attention.

En conséquence de ces changements brutaux c'est la seule application qui n'est pas scrutée par watchTower

Des alternatives à ce service (je n'ai pas testé)
 - [Librephotos](https://github.com/LibrePhotos/librephotos)
 - [Lychee](https://github.com/LycheeOrg/Lychee)
 - [Photoprism](https://github.com/photoprism/photoprism)
 - [Voir une liste exaustive des alternatives](https://github.com/meichthys/foss_photo_libraries)

A voir également :
 - [Le site officiel](https://immich.app/)
 - [Sa documentation Docker Compose](https://immich.app/docs/install/environment-variables#docker-compose)

## WatchTower

Un incontournable dans le monde du container et du Self-Hosting. Ce service va scruter vos containers et va tenter, à intervalle régulier, de les mettre à jour.

Cela vous permet de réduire fortement le risque de laisser une faille de sécurité traîner sur votre infra.

En complément vous pouvez choisir différentes politiques de mises à jour :
 - Tous vos containers
 - Tous sauf les container marqués comme tel
 - Seuls quelquesuns

La mécanique de notification vous propose de nombreuses solutions pour être mise au courant des mises à jour. J'ai choisi personnellement d'être prévenu dans le Slack de ma boite. La conséquence est que je suis spammé 1 fois par jour :D

J'utilise ce service depuis Novembre 2023 sans aucun souci.

Des alternatives à ce service (je n'ai pas testé)
 - [Shoutrrr](https://containrrr.dev/projects/shoutrrr/) qui n'est pas une alternative mais un complément à WatchTower, ce dernier préconise même l'usage Shoutrrr dans ses dernières versions.

A voir également :
 - [Le site officiel](https://containrrr.dev/watchtower/)
 - [Sa documentation Docker Compose](https://containrrr.dev/watchtower/usage-overview/)
 - [Sa documentation sur l'inclusion / exclusion des containers](https://containrrr.dev/watchtower/container-selection/)
 - [Sa documentation sur les notifications](https://containrrr.dev/watchtower/notifications/)

## Jellyfin

Déjà présenté dans mon article sur l'installation de [votre première application sur un setup Self-Hosting]({{< ref "/Self-Hosting-installer-sa-premiere-application" >}}), Jellyfin était pour moi le digne successeur de [Kodi](https://kodi.tv/) qui commençait à prendre sérieusement un coup de vieux dans le domaine du média center.

Il faut dire qu'il y a une distinction lourde entre une ihm conçue pour les smart-tv et une ihm "à la Netflix" et ça se sent fortement, moins de menu, moins d'aller retour, une configuration aisée et enfin de la vidéo à la demande à la maison.

Le produit est capable de présenter vos films, vos séries, vos photos et vos musiques. Je ne m'en sers néanmoins depuis Novembre 2023 uniquement pour la partie films & séries télé.

Jellyfin est également compatible Chromecast même si le setup pour y arriver est une purge pour les utilisateurs novice (un article sera proposé prochainement sur ce sujet précis)

J'utilise ce service depuis Novembre 2023 sans aucun souci.

Des alternatives à ce service (je n'ai pas testé)
 - [Kodi](https://kodi.tv/)
 - [Plex](https://www.plex.tv/), n'est pas FOSS
 - [Emby](https://emby.media/)

A voir également :
 - [Le site officiel](https://jellyfin.org/)
 - [Sa documentation Docker Compose](https://jellyfin.org/docs/general/installation/container#using-docker-compose)
 - [Mon précédent article sur Jellyfin]({{< ref "/Self-Hosting-installer-sa-premiere-application" >}})
 - Comment configurer Jellyfin pour Chromcast (article à venir)

## AdGuardHome

Digne successeur du projet [Pi-hole](https://pi-hole.net/) Cette application a pour vocation de servir de proxy-DNS doublé d'un bloqueur de publicité. Le concept est similaire au fait d'installer un ad-bloqueur sur vos navigateurs sauf que le filtre implémenté se fait au niveau réseau et est donc valable pour tous les appareils utilisant le DNS de votre installation AdGuardHome.

J'utilise ce service depuis Novembre 2023 et les quelques soucis que je rencontre[^1] ont pu être contournés en forçant l'application en faute à ne pas utiliser ce service.

[^1]: Par exemple Spotify sur Debian me bloque l'authentification si le PC utilise ce service, je n'ai pas pu creuser le sujet. Il est possible que ce soit le fait que Spotify soit installé sur la même machine et donc la même adresse réseau que AdGuardHome.

Son utilisation se fait assez simplement : il faut paramétrer tous vos appareils pour qu'il utilise les DNS de votre nouvelle application. Vous pouvez également paramétrer cette adresse DNS directement sur le routeur de votre box afin de simplifier votre installation.

Son installation est assez facile, toujours à base de configuration docker-compose.yml et une fois démarré vous pouvez aisément vous abonner à des filtres de bloqueur de pub directement au sein de l'application.

L'application vous permettra également de bloquer des sites en entier, des services,.. C'est assez poussé.

Ce que ne fait pas l'application par contre c'est la notion de mise en cache. D'autres services le font

A voir également :
 - [Le site officiel](https://adguard.com/en/adguard-home/overview.html)
 - [La documentation Docker Compose](https://cyberhost.uk/adguard-setup/)

## Traefik

Cette application sert de reverse proxy et je suis bien conscient que les débutants dans le monde du self-Hosting ne se voient pas utiliser un tel outil au démarrage de leur installation. Et pourtant...

Un reverse proxy c'est ce qui vous permet aisément de caster Jellyfin sur Chromecast, c'est ce qui vous permet d'accéder à votre installation Immich en tapant https://immich.mon.domaine.fr et ce même si votre installation n'est pas ouverte sur le net. Génération de certificat TLS, redirection de service, ces systèmes sont intimidants mais hautement polyvalents. J'ai un article dédié à son implication dans la configuration Jellyfin/Chromecast qui est en préparation.

La configuration de Traefik en standalone se fait facilement. Vous pensez juste à lui réserver les ports 80 & 443 (respectivement http et https) surtout si comme moi vous l'installer en tant que reverse proxy pour desservir toutes les autres applications installées via Docker chez vous.

La configuration de Traefik pour auto-générer des certificats est plus velue. Je vous mets en lien un article très intéressant qui m'a bien été utile au démarrage.

Enfin, une fois que Traefik est configuré il vous reste à configurer vos applications déjà en place pour que celles-ci puissent interagir avec Traefik et inversement. Pour ce faire, Trafik utilise intelligemment les labels Docker. Je vous donne ci dessous un exemple qui me permet d'accéder à mon instance Jellyfin sur https://medias.example.com

```yml
services:
  # Jellyfin
  jellyfin:
  image: lscr.io/linuxserver/jellyfin:latest
  container_name: jellyfin
  environment:
    [Insérer ici la conf environnement]
  volumes:
    [Insérer ici la conf volume]
  ports:
    - 8096:8096
  restart: unless-stopped
  networks:
    - home
  labels:
    # Cette ligne déclare le service Jellyfin comme "à être pris en compte par Traefik
    - traefik.enable=true
    # Ici on donne à Traefik le nom de domaine souhaité et par défaut on veut du https (websecure, voir + bas)
    - traefik.http.routers.jellyfin.rule=Host(`medias.example.com`)
    - traefik.http.routers.jellyfin.entrypoints=websecure # https, configuration définie dans la conf traefik
    - traefik.http.routers.jellyfin.service=service_jelly
    - traefik.http.services.service_jelly.loadbalancer.server.port=8096
    # Ici on précise la configuration Traefik TLS à utiliser (appelée defaultK ici, voir + bas)
    # pour générer les certificats.
    - traefik.http.routers.jellyfin.tls=true
    - traefik.http.routers.jellyfin.tls.certresolver=defaultK

networks:
  home:
    external: true
```

Côté Traefik il existe évidemment la configuration définissant websecure & defaultK mais je ne rentrerais pas plus dans les détails, ce n'est pas le but de l'article

A voir également :
 - [Le site officiel](https://traefik.io/traefik/)
 - [La documentation Docker Compose](https://doc.traefik.io/traefik/getting-started/install-traefik/)
 - [Un très chouette article qui m'a permis de comprendre le fonctionnement de Traefik et de la génération des certificats https](https://blog.silarhi.fr/docker-compose-traefik-https/)

## Stack *Arr

Sous cette appellation nous retrouvons de très nombreuses solutions qui permettent de monitorer un média, de tracker son existence sur les réseaux P2P et Nzb afin de récupérer les dernières versions de celles-ci.

Vous pouvez configurer la langue du média souhaitée, la qualité (1080p, 720p 4K...) et pleins d'autres paramètres. Voici ceux qui sont le plus souvent cités dans cet univers :
 - [Sonarr](https://sonarr.tv/) pour les séries télévisés
 - [Radarr](https://radarr.video/) pour les films
 - [Lidarr](https://lidarr.audio/) pour la musique
 - [Readarr](https://readarr.com/) Pour les epub

On peut également y citer les applications complémentaires :
 - [Qbittorent](https://www.qbittorrent.org/) pour gérer les torrents
 - [Jackett](https://github.com/Jackett/Jackett) pour gérer les sites de torrents (que l'on appel source) et que le reste de la stack *arr va consommer.
   - [Prowlarr](https://prowlarr.com/) une alternative à Jackett
 - [FlareSolverr](https://github.com/FlareSolverr/FlareSolverr) pour contourner les Captchas de CloudFlare.
 - [Overseerr](https://overseerr.dev/) Pour agréger sous une url unique la recherche et la découverte de médias. S'interface avec le reste de la stack *arr. Pour Plex uniquement
   - [Jellyseer](https://github.com/Fallenbagel/jellyseerr) Une alternative à Overserr pour Jellyfin
 - [Bazarr](https://www.bazarr.media/) Pour télécharger les sous titres des médias téléchargés automatiquement.
   - [Tautulli](https://tautulli.com/) Une alternative à Bazarr dédiée à Plex

Cela fait évidemment beaucoup de choses, tout n'est pas bon à prendre. Prenez soin de ne prendre que les éléments nécessaires à votre consommation.

Ce qui est intéressant c'est de configurer toute cette stack pour que le résultat téléchargé soit directement accessible à Jellyfin :)

Gardez juste en tête que télécharger des propriétés intellectuelles est évidemment illégal et par conséquence vous ne devriez certainement pas le faire, et même si pour cela vous vous protégez d'Hadopi avec un VPN.

## Tailscale

Ce service VPN peut s'installer sur votre infra SelfHosting et permet d'accéder à une infra qui n'est pas accessible d'internet en temps normal.

La particularité de ce VPN est que l'agent TailScale installé via Docker vous permet d'établir un tunnel de confiance entre les serveurs de TailScale et votre infra sans ouvrir de port sur votre box. Ainsi votre infra reste off-line sauf si vous vous connectez sur les serveurs de Tailscale avec succès !

Il existe des clients Tailscale pour énormément de situations ! Windows, unix, [Android](https://play.google.com/store/apps/details?id=com.tailscale.ipn). J'ai personnellement un client sur mon smartphone qui me permet d'activer ou de désactiver l'accès depuis l'extérieur à mon infra, rendant accessible Jellyfin depuis mon entreprise, mes photos, et tout le reste.

La force d'un tel système est évidemment sa sécurité absolue. Sa faiblesse est qu'il n'est pas envisageable lorsque vous fonctionnez en Offline de partager un album photo à un tier.

J'utilise ce service depuis Novembre 2023 sans aucun souci.

A voir également :
 - [Le site officiel](https://tailscale.com/)
 - [La documentation Docker Compose](https://tailscale.com/kb/1282/docker)

## Paperless-Ngx

Un des services que j'ai désinstallé car je n'ai pas l'usage à titre personnel mais je dois reconnaître son caractère incroyablement utile pour qui cherchera à organiser une montagne de PDF chez lui.

En effet Paperless est un logiciel OCR qui saura parser vos documents word, pdf, ... et en tirer le contenu afin de vous proposer un moteur de recherche très performant.

Je n'avais personnellement pas assez de volume pour que cela soit intéressant à mon niveau

A voir également :
 - [Le site officiel](https://docs.paperless-ngx.com/)
 - [La documentation Docker Compose](https://docs.paperless-ngx.com/setup/#docker_hub)

## Homepage

Ce service propose une page d'accueil vous permettant d'exposer en un unique lieu l'ensemble des bookmarks sous une forme très sympas.

Avec Homepage il est aisé de représenter les applications accessibles dans votre infra et même de se connecter à leur APIs pour remonter des indicateurs tels que le média en cours de lecture sur Jellyfin ou le nombre de photos disponible sur Immich.

Sa configuration est relativement simple mais nécessite toutefois un rechargement de docker pour une prise en compte car Homepage -contrairement à ses alternatives- ne propose qu'un site statique ce qui empêche tout dynamisme dans la modification. C'est également un avantage puisque cette application ne consomme rien, ou quasiment rien en termes de ressources.

Des alternatives à ce service :
 - [Homarr](https://homarr.dev/) (non testé)
 - [Heimdall](https://heimdall.site/) que j'ai testé et j'ai abandonné car trop gourmand à mon goût pour le peu de fonctionnalité que je demande
 - [Homer Dashboard](https://github.com/bastienwirtz/homer) (non testé)

A voir également :
 - [Le site officiel](https://gethomepage.dev/)
 - [La documentation Docker Compose](https://gethomepage.dev/latest/installation/docker/)

## Minetest

Un petit clone de Minecraft sans prétention, je suis conscient qu'il est largement en dessous de certains concurrents mais il a été une très bonne surprise pour initier mon fils (6 ans) aux jeux vidéos en réseau local à la maison.

Des alternatives à ce service :
 - [Minecraft](https://www.minecraft.net/fr-fr) évidemment, mais non FOSS
 - [Vintage Story](https://www.vintagestory.at/) non FOSS
 - [Voxelands](https://gitlab.com/voxelands/voxelands) (projet abandonné)
 - [Terasology](https://terasology.org/) et leur exemple de [docker-compose](https://github.com/MovingBlocks/docker-terasology/blob/master/docker-compose.yml)
 - [ClassiCube](https://github.com/ClassiCube/ClassiCube) et 2 liens pointant vers [un build Docker Mono ou .net core](https://github.com/ClassiCube/MCGalaxy)

Il existe d'autres alternatives encore mais je n'ai pas trouvé de docker-compose disponible
 - [TrueCraft](https://github.com/ddevault/TrueCraft)
 - [Craft](https://github.com/fogleman/Craft)
 - [Freeminer](http://freeminer.org/)

A voir également :
 - [Le site officiel](https://www.minetest.net/)
 - [La documentation Docker Compose](https://hub.docker.com/r/linuxserver/minetest)

## Bilan

Je n'ai pu vous parler que de logiciels que j'ai personnellement testés, il y a de nombreux domaines que je n'ai pas encore éprouvé, je vous donne ci dessous pleins de pistes à explorer. Dans tous les cas sachez qu'internet est inondé de bonnes idées, de perles à découvrir et je suis certain que d'ici fin 2024 j'aurai de quoi faire une seconde partie à ce Best-Off :)

 - [Home Assistant](https://www.home-assistant.io/) pour gérer la domotique chez vous
 - [VaultWarden](https://github.com/dani-garcia/vaultwarden) pour héberger votre instance BitWarden
 - [Nextcloud](https://nextcloud.com/), inutile de le présenter. Attention à sa consommation de ressource.
 - [Gitea](https://about.gitea.com/) pour avoir une infra Git chez soi
 - [Navidrome](https://www.navidrome.org/) pour un équivalent local Spotify ou Deezer
 - [Syncthing](https://syncthing.net/) pour un drive synchronisant vos documents entre différents devices
 - [Firefly3](https://www.firefly-iii.org/) ou [Actual](https://actualbudget.org) pour gérer les finances
 - [TubeArchivist](https://www.tubearchivist.com/) ou [MeTube](https://github.com/alexta69/metube) pour télécharger des vidéos Youtube.
 - ...

Au delà de cet article :
 - [Le résultat de l'enquête 2023 sur l'usage du SelfHosting](https://selfh.st/survey/2023-results/)
 - [Le guide absolu des solutions à héberger chez soi](https://github.com/mikeroyal/Self-Hosting-Guide)
