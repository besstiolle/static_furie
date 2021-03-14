---
title: "10Ko Challenge #5 : Bilan & Analyse"
description: "Bilan du challenge"
date: 2021-03-13T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - web
  - 10ko
  - agilité
  - mvp
  - eco-conception
---

## Rappel du challenge

> Le but de cette série d'articles est de démonter concrètement que réaliser un site internet restant sous la barre des 10Ko tout compris est une entreprise compliquée mais réalisable si nous savons opérer les bons sacrifices.

La moyenne des poids d'un site internet plafonnait à **800ko en 2011**, était de **2.4Mo en 2016**, et aujourd'hui nous avons une moyenne de **5Mo pour le top 10** des sites internets en France... ça ne risque pas de s'améliorer et l'utopie d'un réseau plus rapide (5G) capable d'engloutir ce poids est une utopie. Il est temps de faire machine arrière.

Alors prenons un peu de hauteur sur ce Challenge 10ko et tentons de faire le point sur les stratégies possibles avant de tenter une extrapolation vers des projets de plus grandes envergures.

## Quels sont les résultats ?

Au moment de la rédaction de cet article j'arrive sur la plupart de mes pages à rester sous la barre des 10ko sauf dans certaines situations lorsque l'image d'illustration de fin d'article et/ou lorsque l'article est très long. J'ai donc encore du travail à faire mais j'estime que le plus dur est maintenant réalisé, mon site explose les records de simplicité et c'était mon but premier.

## Comment participer à son propre niveau ?

De très nombreux chemins existent pour lutter contre l'obésité du web. 

En parler autour de vous sera déjà une bonne chose. Sensibiliser les collègues, les amis, partager ces articles :D 

Les options techniques sont légions pour optimiser le coût de transit sur internet. Cache client, cache serveur, optimisation d'images, compression, minification, sprites, etc... la liste est trop longue pour énumérer ce qui vous est déjà certainement connu.

Côté algo il faut réfléchir aussi à des façons de distribuer la data de manière plus intelligente et réfléchir pourquoi pas à revenir à un moteur de recherche et une pagination de résultat plutôt que d'implémenter un scroll infini qui affichera toutes vos données ce qui a de facto un coût terrible en terme de consommation réseau et a tendance à ralentir les perfs sur les smartphones les plus anciens.

L'évolution des technologies continuent également de jouer en la faveur d'un internet plus léger. Les headers HTTP évoluent et permettent par exemple aujourd'hui à un client de spécifier qu’il souhaite économiser de la data ([Save-Data](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Save-Data) & [prefers-reduced-data](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-data)). Encore faudrait-il savoir que ces options existent...

Mais tous les trucs-et-astuces que vous trouverez ne remplacerons pas l'approche minimaliste lorsqu'il s'agit de remplir votre site.

## Une philosophie ...

Commencez simplement par vous poser la question suivante : "est-ce que madame Michue dans le Cantal avec sa connexion 2G va réussir à afficher mon application avant que la batterie de son téléphone ne se vide". Par cette simple question vous posez la base d'une réflexion qui contredit déjà l'idée que l'on peut faire transiter tout et n'importe quoi sur le réseau.

Ces questionnements tirés de l'éco-conception mériteraient tout un laïus sur les impacts du numérique (green-it) que je ne vais pas forcement creuser aujourd'hui car d'autres l'ont déjà fait sur leurs propres sites. Un article sera d'ailleurs dédié à ma veille sur ce sujet.

Faire moins et mieux. C'est le mantra que j'essaie par ce challenge d'initier dans le monde du dev. 

Entre mon précédent site internet et cette nouvelle version, j'ai fait le choix de faire moins 
 - J'ai retiré un nuage de mot qui reprenait les tags des articles de blogs car il était inutilisé 
 - J'ai retiré le moteur de recherche car google est mon ami (ou pas)
 - J'ai retiré les commentaires car aujourd'hui j'estime que l'interaction humaine se fait ailleurs, que ce soit en direct, sur [twitter](twitter.com/besstiolle), ou sur le Slack de ma boite
 - J'ai retiré toute notion de design par l'image pour ne conserver qu'une interface sobre et sombre car j'apprécie de plus en plus moi-même de voir les sites en dark-mode.
 - J'ai retiré tout le contenu devenu inutile
 - J'ai retiré toutes les actions JS inutiles également

J'ai également fait le choix de faire mieux.
 - Mon site s'affiche partout tout le temps
 - Il est impossible d'exploiter de faille de sécurité dessus
 - Sa maintenance est la plus simple que je puisse envisager aujourd'hui.
 - Il est théoriquement mieux indexé par Google qui A-D-O-R-E les sites rapides (entre autres choses)

J'ai fait moins et mieux en me posant la question de l'utilité réelle de chaque élément de mon produit pour mes deux clients principaux : le visiteur de mon site et le moteur de recherche.

Ça ne vous rappelle rien ?

Sources :
 - Infographie sur [l'impact du lourd dans le web](https://blog.kissmetrics.com/wp-content/uploads/2011/04/loading-time.pdf)

## ... Proche de l'agilité

Evidement nous allions y arriver un moment ou à un autre. L'agilité.

Prioriser le travail à réaliser, Piloter par la valeur, Maturer le strict minimum et surtout maitriser l'art de minimiser le travail à réaliser. N'est-ce pas là un précepte insufflé par l'agilité ces 20 dernières années ?

Lorsqu'au travers de mon métier de Coach je vois mes interlocuteurs me dire que "oui mais tu comprends chez nous [insérer excuse] donc on doit tout faire" je ne peux m'empêcher de me demander ce que je serais capable moi-même de sacrifier sur mon produit pour faire moins et mieux. Et pourtant la solution est là. Combien de fonctionnalités indispensables ont été développées à tort ? combien de temps a été passé à réaliser LA fonctionnalité du siècle qui n'a jamais été utilisée ? 

Un MVP c'est censé représenter 5% de vos fonctionnalités, pas 99%...

Les exemples de ce gâchis sont légions et que ce soit sur le net ou dans nos applications de la vie quotidienne on se dit qu'il serait grand temps de remettre la valeur au centre des préoccupations.

Sources : 
 - [80% de gras sur les sites de voyage](https://www.tom.travel/2020/03/26/le-chiffre-de-la-semaine-80-pourcent/), costaud le bébé.
 - [x171 les softs toujours plus lourd](https://www.greenit.fr/2020/08/18/x171-la-croissance-du-poids-de-nos-logiciels/) (pour rien ?)
 - [+2000%](https://www.silicon.fr/mises-a-jour-cumulatives-windows-10-obeses-entreprises-160701.html) Lorsque les mises à jour windows prennent du plomb dans l'aile.

## Réalité du challenge

Alors vous allez me dire : 
> oui mais moi mon site, je ne peux évidemment pas faire faire comme toi et descendre sous la barre des 10Ko ... D'ailleurs je ne peux décemment par descendre sous la barre des 10Mo et puis mes utilisateurs ne comprendraient pas la dégradation de service (comprendre : mettre moins de pub)

Ce à quoi je répondrais que si des sociétés comme Google ou la Bahn (l'opérateur ferroviaire allemand) arrivent à proposer des services sous la barre des 100ko les doigts dans le nez, alors c'est que la problématique n'est pas de l'ordre de la technique mais de la volonté individuelle et collective.

Par ce Challenge 10Ko j'espère vous avoir donné envie de faire le meilleur de vous-même : faire moins et faire mieux :) 

Sources : 
 - le site normal des [chemins de fer Allemand](https://reiseauskunft.bahn.de/) et ses 2.3Mo versus son [équivalent lite](https://reiseauskunft.bahn.de/bin/query.exe/el) et ses 4.4Ko
 - Gmail [version classique](https://mail.google.com/mail/u/0/#inbox) et ses 19.3Mo versus sa [version lite](https://mail.google.com/mail/u/0/h/) et ses 57ko et la liste des [fonctionnalités sacrifiées dans son mode lite](https://support.google.com/mail/answer/15049?hl=fr)
