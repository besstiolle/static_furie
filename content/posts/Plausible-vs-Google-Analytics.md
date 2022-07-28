---
title: "Plausible, un remplaçant à Google Analytics ?"
description: "A l'heure du RGPD il devient urgent de sortir des griffes du tout gratuit de Google Analytics."
date: 2022-07-28T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - ecoconception
  - 10ko
  - rgpd
  - google analytics
  - plausible
  - analytics
---

## Context général

Comme la plupart des personnes gérant leurs sites internet je suis intéressé de savoir comment est perçu le contenu que je produis. Qu'il s'agisse d'articles tech ou de l'usage des projets open sources que je porte.

Pour ce faire il existe énormément de solution et l'une d'entre elle a phagocyté le marché depuis des années avec sa solution gratuite : Google Analytics.

Sauf qu'avec l'arrivée des lois RGPD et des contrôles de plus en plus fermes de [la CNIL en France qui auraient dernièrement infligées de lourdes pénalités à Décathlon et Auchan pour usage de Google Analytics](https://www.journaldunet.com/media/publishers/1510039-google-analytics-4-la-reponse-de-google-a-la-cnil/), on se rend compte du niveau d'emmerdement dans lequel les webmasters se retrouvent.

 - J'arrêtes de tracker mes utilisateurs ?
 - Je prends le risque ?
 - Je trouve une autre solution technique n'impliquant pas d'enfreindre la loi RGPD.

## RGPD comme levier de changement

Car oui il existe des alternatives réellement fonctionnelles depuis des années à Google Analytics. [Matomo](https://fr.matomo.org/) anciennement PIWIK est le fer de lance de cette nouvelle mouvance de logiciels plus vertueux et open source + gratuit en auto hosting.

Sauf que l'auto hosting a ses limites lorsque nous ne sommes pas constamment la tête dans le sujet. Les failles de sécurités sont légion et les procédures sources d'erreurs.

L'alternative à l'auto hosting est le SAAS (Software As a Service) mais celui-ci a un coût. Chez Matomo le coût d'entrée est de [19€ / mois pour 50k hits](https://fr.matomo.org/pricing/) ce qui est bien au-delà de mes humbles compteurs (retirez 3 chiffres et vous êtes bon.)

Après une courte discussion avec mes collègues de chez [Zenika](https://www.zenika.com/) pour prendre la température j'ai pu valider qu'il n'y avait pas de miracle : c'est à dire une offre SAAS d'entrée de gamme gratuite respectant RGPD.

Par contre j'ai découvert deux trois solutions que je vais vous partager ici et faire un focus sur mon choix personnel.

### Google Analytics V4

Oui c'est un peu un comble, mais Google Analytics V4 se veut RGPC-compatible. Cette version fait directement écho au fait que les clients de Google Analytics se font épingler à tour de rôle en Europe, cela est notamment dû au dépôt de pas moins de [101 plaintes d'une association](https://noyb.eu/en/101-complaints-eu-us-transfers-filed) nommée noyb aux différents organismes CNIL (et équivalent) en Europe Ils annoncent notamment la fin de la collecte des IPs mais cela n'est pas sans soucis : 
 - La collecte des ip n'est pas la seule donnée que la CNIL surveille et Google n'explicite pas de ce qu'il fera des autres données surveillées par la CNIL
 - Aujourd'hui seul google prétend que sa version V4 est compatible RGPD, la CNIL n'a pas tranché
 - Le script V4 semble incompatible avec les données précédemment collectées ce qui va créer une casse ET dans l'historique ET dans les habitudes de ses utilisateurs.
 - Ca reste l'ogre Google

* Tarif : Gratuit
* Compatibilité RGPD : inconnue

### Matomo

La référence absolue dans le domaine de l'analytics en Open Source. Sa force est également sa faiblesse : c'est un parfait clone de Google Analytics. Ce qui le rend tout simplement à la fois indigeste aux novices de l'analyse et très puissant pour ceux et celles qui excellent déjà sur Google Analytics.

 * Tarif SAAS : 19€ / mois pour 50k hits
 * Tarif SAAS : 35€ / mois pour 100k hits
 * Compatibilité RGPS : oui

### Fathom

Une seconde alternative à *Google Analytics* qui m'a été proposé par des collègues. Hébergé sur des serveurs Allemands, cette solution promet une compatibilité RGPD du même niveau que *Plausible*. Je n'ai pas creusé plus loin l'offre pour une raison tarifaire mais il ne me semble pas avoir vu de solution auto-hébergée contrairement à *Matomo* et *Plausible*

Un de mes collègues me dira de *Fathom* que la solution est top, facile à utiliser, très discrète et ne traque que le strict minimum. Exit donc les âges et centre d'intérêts que *Google Analytics* adore tant.

 * Tarif SAAS : 14€ / mois pour 100k hits
 * Compatibilité RGPS : oui

### Plausible

Développé en Estonie (Europe), cette [équipe de 6 développeurs](https://plausible.io/about) fonctionnent depuis des années sans levée de fond avec uniquement comme financement leur utilisateurs. Ils sont fiers d'annoncer leur autonomie sur ce segment de marché si concurrentiel et surtout leur capacité à proposer [un script JS < 1Ko](https://plausible.io/lightweight-web-analytics) qui est RGPD compatible ! Leur solution est au choix en auto hébergement (gratuit) ou en solution SAAS [Leur grille tarifaire est humble avec 10k hits pour 7.5€ / mois](https://plausible.io/#pricing) (si plan annuel)

 * Tarif SAAS : 7.5€ / mois pour 1 an pour 10k hits 
 * Tarif SAAS : 15.83€ / mois pour 1 an pour 100k hits
 * Compatibilité RGPD : oui

## Mise en place et premières impressions de Plausible

Le choix effectué de tester *Plausible* je créé un compte et installe aisément sur la plupart de mes sites le script *Plausible*.

Première surprise : le script est évidement bloqué par mon bloqueur de pub, je désactive ce dernier et tout va bien. [La documentation de *Plausible* est très bien faites et très claire sur ce sujet](https://plausible.io/docs/proxy/introduction) et propose à ses utilisateurs de proxyfier le script afin de passer outre les outils de bloqueur de pub. Etant hébergé sur Netlify il me suffit de lire la [documentation associée](https://plausible.io/docs/proxy/guides/netlify) et en quelques secondes je réussis à déployer cette configuration avec succès. Je capte l'ensemble des visiteurs sans détourner les protections liées à la vie privée de chacun.

Seconde surprise : ça marche du tonnerre et c'est simple à souhait. Je n'ai pas trois mille dashboards plus compliqués les uns que les autres, je n'ai rien de superflu, [j'ai mes boards classique et les informations que j'attends d'avoir](https://plausible.io/plausible.io). Clair simple et efficace.

Troisième surprise : La taille du script est inférieure au kilo-octet. Moi qui aime le principe de l'éco-conception et de la sobriété numérique je suis servit, ils proposent de base un script léger en fonctionnalité et si vous souhaitez faire plus de chose avec *Plausible* vous pouvez sélectionner l'un ou l'autre des scripts en complément. Très intelligent.

Quatrième surprise : Leur documentation est du tonnerre. Très claire, très accessible, j'ai de nombreuses questions et j'y trouves toujours les réponses. J'ai notamment le cas de deux outils open source dont je souhaite suivre l'usage (ultra modeste à cette heure) mais ce sont des [SPA](https://en.wikipedia.org/wiki/Single-page_application) dont les liens et boutons sont générés à la volée. Tracer l'usage de chaque fonctionnalité est à la fois indispensable et pourtant impossible de base. Pour ce faire *Plausible* propose l'usage d'[event/goal](https://plausible.io/docs/custom-event-goals) comme solution et même si je n'ai pas encore mis en place cette astuce je la trouve assez élégante.

## Conclusions

A cette heure mon choix est parti pour du SAAS Plausible pour une année (7.5€/mois) afin d'analyser les 5 sites internet que j'ai en charge à cette heure. Ce n'est pas un montant que je pensais mettre dans un outils d'analyse qui va tracker 100 visites par mois mais force est de constater que c'est le prix à payer si l'on souhaite être RGPD compatible sans passer par l'étape de l'auto-hébergement.

{{< image src="/imgs/plausible.webp" alt="Analytics Graph with Plausible" position="center" style="border-radius: 8px;width: 650px;">}}