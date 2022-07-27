---
title: "Supprimer un très grand nombre de fichier sous Debian"
description: "Mais alors quand vous avez énormement de fichiers"
date: 2014-07-13T00:00:00+01:00
aliases: ["/news/55/15/Debian-supprimer-un-tres-grand-nombre-de-fichiers.html"]
draft: false
toc: true
images:
index: false
tags:
  - debian
---

> Attention : cet article initialement publié sur mon précédent site furie.be est ancien et potentiellement obsolète. Merci de le traiter en conséquence et de me prévenir si vous constatez une anomalie. Bisous.

## Supprimer un très grand nombre de fichiers

Il y a quelques jours je me suis rendu compte que le répertoire des sessions Apache sur le serveur de CmsMadeSimple ne se vidait plus. Sans connaitre l'origine de cette étrangeté je me retrouvais face à un double soucis : le web serveur Apache tombait alors même qu'il y avait encore de la place sur le disque dur (plus moyen de créer de nouvelle session dans ce répertoire déjà bourré) et impossible pour moi, néophyte, de vider ce satané répertoire à coup de commande classique de suppression Unix, celle ci me retournant l'erreur

> arg list too long

L'erreur rencontrée par un classique

```bash
rm -rf ./sessions/*
```

En cause le fait que la commande `rm` liste les fichiers avant de les supprimer et possède une limitation interne de la taille cette liste. Trop de fichier égal : impossible de les supprimer.

J'ai bien tenté de filtrer sur une portion du nom des fichiers de session sans résultat.

La solution porte sur les commandes `xargs unix`.

```bash
find ./sessions/ -type f -cmin +3600 -print0 | xargs -r -0 rm
```

En français : trouve moi les fichiers de plus de 3600 secondes dans le répertoire sessions, et pour chacun d'entre eux, exécute la commande rm. Ainsi plus de limitation, la suppression se faisant fichier par fichier.

Par contre j'ai trouvé le traitement extrêmement long (plusieurs heures). J'ai donc arrêté et repris le traitement à intervalle régulier tout en exécutant cette ligne pour connaitre le nombre de fichier restant dans ce maudit répertoire.

```bash
find ./sessions/ | wc -l
```
Ce qui permet de se rendre compte de l'étendu des dégâts lorsque vous dépassez les millions de fichier...

Reste à comprendre pourquoi Apache (ou php) ne supprime pas ces fichiers.