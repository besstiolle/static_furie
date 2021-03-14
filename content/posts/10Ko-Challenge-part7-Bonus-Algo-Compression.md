---
title: "10Ko Challenge #7 [Bonus] Compression manuelle"
description: "Découvrez comment compresser manuellement vos contenus"
date: 2021-03-25T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - web
  - 10ko
  - compression
---

## Rappel du challenge

> Le but de cette série d'articles est de démonter concrètement que réaliser un site internet restant sous la barre des 10Ko tout compris est une entreprise compliquée mais réalisable si nous savons opérer les bons sacrifices.

Et aujourd'hui un bonus ! Une méthode rigolote qui permet de compresser vos pages

## La compression par substitution

### Historique

C'est durant le visionnage d'une conférence dont j'ai malheureusement perdu le nom que j'ai eu cette idée avant même de démarrer le challenge 10Ko. L'idée présentée était : comment permettre à une canadienne de regarder une page web via le protocole SMS ceci afin de réduire sa facture de data (oui les canadiens ne sont pas vernis côtés tarif 4G avec du [175$ le 100Go / mois facile](https://www.cellphones.ca/cell-plans/).) 

Sauf que de nombreuses problématiques s'enchainent et nécessitent à l'oratrice d'opérer tout une série d'optimisation avec notamment la [compression par substitution](http://jargonf.org/wiki/compression_par_substitution) aussi appelée par dictionnaire

Et c'est exactement ce mécanisme que je vais utiliser.

Voir + 
 - [page wikipedia](https://fr.wikipedia.org/wiki/Compression_par_dictionnaire)

### Mécanisme dans la théorie

Le principe de la compression par substitution d'une page web est simple, vous prenez le code source, vous identifiez les patterns qui se répètent et vous les remplacez par un identifiant qui "représentera" ce pattern. Vous complétez en simultané votre dictionnaire : identifiant => pattern et c'est tout.

Il reste alors à 
 - Envoyer votre page web réduite
 - Envoyer Le dictionnaire
 - Permettre au navigateur / client de se dépatouiller tout seul en reconstituant sa page comme un grand. 

Fin de l'histoire.

### Dans la pratique

Pour mes tests j'ai écrit [un script js](https://gist.github.com/besstiolle/1b1cde0a3f098bf9057c61e2b24705da) à jouer sur mes pages déjà en ligne via la console de Chrome ou de Firefox. 

Ce script prend le contenu d'une page web existante en entrée et ressort ce contenu compressé associé à un dico et à un script js inline capable de restituer la page de lui-même.

Je n'ai pas poussé le vice à automatiser [Hugo](https://gohugo.io/) pour que ce dernier exécute la substitution mais ça aurait pu être envisagé.

Une fois le rendu ré-uploadé on peut avoir [ce résultat](/dicoGrec.html). Pensez à regarder le code source de la page :) 

### Optimisation 

La mécanique derrière cette compression est assez simple mais nécessite tout de même prendre gare aux caractères substituant. En effet, utiliser dans les entrées du dico un caractère déjà présent dans la page risque de faire capoter la restitution.

C'est pour cette raison que j'ai initialement utilisé les caractères Grecs pour m'assurer d'un maximum de compatibilité.

```javascript
var g = ["«","»","“","”","ʹ","͵","·",";","Α","Β","Γ","Δ","Ε","Ϛ","Ϝ","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ϟ","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω","Ϡ","α","β","ϐ","γ","δ","ε","ϛ","ϝ","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ϟ","ρ","σ","ς","τ","υ","φ","χ","ψ","ω","ϡ"]
```

Le résultat est flagrant, la page passe d'un poids à l'origine de `13.26ko` à `12.07ko` avant transmission en Gzip par le serveur.

Alors évidement, avec ce genre d'opération je peux dire adieu au référencement car les moteurs de recherches ne vont pas comprendre que ma page signifie autre chose que du charabia mais ... c'est drôle alors je persiste.

En creusant l'écart constaté entre le nombre de caractère et son poids je me rend compte que l'alphabet Grec utilisé, [de l'unicode](https://unicode-table.com/fr/sets/greek-symbols/) en réalité, est encodé nativement en prenant plus de place[^1] que des caractères plus usuels tels que ceux utilisés en français : les caractères latin-1. Du coup je tente une seconde optimisation en proposant un second dictionnaire, latin-1[^2] cette fois ci.

[^1]: Unicode = [16bits par caractères](https://en.wikipedia.org/wiki/Unicode) soit 2 octets
[^2]: Latin-1 = [8bits par caractères](https://kb.iu.edu/d/aepu) soit 1 octet

```javascript
var g = ["¡","¢","£","¤","¥","¦","§","¨","©","ª","«","¬","®","¯","°","±","²","³","´","µ","¶","·","¸","¹","º","»","¼","½","¾","¿","À","Á","Â","Ã","Ä","Å","Æ","Ç","È","É","Ê","Ë","Ì","Í","Î","Ï","Ð","Ñ","Ò","Ó","Ô","Õ","Ö","×","Ø","Ù","Ú","Û","Ü","Ý","Þ","ß","à","á","â","ã","ä","å","æ","ç","è","é","ê","ë","ì","í","î","ï","ð","ñ","ò","ó","ô","õ","ö","÷","ø","ù","ú","û","ü","ý","þ","ÿ"]
```

Après upload le résultat est légèrement mieux.
 - `13.26ko` Pour la page de base
 - `12.07ko` Pour la page optimisée avec de l'unicode
 - `11.88ko` Pour la page optimisée avec latin-1 (-10%)
 
J'imagine que je peux encore optimiser ce traitement simpliste mais je m'arrête là car ce n'est pas le but du challenge de redévelopper un algo de zéro.

### Utilité ?

Aucune, nada, tout ce que vous venez de lire est inutile. Oui je sais, de rien, vous êtes les bienvenues.

Alors qu'est-ce qu'il se passe ?

Et bien il se trouve que tout le travail effectué pour tenter de réduire la taille du code source est une redite importante d'un des deux composants de l'algorithme [gzip](https://fr.wikipedia.org/wiki/Gzip) nommé [LZ77](https://fr.wikipedia.org/wiki/LZ77_et_LZ78) qui fonctionne lui-même en compression par substitution (la seconde composante de gzip étant [Huffman](https://fr.wikipedia.org/wiki/Codage_de_Huffman))

Et si gzip ne vous parle pas, sachez simplement que c'est la compression par défaut de la majorité des serveurs web modernes.

Bref nous venons de recoder en moins bien un algo déjà utilisé par défaut par mon serveur web pour servir mes pages. Pour ne rien arrangé, nous avons ajouté une couche de traduction compression -> décompression grâce à JS dont la simple présence rajoute du poids !

Si je reprends les mesures des poids de mes pages, voici le résultat complet : 
 - `13.26ko` Pour la page de base compressé en gzip à `5.54ko`
 - `12.07ko` Pour la page optimisée avec de l'unicode compressé en gzip à `6.65ko`
 - `11.88ko` Pour la page optimisée avec latin-1 (-10%) compressé en gzip à `6.66ko`

 On se rend bien compte que ne rien faire en fait c'était mieux que de tenter de compresser soi-même.

 Cela dit cette exploration a eu un double avantage et c'est pourquoi j'ai poursuivi l'expérience que je savais inutile dès le départ : 
 - Ce genre d'algo peut avoir son utilité pour de la compression sur des serveurs n'ayant pas de gzip ou pour toute compression manuelle
 - C'était fun, et c'est aussi cela que je cherchais au travers du Challenge 10Ko

A voir :
 - [Comparatif de perfs des méthodes de compression](http://rlwpx.free.fr/WPFF/comploc.htm)
 - Testez la présence de Gzip sur un site facilement [ici](https://www.websiteplanet.com/fr/webtools/gzip-compression/?gzip=https://kdanezis.fr)

## Bilan

 Voilà j'ai fini de faire le tour de la question, j'espère que ces articles vous auront plus autant que j'ai pris plaisir à les écrire.

 See you !