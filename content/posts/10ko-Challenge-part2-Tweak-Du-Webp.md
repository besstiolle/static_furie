---
title: "10Ko Challenge #2 : Tweak d'un fichier Webp"
date: 2021-02-11T00:00:00+01:00
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

Et aujourd'hui nous voyons comment optimiser spécialement un petit fichier webp.

## Tweak du webp

Là nous touchons du doigt ce que j'ai préféré dans la démarche globale du challenge 10 ko

Au détour d'une requête curl sur un fichier webp pour des tests de perfs je me retrouve à un moment donné le contenu binaire du fichier webp dans la console et je vois ainsi apparaitre devant mes yeux le code suivant

```
RIFFó☺  WEBPVP8X
     ↨  ↨  VP8 ╬   É♦ Ø☺*↑ ↑ ☺XL'ñ♥>É v♦↑♫┤░═┌·Ö←¥;↕µì╝ [|`3& ■¾SF¦£↔ç♣·b♠¹
     ;ë☻q┌■:Qa☻|kÎñ¥♀¼´Gv{↓ZÔ┌ÍsÔ↑h╬ìcm♀░Üûn
Ïý#º└  EXIF«   II*   ♠ ↕☺♥ ☺   ☺   →☺♣ ☺   V   ←☺♣ ☺   ^   (☺♥ ☺   ☻   1☺☻ ◄
   f   iç♦ ☺   x       `   ☺   `   ☺   paint.net 4.2.15  ♦  É ♦   0230☺á♥ ☺
      ☺   ☻á♦ ☺   ↑   ♥á♦ ☺   ↑
```

Alors nous ne sommes pas étonnés de voir autant de charabia mais ma curiosité est piquée lorsque je vois `paint.net 4.2.15` dans le code. Clairement ce sont des données EXIF qui trainent dans mon fichier qui pèse alors `426 octets`

Se pose alors la question de savoir si je ne pourrais pas gagner encore quelques octets en supprimant / réduisant le contenu des données EXIF ? A ce moment je n'ai aucune connaissance de comment est composé un fichier binaire Webp ni comment se structure les données EXIF

Sources : 
 * https://www.nikonpassion.com/qu-est-ce-que-donnees-exif-comment-lire-utiliser/

### Tentative de compréhension du format WebP

La partie la plus compliquée n'a certainement pas été de lire proprement le fichier webp, n'importe quel lecteur hexa est capable de le faire et [il en existe même en ligne](https://hex-works.com/eng). Donc lire était facile, mais comprendre ce qu'on lisait était autre chose.

J'ai dû passer un peu de temps à lire la documentation de [Google sur Webp](https://developers.google.com/speed/webp/docs/riff_container), à jouer avec des outils comme [Exiv2](https://dev.exiv2.org/projects/exiv2/wiki/The_Metadata_in_WEBP_files) qui sont spécialisés sur l'extraction des métadatas et le contrôle de cohérence des chunks de fichier ce qui me permettait rapidement de savoir si les modifications internes réalisées sur le fichier impactait son fonctionnement ou pas.

Malheureusement pour moi je me rends vite compte qu'on peut certes effacer du contenu EXIF mais pas en supprimer son espace réservé de 182 octets. Un comble quand l'on sait que cet espace est de facto réservé, même pour une image d'1px sur 1px. Plus le fichier était petit et plus rageant devient le ratio in.utile de la place prise par les metadatas dans la situation de notre challenge 10ko !

Et au détour d'une lecture je me rends compte que le format Webp que l'on connait aujourd'hui n'est pas le même que les premières éditions sorties en 2011 telles que décrites dans les [RFCs de l'époque](https://www.rfc-editor.org/info/rfc6386) et que si le webpL (version actuelle) prend en charge plein de truc comme la transparence, la compression sans perte, le profil de la couleur, les animations et les metadatas... ce n'était pas le cas de la première version de la RFC !

Du coup question : serait-il possible de transformer notre webp-L en webp-old school ?

Sources : 
 * https://www.exiv2.org/download.html pour visualiser les chunks d'un fichier webp ou autre.

### Décryptage du webp

Un Webp moderne sans transparence ni animation se découpe ainsi

#### Structure Header Webp

```
  RIFF[...]➀WEBP[...]➁ 
```
 * ➀ : la taille totale de ➁ en octet. Cette zone fait toujours 4 octets de long
 * ➁ : le *body* du fichier. Son contenu est décrit ci-après, sa taille définie dans ➀ est variable
 * `RIFF` & `WEBP` sont toujours présents, prennent chacun 4 octets de long est sont littéralement une chaine de caractères "RIFF" et "WEBP"

#### Structure du Body Webp

```
  VP8X[...]➂VP8[...]➃EXIF[...]➄
```
 * ➂ : le bloc lié aux descriptions étendues de webp il fait toujours 18 octets de long.
 * ➃ : le contenu de l'image à proprement parlé, sa taille est variable.
 * ➄ : les metadatas, ici au format EXIF, il fait toujours 182 octets de long, même vide
 * Les inscriptions `VP8X`, `VP8` et `EXIF` prennent respectivement 4,3 et 4 octets de long est sont littéralement  une chaine de caractères "VP8X", "VP8" et "EXIF". Seul le bloc `VP8` est obligatoire, le bloc `VP8X` est obligatoire si le bloc `EXIF` est présent

De ma compréhension, d'autres blocs peuvent être ajoutés (gestion transparence, animation, ...) et le bloc `VP8X` ➂ est là pour définir la présence de l'un ou l'autre des blocs. 
 
Pour notre challenge, seul le bloc `VP8` ➃ est obligatoire, restait donc à comprendre comment conserver la cohérence globale en supprimant les blocs `VP8X` ➂ et `EXIF` ➄. La solution est relativement simple : il fallait juste remettre à jour la taille totale ➀ du body ➁ purgé des blocs `VP8X` ➂ et `EXIF` ➄

Une fois le fichier mis à jour : miracle ! on gagne `200 octets` passant ainsi d'une petite image de `426 octets` à `226 octets`. 

Sources
 * https://developers.google.com/speed/webp/docs/riff_container

## Bilan des traitements des images

Nous passons donc d'une situation avec de nombreuses icones sous format SVG pesant approximativement `1780 octets` à une [unique image webp](/imgs/sprite.webp) qui ne me pèse que `226 octets`.

A la vue de notre challenge, réduire de 87% le poids d'une image sans perte notable de qualité est donc une très belle victoire. 

Mais ce n'est pas tout. Maintenant que nous avons atteint un poids plume (`226 octets`), et après contrôle en production du coût du header de sa requête http, `117 octets` sous chrome, je décide de tester le passage de l'image en base64. Résultat : `304 octets` soit un nouveau gain total de : 39 octets

Dans ce challenge il n'y a décidement pas de petite économie...

{{< image src="/imgs/webp_logo.webp" alt="WebP Logo" position="center" style="border-radius: 8px;width: 650px;">}}