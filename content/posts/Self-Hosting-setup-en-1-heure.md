---
title: "Self-Hosting : Monter son setup en une heure"
description: "Guide pratique pour démarrer rapidement son setup Self-Hosting"
date: 2024-04-22T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - web
  - self-hosting
  - débutant
---

## Rappel sur l'univers du self-hosting avant de démarrer :

> Je suis très loin de me considérer comme un expert du self-hosting, tout au plus j'ai essuyé quelques plâtres dans mon aventure mais j'estime qu'il y a matière à partager. Sentez vous libre de compléter votre lecture avec d'autres sources, de tester, de valider ou d'invalider mes propos et de m'en faire des feedbacks via Linkedin ou par Mail :)

Cette série d’articles autour du self-hosting est rédigée au fil de l’eau. Je vous invite à [démarrer cette série par le sommaire]({{< ref "/Self-Hosting-tour-rapide-question" >}})

## Ce que ne fera pas ce guide

Avant de vous lancer tête baissée dans ce guide je me permet de vous pointer ce qui ne sera pas étudié dans ce guide :

 - Quel matériel ? ([j'en parles ailleurs]({{< ref "/Self-Hosting-comment-choisir-votre-materiel" >}}))
 - Comment sauvegarder vos données ([j'en parles ailleurs]({{< ref "/Self-Hosting-strategies-stockage-sauvegarde-donnees" >}}))
 - Comment sécuriser ses accès (c'est un trop vaste sujet)

Ici je vais dérouler les lignes de commandes qui permettent in-fine d'avoir une solution opérationnelle.

## Installation de l'OS

Je vous propose de démarrer avec un choix stable et suffisamment diffusé pour que vous puissiez trouver votre bonheur niveau documentation : Debian.

**Note :** Au moment de l'écriture de cet article nous en sommes à Debian 12. Le reste du tuto est donc adapté pour cette version et pourra nécessiter des modifications dans le futur.

- [Téléchargez la version full de Debian 12](https://www.debian.org/CD/http-ftp/), amd64 sauf si matériel particulièrement ancien chez vous.[^1]
- [Téléchargez Ventoy](https://www.ventoy.net/) pour générer une clé usb bootable (FOSS)[^2]
  - Alternative : [Télécharger Rufus](https://rufus.ie/fr/) pour générer une clé usb bootable (si vous êtes sur Windows, non FOSS)[^2].
- Installez sur une clé usb l'ISO de Debian
- Démarrez votre laptop avec la clé connectée et via le bios, forcez le démarrage sur la clé usb.

[^1]: Pour de très vieux matériel, il est possible de devoir utiliser une version i386 (coucou Aurélie)
[^2]: Free & Open Source Software

Concernant ce dernier point je ne peux évidemment pas vous guider. Les touches pour y accéder sont généralement F2n ... F8, F9, ... , F12 ou parfois la touche delete. Tout dépends du modèle de laptop.

Lancez l'installation de Debian. Notez le nom de l'utilisateur non root que vous allez créer. Pour la suite du tuto l'utilisateur ici sera appelé **alice**

Une fois l'installation terminée le laptop redémarre, retirez la clé usb. Il existe 3 cas :
 - Vous arrivez sur le shell de Debian et opérez la suite sur ce shell
 - Vous arrivez sur le bureau Debian, ouvrez un terminal et opérez la suite sur ce shell
 - Vous pilotez en SSH depuis un autre PC.

Pour la suite du tuto je tenterai de rester agnostique sur cette particularité.

### Options : Installer le bureau ou pas ?

Vous avez la possibilité d'installer la partie bureautique de Debian, je vous le déconseille car cela prend de la ressource. Néanmoins si vous êtes réellement novice vous serez tenté les premières fois d'avoir un support rassurant pour faire vos manipulations. Je penses notamment à la possibilité d'ouvrir Firefox sur le laptop pour aller chercher une solution sur le net.

### Options : Serveur SSH

Il est indispensable de l'activer sans quoi vous ne pouvez accéder à votre laptop à distance. Je ne rentre pas dans les détails de ce qu'est SSH, on va partir du principe que vous savez à quoi ça sert et comment on s'en sert.

### Options : Serveur Web

Inutile, décocher l'option si elle vous est proposée.

### Options : se connecter au réseau WIFI

Cela peut être utile car configurer le wifi une fois passé l'assistant, en pure ligne de commande, est un poil compliqué quand on débute.

L'option câble RJ45 reste néanmoins la solution la plus stable et la plus fiable dans tous les cas.

## Votre bac à sable.

Vous voici avec un énorme bac à sable. Il est temps de jouer, et pour commencer je vous propose de nombreux sujets à grappiller. Vous prenez ou vous ne prenez pas selon si vous pensez que cela à du sens.

### Sauvegardez votre OS

[Timeshift](https://teejeetech.com/timeshift/) fait des merveilles. J'en parlais dans un [autre article sur la notion de Sauvegarde]({{< ref "/Self-Hosting-strategies-stockage-sauvegarde-donnees" >}}), je ne reviens pas dessus et de très nombreux articles sur le net existent pour décrire son fonctionnement.

Je préconise énormément son usage pour faire une snapshot "avant toute opération".

### Sécuriser votre accès SSH

Utile uniquement si vous avez activé le serveur SSH durant l'installation. Attention : va couper votre accès SSH qu'il faudra reconfigurer sur le poste distant.

**Ligne de commande à réaliser en root (ou sudo, j'y viens plus loin)**

```shell
nano /etc/ssh/sshd_config.d/local.conf
```

Modifier les clés `Port 22` & `PermitRootLogin xx` pour obtenir in-fine

```shell
# Securisation SSH
Port xx
PermitRootLogin no
```

Avec xx le n° de port de votre choix. Évitez 22 et 222 qui sont des évidences.

`PermitRootLogin no` est un basic qui évite une connexion root et oblige à un potentiel robot de deviner que votre utilisateur est **alice**

Redémarrez le service sshd pour prendre en compte ces modifications.

```shell
/etc/init.d/ssh restart
```

### Installer et configurer SUDO

Un classique de la sécurité, il évite de passer son temps en root et permet donc de limiter une mauvaise manipulation. Je ne m'étendrai pas sur ce sujet puisque ce n'est pas le but de ce guide, je vous donne ici la conf sudo telle que je l'ai définie sur mon infrastructure Self-Hosting.

```shell
apt update
apt install sudo
```

puis

```shell
visudo -f /etc/sudoers.d/alice
```

Le contenu qui me permet en tant que **alice** d'utiliser avec des droits root les outils nano (éditeur), apt (gestionnaire de paquet), su (impersonnalisation) ou encore créer des dossiers:

```shell
# A placer dans /etc/sudoers.d/alice avec visudo -f /etc/sudoers.d/alice

# This allows running arbitrary commands, but so does ALL, and it means
# different sudoers have their choice of editor respected.
Defaults:%sudo env_keep += "EDITOR"

# Completely harmless preservation of a user preference.
Defaults:%sudo env_keep += "GREP_COLOR"

# Host alias specification
# Nothing to do, we will use "ALL"

# User alias specification ([A-Z]([A-Z][0-9]_))
User_Alias MY_USERS = alice

# Cmnd alias specification ([A-Z]([A-Z][0-9]_))
Cmnd_Alias MY_CMDS = /usr/bin/nano, /usr/bin/apt, /usr/bin/su, /usr/bin/mkdir

# Allow users MY_USERS to execute commands MY_CMDS as root without password
# MY_USERS   ALL=(ALL) NOPASSWD:MY_CMDS

# Allow users MY_USERS to execute commands MY_CMDS as root
MY_USERS   ALL=(ALL) MY_CMDS
```

Son usage par exemple :

Avant, en `root` :

```shell
apt update
  > succès
commande bizarre
  > succès et c est la cata
```

Après, en `alice` :

```shell
sudo apt update
  > succès
sudo commande bizarre
  > echec, alice n a pas le droit de réaliser cette commande.
```

A partir de la suite de ce guide je pars du principe que vous êtes connectés sous le compte **alice** et que sudo est correctement installé.

### Installer deux trois logiciels sympas

```shell
sudo apt update
sudo apt install nano btop
```

Le premier `nano` est un éditeur de texte qui vous évite les boutons de `vi` et la sobriété de `emacs`. `btop` vous permet de conserver un œil sur l'état général de consommation CPU, GPU, mémoire et disque. Un incontournable.


### Connectez un répertoire partagé NFS de votre NAS

Pratique pour augmenter la taille du disque dur de votre matériel et pour y accueillir [des données tièdes et / ou froides]({{< ref "/Self-Hosting-strategies-stockage-sauvegarde-donnees" >}}).

Dans l'ordre :
 - On ouvre sur le NAS le répertoire partagé avec le protocole NFS (n'est pas le propos de ce guide, je passe)
 - On installe le client NFS
 - On crée le répertoire local
 - On configure un montage persistant pour qu'au prochain reboot tout reste connecté.
 - On "mount" (monter) le répertoire NFS sur un répertoire local
 - On valide le montage.

Exemple :
 - Le répertoire sur mon NAS Synology via NFS est accessible sur `192.168.1.99:/volume1/public`
 - Je veux le mapper sur `/mnt/public`

Cela donne donc :


```shell
sudo apt update
sudo apt install nfs-common

sudo mkdir -p /mnt/public
```

éditer le fichier `/etc/fstab`

```shell
sudo nano /etc/fstab
```

Et y ajouter la configuration suivante :

```shell
192.168.1.99:/volume1/public             /mnt/public                     nfs defaults,_netdev,nofail,x-systemd.automount 0 0
```

Il faut penser à recharger la configuration (en root)

```shell
systemctl daemon-reload
```

et toujours en root à monter une première fois manuellement le lien (au lieu d'attendre le premier reboot)

```shell
mount /mnt/public
```

Vous pouvez maintenant accéder à `/mnt/public` qui contient les données de votre NAS. Ressortez préalablement de ce répertoire pour refresh la vue si vous y étiez déjà avant de faire la commande `mount`. Normalement un reboot du PC conserve le lien.

### Eviter que le laptop s'éteigne quand l'on referme l'écran

Astuce indispensable surtout si vous n'avez pas le Bureau Debian pour aller chercher l'option.

```shell
sudo nano /etc/systemd/logind.conf
```

Ajouter la ligne

```shell
HandleLidSwitch=ignore
```
Redémarrer le service (en root)

```shell
systemctl restart systemd-logind
```

### Faire un benchmark de votre Laptop

Très utile pour connaître sa puissance de feu, à combiner avec un relevé de la consommation électrique du laptop batterie pleine avec un wattmètre. Voici mes benchmarks en date du 21 avril 2024.

le laptop sélectionné pour faire mon setup est un Asus [UX303L](https://searx.be/search?q=UX303L&categories=general&language=fr) poussé à 12Go de RAM

|Dénomination | Conso au repos (Watt) | Sysbench (events / seconde) | Core | RAM (Go) |
|----------|-------------|------|------|------|
| DELL VOSTRO | 17~30 | 1 900 | 4 | 4 |
| DELL LATTITUDE D830 | 28 | 1 700 | 2 | 2 |
| DELL P57G001 | 12 | 1 500 | 4 | 4 |
| DELL Inspiron | 16 | 6 600 | 8 | 16 |
| [Asus UX303L](https://searx.be/search?q=UX303L&categories=general&language=fr)  | 7 | 2 500 | 4 | 8+4 |
| [HP Elitebook 8740w  i7 vpro 8Go](https://support.hp.com/fr-fr/drivers/hp-elitebook-8740w-mobile-workstation/4138087) | 30 | 2 500 | 4 | 8 |

Autres données comparables :

|Dénomination | Conso au repos (Watt) | Sysbench (events / seconde) | Core | RAM (Go) |
|----------|-------------|------|------|------|
| RPi3 | 5 | 104 | N/A | 1 |
| RPi4 | 6 | 161 | N/A | 1~8 |
| RPi5 | 27 | 240 | N/A | 4~8 |

Pour obtenir ce chiffre (events / seconde) voici la procédure

```shell
sudo apt install sysbench
#1 thread
sysbench cpu run
#8 threads, à adapter au nombre de coeur de votre machine
sysbench --threads=8 cpu run
```

Le résultat au bout de 10 secondes affiche ceci (exemple)

> sysbench 1.0.20 (using system LuaJIT 2.0.5)
>
> [...]
>
> **CPU speed: events per second: 33 023.88**
>
> [...]

Bon je triche un peu, ici j'ai fait tourner la commande sur ma tour équipée d'un Rysen 5 5600x... ça aide.

Cela vous permet de savoir dans le cas présent que votre matériel a un score comparable avec ma propre liste. D'expérience, un score supérieur à 2 500 est un très bon score pour une infra Self-Hosting de moyenne envergure sans usage extrême (IA ou autre serveur de jeu). En dessous de 1 000, ne dépassez pas les 3 logiciels surtout si vous avez de la manipulation de médias vidéo ou photo.

### Paramétrer une ip fixe

#### Cas d'une connexion Wifi

**Attention :** Section inutile si vous avez installé le bureau Debian car vous bénéficiez alors d'un autre système de gestion de réseau que `networking`, passez alors par les écrans dédiés à sa configuration. Ne mélangez pas les confs, ça fait nawak.

Utile si comme moi vous hardcodez les ip de vos machines. On va partir du principe que l'on souhaite accéder à votre laptop en wifi sur une ip fixe `192.168.1.99` et l'ip de votre box/passerelle : `192.168.1.1`[^3]

[^3]: L'ip de votre box/passerelle peut également être trouvée par la commande `ip route show` si vous avez configuré votre réseau avec l'assistant Debian

Editez le contenu du fichier de configuration du réseau en partant du principe que votre équipement wifi porte l'identifiant `wlp2s0`, vous pouvez vous en assure en tapant la ligne de commande `ip a` qui vous retourne généralement au moins deux blocs : `lo` (interface loopback, boucle locale) et la seconde interface `wlp2s0` dans mon propre cas de figure ou encore `ens123` pour une carte réseau éthernet RJ45, les valeurs restent propre à chaque ordinateur.

Commençons donc à éditer.

```shell
sudo nano /etc/network/interfaces
```

Vous démarrez avec quelque chose de ce genre.

```shell
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug wlp2s0
iface wlp2s0 inet dhcp
       wpa-ssid superSSID
       wpa-psk  superMotDePasseWifi
```

Vous adaptez pour obtenir ceci

```shell

[...]

# The primary network interface
auto wlp2s0
iface wlp2s0 inet static
       address 192.168.1.99/24
       gateway 192.168.1.1
       wpa-ssid superSSID
       wpa-psk  superMotDePasseWifi
```

Redémarrez le service network et c'est terminé (Coupure SSH à prévoir).

```shell
sudo systemctl restart networking.service
sudo ifup wlp2s0
```

#### Cas d'une connexion filaire

Dans le cas ou vous fonctionnez en filaire (câble ethernet RJ45) vous aurez plutôt quelque chose de ce genre

```shell
sudo nano /etc/network/interfaces
```
et son contenu

```shell
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug ens123
iface ens123 inet dhcp
```

à remplacer par

```shell

[...]

# The primary network interface
auto ens123
iface ens123 inet static
  address 192.168.1.99/24
  gateway 192.168.1.1
```

Redémarrez le service network et c'est terminé (Coupure SSH à prévoir).

```shell
sudo systemctl restart networking.service
sudo ifup ens123
```

La commande `ip a` doit vous donner le résultat escompté

```shell
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
 
 [...]

2: ens123: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 50:eb:f6:7f:d6:ac brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.99/24 brd 192.168.1.255 scope global dynamic noprefixroute ens123

 [...]

```

#### Cas d'une gestion fine des DNS

Vous pouvez configurer les DNS de votre laptop ainsi pour outrepasser les DNS menteurs de votre box ce qui permet de contourner les restrictions des FAIs. A titre perso je préconise dans l'ordre :
 - Un serveur DNS local (si vous vous y connaissez, par exemple [BIND](https://github.com/labbsr0x/docker-dns-bind9), [AdGuard](https://hub.docker.com/r/adguard/adguardhome) ou [PiHole](https://github.com/pi-hole/docker-pi-hole/#running-pi-hole-docker)[^4])
 - Un serveur DNS de confiance ([voir la liste comparative](https://www.privacyguides.org/fr/dns/))

[^4]: les deux solutions sont implémentables sur votre propre instance Self-Hosting

A éviter pour des questions éthiques ou protection de la vie privée :
 - Les serveurs DNS de Google, Cloudflare et autre GAFAM
 - Les serveurs DNS de votre FAI

Personnellement j'ai opté pour une instance Docker adguardhome doublé d'un DNS maître Quad9

Pour hardcoder les DNS sur votre machine vous pouvez compléter les configurations précédentes en ajoutant simplement (cas d'usage des [DNS Quad9](https://www.quad9.net/service/service-addresses-and-features/))

```shell

[...]

# The primary network interface
[...]
  address 192.168.1.99/24
  gateway 192.168.1.1
  dns-nameservers 9.9.9.9 149.112.112.112
```

Comme d'habitude : redémarrez le service network et c'est terminé.

### Créer un second compte utilisateur

Utile si comme vous vous souhaitez distinguer les répertoires de travail de **alice** et le répertoire de travail de l'utilisateur dédié à docker.

Notre second utilisateur s'appellera donc **dock**

Commande à réaliser en root

```shell
groupadd dock
useradd -m dock -g dock -s /bin/bash
passwd dock
```

Vous pouvez par sécurité interdire la connexion en ssh pour cet utilisateur en éditant le fichier de configuration ssh

```shell
nano /etc/ssh/sshd_config.d/local.conf
```

et en ajoutant la ligne suivante (blacklist spécifiquement du user dock)

```shell
DenyUsers dock
```

ou en ajoutant la ligne suivante (whitelist de alice, ce qui blacklist le user dock et de tout le reste de facto)

```shell
AllowUsers alice
```

Redémarrez le service sshd pour prendre en compte ces modifications.

```shell
/etc/init.d/ssh restart
```


### Installer Docker

> **Note :** Cette installation de docker est dite "root", ce qui signifie qu'une faille de sécurité dans les images ou dans docker pourrait permettre à un attaquant de gagner en privilège sur votre installation. Je sais que des alternatives rootless existent pour docker et que son principal concurrent Podman est rootless par défaut. Je n'ai pas encore assez creusé le sujet.

Commençons par installer les composants et les clés de sécurités nécessaire pour Docker

```shell
sudo apt update
sudo apt install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg
```

Ajout des clés de sécurités dans apt en tant que root

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu jammy stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Puis alors nous pouvons installer Docker de manière effective

```shell
sudo apt update
sudo apt install \
  docker-ce \
	docker-ce-cli \
	containerd.io \
	docker-buildx-plugin \
	docker-compose-plugin
systemctl is-active docker
```

La dernière commande doit vous retourner `active` si Docker fonctionne correctement.

On autorise alors le user dock à appeler les commandes docker.

```shell
usermod -aG docker dock
```

A ce stade votre utilisateur `dock` peut exécuter une commande docker. On peut tester simplement.

```shell
alice@Self:~$ sudo su dock
[sudo] Mot de passe de alice :
dock$Self:/home/alice cd ~
dock$Self:~ docker -v
Docker version 26.0.1, build d260a54
```

A vous maintenant de jouer, j'ai pour ma part utilisé le répertoire du user `dock` comme base pour implémenter tous mes services. Cela fera l'objet d'un autre article.

Votre laptop est en tout cas opérationnel !

## Voir également
 - [Docker rootless](https://docs.docker.com/engine/security/rootless/)
 - [Podman](https://podman.io/)


{{< image src="/imgs/dogsAndComputer.avif" alt="Des chiens et un ordinateur" position="center" style="border-radius: 8px;width: 650px;">}}
