---
title: Référence des flux de données
---

Chaque destination que Kitewell peut atteindre, ce qu’elle reçoit, et comment l’arrêter : la version détaillée de [Ce qui quitte votre ordinateur](/fr/docs/data-flow/).

## Où vont les données

Chaque entrée indique ce qui est envoyé, qui le reçoit, et comment l’arrêter.

- **Une étape de modèle, l’assistant, le diagnostic d’un échec, ou une colonne de feuille que lit un modèle. ** Envoie la consigne et ce qu’elle lit — sortie d’exécution, journaux, texte des pages, captures d’écran, lignes de feuille, connaissances — au fournisseur du modèle, choisi sous [Agents et modèles](/fr/docs/ai/). Pour l’arrêter, choisissez un modèle hébergé sur un serveur que vous faites tourner. - **Le modèle inclus de Kitewell. ** Envoie les mêmes éléments. À Dagu Cloud, qui les transmet à OpenRouter et ne conserve aucun texte de consigne, seulement l’espace de travail, l’appareil, le modèle et les crédits utilisés. Uniquement sur un ordinateur connecté à Dagu Cloud. Pour l’arrêter, choisissez votre propre modèle. - **Une colonne de feuille jugée par oui ou non, par choix ou sur une échelle. ** Envoie les mêmes éléments, plus la question de chaque colonne et le sens de chaque option. Au fournisseur du modèle de décision : OpenRouter, TypeSafe ou une adresse que vous définissez. Pour l’arrêter, choisissez plutôt une colonne qui recopie une valeur publiée ; elle n’a besoin d’aucun modèle. - **Une tâche Demander à un agent IA. ** Envoie la consigne et tout ce que l’agent lit dans son dossier de travail, selon les conditions propres à cet outil. Au service auquel cet outil en ligne de commande se connecte. Pour l’arrêter, utilisez une autre tâche. - **[L’importation d’une API](/fr/docs/apis/) par son adresse, ou une demande à l’assistant de consulter une page web. ** Envoie une simple requête pour le document ou la page, sans identifiants. À l’adresse que vous avez donnée. Pour l’arrêter, téléversez plutôt le fichier OpenAPI. - **Une étape de site web, de commande, de fichier, d’API, Docker ou distante. ** Envoie ce que l’étape envoie. Aux sites, serveurs, API, registres d’images et ordinateurs que nomment vos étapes. Pour l’arrêter, retirez l’étape. - **Une étape d’e-mail.** Envoie le message, et la recherche que vous avez demandée. Au serveur de messagerie de votre boîte mail, ou à l’API Gmail pour une boîte Google ; la connexion passe par Google ou Microsoft. Pour l’arrêter, déconnectez la boîte mail dans **Comptes de messagerie **. - **[Les alertes](/fr/docs/alerts/). ** Envoient ce qui s’est passé, l’urgence, le projet, le workflow et un lien de retour. À votre serveur de messagerie, à une adresse Slack ou Teams, à PagerDuty ou à un webhook à vous. Pour les arrêter, retirez le canal. - **La connexion à Dagu Cloud.** Envoie l’offre de l’espace de travail, la version de Kitewell, ainsi que l’ID et le nom de cet ordinateur, toutes les six heures. À Dagu Cloud, exploité par Descarty. Pour l’arrêter, utilisez **Se déconnecter** dans **Réglages de l’appareil **. - **La recherche web de l’assistant.** Envoie les mots de chaque recherche et la langue dans laquelle Kitewell s’affiche. À Dagu Cloud, qui les transmet à Serper et ne conserve aucun texte de requête, seulement l’espace de travail, l’appareil et les crédits utilisés. Pour l’arrêter, utilisez **Se déconnecter** dans **Réglages de l’appareil ** ; l’assistant demande alors les adresses. - **[La synchronisation d’un projet](/fr/docs/cloud-sync/).** Envoie les workflows de ce projet, ses modèles, serveurs, connexions d’API, files d’attente et registres, les noms et descriptions de ses secrets, ses feuilles, ses pages de connaissances, ses versions et — pour un workflow qui traite une boîte mail — l’appareil de la personne connectée qui l’exécute. À Dagu Cloud. Pour l’arrêter, utilisez **Arrêter la synchronisation ** sur ce projet. - **[Les exécutions d’un projet synchronisé](/fr/docs/cloud-sync/#follow-runs-in-dagu-cloud).** Envoie, pour chaque exécution, le workflow, l’état, le déclencheur, les heures et les noms des étapes en échec, avec la version de Kitewell et le système de cet ordinateur, toutes les deux minutes. À Dagu Cloud ; jamais les paramètres, journaux, sorties ni valeurs des feuilles. Pour l’arrêter, utilisez **Arrêter la synchronisation ** ; désactiver l’état des exécutions dans Dagu Cloud ne laisse partir que le fait que l’ordinateur exécute des workflows. - **[ChatGPT ou Claude connecté à Kitewell](/fr/docs/mcp/).** Envoie ce que l’app demande : workflows, exécutions et journaux, artefacts, feuilles, connaissances et — avec l’autorisation de modifier — des lignes d’un fichier Excel de cet ordinateur. À l’app, via le relais de Kitewell à `mcp.kitewell.app`. Pour l’arrêter, désactivez **Accès à distance**, ou utilisez **Révoquer ** sur l’app. - **Un évènement auquel une app ou une clé d’API s’est abonnée.** Envoie chaque évènement : le projet, le workflow, l’exécution, son issue, les heures, les noms des étapes en échec, la question d’une étape en attente, les décomptes d’un lancement de feuille, ou la raison d’une planification manquée. À l’adresse donnée par l’abonné. Pour l’arrêter, utilisez **Retirer ** sur l’abonnement. - **Le webhook d’un workflow.** Rien ne part. Les requêtes arrivent et attendent au relais de Kitewell à `hooks.kitewell.app`, avec leurs en-têtes et leur corps, pendant 7 jours au plus, jusqu’à ce que cet ordinateur les récupère. Pour l’arrêter, utilisez **Désactiver ** sur ce webhook. - **Les vérifications de mise à jour.** Envoient une requête qui ne dit rien de vous ni de votre travail. À GitHub pour le moteur de workflows, et à kitewell.app pour l’app Kitewell. Pour arrêter celles du moteur, désactivez **Mises à jour automatiques du moteur ** ; l’app n’est vérifiée que lorsque vous le demandez. - **Installer WebView2 sous Windows.** Envoie une demande de téléchargement à Microsoft. Le programme d’installation contient normalement ce composant, si bien que cela n’arrive que s’il manque.

Kitewell n’envoie rien d’autre. L’app n’a ni suivi d’utilisation, ni rapport de plantage, ni outil d’analyse. Descarty ne reçoit les données que traitent vos exécutions que dans les requêtes que vous envoyez via le modèle inclus de Kitewell ou la recherche web de l’assistant.

## Ce qui ne quitte jamais votre ordinateur

| Quoi | Où c’est conservé |
| --- | --- |
| Valeurs des secrets | Chiffrées dans le moteur de chaque projet, masquées dans les journaux, jamais relues, exportées, sauvegardées ni synchronisées. Un projet synchronisé transporte le nom et la description d’un secret ; chaque ordinateur détient sa propre valeur. Voir [Secrets](/fr/docs/secrets/) |
| Connexions | Connexions aux boîtes mail, connexions enregistrées aux sites web, clés SSH et hôtes approuvés, et mots de passe des registres d’images. Tous chiffrés ou conservés dans un fichier que seul votre utilisateur peut lire, et tous exclus des sauvegardes. Les clés qui les scellent sont elles-mêmes scellées par une clé d’appareil que détient le système d’exploitation |
| Journaux et artefacts des exécutions | Le dossier de données, pendant 30 jours par défaut, par projet. Voir [Exécutions et journaux](/fr/docs/runs/). Un projet synchronisé signale l’état de chaque exécution et les noms des étapes en échec, jamais ses paramètres, journaux, artefacts ni valeurs des feuilles |
| La conversation avec l’assistant et les diagnostics d’échec | Le dossier de données : une conversation pour cet ordinateur, exclue des sauvegardes, et des diagnostics par projet |
| Classeurs Excel | Lus et écrits sur place, sur l’ordinateur qui détient le fichier. Une feuille qui lui est liée transporte le nom du fichier et l’ordinateur qui l’a, jamais une cellule. Son chemin, la ligne où revient chaque résultat et les copies conservées pour l’annulation restent sur cet ordinateur. Voir [Automatiser Excel](/fr/docs/spreadsheets/) |
| Définitions des workflows et connaissances | Le dossier de données, jusqu’à ce que vous les exportiez, les partagiez ou les synchronisiez |

Deux choses à savoir à ce sujet. Un instantané que vous [téléchargez](/fr/docs/backups/) contient la sortie des exécutions et les copies Excel conservées pour l’annulation : traitez un instantané téléchargé comme le fichier sensible qu’il est.

Les cellules d’un classeur quittent bien l’ordinateur si vous demandez à un modèle ou à une app connectée de les lire ; [Connaître les limites](#know-the-boundaries) précise quand.

## Choisir où l’IA s’exécute

Chaque fonction d’IA utilise un modèle que vous avez ajouté sous [Agents et modèles](/fr/docs/ai/), ou le modèle inclus de Kitewell.

- Les fournisseurs sont Anthropic, OpenAI, Google Gemini, OpenRouter, Z.ai, OpenCode Zen, ou tout serveur compatible OpenAI que vous faites tourner, comme Ollama ou vLLM. Un modèle de décision utilise OpenRouter ou TypeSafe.
- Un serveur à vous garde les consignes, le texte des pages et les captures d’écran à l’intérieur de votre réseau. Les petits modèles locaux ne savent généralement pas piloter un navigateur ni un bureau : choisissez selon la tâche.
- Via OpenRouter, les lectures que fait Kitewell lui-même — l’assistant, le diagnostic des échecs et les colonnes de résultat d’une feuille — demandent à OpenRouter de n’acheminer les requêtes que vers des fournisseurs qui ne conservent pas ce qu’ils reçoivent et ne s’en servent pas pour l’entraînement. Une étape de modèle à l’intérieur d’un workflow est envoyée par le moteur, qui ne le demande pas.
- [Le modèle inclus de Kitewell](/fr/docs/ai/#use-kitewells-included-model) ne demande aucune clé sur un ordinateur connecté à Dagu Cloud, et se paie avec les crédits de l’espace de travail. Dagu Cloud demande à OpenRouter de n’acheminer chaque requête qu’il transmet que vers des fournisseurs qui ne la conservent pas et ne s’en servent pas pour l’entraînement. Une étape de bureau peut l’utiliser quelle que soit l’offre.

Une valeur que saisit une étape de site web ou de bureau, comme un mot de passe, s’écrit `%name%`. Seul le nom parvient au modèle.

<a id="know-the-boundaries"></a>

## Connaître les limites

- Les workflows s’exécutent avec les autorisations de la personne qui fait tourner Kitewell. Une étape de commande peut lire tout ce que vous pouvez lire, y compris le dossier de données. N’exécutez que des définitions et des commandes de confiance.
- La capture d’écran d’une étape de bureau inclut toutes les fenêtres de l’écran. Fermez ce qui ne doit pas être vu, ou utilisez un ordinateur sur lequel personne d’autre ne travaille.
- Les e-mails sont des entrées non fiables. Le texte d’un e-mail qui atteint une commande, ou un agent qui exécute des commandes, peut l’orienter. **Vérifier et exécuter** vous avertit lorsqu’un workflow fait cela.
- Une requête de webhook est elle aussi une entrée non fiable. Sauf si le webhook vérifie la signature de l’expéditeur, toute personne qui a l’URL peut démarrer ce workflow. Voir [Démarrer un workflow depuis un webhook](/fr/docs/webhooks/#check-who-sent-the-request).
- Demander à l’assistant ou à une app connectée de lire un fichier Excel transmet ses cellules : une liste de colonnes et dix lignes d’exemple quand vous construisez une feuille à partir d’un fichier, et les lignes elles-mêmes quand vous les demandez nommément.
- Les sauvegardes et les exportations de projet ne sont pas chiffrées. Elles excluent les valeurs des secrets et les connexions, mais contiennent les définitions, feuilles, connaissances, sorties d’exécution et réglages tels qu’ils ont été écrits. Chiffrez-les vous-même avant de les déplacer vers un stockage partagé.
- Les identifiants des canaux d’alerte, comme une adresse Slack, sont conservés dans le fichier d’identifiants de l’appareil, scellé par la clé d’appareil, et non dans le trousseau du système.
- L’accès à distance par MCP ou REST n’atteint Kitewell que sur l’adresse locale de cet ordinateur. Les exceptions sont ChatGPT et Claude via le relais de Kitewell, et un client devant lequel vous placez votre propre HTTPS. Voir [Accès MCP et API](/fr/docs/mcp/).

## Où se trouve le dossier de données

- macOS : `~/Library/Application Support/Kitewell/`
- Windows : `%LOCALAPPDATA%\Kitewell\`

[Sauvegardes et restauration](/fr/docs/backups/) indique ce que contient chaque partie, et [Désinstaller](/fr/docs/uninstall/) comment tout supprimer.

## Détails

### Fournisseurs de modèles

Une étape de modèle atteint `api.anthropic.com`, `api.openai.com`, `generativelanguage.googleapis.com`, `openrouter.ai`, `api.z.ai`, `opencode.ai`, ou l’adresse de base que vous définissez. Les modèles de décision atteignent `openrouter.ai/api/alpha` ou `api.typesafe.ai/v1`, uniquement en HTTPS. Choisir un fournisseur dans le formulaire du modèle récupère aussi la liste publique des modèles de ce fournisseur auprès d’OpenRouter ou d’OpenCode Zen ; la requête ne porte aucune clé ni rien qui vous concerne.

La lecture d’une feuille envoie au plus 48 Kio par ligne : le libellé et les entrées de la ligne, le résultat de chaque étape, les sorties publiées par l’exécution, jusqu’à cinq fichiers texte qu’elle a produits, et la fin des journaux de la dernière étape et des étapes en échec.

### Dagu Cloud

Les requêtes vont à `console.dagu.sh` en HTTPS, avec `User-Agent: Kitewell/<version>`. Un document synchronisé de plus de 256 Kio est téléversé vers le stockage de Dagu Cloud via une adresse signée qu’il renvoie. L’identifiant cloud de cet ordinateur est un fichier au premier niveau du dossier de données, à côté de ses réglages, et ne figure jamais dans une sauvegarde.

Une recherche web va à `console.dagu.sh`, qui la transmet à Serper à `google.serper.dev` et renvoie les titres, les adresses et les extraits.

Une requête au modèle inclus de Kitewell va à `console.dagu.sh` avec un jeton d’exécution valable une semaine et renouvelé chaque jour, jamais avec l’identifiant propre de l’ordinateur, et Dagu Cloud la transmet à `openrouter.ai`.

L’état des exécutions d’un projet synchronisé va à `console.dagu.sh` toutes les deux minutes, ou plus tôt lorsque les exécutions en cours changent. Un rapport qui n’arrive pas est renvoyé. [Dagu Console](/fr/docs/console/#what-dagu-console-keeps) conserve chaque exécution pendant 14 jours, les totaux quotidiens pendant 13 mois, et les alertes pendant 90 jours après leur résolution.

### Le relais

Le relais est un Cloudflare Worker avec un objet par appareil. L’ordinateur s’y connecte en sortie par WebSocket : rien sur votre réseau n’écoute les connexions entrantes.

Il conserve le nom de cet ordinateur, la version de Kitewell, le dernier moment où il a donné signe de vie et les dernières réponses aux appels qui listent les outils, et supprime le tout 30 jours après le dernier signe de vie de l’appareil. Les requêtes et réponses MCP le traversent sans être conservées.

Les corps et en-têtes des webhooks font exception. Ils sont conservés jusqu’à ce que l’appareil les récupère : 7 jours au plus, 1 000 requêtes en attente au plus, 512 Kio par corps, 16 Kio d’en-têtes, et 60 requêtes par minute vers une même URL.

Les jetons de webhook ne sont conservés que sous forme de hachages. Le relais n’écrit aucun journal à lui. Les webhooks font partie de Kitewell Personal et Team.

Les livraisons d’évènements ne passent pas par le relais. Elles vont directement de cet ordinateur à l’adresse de l’abonné : HTTPS uniquement, vers des adresses publiques, sans proxy, sans redirection, 256 Kio au plus, signées au format Standard Webhooks, avec de nouvelles tentatives pendant 24 heures au plus.

### Mises à jour

La vérification du moteur lit la dernière version de `dagucloud/dagu` sur `api.github.com`, et le téléchargement provient des fichiers de version GitHub de ce dépôt.

L’app Kitewell lit un manifeste signé à l’adresse HTTPS fournie lors de sa compilation, et vérifie le SHA-256 du programme d’installation avant de le lancer. Sous Windows, **Installer WebView2** récupère le programme d’amorçage de Microsoft sur `go.microsoft.com` et vérifie la signature de Microsoft avant de le lancer.

### Chiffrement au repos

Les secrets utilisent le registre AES-256-GCM du moteur. Les mots de passe des boîtes mail et les jetons d’actualisation sont scellés en AES-256-GCM par une clé de messagerie propre à chaque appareil.

La clé du moteur, la clé de messagerie et le fichier d’identifiants sont chacun scellés par une même clé d’appareil : sous Windows, un blob DPAPI de portée machine, que seul ce PC peut ouvrir ; sur un Mac, un fichier que seul votre utilisateur peut lire. Voir [Secrets](/fr/docs/secrets/).

Aucun de ces éléments ne figure dans une sauvegarde, et un dossier de données copié sur une autre machine n’en ouvre aucun. Les dossiers de données et de sauvegarde ne peuvent être lus que par votre compte utilisateur.
