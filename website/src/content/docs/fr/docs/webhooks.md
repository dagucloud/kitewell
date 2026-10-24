---
title: Démarrer un workflow depuis un webhook
---

Un workflow peut démarrer quand un autre service lui envoie une requête : GitHub quand une issue est ouverte, Stripe quand un paiement aboutit, un formulaire quand quelqu’un l’envoie, ou Zapier et Make pour les apps qu’ils relient. Votre ordinateur n’a pas d’adresse publique : la requête arrive donc au relais de Kitewell, qui la transmet à Kitewell sur votre ordinateur. Aucun port à ouvrir, aucun tunnel à mettre en place.

Les webhooks font partie de Kitewell Personal et Team, et nécessitent que Kitewell soit [connecté](/fr/docs/cloud-sync/#sign-in) à Dagu Cloud.

## Activer un webhook

1. Ouvrez un workflow enregistré et choisissez **Planification**, ou la carte **Quand cela s’exécute**.
2. Sous **Webhook**, choisissez **Activer**. L’URL apparaît au bout d’un instant : `https://hooks.kitewell.app/…`.
3. Choisissez **Copier** et collez l’URL dans le service qui envoie les requêtes.
4. Choisissez **Envoyer une requête de test** pour essayer tout le trajet : Kitewell envoie une requête à sa propre URL, et elle revient par le relais comme n’importe quelle autre. Elle lance une exécution, comme le ferait une vraie requête, et s’ouvre sous **Requêtes récentes** pour montrer ce qui est arrivé.

La carte **Quand cela s’exécute** affiche ensuite **Webhook activé**. Seules les personnes qui peuvent modifier le workflow voient son URL. Les clés API et les apps connectées ne peuvent pas la lire.

## Laisser l’assistant exploiter la requête

Inutile de savoir comment une requête est structurée pour vous en servir :

1. Faites envoyer une requête par le vrai service, par exemple en ouvrant une issue de test sur GitHub.
2. Sous **Requêtes récentes**, choisissez **Détails** à côté de cette requête pour voir ce qu’elle contenait.
3. Choisissez **Créer des étapes à partir de cette requête**. L’assistant s’ouvre sur cette requête. Complétez la phrase avec ce dont vous avez besoin, par exemple « le titre de l’issue et la personne qui l’a ouverte, puis publie-les sur Slack », et envoyez-la.

L’assistant lit lui-même la requête, propose les étapes, et n’enregistre rien tant que vous ne les avez pas appliquées.

## Lire la requête dans une étape

Chaque requête lance une exécution, et l’historique des exécutions affiche son déclencheur comme **Webhook**. Les étapes lisent la requête dans deux variables d’environnement :

- `WEBHOOK_PAYLOAD` contient le corps tel qu’il a été envoyé.
- `WEBHOOK_HEADERS` contient les en-têtes en JSON : des noms en minuscules, chacun avec une liste de valeurs, par exemple `{"x-github-event":["issues"]}`. `Authorization` et les cookies en sont exclus.

Vous n’avez à déclarer ni l’une ni l’autre comme entrée. Pour extraire un champ d’un corps JSON, comme le titre de l’issue, demandez-le à l’assistant avec **Créer des étapes à partir de cette requête** : il ajoute une étape qui extrait le champ, et les étapes suivantes le lisent par son nom, par exemple `${steps.issue.outputs.title}`. Une étape d’IA peut recevoir tout le corps dans sa consigne, sous forme de texte.

Le corps contient ce que l’expéditeur a bien voulu envoyer : considérez-le comme non fiable. Une commande le lit depuis son environnement, avec `"$WEBHOOK_PAYLOAD"` dans un shell macOS ou `$env:WEBHOOK_PAYLOAD` dans PowerShell sous Windows. N’écrivez jamais `${env.WEBHOOK_PAYLOAD}`, ni une valeur qui en est tirée, dans le texte de la commande : ses guillemets y deviendraient du code. L’[assistant](/fr/docs/ai/#the-assistant) connaît ces variables : demandez-lui de construire le workflow à partir de la requête que vous attendez.

## Configurer l’expéditeur

### GitHub

1. Dans le dépôt, ou dans l’organisation, ouvrez **Settings → Webhooks** et choisissez **Add webhook**.
2. Collez l’URL dans **Payload URL**.
3. Réglez **Content type** sur `application/json`. Par défaut, GitHub envoie le corps sous forme de données de formulaire (`payload=…`), qui ne sont pas du JSON.
4. Sous **Which events would you like to trigger this webhook?**, choisissez **Let me select individual events** et ne cochez que les événements dont le workflow a besoin. Chaque événement envoyé par GitHub lance une exécution, sauf si [Seulement ces événements](#take-only-some-events) l’écarte.
5. Pour que Kitewell vérifie la signature de GitHub, collez dans **Secret** le secret que crée Kitewell. Voir [Vérifier qui a envoyé la requête](#check-who-sent-the-request).

L’onglet **Recent Deliveries** de GitHub montre chaque requête avec la réponse de Kitewell : `202` quand le relais l’a acceptée.

### Autres services

Tout service capable d’envoyer un `POST` HTTP fonctionne. Dans Stripe, ajoutez une destination d’événements avec l’URL et choisissez les événements. Dans une app Slack, collez l’URL sous Event Subscriptions. Dans Zapier ou Make, ajoutez une action webhook qui envoie vers l’URL. Un service de formulaires propose généralement un réglage webhook ou « notifier une URL ».

<a id="check-who-sent-the-request"></a>

## Vérifier qui a envoyé la requête

Toute personne qui a l’URL peut y envoyer une requête. Pour ne lancer des exécutions que pour les requêtes signées par le véritable expéditeur, choisissez cet expéditeur sous **Accepter les requêtes de** : GitHub, Stripe, Slack ou Standard Webhooks. **Toute personne ayant l’URL** désactive de nouveau la vérification.

- GitHub : choisissez **Créer un secret**. Kitewell n’affiche le secret qu’une fois ; collez-le dans le champ **Secret** du webhook GitHub. **Nouveau secret** le remplace, et les requêtes de GitHub sont refusées tant que vous n’y avez pas collé le nouveau.
- Stripe : collez le secret de signature de la destination d’événements, qui commence par `whsec_`, dans **Secret de signature**, et choisissez **Enregistrer**.
- Slack : collez le Signing Secret indiqué dans la section Basic Information de votre app Slack dans **Secret de signature**, et choisissez **Enregistrer**. Le relais de Kitewell répond à la vérification d’URL de Slack même quand cet ordinateur est absent.
- Standard Webhooks : collez le secret de signature affiché par l’expéditeur, qui commence par `whsec_`, dans **Secret de signature**, et choisissez **Enregistrer**.

Une requête sans signature valide ne lance aucune exécution et affiche **Rejeté**, avec la raison. Une signature Stripe, Slack ou Standard Webhooks doit avoir été créée à cinq minutes près du moment où le relais a reçu la requête : une requête qui a attendu au relais passe donc tout de même la vérification. **Envoyer une requête de test** envoie elle aussi une requête signée.

<a id="take-only-some-events"></a>

## N’accepter que certains événements

**Seulement ces événements** indique les événements dont les requêtes lancent des exécutions, séparés par des virgules, par exemple `issues.opened, invoice.paid`. Un nom englobe aussi les événements placés sous lui : `issues` accepte `issues.opened` et tous les autres événements `issues`. **Reçus récemment :** propose les événements des requêtes récentes, à ajouter d’un clic chacun. Choisissez **Enregistrer** ; si le champ reste vide, chaque événement lance une exécution.

Kitewell nomme un événement comme le fait son expéditeur : l’événement et l’action de GitHub reliés par un point, le `type` du corps pour Stripe et les expéditeurs Standard Webhooks, et pour Slack, le type de l’événement que transporte son callback.

Une requête qui concerne tout autre événement, ou qui ne nomme aucun événement, ne lance aucune exécution et affiche **Ignoré**. C’est aussi le cas du ping de GitHub, qui ne fait que vérifier l’URL.

## Quand votre ordinateur est en veille ou hors ligne

Le relais répond immédiatement à l’expéditeur, que votre ordinateur soit joignable ou non. Les requêtes attendent au relais jusqu’à 7 jours, et s’exécutent, les plus anciennes d’abord, quand Kitewell se reconnecte. Jusqu’à 1 000 requêtes peuvent attendre pour un même ordinateur ; au-delà, les expéditeurs sont invités à réessayer plus tard.

## Requêtes récentes

La section Webhook liste les 20 dernières requêtes : l’heure d’arrivée de chacune, son objet tel que le nomme l’expéditeur (par exemple `issues.opened` pour GitHub ou `payment_intent.succeeded` pour Stripe), sa taille et son résultat. La liste se met à jour tant qu’elle est ouverte.

**Détails** ouvre une requête : son corps, mis en forme pour être facile à lire, et ses en-têtes, chacun avec **Copier**, ainsi que **Créer des étapes à partir de cette requête** et **Voir l’exécution →**. Pour une requête qui n’a lancé aucune exécution, c’est la raison qui s’affiche, car son corps n’est conservé qu’avec une exécution.

| Résultat | Signification |
| --- | --- |
| **Exécution lancée** | La requête a lancé une exécution. Une requête que le relais a envoyée deux fois ne lance qu’une exécution. |
| **Échec** | L’exécution n’a pas pu être mise en file d’attente, par exemple parce que le moteur du projet est arrêté. Si le moteur est occupé ou en cours de rétablissement, Kitewell réessaie d’abord pendant 10 minutes. |
| **Ignorée** | L’offre payante a pris fin, ou le workflow ne fait pas partie de votre offre. |
| **Rejeté** | La requête n’avait pas de signature valide de l’expéditeur choisi sous **Accepter les requêtes de**. |
| **Ignoré** | La requête concerne un événement que le webhook n’accepte pas, ou il s’agit du ping de GitHub. |

## Garder l’URL confidentielle

Si le webhook ne [vérifie pas qui a envoyé la requête](#check-who-sent-the-request), toute personne qui a l’URL peut lancer le workflow. Traitez-la comme un mot de passe.

- **Nouvelle URL** la remplace immédiatement ; l’ancienne URL répond `404`. Collez la nouvelle partout où se trouvait l’ancienne.
- **Désactiver** arrête l’URL de la même façon. Réactiver le webhook crée une nouvelle URL.

Une URL de webhook appartient à un seul ordinateur. Activer le webhook du même workflow sur l’ordinateur d’un collègue donne à cet ordinateur sa propre URL. Une sauvegarde restaurée démarre avec les webhooks désactivés.

## Limites

| Limite | Valeur |
| --- | --- |
| Corps de la requête | 512 Kio de texte |
| Requêtes par URL | 60 par minute |
| Requêtes en attente d’un ordinateur | 1 000, pendant 7 jours au maximum |

Les réponses du relais :

| Statut | Signification |
| --- | --- |
| `202` | Acceptée. Le corps est `{"id": "…"}`. |
| `404` | Ce n’est pas une URL de webhook, ou elle a été désactivée ou remplacée. |
| `413` | Le corps dépasse 512 Kio. |
| `415` | Le corps n’est pas du texte UTF-8. |
| `429` | Plus de 60 requêtes cette minute-ci ; réessayez après le nombre de secondes indiqué par `Retry-After`. |
| `503` | 1 000 requêtes attendent déjà cet ordinateur. |

Sous Windows, un corps de plus de 30 000 caractères environ peut empêcher le lancement d’une exécution, et la requête affiche alors **Échec**. Les événements push et pull request de GitHub peuvent atteindre cette taille. Une correction est en préparation.

Si l’offre payante prend fin, ou si le workflow ne fait plus partie de votre offre, l’URL accepte toujours les requêtes, mais elles ne lancent rien et affichent **Ignorée**. Se réabonner ne demande pas de nouvelle URL.

## Où va la requête

La requête passe par le relais de Kitewell, hooks.kitewell.app, hébergé chez Cloudflare. Le relais ne la conserve que jusqu’à ce que votre ordinateur la récupère, 7 jours au maximum, et ne stocke qu’un hachage de la partie secrète de chaque URL. Sur votre ordinateur, le corps est conservé avec son exécution, comme toute entrée d’exécution, pendant la durée de conservation que vous avez fixée. Voir [Ce qui quitte votre ordinateur](/fr/docs/data-flow/).

## Dépannage

- **« Obtention de l’URL auprès du relais de Kitewell… » ne disparaît pas.** Vérifiez que Kitewell est connecté à Dagu Cloud et que l’ordinateur est en ligne, puis désactivez et réactivez le webhook.
- **Une nouvelle URL répond `404`.** Attendez quelques secondes que Kitewell transmette la nouvelle URL au relais.
- **Une étape n’arrive pas à analyser le corps envoyé par GitHub.** Réglez **Content type** sur `application/json` dans le webhook GitHub.
- **Une requête affiche Échec.** La ligne en donne la raison. Si le projet est arrêté, démarrez-le depuis le menu de la barre des menus ou de la zone de notification, puis renvoyez la requête.
