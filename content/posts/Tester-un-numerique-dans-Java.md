---
title: "Tester un numérique dans Java"
description: "Comment tester efficacement un numérique dans Java."
date: 2013-12-19T00:00:00+01:00
aliases: ["/news/48/15/Comment-tester-un-numerique-dans-Java.html"]
draft: false
toc: true
images:
tags:
  - java
---

> Attention : cet article initialement publié sur mon précédent site furie.be est ancien et potentiellement obsolète. Merci de le traiter en conséquence et de me prévenir si vous constatez une anomalie. Bisous.

## Tester efficacement un numérique dans Java

Ca faisait longtemps, un petit article qui tentera d'éclairer ce que je considère comme une hérésie dans le monde Java sur la pratique de l'utilisation du try/catch pour déterminer si une chaine de caractère est un numérique positif.

Explication et BenchMark à l'appui.

Il existe à ma connaissance trois grandes façon de détecter si une chaine de caractère récupérée dans l'url par exemple est bel et bien un nombre entier positif.

### Faire un try/catch

Pour profiter de l'exception NumberFormatException générée pour se dire : "ben visiblement c'est pas un nombre..."

Exemple d'une fonction qui me retournera vrai que si val est un entier positif :

```java
private static boolean isIntegerException(String val) {
    try {
        Integer.valueOf(val);
        return !val.startsWith("-");
    } catch (NumberFormatException e) {
        return false;
    }
}
```

Notez que toutes les variantes reposent sur le même principe :

```java
New Integer(val);
Integer.valueOf(val);
Integer.parseInt(val);
```

### Tester par regex

C'est ce que j'utilise habituellement, elle consiste à vérifier par une expression regulière ce que contient la chaine : que des chiffres.

```java
private static final Pattern PATTERN_INTEGER = Pattern.compile("[0-9]+");
private static boolean isIntegerRegEx(String val) {
    return PATTERN_INTEGER.matcher(val).matches();
}
```

### Tester par bytes

C'est une approche que l'on voit très peu sur les forums (idée trouvée [ici](http://www.developpez.net/forums/d483247/java/general-java/langage/verifier-qu-nombre-entier-java/#post2907422)).

```java
private static boolean isIntegerByBytes(String val) {
    byte[] bytes = val.getBytes();
    for (int i = 0; i < bytes.length; i++) {
        if (!Character.isDigit((char) bytes[i])) {
            return false;
        }
    }
    return true;
}
```

Nous allons ici tester byte à byte afin de voir si chaque caractères est bien un nombre.

## Comparaison des trois méthodes

La première façon de voir les choses est sans aucun doute la longueur de code nécessaire à l’exécution. Clairement la méthode regex est la plus simple à mettre en place d'autant que le pattern étant externalisé il sera très facile de l'éditer + tard si notre class comptes des milliers de lignes.

Mais on ne juge pas la pertinence d'un choix technique à la gueule du code :)

La seconde façon de voir les choses est de se demander si le code est bien utilisé. Or dans le cas d'un try catch on utilise la levée d'exception comme "si ça marche c'est vrai, si ça merde ce sera pas vrai." Et ce n'est certainement pas à ça que sert les try/catch ! L'utilisation normal d'un try/catch est de gérer un cas d'exception, et comme son nom l'indique c'est EXCEPTIONNEL, c'est le cas qui foire et qu'on avait pas prévu. Orienter l'utilisation d'un try/catch pour savoir si une chaine est un nombre est aussi con que d'écrire

```java
try {
     val.length();
    return "la chaine est initialisée";
}catch (NullPointerException npe){
    return "la chaine était nulle en fait...";
}
```

alors qu'on peut écrire `if(val==null)...` pour la même chose.

Beaucoup de personne préconise cette méthode sur [les forums](https://www.google.fr/search?q=tester+un+entier+java), c'est pour moi une hérésie, un des meilleurs exemples de "je sais pas comment faire mais je vais t'apprendre ma science" et d'insister sur le bienfait d'une telle méthode, la palme du plus gros WFT allant sur deux réponses à ce commentaire trouvé sur [hardware.fr](http://forum.hardware.fr/hfr/Programmation/Java/tester-chaine-nombre-sujet_69098_1.htm#t1064928) qui explique en gros que ... ben si, le try catch sert à catcher une erreur, le code générant une erreur si c'est de l'alpha, ben la boucle est bouclée...

Mais bon, ne nous arrêtons pas aux principes élémentaires d'utilisation du code (après tout tant que ça marche) et penchons nous sur les performances.

J'ai initialisé un tableau avec pas moins d'un million de nombres entre -50 et 50 de manière aléatoire stocké sous la forme d'une chaine de caractère : "-23"

La dessus j'ai fait tester l'intégralité des chaines de caractères par chacune des méthodes : try-catch / regex et byte.

Les premiers résultats donne le try-catch plus rapide que le reste. C'est normal car il n'y a eu aucune exception de levée, j'ai donc fait appel à des fonctions bas niveau de JAVA qui ne demande pas autant d'effort que de tester un pattern ou de spliter la chaine en caractère à tester.

1 million de tests sans lettre :

- try-catch = +/-36ms
- regex = +/-220ms
- bytes = +/-125ms

On notera que la méthode de comparaison de bytes est bien plus rapide que la méthode que j'avais moi même l'habitude d'utiliser ce qui n'est pas étonnant vu le coût d'un test regex.

Mais bon, dans la vie on ne test pas un numérique si on sait d'avance que tout sera rose... ajoutons alors quelques lettre par ci par là dans la liste.

Je commence petit avec 1000 lignes qui comportera une lettre sur les 1 millions

1 million de tests avec 0.1% d’alphanumérique :

- try-catch = 36ms
- regex = 220ms
- bytes = 125ms

Visiblement rien ne change... Augmentons la proportion de lettre (Note : les résultats pour regex et bytes ne changeant pas, je ne montrerais que le try-catch)

1 million de tests avec 10% d’alphanumérique :

- try-catch = 209ms

Déjà il fait moins le malin le try/catch et pour cause, le catch à un coût de traitement énorme qui est proportionnel au nombre de fois que vous tomberez dedans. Poussons plus loin les tests.

1 million de tests avec 20% d’alphanumérique :

- try-catch = 228ms

1 million de tests avec 30% d'alphanumérique :

- try-catch = 272ms

1 million de tests avec 40% d'alphanumérique :

- try-catch = 349ms

1 million de test avec 50% d'alphanumérique :

- try-catch = 570ms

Et le final ... 1 million de test avec 100% d'alphanumérique :

- try-catch = 1078ms

Voilà pourquoi un try/catch ne doit servir qu'à gérer l'exceptionnel, parce que ça à un coût de traitement monstrueux pouvant donc atteindre 4 fois le coût d'un traitement au regex pourtant réputé comme couteux.

Mais les conclusions de mon étude sont surtout inattendues pour moi car c'est clairement la comparaison de bytes qui reste la plus performante dans tous les cas alors que moi même j'utilisais le regex jusque maintenant.

La régularité des temps de résultats par regex et bytes s'explique facilement du fait que le traitement ne change pas si un un caractère alpha est détecté, A l'inverse du try/catch qui doit gérer un traitement différent (catch) si un caractère alpha est détecté.

### Mon Bilan

zéro hésitation si votre méthode est calée comme moi dans une classe utilitaire et peut donc statistiquement être amenée à tester de tout et n'importe quoi : utilisez dès maintenant la comparaison de bytes pour vérifier que votre chaine est un entier positif.

Et si vous n'aviez testé que pour des cas extrêmes ? des cas arrivant que trèèès rarement comme une tentative volontaire d'injection de données. Je préconiserais tout de même la comparaison de bytes car le delta entre les méthodes reste très faible et la qualité de code se portera bien mieux que si vous utilisez votre saloperie de try-catch.

Retrouvez ma class de test sur [Gist](https://gist.github.com/besstiolle/8038837#file-testnumber-java) pour tester vous même :)

### Et pour test les nombres entiers positif/négatif ?

haha... ben c'est le même résultat pour un code source à peine modifié

Et vous ? vous testiez comment vos nombres ?

