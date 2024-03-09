---
title: "Restaurer ses données Cloud avec Synology Hyper Backup Explorer?"
description: "L’outil de Synology Hyper Backup Explorer ne permet pas de récupérer ses sauvegardes cloud. Comment contourner cette limite ?"
date: 2024-03-09T00:00:00+01:00
draft: false
toc: true
images:
tags:
  - backup
  - cloud
  - synology
---

Pour ceux comme moi qui possédons un NAS Synology, il est très fréquent que l’on se pose la question de comment sauvegarder ce qui nous sert tous les jours à stocker les données sensibles.

La solution choisie la plupart du temps est de déporter cette sauvegarde dans le cloud même si d’autres solutions peuvent exister[^1].

[^1]: Exemple de la sauvegarde entre deux NAS Synology situés dans deux localisations différentes ou d’une infrastructure info-gérée dans un datacenter

## Sauvegarder son NAS : une solution rapide

L’outil de prédilection de Synology pour cette situation est nommé Hyper Backup et possède tout un arsenal de possibilités en termes de connexion aux providers de cloud avec notamment toute la famille S3-compatible.

En complément Synology propose évidemment sa propre solution cloud et n'hésite pas à mettre en avant celle-ci, c’est normal mais ça n’est pas sans poser des soucis, on le verra plus loin.

La mise en place d’une sauvegarde de son NAS sur un provider cloud de type S3 prend quelques minutes une fois que vous avez en main les notions propres au protocole de stockage S3, les buckets, les id des keys et autre terminologie.

A titre personnel j’ai opté pour Backblaze pour différentes raisons mais toujours est il que je suis aujourd’hui à plus de 1To de données de mon NAS dupliqué sur le cloud et que plus rien d’affreux ne peux m’arriver maintenant.

Enfin, ça c’est ce que je pensais

[Cliquez ici pour voir un gif qui fait peur](https://giphy.com/embed/9lEBLvCXZwEN1IJC6Q)

## Restaurer ses sauvegardes : une solution propriétaire

Le même outil Hyper Backup possède un équivalent pour la restauration des données, il s'appelle Hyper Backup Explorer et vous permet à tout moment d’explorer et de restaurer des données sauvegardées sous un format propriétaire que seul Synology peut lire et décrypter.

Parce que oui déjà première claque : la méthode de sauvegarde n’est pas conventionnelle, ce n’est pas compatible avec les outils du marché et on est loin d’une approche open source / FOSS ou autre.

Seconde claque, l’outil censé pouvoir faire l’inverse du premier n’offre sobrement que deux possibilités : se connecter au service cloud de Synology nommé C2 ou se connecter à une source locale de la sauvegarde dont le point d’entrée est un fichier d’extension se prénomme SynologyHyperBackup.bkpi.

Bref, l’outil de restauration de Synology est volontairement bridé.

## Comment restaurer ses données Synology depuis le Cloud ?

Une solution universelle existe et nécessite finalement peu d’effort quand on la connaît. Elle demande néanmoins un peu de préparation et consiste à “télécharger” manuellement le bucket S3 en local avant de faire explorer cette sauvegarde par l’outil.

### Comment se préparer

Rassemblez tous ces éléments avant de vous lancer

 * Installer rclone sur son ordinateur
 * S’assurer d’avoir de l’espace libre en assez grande quantité sur un disque local équivalent à la taille de votre bucket
 * Préparer les informations suivantes :
   * Application Key ID de votre compte lié au bucket
   * key de votre compte lié au bucket
 * Installer Synology Hyper Backup Explorer pour la suite.

### Lancement de la copie en locale avec Rclone

Ensuite on démarre par la configuration de rclone pour le connecter à son provider. Dans mon cas personnel j’ai sélectionné l’option backblaze bien évidemment.

```bash
> rclone config
No remotes found, make a new one?
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n

Enter name for new remote.
name> backblazeS3

Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
 1 / 1Fichier
   \ (fichier)

[...]

 5 / Amazon S3 Compliant Storage Providers including AWS, Alibaba, ArvanCloud, Ceph, ChinaMobile, Cloudflare, DigitalOcean, Dreamhost, GCS, HuaweiOBS, IBMCOS, IDrive, IONOS, LyveCloud, Leviia, Liara, Linode, Minio, Netease, Petabox, RackCorp, Rclone, Scaleway, SeaweedFS, StackPath, Storj, Synology, TencentCOS, Wasabi, Qiniu and others
   \ (s3)
 6 / Backblaze B2
   \ (b2)

[...]

56 / seafile
   \ (seafile)
Storage> 6

Option account.
Account ID or Application Key ID.
Enter a value.
account> 000123xxxxxxxxxxxxxxxxx

Option key.
Application Key.
Enter a value.
key> xxxxxxxxxxxxxxxxxx

Option hard_delete.
Permanently delete files on remote removal, otherwise hide files.
Enter a boolean value (true or false). Press Enter for the default (false).
hard_delete> false

Edit advanced config?
y) Yes
n) No (default)
y/n> n

Configuration complete.
Options:
- type: b2
- account: 000123xxxxxxxxxxxxxxxxx
- key: xxxxxxxxxxxxxxxxxx
Keep this "backblazeS3" remote?
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> y

Current remotes:

Name             	Type
====             	====
backblazeS3     	b2

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q
```
Pour s’assurer que tout est bon on fait un test de listing des buckets de son compte

```bash
>rclone lsd backblazeS3
      	-1 2000-01-01 01:00:00    	-1 bucket1
      	-1 2000-01-01 01:00:00    	-1 bucket2
```
Enfin on va copier sur le disque local le contenu intégral du bucket :

```bash
>rclone copy backblazeS3:bucket1/ /repertoire/local/
```

> **Attention** : Cette opération en plus de prendre un certain temps implique des frais liés au poids à télécharger. Backblaze m’a coûté par exemple 4$ pour récupérer un bucket de 400Go
>
>La conséquence également du poids est la possibilité que vous ayez atteint la limite de téléchargement par jour si vous avez défini cette limite dans votre compte cloud. Changez alors la limite et relancez le processus avec la dernière commande.



### Exploration avec Synology Hyper Backup

Il reste la partie la plus facile : Lancez Synology Hyper Backup et sélectionnez l’option “sauvegarde locale”. Vous pointez le fichier SynologyHyperBackup.bkpi et le logiciel s’occupera du reste.

A vous de naviguer dans votre sauvegarde et dans l’historique des versions pour identifier ce que vous voulez “extraire” de votre sauvegarde Synology.

## Bilan :

Cette méthode a énormément de mérite, elle permet de contourner une absence injustifiable de fonctionnalité dans l’outil officiel de Synology et est naturellement compatible avec une liste immense de provider cloud.

Il est juste déplorable de la part de Synology de jouer contre ses utilisateurs juste pour tenter de grappiller quelques euros pour son service cloud.

Pour comparaison, au moment de l’écriture de cet article : 1To stocké par an coûte (hors frais de récupération) : 
 - 83,99€ sur Synology C2
 - 66.61€ sur Backblaze B2

**Sources pour cet article :**
 - [Récupérer avec Rclone le bucket](https://help.backblaze.com/hc/en-us/articles/1260804565710-Quickstart-Guide-for-Rclone-and-B2-Cloud-Storage)
 - [La page Synology Hyper Backup Explorer](https://kb.synology.com/fr-fr/DSM/help/HyperBackupExplorer/hyperbackupexplorer)
 - [La page Synology C2](https://c2.synology.com/fr-fr/storage/overview)
 - [Un comparatif de tarif chez Backblaze](https://www.backblaze.com/cloud-storage/pricing)
