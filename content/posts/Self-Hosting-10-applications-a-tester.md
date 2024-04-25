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

Le monde du Self-Hosting, de Docker et de unix en général évolue très rapidement, il est possible que dans quelques mois, années, certaines parties de ce guide devienne obsolète. Je vous invites systématiquement à vous rapprocher de la documentation officielle des applications si vous avez le moindre doute :) 

En cas de suspicion d'anomalie contactez moi par mail ou via [Linkedin](https://www.linkedin.com/in/kevin-danezis/) pour me signaler l'erreur

Ci dessous vous retrouverez une liste éprouvée d'applications que j'utilise au quotidien, je vous fournit également les configurations utilisées, je vous invite préalablement à lire mes articles sur [la manière d'installer votre setup]({{< ref "/Self-Hosting-setup-en-1-heure" >}}) ainsi que mon [guide de la première installation d'application sur son setup]({{< ref "/Self-Hosting-installer-sa-premiere-application" >}}) afin de comprendre les nuances présentes dans mes configurations, notamment pour ce qui touche de l'usage et l'organisation des répertoires et des volumes Docker.

## Immich

Mon coup de coeur, il remplace allégrement Google Photo et toutes ces solutions payantes que l'on trouve sur le net. Vous pouvez indexer comme moi +34 000 photos, +1000 vidéos pour plus de 200Go de données sans aucun soucis de latence. 

J'utilise depuis Novembre 2023 sans aucun soucis.

**Attention :** à date d'écriture de ces lignes immich est un projet qui se définit lui même comme un projet en développement intensif, il faut donc s'attendre a de fréquentes modifications majeures qui peuvent casser votre installation si vous n'y prêtez pas attention. 

En conséquence de ces changements brutaux c'est la seule application qui n'est pas scrutée par watchTower

Des alternatives à ce service (je n'ai pas testé)
 - 

A voir également : 
 - [Le site officiel](https://immich.app/)
 - [Sa documentation Docker Compose](https://immich.app/docs/install/environment-variables#docker-compose)

## WatchTower

Un incontournable dans le monde du container et du Self-Hosting. Ce service va scruter vos containers et va tenter, à interfal régulier, de les mettre à jour.

Cela vous permet de réduire fortement le risque de laisser une faille de sécurité trainer sur votre infra.

En complément vous pouvez choisir différentes politiques de mises à jour : 
 - Tous vos containers
 - Tous sauf les container marqués comme tel
 - Seuls quelqu'uns

La méchanique de notification vous proposera de nombreuses solutions pour être mis au courant des mises à jour. J'ai choisit personnellement d'être prévenu dans le Slack de ma boite. La conséquence est que je suis spammé 1 fois par jour :D 

J'utlise ce service depuis Novembre 2023 sans aucun soucis.

Des alternatives à ce service (je n'ai pas testé)
 - 

A voir également : 
 - [Le site officiel](https://containrrr.dev/watchtower/)
 - [Sa documentation Docker Compose](https://containrrr.dev/watchtower/usage-overview/)
 - [Sa documentation sur l'inclusion / exclusion des containers](https://containrrr.dev/watchtower/container-selection/)
 - [Sa documentation sur les notifications](https://containrrr.dev/watchtower/notifications/)

## Jellyfin

Déjà présenté dans mon article sur l'installation de [votre première application sur un setup Self-Hosting]({{< ref "/Self-Hosting-installer-sa-premiere-application" >}}), Jellyfin était pour moi le digne successeur de [Kodi](https://kodi.tv/) qui commençait à prendre sérieusement un coup de vieux dans le domaine du média center.

Il faut dire qu'il y a une distinction lourde entre une ihm conçue pour les smart-tv et une ihm "à la Netflix" et ça se sent fortement, moins de menu, moins d'aller retour, une configuration aisée et enfin de la vidéo à la demande à la maison.

Le produit est capable de présenter vos films, vos séries, vos photos et vos musiques. Je ne m'en serts néanmoins depuis Novembre 2023 uniquement pour la partie films & séries télé.

Jellyfin est également compatible Chromecast même si le setup pour y arriver est une purge pour les utilisateurs novice (un article sera proposé prochainement sur ce sujet précis)

J'utlise ce service depuis Novembre 2023 sans aucun soucis.
Des alternatives à ce service (je n'ai pas testé)
 - 

A voir également : 
 - [Le site officiel](https://jellyfin.org/)
 - [Sa documentation Docker Compose](https://jellyfin.org/docs/general/installation/container#using-docker-compose)
 - [Mon précédent article sur Jellyfin]({{< ref "/Self-Hosting-installer-sa-premiere-application" >}})
 - Comment configurer Jellyfin pour Chromcast (article à venir)
