---
title: Dagu Console
---

Dagu Console montre comment se passent les exécutions de vos projets
synchronisés, dans n’importe quel navigateur, y compris celui de votre
téléphone, sur [console.dagu.sh](https://console.dagu.sh). Ce sont toujours
vos ordinateurs qui font le travail. La console reçoit l’état de chaque
exécution, jamais ses journaux, ses sorties ni les valeurs des secrets.

<a id="what-you-need"></a>

## Ce qu’il vous faut

- Un compte Dagu Cloud et un [projet synchronisé](/fr/docs/cloud-sync/).
  Toutes les offres conviennent, y compris l’offre gratuite. Un projet qui
  n’est pas synchronisé n’est jamais signalé.
- Pour suivre plus d’un ordinateur, Kitewell Team. Un compte gratuit et
  Kitewell Personal n’acceptent chacun qu’un seul ordinateur.

Connectez-vous à Dagu Console avec le compte qu’utilisent vos ordinateurs. Le
propriétaire de l’espace de travail voit tous les projets synchronisés et tous
les ordinateurs. Les autres membres de l’espace de travail voient les
exécutions des projets sur lesquels ils ont un rôle, leurs propres
ordinateurs, et les ordinateurs qui ont exécuté ces projets.

<a id="follow-runs"></a>

## Suivre les exécutions

Les pages **Supervision** couvrent aussi bien les ordinateurs Kitewell que les
serveurs Dagu :

- **Vue d’ensemble** : le nombre d’ordinateurs qui envoient des rapports, les
  échecs du jour, les alertes ouvertes et les ordinateurs qui demandent votre
  attention.
- **Ordinateurs** : chaque ordinateur avec son **État**, **Rapports reçus** ou
  **Rapports interrompus**, son utilisateur, sa version de Kitewell, son
  système, son dernier rapport, ainsi que ses exécutions en cours et en échec
  aujourd’hui. Choisissez un ordinateur pour voir ses exécutions des 14
  derniers jours.
- **Exécutions** : toutes les exécutions, par projet, workflow, état et
  période.
- **Statistiques** : exécutions, échecs, taux de réussite et durée de chaque
  workflow, sur 7, 30 ou 90 jours.

![La page Ordinateurs de Dagu Console, avec deux ordinateurs Kitewell qui envoient des rapports, leurs utilisateurs, leurs versions de Kitewell, leurs systèmes et leurs derniers rapports](../../../../assets/docs/fr/console-computers.png)

Un ordinateur envoie un rapport toutes les deux minutes, ou plus tôt quand ses
exécutions en cours changent. Une page affiche ce qui était arrivé au moment
où elle s’est ouverte ; choisissez **Actualiser** pour voir les dernières
données.

<a id="alerts-from-dagu-console"></a>

## Alertes de Dagu Console

Dagu Console ouvre deux types d’alertes, sur toutes les offres :

- Un workflow a échoué. Un workflow n’a qu’une seule alerte, quel que soit le
  nombre d’ordinateurs qui l’exécutent. Un échec ultérieur sur n’importe quel
  ordinateur s’y ajoute, et la réussite suivante sur n’importe quel ordinateur
  la résout. Les exécutions interrompues et rejetées sont comptées, mais ne
  déclenchent pas d’alerte.
- Un ordinateur a cessé d’envoyer des rapports. L’alerte s’ouvre après
  10 minutes sans rapport, et se résout quand l’ordinateur envoie de nouveau un
  rapport. Elle est désactivée par défaut, car un ordinateur cesse d’envoyer
  des rapports chaque fois qu’il se met en veille.

Pour surveiller un ordinateur censé rester allumé, le propriétaire de l’espace
de travail l’ouvre sous **Ordinateurs**, coche
**Alerter quand cet ordinateur cesse d’envoyer des rapports** et choisit
**Enregistrer les modifications**.

![La page d’un ordinateur dans Dagu Console, avec ses détails, ses exécutions récentes et l’option Alerter quand cet ordinateur cesse d’envoyer des rapports](../../../../assets/docs/fr/console-computer.png)

Des e-mails partent quand une alerte s’ouvre et quand elle se résout :

- L’arrêt des rapports d’un ordinateur est signalé par e-mail au propriétaire
  de l’espace de travail.
- L’échec d’un workflow est signalé par e-mail une fois que le propriétaire
  active cet envoi : dans **Paramètres**, sous **E-mails d’alerte**, cochez
  **Kitewell** sur la ligne **Propriétaires et administrateurs** et choisissez
  **Enregistrer les modifications**. L’e-mail part au propriétaire et aux
  administrateurs du projet.
- **Ajouter un destinataire** ajoute un **Membre** ou une **Adresse externe**
  avec **Kitewell** coché. Tous deux sont prévenus des ordinateurs qui cessent
  d’envoyer des rapports et des workflows en échec : un membre pour les
  projets qu’il peut ouvrir et les ordinateurs qu’il peut voir, une adresse
  externe pour tous les projets, une fois qu’elle est vérifiée.

<a id="kitewells-alerts-and-dagu-consoles"></a>

### Les alertes de Kitewell et celles de Dagu Console

[Les alertes propres à Kitewell](/fr/docs/alerts/) viennent de l’ordinateur.
Les deux fonctionnent côte à côte :

| | Alertes de Kitewell | Alertes de Dagu Console |
| --- | --- | --- |
| Envoyées par | L’ordinateur | Dagu Cloud |
| Offre | Personal et Team | Toutes les offres |
| Événements | Échoue, se rétablit, attend une saisie, manque une planification, dure trop longtemps, est annulé, réussit, termine un lot | Un workflow a échoué ; un ordinateur a cessé d’envoyer des rapports |
| Canaux | Cet appareil, e-mail, Slack, Microsoft Teams, PagerDuty, webhook | E-mail |
| Pendant que l’ordinateur est en veille | Rien n’est envoyé ; les planifications manquées sont signalées à son réveil | L’alerte d’arrêt des rapports s’ouvre |

<a id="what-dagu-console-keeps"></a>

## Ce que Dagu Console conserve

- Pour chaque exécution, le workflow, l’état, le déclencheur, les heures et
  les noms des étapes en échec, pendant 14 jours. Un espace de travail
  conserve jusqu’à 500 exécutions terminées par jour (UTC) ; au-delà,
  **Réglages de l’appareil** indique quand son historique d’exécution reprend.
- Les totaux quotidiens de chaque workflow, pour les statistiques, pendant
  13 mois.
- Les alertes, pendant 90 jours après leur résolution.
- Un ordinateur qui n’a envoyé aucun rapport depuis 30 jours est supprimé,
  avec tout ce qu’il a signalé.

Pour ne plus envoyer l’état des exécutions, le propriétaire de l’espace de
travail désactive ce partage, comme l’explique
[Suivre les exécutions dans Dagu Cloud](/fr/docs/cloud-sync/#follow-runs-in-dagu-cloud).
Les ordinateurs signalent alors seulement qu’ils fonctionnent.
