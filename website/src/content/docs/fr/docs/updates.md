---
title: Mises à jour
---

Kitewell se maintient à jour tout seul. Il télécharge une nouvelle version en
arrière-plan, vérifie qu’elle est bien signée par Kitewell et l’installe à un
moment où vous ne l’utilisez pas. Les workflows en cours continuent de
s’exécuter pendant le redémarrage. Le moteur de workflows sous-jacent, Dagu,
est livré dans chaque version de Kitewell et ne change que lorsque Kitewell
change.

## Comment arrive une mise à jour

**Mettre à jour Kitewell automatiquement** est activé dès le départ, sous
**Cet appareil → Réglages de l’appareil → Mises à jour**. Lorsque ce réglage
est activé, Kitewell :

1. Cherche une nouvelle version une minute après son ouverture, puis toutes
   les six heures.
2. La télécharge en arrière-plan et vérifie sa signature. Rien ne s’affiche.
3. L’installe au prochain moment sûr : la prochaine fois que vous quittez
   Kitewell, ouvrez une session ou redémarrez l’ordinateur, ou lors d’un
   moment calme, quand aucune fenêtre Kitewell n’est ouverte ou que vous ne
   l’avez pas utilisé depuis une demi-heure. L’icône de la barre des menus ou
   de la zone de notification disparaît quelques secondes puis revient, et une
   fenêtre qui était ouverte se rouvre sur la même page.

Ensuite, une notification indique **Kitewell a été mis à jour vers la version x.y.z** ; un clic dessus ouvre les notes de version sur kitewell.app.

Une nouvelle version arrive sur les appareils en deux jours : tous les
ordinateurs ne la voient donc pas le même jour. **Rechercher les mises à jour…** dans le
menu Kitewell (le menu de la barre des menus sur Mac, ou le menu de l’icône de
la zone de notification sous Windows) vérifie immédiatement et récupère la
version tout de suite ; sinon, il indique **Kitewell est à jour**.

## Ce qu’une mise à jour attend

Une mise à jour n’interrompt jamais le travail. Elle attend tant que :

- l’assistant réfléchit ;
- un workflow en cours a encore une étape de bureau à exécuter ;
- un client MCP a utilisé Kitewell au cours des deux dernières minutes ;
- une fenêtre Kitewell contient des modifications non enregistrées.

Les workflows ne bloquent jamais une mise à jour. Ils continuent de
s’exécuter sur le moteur avec lequel ils ont démarré, et Kitewell, une fois
redémarré, les retrouve.

Pendant qu’une mise à jour attend, le menu Kitewell affiche
**Redémarrer pour mettre à jour vers Kitewell x.y.z**, qui l’installe immédiatement. Kitewell
vous interroge sur les modifications non enregistrées et nomme tout ce que le
redémarrage interromprait, avec **Redémarrer maintenant** et **Une fois inactif**. Si une mise à
jour attend depuis sept jours, une notification indique
**Redémarrez Kitewell pour terminer la mise à jour** ; si seules des modifications non
enregistrées la retiennent depuis un jour, une notification vous demande de
les enregistrer ou de les abandonner. Les modifications ne sont jamais
abandonnées pour une mise à jour.

## Avec les mises à jour automatiques désactivées

Kitewell vérifie quand même. Quand une nouvelle version est disponible, vous
recevez une notification, et le menu affiche **Mettre à jour vers Kitewell x.y.z…**.
Choisissez-le pour télécharger la version, dont la progression s’affiche dans
le menu ; Kitewell propose ensuite **Redémarrer pour mettre à jour** ou **Plus tard**. Rien ne
s’installe tant que vous ne l’avez pas choisi.

## Quand Dagu Cloud demande une version plus récente de Kitewell

Dagu Cloud peut cesser de servir une version qu’il ne prend plus en charge.
Les workflows, les planifications et le serveur MCP local continuent de
fonctionner ; la synchronisation, le MCP distant, les webhooks et l’état des
exécutions s’arrêtent jusqu’à ce que cet ordinateur se mette à jour. Un
bandeau dans la fenêtre le signale et propose **Mettre à jour maintenant**,
qui récupère immédiatement la version, quels que soient les réglages, puis
l’installe au prochain moment sûr ou vous demande de redémarrer au bout d’une
heure.

## Sur un Mac qui demande un mot de passe

Kitewell ne se remplace sans mot de passe que si votre utilisateur macOS est
propriétaire de l’app et peut écrire dans le dossier Applications. Sur un
compte standard (non administrateur), ou si Kitewell a été installé par un
autre utilisateur ou par la gestion des appareils, rien ne se télécharge en
arrière-plan. Le menu affiche **Mettre à jour vers Kitewell x.y.z…**, avec une
notification ; le choisir télécharge la mise à jour et affiche la demande
d’autorisation administrateur de macOS. Kitewell n’affiche jamais cette
demande sans que vous l’ayez sollicitée.

## En cas de problème

- Un téléchargement ou sa vérification échoue. Kitewell réessaie
  discrètement à la vérification suivante. Le menu en indique la raison si
  vous l’ouvrez.
- Une installation échoue. La version installée reste en place et Kitewell la
  redémarre ; le prochain moment sûr fait une nouvelle tentative. Après trois
  échecs d’installation d’une même version, Kitewell cesse de l’essayer et
  affiche **Kitewell n’a pas pu se mettre à jour** avec un lien
  vers la [page de téléchargement](/fr/download/).
- La vérification échoue. Vérifiez votre réseau et
  l’[état des versions](/fr/releases/). Tant que la première version publique
  pour votre système n’est pas sortie, il n’existe aucun flux de mises à jour à
  lire, et une vérification qui ne peut pas en joindre un le dit, au lieu de
  prétendre que vous êtes à jour.
- Vous devez revenir à une version précédente. Les anciens programmes
  d’installation restent sur la
  [page des versions GitHub](https://github.com/dagucloud/kitewell/releases).
  Installer une ancienne app ne restaure pas les anciennes données ; pour
  cela, restaurez une [sauvegarde](/fr/docs/backups/).

Quand vous signalez un problème, indiquez la version de Kitewell, la version
du moteur et la version de votre système d’exploitation. La barre latérale
affiche la version de Kitewell en bas à gauche. La pastille de la barre
supérieure affiche ensemble la version de Kitewell et celle du moteur. Sur
Mac, **À propos de Kitewell** dans le menu de l’application affiche la version de
Kitewell ; sous Windows, le haut du menu de la zone de notification affiche
les versions de l’app et du service.

## Détails

- Les builds publics lisent leur flux de mises à jour à l’adresse
  `https://kitewell.app/updates/macos/latest.json` sur Mac et
  `https://kitewell.app/updates/windows/latest.json` sous Windows.
- La vérification et le téléchargement laissent les workflows s’exécuter.
  Seule l’installation redémarre quelque chose.
- Un téléchargement attend que le disque dispose de 2 Go d’espace libre et
  que la connexion ne soit pas limitée. Une mise à jour téléchargée mais pas
  encore installée est abandonnée si la version est suspendue ou remplacée.
- La notification qui suit une mise à jour n’apparaît qu’une fois par version,
  et seulement là où les notifications de Kitewell sont autorisées.
- Sous Windows, la mise à jour arrête le service d’arrière-plan pendant les
  quelques secondes du remplacement, mais pas les exécutions qui en dépendent :
  chaque exécution a son propre groupe de processus. Seul **Quitter Kitewell**
  annule des exécutions.
- Le moteur qu’exécute Kitewell est la version de Dagu intégrée à cette
  version de Kitewell, indiquée dans les notes de version et sur la
  [page des licences tierces](/third-party/).
