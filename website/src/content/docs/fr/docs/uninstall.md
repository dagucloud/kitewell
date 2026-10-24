---
title: Désinstaller Kitewell
---

Supprimer l’app Kitewell et effacer votre travail sont deux choses distinctes.
En suivant cette page, vous supprimez l’app et laissez vos projets, vos
exécutions et vos sauvegardes là où ils sont : une réinstallation ultérieure
les retrouve. La dernière section supprime aussi les données, si c’est ce que
vous voulez.

## Avant de commencer

Enregistrez votre travail et laissez les workflows en cours se terminer. La
désinstallation ne les attend pas. Pour y mettre fin tout de suite, choisissez
**Quitter Kitewell** dans la barre des menus sur Mac, ou dans le menu de la zone
de notification sous Windows. Cela arrête aussi le moteur de chaque projet.

## Sur Mac

1. Désactivez **Ouvrir à l’ouverture de session** dans le menu de la barre des menus, pour que
   rien ne tente d’ouvrir Kitewell à la prochaine ouverture de session. Si
   Kitewell a déjà été supprimé, retirez-le plutôt sous
   **Réglages Système → Général → Ouverture**. Le libellé varie selon la
   version de macOS.
2. Choisissez **Quitter Kitewell** dans la barre des menus, ou dans le menu
   Kitewell en haut de l’écran. ⌘Q correspond à **Continuer dans la barre des menus**,
   qui se contente de masquer la fenêtre.
3. Faites glisser **Kitewell.app** du dossier Applications vers la Corbeille.

### Si un enregistrement en arrière-plan subsiste

Kitewell fait tourner son service d’arrière-plan au moyen d’un agent de
lancement macOS (launch agent), qu’il décharge quand vous quittez l’app. Une
copie restée chargée, ou laissée dans `~/Library/LaunchAgents` par une
ancienne version, se supprime en exécutant ces lignes dans Terminal, avec le
même utilisateur macOS que celui qui utilisait Kitewell :

```sh
launchctl bootout "gui/$(id -u)/xyz.kitewell.agent" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/native-token"
```

Elles suppriment l’enregistrement et le jeton qu’utilisait l’app pour joindre
son propre service. Elles ne touchent ni à vos workflows ni à vos sauvegardes.

## Sous Windows

1. Ouvrez **Paramètres → Applications → Applications installées**, trouvez
   **Kitewell** et choisissez **Désinstaller**.
2. Le programme de désinstallation arrête Kitewell et son service
   d’arrière-plan, puis supprime l’app de votre compte utilisateur. Si
   **Exécuter quand personne n’est connecté** est activé, il supprime aussi le
   service Kitewell sign-in et ses programmes sous
   `C:\Program Files\Kitewell`, moyennant une seule demande d’autorisation
   administrateur. Vos données restent.
3. Si Kitewell apparaît encore ensuite sous
   **Paramètres → Applications → Démarrage**, désactivez-le à cet endroit.

## Vos données

Ce qui reste se trouve dans un seul dossier :

- Sur Mac : `~/Library/Application Support/Kitewell`
- Sous Windows : `%LOCALAPPDATA%\Kitewell`, ou `C:\ProgramData\Kitewell` si
  **Exécuter quand personne n’est connecté** a été activé, ce qui y déplace
  les données.

Il contient vos projets, leur historique d’exécution, leurs secrets, vos
sauvegardes et les journaux. Gardez-le si vous pensez réinstaller Kitewell.

Pour le supprimer définitivement, copiez d’abord les sauvegardes et les
fichiers que vous voulez garder, puis supprimez ce dossier dans le Finder ou
dans l’Explorateur de fichiers. Cette opération est irréversible.

Si cet appareil synchronisait des projets avec [Dagu Cloud](/fr/docs/cloud-sync/),
les projets y restent. L’appareil compte toujours parmi les ordinateurs que
l’offre de l’espace de travail accueille, jusqu’à ce que vous connectiez un
autre ordinateur qui le remplace. Déconnectez-le sur la page **Kitewell** de
Dagu Cloud pour libérer sa place.
