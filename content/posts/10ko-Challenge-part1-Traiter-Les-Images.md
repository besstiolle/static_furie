---
title: "10Ko Challenge #1 : Traiter les images"
description: "Présentation d'un ensemble de bonnes pratiques pour optimiser les images de son site"
date: 2021-02-10T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - web
  - 10ko
  - images
  - webp
---

## Rappel du challenge

> Le but de cette série d'articles est de démonter concrètement que réaliser un site internet restant sous la barre des 10Ko tout compris est une entreprise compliquée mais réalisable si nous savons opérer les bons sacrifices.

Et aujourd'hui je vais me concentrer sur l'un des 3 axes primordiaux en termes de gain de bande passante : la gestion des images. Et je ne parlerai pas uniquement de l'optimisation des images car cela ne représente en réalité qu'une infime portion du travail, nous aborderons également la question de l'intérêt de conserver ou pas des images sur un site.

## L'utilité des images et des médias

Vu la cible à atteindre, il est déjà inutile de préciser que toute notion de vidéo est à proscrire, donc par médias j'évoquerai uniquement :
 - les icones d'agréments
 - les favicons des headers
 - les images d'arrière-plan et les images de décoration de texte.

Avoir un site sans média est clairement la bonne démarche pour réduire la taille de notre site, c'est indéniable et [Karine nous l'a déjà montré](https://karinesabatier.netlify.app/) mais que faire si l'on souhaite malgré tout sortir de l'austérité ? 

L'approche que je préconise serait de faire la balance entre le besoin du joli et le besoin d'un site léger. Pour ce faire, retirez toutes les images qui n'apportent aucune plus-value au lecteur. Réduisez les illustrations de texte inutiles, ne gardez que quelques icones et mutualisez leurs usages.

Gardez à l'esprit que l'objectif du challenge n'est pas de faire un site joli, mais un site sous la barre des 10ko

### Rappel du fonctionnement des requêtes HTTP

Le poids d'une requête http est la somme du binaire transmis sur le net plus la taille du header de la réponse http. Plus le header de la réponse http est complexe (cookies, headers sécurité, custom header) et plus le poids d'un fichier augmentera in-fine.

Pour exemple, au moment de la rédaction de ce texte, Chrome m'annonce que mon fichier `site.webmanifest` ([lien](/site.webmanifest)) pèse `279 octets` mais me coûte `359 octets` soit un header http pesant `80 octets`, une valeur anecdotique -et variable selon le fichier, le serveur, la météo, ...- dans le commun des sites internet mais dont nous devons garder à l'esprit dans le cadre de notre challenge où une requête http vide représente à elle seule 0.8% de notre limite

**Moins de requête = autant d'économie**

sources : 
 * [Bonne pratique : réduire les headers](https://www.globaldots.com/blog/googles-web-performance-best-practices-3-minimize-request-overhead)
 * [Les perfs de http(s) par le W3C](https://www.w3.org/Protocols/HTTP/Performance/)

### Rappel de l'encodage en base 64

Une solution à notre problème cité précédemment  serait d'inclure au sein du code source l'image sous la forme d'[un binaire en base64](https://www.base64-image.de/), me faisant économiser un header http. Sauf que ce n'est pas aussi simple. L'encodage en base64 me coûterait en moyenne 30% plus cher que le poids d'une image. L'option est donc valable uniquement si `(1.3 * poidsImage) < poidsImage + 80` soit : `poidsImage < 80/0.7` soit `poidsImage < 114`octets.

D'autres cas d'usage peuvent se présenter notamment dans le cas de [streaming de data](https://medium.com/snapp-mobile/dont-use-base64-encoded-images-on-mobile-13ddeac89d7c)

Autant dire que ce n'est pas demain la veille qu'un encodage en base64 va nous aider.

sources : 
 * [N'utilisez pas la base64!](https://medium.com/snapp-mobile/dont-use-base64-encoded-images-on-mobile-13ddeac89d7c)
 * [idem](https://bunny.net/blog/why-optimizing-your-images-with-base64-is-almost-always-a-bad-idea/)

### Rappel sur Les sprites CSS

Cette technique permet d'assembler des petites images en une unique image qui sera potentiellement utilisée dans plein d'endroits du site. Le gain ici est évidement de réduire le nombre de requêtes nécessaires pour tout ce qui touche généralement aux icones d'agréments.<i class='icoTag'></i><i class='icoWor'></i><i class='icoTim'></i>

Cette mécanique demande peu d'effort, un peu de CSS et une connaissance de ce fonctionnement. C'est tout.

## Plongeon dans l'optimisation

### Démarrage & Traitement des SVG

J'ai donc démarré mon site en démarrant d'un [template Hugo existant](https://themes.gohugo.io/hugo-theme-hello-friend-ng/#how-to-start) que j'ai estimé être relativement épuré. J'ai ensuite entrepris de purger tout ce qui ne m'intéressait pas, notamment en retirant les SVG (bonne pratique pour l'accès via mobile) pour les remplacer par des images concaténées en [un seul sprite CSS](/imgs/sprite.webp) La raison est simple : après test, le poids total des SVGs était supérieur à un ensemble de règles CSS + sprite CSS.

Autre axe facile à réaliser : toutes les images de décoration de texte sont redimensionnées "au plus juste" du besoin. Inutile d'embarquer des tailles excessives.

J'arrive alors à un site internet pesant moins de 50ko.

### Format d'image

Le choix s'est vite posé alors de savoir comment enregistrer mes images. jpg ? png ? Non après test encore une fois, le format webp était vainqueur sur toute la ligne. Son existence au format open source depuis 2011 assure une compatibilité sur [quasi-tous les navigateurs](https://caniuse.com/webp) actuellement en place, idem pour les mobiles.

Je n'oublie pas de convertir les images, les icones mais également les favicons, ce sera autant de gains !

A ce stade de mon aventure j'ai réussi (avec d'autres travaux expliqués dans d'autres articles) à réduire la taille de mon site à moins de 40Ko

### Sacrifice sur l'image

Le format WebP ne résout pas toute mes problématiques. Il faut faire alors le choix de réduire la qualité de mes images. Je teste un format en noir et blanc, un format sépia, ce sera le noir et blanc qui l'emportera. Ensuite je regarde au jugé le rapport compression webp VS qualité d'image. Et il n'y a pas de règle ! c'est à vous de choisir pour chaque image le niveau acceptable de compression vs son poids.

Comme j'ai fait le choix de conserver une image en fin de mes articles cette mécanique du cas par cas est indispensable. Impossible de passer par un outil d'automatisation.

Sources des comparatifs : 
 - image d'origine : [leaves_hd.webp](/imgs/leaves_hd.webp) (84.6 ko)
 - comparatif à poids égal : <8ko : [leaves_origne.jpg](/imgs/leaves_origne.jpg) [leaves_origne.png](/imgs/leaves_origne.png) [leaves_origne.webp](/imgs/leaves_origne.webp)
 - image webp en [sepia](/imgs/leaves_sepia.webp) (6.22ko) et en [noir et blanc](/imgs/leaves_nb.webp) (5.75ko)
 - image webp [noir et blanc compressé](/imgs/leaves_compressed.webp) (2.91ko)

Nous en sommes maintenant à un site passant sous la barre des 15ko ! 

{{< image src="/imgs/leaves.webp" alt="feuilles d'arbres" position="center" style="border-radius: 8px;width: 650px;">}}
