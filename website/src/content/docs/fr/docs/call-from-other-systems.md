---
title: Appeler Kitewell depuis un autre système
---

Une plateforme de workflows comme Camunda, intra-mart ou n8n, un ordonnanceur de tâches ou un outil EAI peut confier à Kitewell une tâche de son propre flux. Il lance un workflow Kitewell, lui passe des valeurs et en récupère le résultat. Kitewell se charge de la partie sans API, comme un site web ou une application de bureau.

Il y a deux façons de procéder. Choisissez selon la manière dont l’autre système veut récupérer le résultat.

| | Webhook | API REST |
| --- | --- | --- |
| Lance une exécution par | Un `POST` vers l’URL du webhook du workflow | `POST /api/jobs/{id}/run` |
| Les valeurs passent par | Le corps de la requête | `params` dans le corps de la requête |
| Le résultat revient | Par la dernière étape du workflow | En lisant l’exécution |
| Atteint votre ordinateur | Par le relais de Kitewell, sans rien configurer | À une adresse que vous mettez en place |
| Pendant que l’ordinateur est en veille | Les requêtes attendent au relais jusqu’à 7 jours | Aucun appel ne l’atteint |

## Ce qu’il vous faut

- Un workflow enregistré qui fait la tâche.
- Kitewell ouvert sur l’ordinateur qui le contient. Les exécutions ne démarrent que lorsque cet ordinateur n’est pas en veille.
- Pour un webhook, Kitewell [connecté](/fr/docs/cloud-sync/#sign-in) à Dagu Cloud.
- Pour REST, une clé API avec l’autorisation **Exécuter les workflows**, créée comme dans [Connecter un assistant sur cet ordinateur](/fr/docs/mcp/#connecter-un-assistant-sur-cet-ordinateur).

## Démarrer avec un webhook

Un webhook convient à un système qui envoie un `POST` HTTP et poursuit son chemin. Aucun port n’est ouvert sur votre réseau.

1. Activez le webhook du workflow et copiez son URL, comme dans [Activer un webhook](/fr/docs/webhooks/#activer-un-webhook).
2. Dans l’autre système, ajoutez une étape qui envoie un `POST` à cette URL, avec dans le corps les valeurs dont la tâche a besoin, par exemple en JSON.
3. Faites-lui envoyer une requête. Dans Kitewell, sous **Requêtes récentes**, choisissez **Détails** à côté de celle-ci, puis **Créer des étapes à partir de cette requête**. L’assistant ajoute les étapes qui extraient les valeurs du corps.

Les étapes lisent le corps dans `WEBHOOK_PAYLOAD`. Il contient ce que l’expéditeur a envoyé : considérez-le comme non fiable. Voir [Lire la requête dans une étape](/fr/docs/webhooks/#lire-la-requête-dans-une-étape).

Le relais répond `202` aussitôt, avec un corps tel que `{"id": "…"}`. Cela indique que la requête est arrivée, pas comment l’exécution s’est déroulée.

Toute personne ayant l’URL peut lancer le workflow, sauf si le webhook [vérifie qui a envoyé la requête](/fr/docs/webhooks/#check-who-sent-the-request) : gardez-la aussi confidentielle qu’un mot de passe. Une URL accepte jusqu’à 60 requêtes par minute ; voir [Limites](/fr/docs/webhooks/#limites).

## Démarrer avec l’API REST

REST convient à un système qui lance une exécution puis la suit jusqu’au bout. Chaque requête porte `Authorization: Bearer <votre clé>`.

1. Trouvez l’ID du workflow avec `GET /api/jobs`.
2. Lancez une exécution avec `POST /api/jobs/{id}/run`. Placez les valeurs sous `params`, avec les noms des [entrées](/fr/docs/workflow-builder/#ce-qui-peut-changer-à-chaque-fois) du workflow.
3. Si la clé donne accès à plusieurs projets, nommez le projet avec `?projectId=<id>` ; voir [Choisir le projet](/fr/docs/mcp/#choisir-le-projet).

```http
POST /api/jobs/{id}/run HTTP/1.1
Host: your-host
Authorization: Bearer <Kitewell API key>
Content-Type: application/json

{"params":{"region":"west"}}
```

Kitewell écoute sur `127.0.0.1:19742`, pour cet ordinateur seulement. Un système sur un autre serveur a besoin d’une adresse HTTPS que vous mettez en place et exploitez, via votre propre proxy ou avec un certificat dans Kitewell. Voir [Le client d’un autre ordinateur](/fr/docs/mcp/#le-client-dun-autre-ordinateur).

## Récupérer le résultat

Avec REST, lisez l’exécution. `GET /api/runs` liste les exécutions, et `GET /api/runs/{jobId}/{id}` en lit une ; relisez-la jusqu’à ce qu’elle soit terminée. `GET /api/runs/{jobId}/{id}/logs` renvoie ce que les étapes ont écrit. Donnez `stepId` et `stream=stdout` pour ne lire que l’étape qui affiche le résultat.

Avec un webhook, le workflow envoie lui-même le résultat. Terminez-le par une étape **Appeler un service web** ou une action d’[API importée](/fr/docs/apis/) qui appelle l’autre système. Demandez à ce système de mettre sa propre référence, comme son ID de processus, dans le corps, et renvoyez cette référence avec le résultat.

## Quand une étape attend une personne

Un workflow peut s’arrêter pour une personne : une approbation après une étape, ou une étape **Demander à une personne** avant elle. Voir [S’arrêter pour demander à une personne](/fr/docs/workflow-builder/#stop-and-ask-a-person). L’exécution attend là, et la tâche de l’autre système attend avec elle.

Chaque côté peut traiter l’étape :

- Une personne, dans Kitewell, sous **Exécutions et logs → En attente**. Une [alerte](/fr/docs/alerts/) peut lui signaler qu’une exécution attend une réponse.
- L’autre système, par REST avec **Exécuter les workflows** : `POST /api/runs/{jobId}/{id}/approvals/{stepId}/approve`, `/reject` ou `/push-back` pour une approbation, et `POST /api/runs/{jobId}/{id}/human-tasks/{stepId}/complete` pour la tâche d’une personne.

Une plateforme qui a sa propre liste de tâches peut y montrer l’approbation à ses utilisateurs, puis transmettre leur réponse à Kitewell.
