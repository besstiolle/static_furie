---
title: "10Ko Challenge #4 : Épurer  du fonctionnel"
description: "Liste des actions entreprises pour diviser le poids d'un site par 4"
date: 2021-03-03T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - web
  - 10ko
  - hugo
---

## Rappel du challenge

> Le but de cette série d'articles est de démonter concrètement que réaliser un site internet restant sous la barre des 10Ko tout compris est une entreprise compliquée mais réalisable si nous savons opérer les bons sacrifices.

Parlons un instant de la partie la plus douloureuse qu'il soit de ce challenge : l'art de pas faire.

## Client side

La première manipulation à réaliser pour gagner des octets est de s'assurer que seul le contenu utile est retourné. J'ai donc opéré de nombreux changements dans le code du template Hugo

### No JS

Faisons simple, le contenu de mon site ne nécessite pas d'animation, il ne nécessite pas d'opération magique et je n'ai pas de pseudo-validation sur mes formulaires. Donc j'ai purement et simplement supprimé le javascript de mon site. [ici](https://github.com/besstiolle/static_furie/commit/d2ed1619ceed981a8e8adb2b8694be1e51ca93bb)

Le point d'attention était un bout de code JS qui permettait l'affichage du menu en mode "hamburger" lors de l'affichage sur mobile de mon site. J'ai tenté initialement d'[optimiser manuellement](https://github.com/besstiolle/static_furie/commit/33eea37efe7eb90abb2852da63dd26af26339837) le code comme un gros sauvage mais malgré tous mes efforts, le fichier JS restant me coûtera `480 octets`, et cela même si je suis sur desktop. Je choisis donc de le supprimer également et de trouver une autre solution plus tard pour les visiteurs mobile.

Retirer le JS me permet au passage de gagner une nouvelle requête HTTP.

### No Font

Un grand drame de nos sites internet aujourd'hui est de chercher à avoir la police d'écriture qui propose aux visiteurs de montrer à quel points vos talents de qualigraphie sont développés, même si cela va à l'encontre de la lisibilité de vos textes.

Certes, il y a 10 ans, le parc informatique n'emparquait que peu de polices d'écritures. Ce n'est plus le cas maintenant. J'opte pour [la suppression des polices d'écritures](https://github.com/besstiolle/static_furie/commit/d5d63877a4b7efb23916e40cc1f6d86adc3fc3fb) fournies avec le templates et j'opte pour une sélection de police natives avec différents fallback pour assurer d'une compatibilité maximum entre les devices.

Je passe ainsi à `Ubuntu Mono, monospace` et je gagne plusieurs centaines de kilo octets ! 

Sources : 
 * [Quelle police d'écriture est largement disponible aujourd'hui ?](https://www.w3schools.com/cssref/css_websafe_fonts.asp).
 * [Police sexy n'est pas police lisible](https://www.w3schools.com/cssref/tryit.asp?filename=trycss_font_brushscriptmt).
 * [Une police d'écriture pour les dyslexiques](https://opendyslexic.org/).

### SCSS

J'opère également une passe sur les fichiers SCSS afin de retirer le code jugé [inutile](https://github.com/besstiolle/static_furie/commit/f43b7608fa5f904c6ca27faa3ae4c45d99eae690) comme `prism` la librairie de highlight de code source, le css lié aux boutons de partages sur les réseaux sociaux, etc.

De nombreuses modifications auront lieu également afin de traquer les lignes de CSS [inutilisées](https://github.com/besstiolle/static_furie/commit/9a94726bbee59037f8c68f5d5f647e3b087341aa). J'utilise alors un service en ligne qui me permet de trouver ces lignes. J'opte également pour un choix drastique : celui de ne pas supporter certains navigateurs trop exotiques aujourd'hui, je préfère avoir un défaut visuel potentiellement repéré par une personne sur 1000 que de faire télécharger du code inutile pour 999 personnes sur 1000.

Enfin des petites [modifications mineures](https://github.com/besstiolle/static_furie/commit/5fbba94f040e321b1516c77279b24f27d240cd13) sont réalisées pour grappiller les derniers octets possibles.

Sources : 
 * Trouver le [CSS inutile](https://www.jitbit.com/unusedcss/) ou [ici](https://purifycss.online/#).

### Image & Icônes

J'ai déjà évoqué le traitement des images. Il est à noter que j'ai opéré la même stratégie sur les favicons en mutualisant les images utilisées sous le format webp.

Un choix minutieux est apporté sur l'image utilisée, car si elle est trop complexe, alors la compression de celle-ci sera difficile. A l'inverse une image trop simple risque de ne pas me représenter. J'opte pour une [image](/android-chrome-512x512.png) représentant l'itération en agilité : Simple & Efficace. Le poids de la [favicon utilisée](/favicon-16x16.webp) (au format webp) au final ne pèse que `188 octets`

### browserconfig.xml & site.webmanifest

Ces deux fichiers utilisés par les moteurs de recherche n'entrent pas dans le cadre du challenge 10ko mais j'ai pris néanmoins le temps [de les compresser](https://github.com/besstiolle/static_furie/commit/19af264c5d331f82cbc35052237f97a31b484be4)... on ne sait jamais...

Sources : 
 * [What the heck is that browserconfig.xml](https://danaleegibson.com/what-is-the-browserconfig-dot-xml/)

### Simplifions le Template

Le template sélectionné est déjà épuré, mais je peux mieux faire. 

Je commence par retirer [les informations git](https://github.com/besstiolle/static_furie/commit/08ca151f8c70d2468d9ba9dd51991f22b40af6cf) qui ne me sont d'aucune utilité.

Je simplifie le footer pour ne conserver [que l'essentiel](https://github.com/besstiolle/static_furie/commit/00aa124575c6f8dd8fefc24d39844d62ff5c14e1).

Je peux rappeler également dans cette section que j'ai remplacé les SVG par des images webp, cela permet de gagner un peu de place au détriment d'une meilleure définition sur smartphone.

Sources : 
 * [Usage du SVG sur mobile](https://codepen.io/Gothburz/pen/bVZKjg), un modèle [bien répandu](https://caniuse.com/svg-img)

### Minifier le contenu

Alors là, merci Hugo, l'outil permet nativement de minifier le code html, JS et CSS.. C'est un gros gain natif, je n'ai rien eu à faire.

## Server Side

Peu d'opérations effectuées, mon hébergeur netlify permet déjà d'avoir de nombreuses options activées comme la mise en cache, la compression gz... Je note au détour d'un test que certains headers lié à la sécurité sont manquant. Il me suffit simplement d'ajouter [un fichier `_headers` au bon endroit](https://github.com/besstiolle/static_furie/commit/08ca151f8c70d2468d9ba9dd51991f22b40af6cf) de mon site pour enrichir les headers de netlify

Sources : 
 * [la compression gz](https://gtmetrix.com/enable-gzip-compression.html)
 * [la mise en cache](https://gtmetrix.com/leverage-browser-caching.html)
 * [les headers de netlify](https://docs.netlify.com/routing/headers/)

## Bilan

À ce stade de mes articles j'ai un site internet qui pèse entre 6.2 et 11.1 ko selon la page. C'est une situation inespérée et clairement bienvenue. Mais réaliser toutes ces opérations à un coût énorme : mon site a perdu en fonctionnalité. Ce coût, je le connaissais et je l'accepte bien évidemment, car j'en mesure sa portée. 

Dans le dernier article qui ferra office de bilan je reviendrai sur cet aspect et tenterai de répondre à la question : "Suis-je capable de sacrifier l'indispensable ?" 

{{< image src="/imgs/book.webp" alt="Livres" position="center" style="border-radius: 8px;width: 650px;">}}