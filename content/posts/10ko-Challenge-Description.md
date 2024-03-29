---
title: "10Ko Challenge #0 : Présentation"
description: "Présentation du concept du challenge 10ko"
date: 2021-02-09T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - web
  - 10ko
---

## Origine du challenge

A l'origine de ce challenge se trouvent une série de sites web et d'articles prônant la conception numérique responsable et la sobriété fonctionnelle sur lesquels je finis par me perdre. 

Et c'est le déclic car c'est un sujet qui me parle. J'en ai marre de ces sites internet qui souffrent d'obésité morbide au point de peser [plus lourd qu'un jeu vidéo](https://twitter.com/xbs/status/722461988283105280), de ces sites de presse bourrés de scripts et de trackers, et de l'[inutilité de chercher la vitesse absolue](https://www.greenit.fr/2020/07/13/5g-quels-seront-les-impacts-environnementaux/) avec de nouveaux protocoles lorsqu'il suffirait de faire transiter moins d'information.

Et quand je me regarde dans le miroir je me demande si je peux avoir moi aussi mon impact positif dans cette histoire. Mon site personnel d'alors tourne sous [CmsMadeSimple](https://www.cmsmadesimple.org/) et ne pèse que 350 kilo-octet, je ne suis certainement pas dans la tranche haute des gros sites web mais je peux certainement faire mieux.

Alors pourquoi ne pas réduire à peau de chagrin la quantité de données délivrée par mon site internet ? et quitte à se lancer, pourquoi ne pas frapper fort avec la mise en place d'une borne symbolique de 10 kilo-octets ?

Liens : 
- [115 bonnes pratiques](https://collectif.greenit.fr/ecoconception-web/115-bonnes-pratiques-eco-conception_web.html)
- [un super talk](https://www.youtube.com/watch?v=uyNu7azGr_w)

## Règles du challenge

 1. Le poids de la page d'accueil ne doit pas dépasser les 10ko, en incluant tous les éléments de la page : js, css, image... que la ressource soit chargée en synchrone et en asynchrone.
 2. Même consigne pour une page type "détail d'un article".
 3. Toutes les mesures doivent être réalisée sur chrome / chromium et dans une situation desktop ou mobile
 4. Toutes les mesures se font sans cache, sans Service Worker installés ou autres filouteries.
 3. La beauté n'est pas un critère mais c'est top si en 10ko vous arrivez à faire un truc sexy.

 Il est autorisé : 
 - La compression et l'optimisation des images, et de flux http(s), peu importe le moyen
 - D'enfreindre les règles de bonnes pratiques de codage, la fin justifie les moyens :D
 - D'utiliser un outil de générateur de site ou de tout générer à la main.

 Je vous invite à m'envoyer vos créations, je me ferrai un plaisir de l'ajouter ci-dessous.

{{< image src="/imgs/anvil.webp" alt="Enclume" position="center" style="border-radius: 8px;width: 650px;">}}

