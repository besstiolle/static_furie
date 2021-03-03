---
title: "10Ko Challenge #3 : Choix Architecturaux"
description: "Explications sur la méthodologie utilisée pour choisir l'outil pour le challenge 10Ko"
date: 2021-02-21T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - web
  - 10ko
  - archi
  - serveur
  - hugo
---

## Rappel du challenge

> Le but de cette série d'articles est de démonter concrètement que réaliser un site internet restant sous la barre des 10Ko tout compris est une entreprise compliquée mais réalisable si nous savons opérer les bons sacrifices.

Et aujourd'hui nous prenons de la hauteur pour analyser dans les grandes lignes la réflexion technique autour de ce chemin parcouru.

## Choix de départ

J'en ai déjà parlé dans d'autres articles, mais pour démarrer ce challenge, j'avais le choix entre démarrer de zéro ou prendre un outil qui puisse m'aider. Je suis un grand fan des Cms, notamment de [CmsMadeSimple](https://www.cmsmadesimple.org/) mais là je souhaitais faire un site full static[^1] même si cela sortait de la dimension du challenge 10ko

Exit donc les CMS qui reconstruisent les réponses http à la volée et autres solutions client-side full JS qui nécessitent généralement de démarrer par un téléchargement du client JS lourd de plusieurs centaines de kilo.

Je me suis beaucoup baladé sur des sites tels que https://jamstack.org/ qui proposent de manière ludique un grand nombre d'informations sur deux types de moteurs : les générateurs de sites et les CMS dits headless. 

### Headless CMS

Ces CMS "sans tête" sont des produits qui proposent au travers d'APIs, de micro services ou de toutes autres solutions (git notamment), de renvoyer au client le contenu désiré et uniquement le contenu. Le client se charge de son côté d'appeler la bonne API pour afficher le contenu désiré par l'utilisateur sans une interface pré-définit

Le trio de tête étant [Ghost](https://ghost.org), [Strapi](https://strapi.io/) et [Netlify CMS](https://www.netlifycms.org/), Cumulant à eux seuls plus de la moitié des "stars" ☆ github de tous les projets Headless identifiés

Retrouvant une partie JS très importante dans le fonctionnement des Headless CMS il était impossible de partir sur cette solution pour arriver à un site sous la barre des 10ko

### Générateurs de site

Les générateurs de site ont pour ancêtre les FrontPage et autre Dreamweaver mais ils ont évolué (ouf) au point d'être aujourd'hui une référence dans l'auto-hébergement. Le principe est toujours le même : vous préparez le contenu en amont, le générateur de site va processer votre contenu pour en faire sortir un combo html / css / js qui sera à délivrer au client.

On y retrouve [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.com/), [Nuxt](https://fr.nuxtjs.org/), [Hexo](https://hexo.io/) et bien d'autres pour la partie JS, [Hugo](https://gohugo.io/) en langage Go et [Jekyll](https://jekyllrb.com/) le favori de Github en Ruby

Le souci des générateurs JS est leur propre ADN : ces derniers sont toujours amenés à utiliser du JS à tout-va, pour des requêtes xhr, pour de l'animation, pour du [SPA](https://fr.wikipedia.org/wiki/Application_web_monopage), etc. Donc ils sont écartés de facto.

Je fais le choix arbitraire de choisir Hugo après l'avoir testé en local.

### Génération à la main 

C'était une possibilité dès le départ que de faire à la main mon site. Mon expérience me donne ces pour & contre.

Pour : 
 * **Il est incroyablement plus facile d'ajouter peu de fonctionnel que de sacrifier du fonctionnel existant**. Commencer avec un site vide est la meilleure façon d'économiser vos forces. À l'inverse, prendre un site existant et l'épurer est une terrible épreuve mentale durant laquelle vous jonglerez constamment entre deux phases : "Est-ce vraiment indispensable ? non ? je peux enlever ?" et "Gagner si peu d'octets en retirer cette fonctionnalité si utile ne vaut pas le coup, cherchons des économies ailleurs".
 * Apprendre se fait toujours mieux par la pratique, commencer de zéro permet en outre d'avoir la totale maîtrise sur les libs embarquées et l'approche technique souhaitées : est-ce que je veux du beau, du pratique ou du rapide ?

Contre : 
 * Je suis une quiche en design et je voulais un site pas trop moche. Donc il me fallait un template sur lequel m'appuyer.
 * Mélanger le contenu et  l'ihm est une erreur résolue depuis 20 ans avec l'arrivée des CMS, il était hors de question de refaire l'erreur aujourd'hui.
 * De nouvelles bonnes pratiques émergent régulièrement. Apprendre peut donc se faire en regardant le code de site fonctionnel, le comprendre, et in-fine le supprimer si ce code et cette bonne pratique ne nous intéresse pas.

Le second point du Contre sur l'implication contenu/contenant était à lui seul un No-Go pour faire mon site à la main.

Ce sera donc **Hugo**.

## Choix du design

Hugo propose une chouette liste de thèmes dans lesquels je trouve [hello-friend-ng](https://themes.gohugo.io/hugo-theme-hello-friend-ng/), un template épuré qui pèse entre 250 et 300ko hors police de caractère. C'est beaucoup par rapport à notre cible, mais je pense pouvoir faire la différence.

Me voilà donc en train d'installer Hugo sur mon PC avec le thème sélectionné et je commence à trifouiller la bête avant de push sur github une première version sans prétention de mon site sur [netlify](https://www.netlify.com/), car une fois n'est pas coutume, les générateurs de site -dont Hugo- ont le bon goût d'être supporté par cet hébergeur gratuit que je recommande. 

[^1]: Raison de sécurité / optimisation / légerté ultime / écoconception / Envie de découvrir ...

{{< image src="/imgs/hugo.webp" alt="WebP Logo" position="center" style="border-radius: 8px;width: 650px;">}}