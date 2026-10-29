---
title: Installer Kitewell
---

Kitewell est une app unique, que vous installez sur votre propre Mac ou PC
Windows. L’installation prend quelques minutes et vous laisse un projet vide,
prêt pour votre premier workflow.

## Ce qu’il vous faut

- Un Mac sous macOS 13 ou version ultérieure, ou un PC 64 bits sous Windows 10
  version 1809 ou ultérieure, ou sous Windows 11.
- Un programme d’installation pour votre système. La
  [page de téléchargement](/fr/download/) indique ce qui est disponible. Si
  votre système n’y figure pas, son paquet est encore en préparation.

Vous n’avez pas besoin de carte bancaire : la connexion à Dagu Cloud depuis
Kitewell démarre un essai de 14 jours. Vous n’avez besoin ni de Python, ni de
Docker, ni d’aucun outil d’IA. Installez-les plus tard, seulement si l’un de
vos workflows les utilise.

## Installer sur Mac

1. Ouvrez la [page de téléchargement](/fr/download/) et choisissez le
   téléchargement adapté à votre Mac. **Menu Pomme → À propos de ce Mac**
   indique s’il est équipé d’une puce Apple ou d’un processeur Intel.
2. Ouvrez le fichier `.pkg` téléchargé et suivez le programme d’installation.
   Il place Kitewell dans Applications et demande un mot de passe
   administrateur.
3. Ouvrez **Kitewell** depuis Applications.
4. Choisissez **Se connecter pour utiliser l'IA de Kitewell**. Votre navigateur
   ouvre Dagu Cloud avec un code à vérifier. Une fois ce code confirmé,
   Kitewell crée votre premier projet et l’ouvre avec son IA prête à l’emploi :
   aucune clé API, et les 100 crédits de l’essai de 14 jours pour commencer. Pour utiliser votre
   propre clé d’IA, ou ne pas utiliser d’IA, choisissez plutôt
   **Commencer sur cet appareil**.

Kitewell active **Ouvrir à l’ouverture de session** à son premier lancement : vos planifications
continuent ainsi de s’exécuter après un redémarrage du Mac. Vous pouvez le
désactiver à tout moment dans son menu de la barre des menus.

Ensuite, [créez votre premier workflow](/fr/docs/getting-started/).

## Installer sur Windows

1. Ouvrez la [page de téléchargement](/fr/download/) et téléchargez
   `Kitewell-<version>-win-x64-Setup.exe`.
2. Ouvrez le fichier téléchargé. Windows peut afficher un avertissement
   SmartScreen, car Kitewell est un nouvel éditeur. Vérifiez que l’empreinte
   SHA256 du fichier correspond à celle affichée à côté du téléchargement,
   puis choisissez **Informations complémentaires** et **Exécuter quand même**.
3. Kitewell s’installe pour votre compte utilisateur, sans rien vous demander
   ni exiger de mot de passe administrateur, et s’ouvre une fois l’installation
   terminée.
4. Choisissez **Se connecter pour utiliser l'IA de Kitewell**. Votre navigateur
   ouvre Dagu Cloud avec un code à vérifier. Une fois ce code confirmé,
   Kitewell crée votre premier projet et l’ouvre avec son IA prête à l’emploi :
   aucune clé API, et les 100 crédits de l’essai de 14 jours pour commencer. Pour utiliser votre
   propre clé d’IA, ou ne pas utiliser d’IA, choisissez plutôt
   **Commencer sur cet appareil**.

Kitewell active **Démarrer à la connexion** à son premier lancement : vos planifications
continuent ainsi de s’exécuter après un redémarrage du PC. Vous pouvez le
désactiver à tout moment dans le menu de la zone de notification. Pour que les
planifications s’exécutent avant même que quelqu’un se connecte, ouvrez
**Réglages de l’appareil** et activez **Exécuter quand personne n’est connecté** ;
Windows demande une seule fois l’accord d’un administrateur, sans mot de passe,
pour mettre en place le petit service de connexion de Kitewell.

Fermer la fenêtre n’arrête pas Kitewell. Il continue de tourner dans la zone
de notification, le petit groupe d’icônes à côté de l’horloge. Cliquez avec le
bouton gauche sur l’icône de Kitewell à cet endroit pour rouvrir la fenêtre.

Ensuite, [créez votre premier workflow](/fr/docs/getting-started/).

## En cas de problème

- Windows indique que le programme d’installation provient d’un éditeur
  inconnu. Comparez l’empreinte SHA256 du fichier avec celle de la
  [page de téléchargement](/fr/download/), puis choisissez
  **Informations complémentaires** et **Exécuter quand même**. Si Windows
  indique que la signature n’est *pas valide*, arrêtez-vous et
  [signalez-le](/fr/support/) au lieu de l’exécuter.
- Kitewell est installé mais ne s’ouvre pas. Le Contrôle intelligent des
  applications de Windows refuse de charger une version non signée de
  Kitewell, alors qu’une version téléchargée depuis la page des versions est
  signée. Voir
  [Dépannage](/fr/docs/troubleshooting/#kitewell-was-installed-but-did-not-start).
- La fenêtre reste vide, ou Kitewell demande d’installer WebView2. Choisissez
  **Installer WebView2**. Cela prend environ une minute. Voir
  [Dépannage](/fr/docs/troubleshooting/#kitewell-asks-to-install-webview2).
- macOS indique qu’il ne peut pas vérifier le programme d’installation.
  Arrêtez-vous et [signalez le message exact](/fr/support/), avec l’URL de
  téléchargement et la version.

## Installer une nouvelle version par-dessus l’ancienne

Enregistrez d’abord vos modifications et laissez les workflows en cours se
terminer. Vos projets, vos exécutions et votre choix de lancement à la
connexion sont tous conservés, et les exécutions déjà en cours se poursuivent.

- Sur Mac, lancez le nouveau `.pkg`. Il ferme l’app ouverte, la remplace et
  redémarre le service en arrière-plan. Les brouillons non enregistrés dans
  l’éditeur sont perdus. Si l’app ne se ferme pas, choisissez
  **Quitter Kitewell** dans la barre des menus, puis relancez le programme
  d’installation.
- Sur Windows, lancez le nouveau Setup.exe. Il ferme Kitewell, le remplace et
  ouvre la nouvelle version ; les brouillons non enregistrés dans l’éditeur
  sont perdus, alors enregistrez d’abord. Si le service de connexion est
  activé, Kitewell le met lui-même à niveau vers la nouvelle version à sa
  prochaine ouverture.

Kitewell peut aussi télécharger lui-même la nouvelle version. Voir
[Mises à jour](/fr/docs/updates/).

## Détails

- Sur Windows, l’app s’installe par utilisateur, dans
  `%LOCALAPPDATA%\Kitewell.App`, sans demande d’autorisation administrateur.
  Vos données sont stockées à part, dans `%LOCALAPPDATA%\Kitewell`. Seul le
  service de connexion nécessite cette autorisation : il copie les programmes
  dans `C:\Program Files\Kitewell` et déplace les données vers
  `C:\ProgramData\Kitewell`, une seule fois. Voir
  [Planifications](/fr/docs/scheduling/#run-with-nobody-signed-in-windows).
- Une installation silencieuse (`Setup.exe --silent`) n’affiche rien et ne
  demande jamais d’autorisation administrateur ; le service de connexion ne
  s’installe alors que depuis les réglages de l’appareil.
- La fenêtre de Kitewell repose sur le runtime Microsoft Edge WebView2. S’il
  manque, Kitewell propose de l’installer à son ouverture.
- **Démarrer à la connexion** est activé par une nouvelle installation, puis reste tel
  que vous l’avez réglé en dernier dans la zone de notification, d’une mise à
  jour à l’autre.
- Sur Mac, le `.pkg` demande un mot de passe administrateur parce qu’il
  installe dans Applications. Copier plutôt `Kitewell.app` dans votre propre
  dossier `~/Applications` fonctionne sans mot de passe.
- Kitewell est conçu pour les Mac à puce Apple et les Mac à processeur Intel,
  ainsi que pour les PC Windows 64 bits à processeur Intel ou AMD.
