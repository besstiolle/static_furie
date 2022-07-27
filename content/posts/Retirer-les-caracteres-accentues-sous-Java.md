---
title: "Retirer un caractère accentué sous Java"
description: "Comment retirer efficacement un ensemble de caractères accentués sous Java."
date: 2013-02-11T00:00:00+01:00
aliases: ["/news/26/15/Remplacer-les-caracteres-accentues-sous-Java.html"]
draft: false
toc: true
images:
tags:
  - java
---

> Attention : cet article initialement publié sur mon précédent site furie.be est ancien et potentiellement obsolète. Merci de le traiter en conséquence et de me prévenir si vous constatez une anomalie. Bisous.

## comment supprimer les caractères accentués par leur équivalent de manière simplifiés.

Un bon petit code existe dans Java 6 et supp

```java
import java.text.Normalizer; 
import java.text.Normalizer.Form; 


public static String removeAccents(String text) 
{ 
 return text == null ? null 
 : Normalizer.normalize(text, Form.NFD) 
 .replaceAll("\\p{InCombiningDiacriticalMarks}+", ""); 
}
``` 

Source : https://www.drillio.com/en/2011/java-remove-accent-diacritic/


