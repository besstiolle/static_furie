---
title: "Self-Hosting : Quelles stratégies pour le stockage et la sauvegarde de ses données?"
description: "Présentation des stragégies de sauvegarde de vos données dans le Self-Hosting"
description: "Présentation des stratégies de sauvegarde de vos données dans le Self-Hosting"
date: 2024-04-21T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - web
  - self-hosting
  - backup
---

## Rappel sur l'univers du self-hosting avant de démarrer :

> Je suis très loin de me considérer comme un expert du self-hosting, tout au plus j'ai essuyé quelques plâtres dans mon aventure mais j'estime qu'il y a matière à partager. Sentez vous libre de compléter votre lecture avec d'autres sources, de tester, de valider ou d'invalider mes propos et de m'en faire des feedbacks via Linkedin ou par Mail :)

Cette série d’articles autour du self-hosting est rédigée au fil de l’eau. Je vous invite à [démarrer cette série par le sommaire]({{< ref "/Self-Hosting-tour-rapide-question" >}})

## Définitions pour cet article

**Donnée chaude :** on parle de données chaudes pour toutes les données que vos applications et votre infrastructure manipulent constamment : le système (l’OS), le moteur supportant vos applications, le code des applications elles-même et leur propre fichiers de configuration. Ces données sont généralement caractérisées par un taux de lecture/écriture intense tout au long de la journée (on parle de I/O)
**Donnée chaude :** On parle de données chaudes pour toutes les données que vos applications et votre infrastructure manipulent constamment : le système (l’OS), le moteur supportant vos applications, le code des applications elles-même et leur propre fichiers de configuration. Ces données sont généralement caractérisées par un taux de lecture/écriture intense tout au long de la journée (on parle de I/O)

**Donnée tiède :** On y retrouve des données manipulées par les applications installées mais qui ne sont pas utilisées constamment. On peut évoquer les photos stockées dans un logiciel de galerie photo, les messages stockés dans un logiciel de chat, les binaires téléchargés par un logiciel de partage de fichier.

**Donnée froide :** On parle de données qui ne seront accessibles qu’au travers d’un accès manuel, généralement exceptionnel. On y retrouve les sauvegardes de données.

## Pourquoi se soucier de mes données ?

Selon le choix de votre matériel, il est probable que la notion de stockage et de sauvegarde arrive rapidement sur le devant de la scène car comme je le dis souvent : il existe deux types de personnes : ceux qui n’ont jamais perdu de données et ceux qui font des sauvegardes. De fait, réfléchir à ce qui compose l’ensemble de vos données permet d’établir un plan de sauvegarde avant de pousser trop loin votre setup et de vous rendre compte que certains choix deviennent un frein naturel à la sauvegarde des données.

Sur le net vous trouverez essentiellement deux stratégies pour ce qui touche à la sauvegarde de vos données. Je vous fais un rapide rappel de celles- ci.

### La stratégie 3:2:1

Il doit exister à tout moment **3 copies** de vos données importantes, incluant celles utilisées par votre setup self-hosting.

Ces copies doivent être distribuées sur **2 supports différents**, ça peut être sur une clé usb ou un disque dur externe ou un disque sur un NAS ou du cloud.

**Un des deux supports doit être hors site**, ça peut être la clé usb chez maman, le NAS chez le pote ou un service cloud.

Cette stratégie a le mérite d’assurer 99,99% des cas de panne mais nécessite de facto d’augmenter les frais périphériques au Self-Hosting, que ce soit via l’achat d’un disque supplémentaire ou de la location d’espace sur le cloud.

### La stratégie 3:2:1:1:0

Une extension à la première stratégie, celle ci propose en plus :

**Une copie doit être air-gap**, c’est à dire hors d’atteinte de votre réseau. Cette notion prend tout son sens si vous réfléchissez à une attaque informatique type ransomware qui détruirait les sauvegardes disponibles sur votre réseau.

**Zéro erreur de sauvegarde**, c’est à dire que vous devez vous assurer que la constitution de vos sauvegardes, la compression éventuelle et leur archivage se fasse sans altérer le contenu, y compris au travers de bugs informatiques, d’anomalies liées au réseau, au support de sauvegarde, et ainsi de suite …

Cette stratégie pousse le bouchon très loin, j’ai personnellement acté la notion d’air-gap dans ma stratégie car ma sauvegarde finissant chez un opérateur cloud, c’était une plus value sans aucun effort acquis de facto

### La meilleure des stratégies : éprouvez vos sauvegardes

L’erreur la plus commune d’expérience est de s’imaginer que son backup fonctionne et de se rendre compte que ce n’était finalement pas le cas le jour où vous démarrez la restauration de vos données.

Je préconise de réaliser régulièrement (au moins 3 fois dans l’année) une opération de restauration des données afin de vous assurer que oui : votre système de backup fonctionne.

## La sauvegarde dans le cadre du Self-Hosting

Si comme moi vous avez opté pour une installation OS > Docker > applications alors il est très probable qu’il faille penser à sauvegarder pas mal de choses. Voici mes préconisations et les outils / solutions à creuser.

### Données chaudes : Votre OS & Docker

[Timeshift](https://teejeetech.com/timeshift/) fait des merveilles. Il fait un équivalent sous Windows des points de restauration système. Je fais généralement un unique snapshot après avoir fini d’installer l’os, l’avoir configuré et avoir installé docker et d’autres logiciels sur la machine. Cela me permet de restaurer ma machine à un état prêt à démarrer.

En temps normal je serais motivé pour déporter cette sauvegarde sur un équipement tiers mais j’ai préféré opter pour une installation Debian full shell avec une surcouche de ma composition sous la forme d’un installeur & configuration bash (.sh). Cette surcouche me permettant de réinitialiser n’importe quelle installation debian shell vers une infrastructure prête à démarrer son œuvre.

### Données chaudes : La configuration docker-compose & .env des applications

L’installation fonctionnant avec docker, il est très facile de sauvegarder sa configuration pour peu que l’on prenne le temps de bien s’organiser en amont. Voici un exemple de mes répertoires

```
home
 ├─root
 │  └─[...]
 ├─otherUser
 │  └─[...]
 └─dockerUser
    ├─docker-config
    │  ├─app_A
    │  ├─app_B
    │  └─app_C
    └─docker-data
  	   └─app_B
```

Au sein des répertoires docker-config/app_X on trouve essentiellement deux fichiers :
  - docker-compose.yml
 - .env

Sauvegarder toute la configuration docker de mes applications se résume à un script bash faisant simplement

```
tar -cvf /home/dockerUser/docker-config backupDocker.tar
```

Il suffit ensuite de sauvegarder cette configuration sur un autre support.

Il ne me semble pas nécessaire de faire plus d’effort sur ce point puisque par définition la configuration docker d’une application ne change jamais dans le temps et surtout ne change que sur l'action de son propriétaire. Il me semble donc qu’un backup manuel est suffisant.

### Données tièdes : Les données vitales & personnelles sur vos applications

Je parles ici des photos sur une application de galerie photo, de tous les fichiers contenant vos données. bref des données les plus sensibles.

Les applications et leur configuration Docker Compose sont généralement bien pensées car ils proposent bien souvent de séparer ces données les plus sensibles dans un volume à part ou dans un binding de répertoire différent du reste.

Exemple avec le [docker-compose de jellyfin](https://jellyfin.org/docs/general/installation/container/#using-docker-compose)

```
version: '3.5'
services:
  jellyfin:
    image: jellyfin/jellyfin
    [...]
    volumes:
      - /path/to/config:/config
      - /path/to/cache:/cache
      - /path/to/media:/media
    [...]
```

On peut voir les 3 premiers volumes correspondant aux répertoires systèmes /config & /cache tandis qu’un troisième volume est dédié aux fichiers vidéos : /media. C’est justement tout l’intérêt que de faire un lien entre votre instance Docker et un chemin hors instance /path/to/media, ainsi vous pouvez avoir vos médias au sein de votre ordinateur servant de support Self-Hosting et en profiter sur votre média center

ou encore mieux…

Laissez vos médias sur un NAS, faire un montage NFS depuis votre machine sur le répertoire /mnt/monRepertoireNASAvecLesVideos et adapter votre configuration docker ainsi

```
version: '3.5'
services:
  jellyfin:
    image: jellyfin/jellyfin
    [...]
    volumes:
      - /path/to/config:/config
      - /path/to/cache:/cache
      - /mnt/monRepertoireNASAvecLesVideos:/media
    [...]
```

Voilà un exemple type de **données tièdes** qui ne nécessitent pas d’I/O très important, accessibles depuis votre média center et de fait ne saturent pas le disque dur de votre infra.


### Données chaudes :  Les bases de données applicatifs

La notion de base de données local est à traiter individuellement. Je n'ai pas encore d'application dont la base de donnée ne soit pas auto-générée par des données personnelles externes. Donc si je perds les bases de données, je suis à priori capable de reconstituer avec peu d'effort la base.

Contre exemple : Avec un logiciel proposant de mettre en lumière mes finances, il est probable que je souhaites sauvegarder cela en lieu sûr, surtout si j'ai mis de l'énergie dans la configuration de ce logiciel. (prévisionnel, emprunt, ...).
Contre exemple : Avec un logiciel proposant de mettre en lumière mes finances, il est probable que je souhaite sauvegarder cela en lieu sûr, surtout si j'ai mis de l'énergie dans la configuration de ce logiciel. (prévisionnel, emprunt, ...).

A voir individuellement quel traitement vous souhaitez appliquer pour la sauvegarde.

Dans tous les cas les données de bdd devraient être au plus proche de l'OS.
Dans tous les cas, les données de bdd devraient être au plus proche de l'OS.

### Données chaudes :  Les autres données des applications 
### Données chaudes :  Les autres données des applications

Ici nous évoquons le cache des applications, les miniatures des images, les bdd servant à indexer vos données personnelles et ainsi de suite.

Elles ne représentent pas un caractère critique au sens de vos données personnelles et peuvent généralement être reconstituées par les applications elles même si vous faites une réinstallation

A l'inverse ces données de miniatures et de cache applicatifs sont bien plus accédées que les photos dans leur tailles d'origine. Il est donc important de localiser ces données au plus proche de l'OS. C'est en tout cas le choix que j'ai fait.
A l'inverse, ces données de miniatures et de cache applicatifs sont bien plus accédées que les photos dans leur taille d'origine. Il est donc important de localiser ces données au plus proche de l'OS. C'est en tout cas le choix que j'ai fait.

En conséquence de ce choix, j’ai réalisé la même mécanique que pour les configurations docker-compose et .env, un simple script bash lancé à la demande réalisera une archive compressée de toutes ces données ce qui me permet de sauvegarder si besoin et de redéployer sur une nouvelle infrastructure avant de redémarrer docker.

Je n'ai pas peur de perdre ces données, elles sont générées automatiquement par l'application.

**Note :** Ces données nécessitent que l’image docker soit éteinte pour être correctement sauvegardées. 
**Note :** Ces données nécessitent que l’image docker soit éteinte pour être correctement sauvegardées.

## En résumé

|  Data | Criticité | Méthode backup | Stratégie |
|----------|------|------|------|
| **Personnelles** | cruciale | NAS + copie sur Cloud en auto | auto |
| **Base de données** | A définir | OS + A définir | auto |
| **Base de données** | A définir | OS + À définir | auto |
| **Installation** | importante | OS + copie sur OS | manuel |
| **OS** | Moyenne | OS only | manuel |
| **Docker compose** | Moyenne | OS + copie sur NAS | manuel |
| **Applicatives** | Moyenne | OS + copie sur NAS | manuel |

## Usage du cloud

Pour mon setup j'ai considéré la nécessité de ne sauvegader que des données cruciales : mes données personnelles.
Pour mon setup j'ai considéré la nécessité de ne sauvegarder que des données cruciales : mes données personnelles.

Ainsi, et avec l'aide des capacités de mon NAS Synology 2020j une tâche nocturne copie les données personnelles présentes sur le NAS vers mon opérateur cloud.

Etant données que toutes mes données personnelles + celles de la famille sont sauvegardées, j'atteint actuellement un total de près de 1To de données pour un total de ~6€ / mois. Le prix de la tranquillité 
Etant données que toutes mes données personnelles + celles de la famille sont sauvegardées, j'atteins actuellement un total de près de 1To de données pour un total de ~6€ / mois. Le prix de la tranquillité

## Voir également : 
## Voir également :
 - [Comment restaurer les datas avec Synology Hyper Backup ]({{< ref "/Restaurer-data-Synology-Hyper-Backup" >}})

{{< image src="/imgs/dogsAndComputer.avif" alt="Des chiens et un ordinateur" position="center" style="border-radius: 8px;width: 650px;">}}