---
title: Référence des planifications
---

Tout ce que la page
[Planifications et fonctionnement en arrière-plan](/fr/docs/scheduling/)
laisse de côté sur les planifications.

## Ce que signifie le verdict

Chaque workflow planifié porte l’un de cinq verdicts, sous son prochain
démarrage dans la liste **Workflows** et sous la prévision dans l’éditeur de
planification.

- **S'exécutera**, ou **S'exécutera, connecté ou non** une fois le service
  Windows activé : rien ne s’y oppose. Une note qui suit, par exemple quand
  l’appareil fonctionne sur batterie, indique ce qu’il faut savoir.
- **Ne s'exécute que lorsque vous êtes connecté** : l’exécution a lieu, mais
  seulement si quelqu’un a ouvert une session avec Kitewell ouvert. Sous
  Windows, c’est le cas tant que le service est désactivé, et, même lorsqu’il
  est activé, pour un workflow qui comporte une étape de bureau ou une fenêtre
  de navigateur visible.
- **Ne s'exécutera pas** : quelque chose l’en empêche. La raison et sa
  solution suivent.
- **En pause** : la planification du workflow est en pause.
- **Exécutions manuelles uniquement** : le workflow n’a pas de planification.

Les raisons qu’un verdict peut nommer, de la plus grave à la moins grave :

- le service de connexion ne peut pas démarrer le moteur : mot de passe refusé
  ou absent, compte verrouillé, désactivé ou expiré, ou droit « Ouvrir une
  session en tant que tâche » refusé ;
- le projet est en pause, ou son moteur ou son planificateur ne tourne pas ;
- le workflow est bloqué, ou sa planification est illisible ;
- un mot de passe est sur le point d’expirer ;
- le mode de gestion de l’alimentation refuse les minuteries de sortie de
  veille ;
- l’appareil fonctionne sur batterie ;
- une connexion dans le navigateur demande votre mot de passe ;
- le fuseau horaire de la planification diffère de celui de l’appareil.

Chaque raison a une solution, proposée sous forme de bouton là où la raison
s’affiche : activer le service, mettre à jour ou ajouter le mot de passe,
copier le texte destiné au service informatique, reprendre le projet,
démarrer ou redémarrer le moteur, modifier le workflow ou sa planification, ou
ouvrir les réglages de l’appareil.

Les verdicts sont recalculés dans la minute qui suit tout changement, et
immédiatement après l’enregistrement d’un workflow ou le démarrage ou l’arrêt
d’un moteur.

## La première planification

La première fois qu’un workflow d’un appareil reçoit une planification
active, une carte au-dessus de la liste **Workflows** le signale, une seule
fois, avec le verdict et **Tester la planification maintenant**. **Compris** la
ferme.

## Tester la planification maintenant

Exécute le workflow une fois, par la même file d’attente et selon les mêmes
règles qu’une exécution planifiée, puis ouvre l’exécution. L’exécution est
listée comme **Test de planification**. Elle ne remplace jamais une heure
planifiée qui a été manquée.

## Le service de connexion Windows

Avec **Exécuter quand personne n’est connecté** activé, un service Windows
nommé Kitewell sign-in démarre le moteur au démarrage du PC, sous le compte
d’exécution, et le maintient en marche. Il nécessite Kitewell Team, ou
l’essai ; avec Kitewell Personal, les planifications ne s’exécutent que
lorsque vous êtes connecté.

Le compte d’exécution est soit vous-même, connecté sans mot de passe, comme
le Planificateur de tâches de Windows exécute une tâche qui n’en conserve
pas ; soit, sous Windows Server, un compte local que Kitewell crée,
`Kitewell Runner` ; soit un autre compte que vous désignez, avec son mot de
passe.

Ce que cela vous apporte :

- Les planifications s’exécutent après un redémarrage, avant que quiconque
  n’ouvre de session.
- Le PC est maintenu hors veille de cinq minutes avant une exécution planifiée
  jusqu’à deux minutes après, et une minuterie de sortie de veille est réglée
  une minute avant l’exécution suivante, quand le mode de gestion de
  l’alimentation autorise les minuteries de sortie de veille.
- Quand vous ouvrez une session, le moteur passe dans votre session, pour que
  les étapes de bureau atteignent votre écran ; quand vous la fermez, il en
  ressort.

Ce que cela ne fait pas :

- Donner un écran à une étape de bureau ou à une fenêtre de navigateur
  visible tant que personne n’a ouvert de session. Ces workflows affichent
  **Ne s'exécute que lorsque vous êtes connecté**.
- Atteindre les partages réseau, ou les connexions que Windows protège avec
  votre mot de passe, tant que vous n’avez pas ajouté ce mot de passe avec
  **Utiliser mon mot de passe…**. Le verdict nomme les workflows qui en ont
  besoin.
- Changer l’emplacement de vos fichiers : les exécutions se font toujours en
  votre nom, avec vos dossiers et vos réglages.

Setup.exe installe Kitewell pour votre compte sans demande d’autorisation
administrateur : il ne configure donc pas le service. Activez-le depuis
**Réglages de l’appareil → Exécuter quand personne n’est connecté** une fois
l’app ouverte. Une demande refusée ou une configuration interrompue est
consignée ; la carte de l’appareil le signale et propose de nouveau la
fonction.

Après une mise à jour, une version signée de Kitewell met elle-même à niveau
la copie des programmes du service, sans aucune demande.

Les programmes du service se trouvent dans `C:\Program Files\Kitewell` et ses
données dans `C:\ProgramData\Kitewell`, où elles ont été déplacées une fois
depuis votre propre dossier de données. Désactiver la fonction supprime le
service et laisse les données où elles sont.

Chaque démarrage, arrêt, connexion refusée et configuration figure dans
l’Observateur d’événements, sous la source **Kitewell sign-in**. Un mot de
passe que vous ajoutez est conservé par Windows dans le même magasin protégé
que celui des mots de passe des services, jamais dans un fichier Kitewell.

## Exécutions manquées

Une heure planifiée passée sans exécution est consignée avec l’une de quatre
raisons :

| Raison affichée | Ce qui s’est passé |
| --- | --- |
| l'appareil était en veille | L’ordinateur était en veille à cette heure-là |
| Kitewell ne tournait pas | Kitewell, ou sous Windows le service, ne tournait pas |
| le moteur du projet ne tournait pas | Le projet était en pause ou son moteur était arrêté |
| aucune exécution n'a démarré | Tout fonctionnait, mais le moteur ne l’a pas démarrée |

Les trois premières relèvent de l’appareil, la dernière du workflow. Dans
**Exécutions et logs**, une ligne **Manquée** se trouve à l’heure planifiée
parmi les exécutions, avec la raison, et l’onglet **Manquée** les liste
seules.

La ligne indique
**Le rattrapage est activé ; le moteur l'exécute dès qu'il le peut.**,
**Le rattrapage est désactivé, donc elle ne s'exécutera pas plus tard.** ou
encore, par exemple, **Rattrapée par une exécution à 9:05.**, qui ouvre cette
exécution. Les lignes manquées ne peuvent être ni relancées ni supprimées ;
elles disparaissent avec l’historique d’exécution.

Sous Windows, la ligne affichée à l’ouverture de session après une nuit
d’absence les compte : « 12 runs, 1 failed; 2 scheduled runs didn't start ».

## Rattrapage

Le rattrapage exécute les démarrages manqués une fois l’ordinateur de retour.
Modifiez-le pour un workflow sous
**Planification → Planifications manquées** :

- **Rattraper les planifications manquées** :
  **Suivre la valeur par défaut du projet**, **Désactivé** ou
  **Rétrospective personnalisée**.
- **Fenêtre de rétrospective** : jusqu’où remonter, 30 jours au plus. La
  valeur par défaut est de 24 heures.
- **Politique pour les planifications manquées** :
  **Exécuter chaque occurrence manquée**,
  **N’exécuter que la dernière occurrence manquée** ou
  **Ignorer pendant qu’une exécution est active**.

**Réglages du projet → Valeurs par défaut du workflow** règle la même chose
pour un projet, et **Réglages de l’appareil → Valeurs par défaut du workflow**
définit les valeurs de départ des nouveaux projets uniquement. Au plus
1 000 démarrages manqués sont conservés par workflow.

Avec Kitewell Personal ou Team, une
[alerte de planification manquée](/fr/docs/alerts/) indique combien
d’exécutions planifiées n’ont pas démarré, et pourquoi.

## Plus de planifications, pauses et webhooks

Un workflow peut avoir plusieurs planifications, et peut recevoir l’ordre de
s’arrêter ou de redémarrer à une heure donnée : c’est le rôle de
**Planifications supplémentaires**. **Mettre la planification en pause**, dans
la liste **Workflows**, retire un workflow du roulement ; un projet téléchargé
depuis un espace de travail arrive avec ses workflows en pause.

Un workflow peut aussi démarrer quand un autre service lui envoie une requête.
Activez son **Webhook** dans la vue **Planification**.
[Démarrer un workflow depuis un webhook](/fr/docs/webhooks/) indique ce que
contient une requête.

Une adresse de webhook ressemble à `https://hooks.kitewell.app/…` ; une
requête doit être un POST, et la réponse est `202`. Une étape lit le corps
dans `$WEBHOOK_PAYLOAD` et les en-têtes dans `$WEBHOOK_HEADERS`.

Un webhook accepte environ 60 requêtes par minute, un corps de 512 Kio au plus
et des en-têtes de 16 Kio au plus ; les 20 dernières requêtes sont conservées
sous **Requêtes récentes**. Sous Windows, un corps de plus de 32 000 caractères
environ peut ne pas démarrer d’exécution, en raison d’une limite sur la
longueur d’une ligne de commande.

## Files d’attente

Les files d’attente évitent que tout démarre en même temps. Chaque projet a
une file d’attente **default** qui traite 5 exécutions à la fois ; modifiez-la,
ou ajoutez les vôtres, sous **Plus → Files d’attente** avec
**Exécutions simultanées**. Un workflow choisit sa file d’attente dans ses
**Réglages**.

Une file d’attente régule les démarrages manuels, les exécutions de
rattrapage, les nouvelles tentatives, les exécutions par webhook, les tests de
planification et les lignes de [lot](/fr/docs/batches/) ; une exécution que sa
planification démarre à l’heure n’est pas retenue. Une file d’attente qu’un
projet ne définit pas admet une exécution à la fois.

## Avant de le laisser tourner seul

- Une commande s’exécute avec les autorisations du compte d’exécution.
- Une étape Docker a besoin que Docker soit en marche.
- Une étape d’IA a besoin que son modèle ou son agent soit configuré sur cet
  appareil.
- Une étape sur une autre machine a besoin que cette machine soit joignable et
  que sa clé d’hôte soit acceptée.
- Une [étape de site web](/fr/docs/browser/) a besoin de Chrome et d’un
  **Vérifier le navigateur** réussi.
- Une exécution qui a besoin d’un secret sans valeur sur cet appareil échoue
  au démarrage.

## Éléments de menu

Les éléments de la barre des menus et de la zone de notification sont dans la langue dans laquelle vous lisez Kitewell : **Ouvrir Kitewell**, **Quitter Kitewell**, **Rester éveillé pendant l’exécution des workflows**, et **Ouvrir à l’ouverture de session** sur Mac ou **Démarrer à la connexion** sous Windows. Un Mac a aussi **Continuer dans la barre des menus**, et Windows avec le service activé ajoute **Mettre à jour le service d’arrière-plan…**.

Les deux menus listent les projets, ce qui vous permet de démarrer et
d’arrêter chacun séparément. Sur Mac, **Quitter Kitewell** arrête tout, et vous
avertit d’abord si des exécutions sont en cours. Sous Windows, avec le service
activé, cet élément ferme la fenêtre et laisse le moteur et ses exécutions au
service.

## Détails

- L’historique d’exécution est conservé 30 jours au départ, sous
  **Réglages de l’appareil → Conservation de l’historique d’exécution**. Voir
  [Exécutions et logs](/fr/docs/runs/).
- La protection contre la veille sur Mac,
  **Réglages de l’appareil → Protection contre la veille**, garde l’ordinateur
  hors veille pendant que du travail est en cours. Elle est désactivée au
  départ, et ne réveille pas l’ordinateur pour une planification qui n’a pas
  commencé.
- Le service Windows est `kitewell-signin.exe`, enregistré sous le nom
  `KitewellSignin` ; `sc query KitewellSignin` affiche son état. Son journal
  d’installation est `%LOCALAPPDATA%\Kitewell\logs\signin-setup.log`.
