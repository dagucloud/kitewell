---
title: Kitewell Cloud
---

Kitewell Cloud, c’est Kitewell dans votre navigateur, sans rien installer.
Chaque projet que vous y créez a sa propre machine dans le cloud : ses
planifications tournent même ordinateur fermé. Créez et corrigez vos workflows
depuis un navigateur ou votre téléphone.

## Commencer

1. Ouvrez [app.kitewell.com](https://app.kitewell.com/) et connectez-vous à
   Dagu Cloud, ou créez un compte.
2. Choisissez **Créer un projet** et donnez-lui un nom. Kitewell prépare la
   machine du projet, ce qui prend une vingtaine de secondes.
3. Décrivez le travail à l’assistant, comme dans
   [votre premier workflow](/fr/docs/getting-started/).

Votre premier projet lance l’essai de 14 jours, sans carte bancaire. L’essai
permet un seul projet. Abonnez-vous à Kitewell Personal ou Team pour en avoir
davantage.

## Minutes de cloud

Kitewell Cloud est facturé séparément des offres, à la minute d’exécution.
Chaque exécution est arrondie à la minute supérieure. L’attente d’une
approbation ne compte pas, ni la construction avec l’assistant.

- Chaque espace de travail dispose de 1 000 minutes gratuites par mois,
  quelle que soit l’offre.
- Au-delà, la minute coûte 0,007 $ (1 ¥ au Japon) hors taxes, jusqu’au budget
  mensuel que le propriétaire de l’espace fixe sur la page du compte, après
  avoir ajouté une carte.
- Sans budget, Kitewell Cloud ne lance plus de nouvelle exécution une fois les
  minutes gratuites utilisées, jusqu’au mois suivant, et l’application le
  signale. Rien n’est facturé.
- Entre-temps, vous pouvez toujours ouvrir les projets, lire les exécutions
  passées et exporter.
- Les exécutions sur votre propre ordinateur ne sont jamais facturées à
  l’usage.

## Travailler en équipe

Avec Kitewell Team, essai compris, le propriétaire de l’espace de travail
invite des personnes depuis le navigateur :

1. Choisissez la roue dentée à côté de votre nom pour ouvrir **Compte**. Sous
   **Équipe**, saisissez l’adresse e-mail de la personne et choisissez
   **Inviter**. Kitewell lui envoie un lien par e-mail et vous l’affiche une
   fois, pour que vous puissiez aussi l’envoyer.
2. La personne ouvre le lien, se connecte ou crée un compte avec cette
   adresse, puis choisit de rejoindre l’espace de travail. Kitewell l’ouvre
   pour elle.
3. Sous **Projets synchronisés**, donnez-lui le rôle **Éditeur** ou
   **Administrateur** sur chaque projet où elle travaille, puis choisissez
   **Enregistrer les accès**. Ouvrir un projet cloud demande l’un des deux.

Chacun garde aussi son propre espace de travail. Dès qu’une personne fait
partie de plusieurs, le nom de l’espace ouvert s’affiche sous son nom ; le
choisir permet d’en changer.

## Comment il fonctionne

- Chaque projet tourne sur sa propre machine dans Google Cloud, avec le même
  moteur Kitewell que l’app de bureau.
- Les étapes web tournent dans un vrai Chrome sur cette machine. Suivez-le dans
  la page, et choisissez **Prendre la main** pour vous connecter vous-même à un
  site.
- La machine se met en veille quand rien n’est prévu, et se réveille à temps
  pour la prochaine exécution planifiée, sans page ouverte.
- Les fichiers et les connexions du projet sont chiffrés dans son propre
  stockage, dans la région Iowa de Google Cloud (`us-central1`), aux
  États-Unis. La [politique de confidentialité](/privacy/) précise ce qui est
  conservé et où.
- Le modèle inclus de Kitewell ne tourne que chez des hébergeurs à conservation
  zéro des données, dont le siège est aux États-Unis ou dans l’UE. Ce que vous
  envoyez n’est ni conservé ni utilisé pour l’entraînement
  ([Utiliser le modèle inclus de Kitewell](/fr/docs/ai/#use-kitewells-included-model)).

## Ce qui tourne dans le cloud, et ce qui demande votre ordinateur

Dans Kitewell Cloud :

- les [sites web](/fr/docs/browser/), connexions comprises ;
- les [e-mails](/fr/docs/email/) ;
- les [fichiers Excel](/fr/docs/spreadsheets/) sans macros ;
- les API et les requêtes web ;
- les étapes de modèle d’IA, et l’assistant ;
- les validations, et les [planifications](/fr/docs/scheduling/) même
  ordinateur fermé.

Avec [Kitewell sur votre ordinateur](/fr/docs/install/) :

- les [apps de bureau](/fr/docs/desktop/) ;
- les macros Excel et l’actualisation des requêtes ;
- l’impression ;
- les fichiers sur votre propre disque ;
- les sites accessibles seulement depuis le réseau de votre bureau ;
- les certificats client conservés sur votre ordinateur ;
- les agents de code comme Claude Code et Codex, connectés avec votre propre
  abonnement.

## Projets cloud et projets de bureau

Un projet créé dans le navigateur ne s’ouvre que dans le navigateur, et un
projet de votre ordinateur que dans l’app de bureau. Chacun tourne là où il a
été créé.
