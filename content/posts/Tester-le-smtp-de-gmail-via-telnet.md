---
title: "Tester le smtp de Gmail via Telnet"
description: "Comment tester efficacement via telnet le SMTP de Gmail."
date: 2013-07-08T00:00:00+01:00
aliases: ["/news/38/15/Tester-le-SMTP-de-Gmail-via-Telnet.html"]
draft: false
toc: true
images:
tags:
  - smtp
  - gmail
  - telnet
---

> Attention : cet article initialement publié sur mon précédent site furie.be est ancien et potentiellement obsolète. Merci de le traiter en conséquence et de me prévenir si vous constatez une anomalie. Bisous.

## Gmail et Telnet

Article qui me servira surtout de mémo personnel : Comment interroger depuis un serveur le SMTP de Gmail en TLS ou en SSL afin de s'assurer que toutes les communications tournent bien.

C'est suite à une panne détectée sur les serveurs de [CmsMadeSimple](https://www.cmsmadesimple.fr) que j'ai dû investiguer sur la possibilité que notre firewall coupait les communications entre nos formulaires de contact et notre boite email.

Beaucoup de recherche, aucun résultat, notre firewall était bon. J'ai donc pris le taureau par les cornes et suis passé en mode "ligne de commande" afin de tester depuis le serveur fautif la communication. Cette manipulation un peu difficile à appréhender au départ (je suis pas du tout du monde *Nix) est en fait très facile à réaliser. Je vous remets en français les quelques lignes de code que j'ai pu glaner [ici](http://qmail.jms1.net/test-auth.shtml) et [là](http://stackoverflow.com/questions/11046135/how-to-send-email-using-simple-smtp-commands-via-gmail).

En premier lieu sous votre console tapez cette commande en changeant vos identifiants de Gmail.

```bash
perl -MMIME::Base64 -e 'print encode_base64("\000mon.email\@gmail.com\000Mon.mot2passe")'
```

{{< image src="/imgs/smtp/smtp1.webp" alt="exemple de la ligne de commande" position="center" style="border-radius: 8px;width: 650px;">}}

La console vous donne un retour qui est l'équivalent en base64 de vos identifiants. Conservez cette chaine. Exécutez ensuite la commande suivante qui va se connecter sur le port 587 en mode TLS (=crypté) de Gmail.

```bash
openssl s_client -starttls smtp -connect smtp.gmail.com:587 -crlf -ign_eof
```

S'en suit

```bash
EHLO localhost
```

et vous pouvez dès lors vous identifier avec la chaine base64 préalablement calculée.

```bash
AUTH PLAIN AG1vbi5lbWFpbEBnbWFpbC5jb20ATW9uLm1vdDJwYXNzZQ==
```

Vous reste alors à écrire votre email en 3 commandes successives qu'il faut valider par la touche entrée à chaque fois :

```bash
mail from: <sender@mon-mail.fr>
rcpt to: <receiver@mon-domaine.fr>
data
```

et enfin le contenu de l'email :

```bash
From: Bess <sender@mon-mail.fr>
To: You <receiver@mon-domaine.fr>
Subject: hello you

Comment vas-tu-yau de poele ?

.
```

Finissez bien par un "point" et validez le tout. Votre email est maintenant parti, vous pouvez quitter la connexion en tapant :

```bash
quit
```

N'oubliez pas de vérifier votre email !

{{< image src="/imgs/smtp/smtp2.webp" alt="L'email une fois envoyé" position="center" style="border-radius: 8px;width: 650px;">}}
{{< image src="/imgs/smtp/smtp3.webp" alt="L'email une fois réceptionné" position="center" style="border-radius: 8px;width: 650px;">}}

Et voilà vous vous êtes assuré que votre connexion SMTP était okay, j'ai pu ainsi détecter l'origine de mon souci : le port utilisé pour ma connexion TLS n'était pas le bon (25 au lieu de 587).

Bon à savoir ; si vous souhaitez passer par du SSL et non du TLS (toujours crypté) la première ligne de commande servant à vous connecter sera :

```bash
openssl s_client -connect smtp.gmail.com:465 -crlf -ign_eof
```

A pluche !