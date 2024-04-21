---
title: "Self-Hosting : Comment choisir votre matériel ?"
description: "Quelques pistes de réflexions pour vous aider à choisir votre matériel"
date: 2024-04-20T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - web
  - self-hosting
  - backup
---

## Rappel sur l'univers du self-hosting avant de démarrer :

> Je suis très loin de me considérer comme un expert du self-hosting, tout au plus j'ai essuyé quelques plâtres dans mon aventure mais j'estime qu'il y a matière à partager. Sentez vous libre de compléter votre lecture avec d'autres sources, de tester, de valider ou d'invalider mes propos et de m'en faire des feedbacks via Linkedin ou par Mail :)

Cette série d’articles autour du self-hosting est rédigée au fil de l’eau. Je vous invite à [démarrer cette série par le sommaire]({{< ref "/Self-Hosting-tour-rapide-question" >}})

## Le matériel, quelles solutions existent ?

Pour simplifier à l’extrême vous pouvez considérer que l’extrême majorité de ce que vous appelez “ordinateur” peut servir à faire du self-hosting. Je vous liste ci-dessous quelques idées en vrac

Utilisez votre PC de gamer ou votre PC bureautique, Utilisez un vieux [Raspberry Pi](https://searx.be/search?q=raspberry+pi) qui prend la poussière ou achetez le Rpi5, récupérez le vieux laptop dont la batterie ne tient plus ou utilisez les capacités de votre NAS. Achetez un [NUC](https://en.wikipedia.org/wiki/Next_Unit_of_Computing) dédié à cette opération ou utilisez un VPS dans le cloud.

Tout est capable de vous laisser démarrer mais tout ne se vaut clairement pas.

## Quels critères ?

Je vous propose quelques critères à prendre en compte dans votre démarche. Ce sont des critères qui m’ont animés, vous en aurez certainement d’autres à prendre en compte.

**Le coût d’achat et d'investissement :** Soyons honnête, quitter un google drive gratuit à 15 Go pour investir dans 300€ de matériel, c’est compliqué. Dans ce prix on peut inclure également les frais pour les câblages, le nouveau bloc d’alimentation ou le changement de disque dur pour mettre au propre votre installation. Le prix est évidemment un critère important pour la plupart d’entre nous et pourtant il n’a pas été LE plus important quand j’ai fait mes choix.

**Le coût de fonctionnement :** On y inclut la consommation électrique, un coût souvent ignoré à tort et pourtant conséquent. On pourrait également estimer qu’il y a des pièces qui s’usent comme un disque dur, mais je n’ai pas assez de recul pour faire ce genre d’estimation de manière fiable.

**Les coûts dérivés :** On peut y intégrer les frais en bout de chaîne comme -pour mon cas personnel- le fait que je conserve un backup en ligne pour certains types de données sensibles. Je peux évoquer d'éventuels frais liés au noms de domaines (cas particulier lié à l'usage de [reverse-proxy](X) dans l’univers du self-hosting) Ces coûts étant identiques peu importe le choix du matériel j’ai choisi de ne pas les inclure dans le choix du matériel. 

**Le non-coût du self-hosting :** A l'inverse, il existe des frais qui disparaissent dès lors que l’on réintègre les produits GAFAM au sein de sa maison. En premier lieu il y a un non-coût lié à la revente de nos données par les GAFAM, une étude évoquée en 2021 sur [presse-citron](https://www.presse-citron.net/quel-est-le-juste-prix-de-nos-donnees-personnelles/) avançait la somme de 1 048$ pour la simple adresse postale, 580$ pour le téléphone, 788$ pour une information de santé… Je pourrai évidemment ajouter les frais Google drive dès que [vous dépassez les 15Go de data](https://one.google.com/about/plans?), les frais de disque dur servant de sauvegarde  temporaire chez vous et toutes les applications qui vous demandent de payer un service tous les mois pour une propriété intellectuelle que vous ne posséderez jamais : Netflix, Youtube Premium, Spotify, Steam[^1]

[^1]: les conditions de vente de Steam sont claires : vous achetez le droit de jouer au travers de Steam, si votre compte se fait clôturer : vous perdez la possibilité de jouer à vos jeux et ce même si la clôture était réalisée par erreur

**Le coût caché environnemental :** L’impact de l’IT sur la planète est à prendre en considération. C’est pour cette raison que mes choix porteront systématiquement sur un réusage d’équipement existant chez moi en priorité puis en achat d'occasion ou reconditionné dans un second temps. Un autre aspect important est de faire tourner votre stack self-hosting sur un équipement qui soit raisonnablement taillé en termes de puissance (CPU / Mémoire). Avoir une Porsche qui fait tourner un serveur de fichiers et un gachi doublé d’une surconsommation inutile.

## Ces critères appliqués

En prenant en considération tous ces critères j’ai réalisé une série de comparatifs. Je vous redonne les éléments en ma possession au moment de la réalisation de ce comparatif.

 * En Novembre 2023 le kWh en tarif de base en France coûtait 0.2276€
 * RP : signifie RasberryPI
 * Le NUC est un [Intel NUC 8 Mainstream Kit i5 8259U](https://www.amazon.com/Intel-NUC-Mainstream-Kit-NUC8i5BEK/dp/B07GX67SBM) que je n’ai pas chez moi.
 * Le laptop est un [HP Elitebook 8740w  i7 vpro 8Go](https://support.hp.com/fr-fr/drivers/hp-elitebook-8740w-mobile-workstation/4138087) d’occasion que j’ai obtenu d’un collègue à 25€ (300€ neuf)
 * Mon PC est une tour composée par mes soins avec entre autre chose un Ryzen 5 5600  et 48 Go de RAM (c’est pour faire tourner le démineur de Windows)
 * Le NAS est un [Synology 2020j](https://www.synology.com/fr-fr/company/news/article/DS220j)
 * Je pars du principe que le matériel est allumé h24 7/7 ce qui permet de passer de la valeur watt à Kwh / an si l’on multiplie par (24 * 365 / 1000 =) 8.76
 * Toutes les valeurs sont arrondies par soucis de lisibilité

|   | RPi3 | RPi4 | RPi5 | NUC | Laptop | PC | NAS |
|----------|-------------|------|------|------|------|------|------|
| **Watts** | 5w | 6w | 27w | 50w | 35w | 50w | 13w |
| **Kwh réel / an** |  30 | 40 | *181\** | *336\** | 279 | 335 | 87 |
| **Kwh max / an** | 44 | 53 | 237 | 438 | 306 | 439 | 114 |
| **€ max / an** | 10€ | 12€ | **54€** | 100€ | 70€ | 100€ | 25€ |

> Rappel : une valeur en italique suivie d'une étoile est une valeur extrapolée. J’utilise un ratio de 76.67% entre la valeur de consommation annoncée comme max et ce qui sera surement consommé en réalité. Ce ratio est issu de mes prises de mesures sur l'équipement à ma disposition. Ces valeurs extrapolées reste à prendre avec des pincettes.

A première vue on peut voir une chose assez extraordinaire et contre intuitive, la réputation des RaspberryPi d’être peu consommateur en électricité et à jeter aux oubliettes avec la version 5 du RPi qui consomme énormément ! De la même façon attention aux consommations des NUC qui semble hors contrôle vs un PC de guerre monté soit même qui sera bien plus puissant et pourtant consomme autant

Niveau prix d’achat neuf (ou reconditionné si possible) en date de fin 2023 nous avons ceci : 

|   | RPi3 | RPi4 | RPi5 | NUC | Laptop | PC | NAS |
|----------|-------------|------|------|------|------|------|------|
| **Tarif neuf** | 56~+€ | 63~80€ | 70~+€ | 400 | 300€ | 800€ | 180+240€ |

On appuie encore sur le fait que les NUC coûtent très cher. Autre point concernant la double valeur du NAS : il s’agit des deux disques durs pour le modèle classique double baies.

Un focus maintenant sur le benchmark, j’utilise sur mes équipements [sysbench](https://packages.debian.org/fr/source/sid/sysbench) afin d’obtenir “le nombre d'événements par seconde” pour un nombre de thread. Par exemple pour 8 threads la commande est 

```bash 
sysbench cpu run –threads=8
```
Une remarque importante : il est inutile d’avoir un nombre de threads supérieur au nombre de cœur (ou Vcore) de votre CPU. J’ai cappé la valeur à 8 threads sur mes tests pour tenter d’uniformiser les résultats.

Pour le benchmark: plus haute est la valeur, meilleure sera la capacité de CPU


|   | RPi3 | RPi4 | RPi5 | NUC | Laptop | PC | NAS |
|----------|-------------|------|------|------|------|------|------|
| **RAM Go** | 1 | 1~8 | 4~8 | 8 | 8 | 48 | 512Mo |
| **Threads** | 4 | 4 | 4 | 8 | 8 | 8 | N/A |
| **Benchmark** | 104  | 161 | 240 | 4 759 | 1 294 | 12 875 | N/A |


Les résultats pour le NAS n’ont pas été mesurés, je n’ai donc pas tenté d’inventer des chiffres :). De plus, la RAM limitée par le modèle fait naturellement un NO-GO pour une infrastructure qui dépasse le cadre du poc mais on reviendra plus en détail sur ce sujet.

On retrouve des résultats perturbants : Pour une consommation en flèche (x4.5 vs Rpi4) , le Rpi5 fait pâle figure en termes de puissance de calcul délivrée (x1.5 vs Rpi4). La découverte de cet écart anormal rapporté par un collègue avant que je ne démarre mes recherches me déçoit beaucoup de la part de la marque à la framboise.

Un autre point important qui reprend le critère environnemental : ne vous laissez pas embarquer dans un choix uniquement lié au benchmark. 12 875 points pour une infrastructure self-hosting est abusivement surdimensionnée. Je pense vue l’expérience que j’ai aujourd’hui qu’une infra proposant 1000+ points répondra à 99% des besoins de chacun d’entre vous.

Je vous redonne l’intégralité du tableau comparatif pour vous faciliter sa lecture

|   | RPi3 | RPi4 | RPi5 | NUC | Laptop | PC | NAS |
|----------|-------------|------|------|------|------|------|------|
| **Watts** | 5w | 6w | 27w | 50w | 35w | 50w | 13w |
| **Kwh réel / an** |  30 | 40 | 181 | 336 | 279 | 335 | 87 |
| **Kwh max / an** | 44 | 53 | 237 | 438 | 306 | 439 | 114 |
| **€ max / an** | 10€ | 12€ | *54€* | 100€ | 70€ | 100€ | 25€ |
| **Tarif neuf** | 56~+€ | 63~80€ | 70~+€ | 400 | 300€ | 800€ | 180+240€ |
| **RAM Go** | 1 | 1~8 | 4~8 | 8 | 8 | 48 | 512Mo |
| **Threads** | 4 | 4 | 4 | 8 | 8 | 8 | N/A |
| **Benchmark** | 104  | 161 | 240 | 4 759 | 1 294 | 12 875 | N/A |


## Mon choix

Sans surprise mon choix s’est porté initialement sur le Laptop [HP Elitebook 8740w  i7 vpro 8Go](https://support.hp.com/fr-fr/drivers/hp-elitebook-8740w-mobile-workstation/4138087) sur lequel j’ai démarré ma première infra self-hosting.

Vous serez sûrement surpris de l’apprendre mais après 3 mois j’ai changé mon fusil d’épaule et l’occasion se présentant j’ai changé ce pc portable pour un autre pc portable. En effet j’ai récupéré un vieux laptop [Asus Zenbook UX303L](https://searx.be/search?q=asus%20%20ux303l) qui a vécu une belle vie : Quelques années en tant que pc personnel , quelques années en tant que pc de madame puis quelques années en tant que pc professionnel pour ma mère qui a fini par le redonner en fin d’année 2023, l’axe de écran cassé. 

La particularité de ce laptop est qu’il est muni d’un Intel Core i7-4510U de 8Go de RAM et ne possède pas de carte graphique très puissante (GeForce 840M) contrairement au HP Elitebook 8740w. Si rien ne vous choque, sachez juste que ce CPU et le GPU sont conçus non pas pour la puissance de feu mais pour la sobriété en termes de consommation électrique. Voyez plutôt


|   | RPi3 |  HP Elitebook 8740w | Asus UX303L |
|----------|-------------|------|------|
| **Watts** | 5w | 35w | 5w |
| **Kwh réel / an** | 30 | 279 | N/A |
| **Kwh max / an** | 44 | 306 | 44 |
| **€ max / an** | 10€ | 70€ | 10€ |
| **Tarif neuf** | 56~+€ | 300€ | 450€ |
| **RAM Go** | 1 | 8 | 8 |
| **Threads** | 4 | 8 | 8 |
| **Benchmark** | 104 | 1 294 | 2 490 |

Donc en substance je multiplie par deux ma puissance de calcul et je divise par 7 fois la facture électrique. Cela se fait au détriment d’une carte graphique moins puissante.

A noter en complément que ce notebook ASUS UX303L ne chauffe pas, ne ventile pas et reste silencieux H24. C’est une perle. J'ai simplement ajouté +4Go de RAM DDR3 1600 pour moins de 20€.

## A propos des cartes graphiques

Petit aparté concernant les cartes graphiques, il existe un réel usage pour votre infrastructure self-hosting : l’IA, l’encoding vidéo à la volée[^2] & le gaming. En dehors de cela je ne vous conseille pas particulièrement d’avoir de l’équipement avec une grosse carte graphique. Le laptop [HP Elitebook 8740w  i7 vpro 8Go](https://support.hp.com/fr-fr/drivers/hp-elitebook-8740w-mobile-workstation/4138087)  est maintenant éteint et sera utilisé dans un futur proche comme infra temporaire de test pour de la génération IA et autres serveurs de jeux vidéo.

[^2]: C’est le cas notamment pour [JellyFin](https://jellyfin.org/) et autres média-center qui encodent à la volée les films visionnés.

## Quelles options considérer

S’il y a une unique règle à vous proposer, c’est celle de démarrer sur de l’équipement déjà en votre possession. 

Préférez un équipement type RasberryPi 3 ou 4 si vous voulez découvrir cet univers. Leur capacité permet de faire tourner aisément quelques logiciels dessus avant d'en saturer la capacité CPU/Mémoire. Attention aux cartes SD qui ne sont pas faites pour ce genre de fonctionnement, elles sont rapidement défaillantes et ne sont jamais très fiables ni même véloces. A n’utiliser que pour du test ou du prototypage.

Préférez un NAS si vous ne souhaitez pas vous plonger totalement dans un univers en ligne de code. Les Synology ont, depuis leur modèles 2020+, la capacité de faire tourner facilement du docker ce qui ouvre les champs des possibles en termes de self-hosting. Attention la limitation de la RAM de ces petites bêtes va vous contraindre en termes d’installation.

Préférez un laptop si vous optez pour une puissance de calcul un tant soit peu élevée pour un encombrement minimal. Gardez tout de même en tête que ça chauffe, et qu’ils ne sont pas faits pour être allumés H24, les pannes sont donc relativement fréquent sur ces machines.

Enfin je vous invite à explorer d’autres pistes comme les modèles hp elitedesk reconditionnés issu de la revente de matériel d’entreprises qui présentent à priori une balance puissance de feu vs durabilité exceptionnel de ce que j’ai pu lire à droite et à gauche.


## Mes sources pour cet article : 
 * https://www.geeks3d.com/20190930/raspberry-pi-4-vs-raspberry-pi-3-cpu-and-gpu-benchmarks/
 * https://www.raspberrypi.com/news/benchmarking-raspberry-pi-5/
 * https://picockpit.com/raspberry-pi/fr/combien-coute-lutilisation-de-lelectricite-pour-le-p4/
 * https://papy-tux.legtux.org/doc1246/index.html
 * https://prix-elec.com/tarifs/electricite/prix-kwh

{{< image src="/imgs/dogsAndComputer.avif" alt="Des chiens et un ordinateur" position="center" style="border-radius: 8px;width: 650px;">}}






