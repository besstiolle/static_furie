---
title: "Personnaliser son Bash sous Debian"
description: "Petite astuce afin de personnaliser son Bash."
date: 2014-08-14T00:00:00+01:00
aliases: ["/news/58/15/Personnaliser-son-bash-utilisateur-sous-Debian.html"] 
draft: false
toc: true
images:
tags:
  - bash
  - debian
---

> Attention : cet article initialement publié sur mon précédent site furie.be est ancien et potentiellement obsolète. Merci de le traiter en conséquence et de me prévenir si vous constatez une anomalie. Bisous.

## Bash Personnalisé sous Debian

J'en ai chié et pourtant j'avais bien regardé toutes les documentations sur internet. Impossible de personnaliser mon bash sous mes serveur Debian autre que sous ROOT.

Voici une solution toute simple qui m'a permis de récupérer de la couleur sur mes comptes lambda :=)

**Connectez-vous en root** et modifiez ce fichier

`nano /etc/passwd`

Pour chaque utilisateur désiré, spécifier **/bin/bash** en lieu et place de **/bin/sh** puis sauvegarder.
**Pour chaque compte user désiré**, connectez-vous et allez dans la home (cd ~). 

`nano .bash_profile`

écrivez ce code dans le fichier fraichement créé puis enregistrez.

`if [ -f ~/.bashrc ]; then
   source ~/.bashrc
fi`

Ensuite créez /modifiez ce second fichier

` nano .bashrc`

A l'intérieur claquez ce code (personnalisable)

```bash
# ~/.bashrc: executed by bash(1) for non-login shells.
# Note: PS1 and umask are already set in /etc/profile. You should not
# need this unless you want different defaults for root.
# PS1='${debian_chroot:+($debian_chroot)}\h:\w\$ '
# umask 022
# You may uncomment the following lines if you want 'ls' to be colorized:
export LS_OPTIONS='--color=auto'
eval "`dircolors`"
alias ls='ls $LS_OPTIONS'
alias ll='ls $LS_OPTIONS -l'
alias l='ls $LS_OPTIONS -lA'
#
# Some more alias to avoid making mistakes:
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
```

déco / reco, vous devriez automatiquement obtenir un shell bien plus sympa et déjà customisable.