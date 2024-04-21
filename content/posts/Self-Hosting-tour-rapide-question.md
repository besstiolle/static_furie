---
title: "Self-Hosting : un tour rapide de la question"
description: "Présentation du concept du self-hosting et comment se lancer"
date: 2024-04-19T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - web
  - self-hosting
  - backup
---

Dans ce billet qui sera remis à jour très régulièrement j'ai opté pour rédiger une sorte de menu principal qui pointera au fur et à mesure vers toutes les entrées de mon blog qui tourneront autour du self-hosting et ce qui entoure cet univers assez large: les concepts, la pratique, les questions en suspens.

## Rappel sur l'univers du self-hosting avant de démarrer :

> Je suis très loin de me considérer comme un expert du self-hosting, tout au plus j'ai essuyé quelques plâtres dans mon aventure mais j'estime qu'il y a matière à partager. Sentez vous libre de compléter votre lecture avec d'autres sources, de tester, de valider ou d'invalider mes propos et de m'en faire des feedbacks via Linkedin ou par Mail :)

Le self-hosting (auto-hébergement) est le nom que l’on donne à l’activité qui consiste à héberger sur du matériel qui nous appartient des logiciels ou des stacks techniques afin de mettre à disposition d’un tiers ou à soi-même un service. 

Dans la très grande majorité des cas, le matériel est chez soi, les logiciels sont open source et les données que l’on apporte au sein de ces applications restent notre propriété, à l’inverse des données que l’on apporte à la société Alphabet lorsque l’on utilise son service Google Drive par exemple.

Il y a donc deux tendances qui en ressort : 
 - La réappropriation de la propriété de ses données
 - Un certain côté “Do It Yourself” assez technique il faut avouer.

Nous allons dans ces articles essentiellement explorer la seconde tendance et tenter de rendre le plus accessible possible cette activité.

## A l'origine de mon intérêt du self-hosting

Tout a démarré sur un autre domaine : la [https://degooglisons-internet.org/fr/](dégoogolisation), l'art de tenter de sortir des griffes des GAFAM. C'est en abordant la douloureuse question du remplacement de google photo que je me suis rendu à l'évidence : la réappropriation de mes données devra passer par la prise de responsabilité sur son hébergement.

Adieu les services cloud [extrêmement cher](https://www.backblaze.com/cloud-storage/pricing), adieu [les fausses promesses de gratuité](https://www.cnet.com/tech/services-and-software/google-photos-unlimited-free-storage-is-gone-heres-how-to-get-more-space/) qui au passage utilisent mes données à tout va pour me pister. On ne parlera pas non plus de leur manie d’utiliser nos données [pour entraîner leur shitty-IA](https://searx.be/search?q=annonce+utiliser+vos+donn%C3%A9es+pour+entrainer+leur+ia).

Je creuserai dans un autre article à venir ma réflexion sur ce point en abordant des solutions alternatives pour démarrer votre réflexion sur le *Pourquoi se lancer*

## Le matériel pour démarrer

Faites avec ce que vous avez, un PC de gamer, un laptop du boulot, un raspberryPi (3+), un NUC ou un NAS, ce sont autant de solutions possibles pour démarrer un hébergement de logiciel "à votre demande"

A cette heure je fonctionne avec le matériel suivant :
 - [Un compte sur backblaze](https://www.backblaze.com/cloud-storage) pour mes données dites froide
 - [Un NAS Synology 2020j](https://www.synology.com/fr-fr/company/news/article/DS220j) pour mes données dites tièdes & chaude
 - Un vieux Asus [UX303L](https://searx.be/search?q=UX303L&categories=general&language=fr) en ma possession pour servir de "Serveur local"

Pour la stack logicielle du laptop j'ai opté pour
 - Debian full shell pour l'os
 - Docker & Docker-compose pour le runtime des containers

J'aborderai dans des articles dédiés la réflexion derrière ces choix, ce qui fonctionne et ce qui peut encore bloquer. Je m'étendrai également sur les spécifications techniques du matériel
 - [Comment choisir votre matériel pour faire du self-hosting?]({{< ref "/Self-Hosting-comment-choisir-votre-materiel" >}})
 - [Quelles stratégies pour le stockage de données en self-hosting?]({{< ref "/Self-Hosting-strategies-stockage-sauvegarde-donnees" >}})

## Les deux notions à connaître avant de se lancer ?

La première des notions à maîtriser est la notion de sécurité du point de vue de la gestion des accès à vos services ou en termes de patch sécurité. La seconde notion à maîtriser est le backup de vos données. Je recommande systématiquement de démarrer par ces deux sujets avant même de creuser plus loin le self-hosting quand vous passez l’étape du simple prototype jetable.

Est ce que vos services sont accessibles sur le net ? Si oui, vous avez déjà de nombreux soucis à vous faire. J’opte personnellement pour une installation offline sur mon réseau interne doublé par une solution VPN qui permet aux personnes physiques que j’ai autorisé en amont de tenter de se connecter sur mes services.

Au delà de ces deux notions majeures il est également nécessaire de connaitre les bases de ces domaines pour se lancer : 
 - Unix
 - Docker, Doker-compose ou Podman
 - Réseau, NFS, SSH, ...

## Voir également : 
 - Sécuriser son infra Self-Hosting (à venir)
 - Implémenter en 1h son infra Self-Hosting (à venir)

{{< image src="/imgs/dogsAndComputer.avif" alt="Des chiens et un ordinateur" position="center" style="border-radius: 8px;width: 650px;">}}