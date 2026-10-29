---
title: Ce qui quitte votre ordinateur
---

Kitewell s’exécute sur votre ordinateur. Vos workflows, votre historique
d’exécution, vos journaux, vos secrets et vos connexions restent dans un
dossier de cet ordinateur. Rien ne part nulle part, sauf si une étape, une
synchronisation ou une connexion que vous avez configurée l’envoie.

Cette page montre où les données peuvent aller, et comment arrêter chacun de
ces envois.

## Où les données peuvent aller

<div class="kw-flow not-content">
<div class="kw-flow-env"><p class="kw-flow-env-label">Votre ordinateur</p>
<div class="kw-flow-app"><p class="kw-flow-app-name">Kitewell (moteur : Dagu)</p>
<ul><li>Les workflows et l’historique de leurs modifications</li><li>L’historique d’exécution, les journaux, les fichiers de sortie, les captures d’écran</li><li>Les secrets, chiffrés</li><li>Les connexions aux boîtes mail et aux sites web</li><li>Les conversations avec l’assistant</li></ul></div></div>
<ol class="kw-flow-out">
<li><p class="kw-flow-dest">Le modèle d’IA que vous avez choisi</p><dl><dt>Ce qui part</dt><dd>Les consignes, le texte des pages que lit une étape de site web, les captures d’écran que prend une étape de bureau, et vos conversations avec l’assistant.</dd><dt>Quand</dt><dd>Une étape utilise l’IA, ou vous utilisez l’assistant.</dd><dt>Pour l’arrêter</dt><dd>Choisissez, pour chaque fonction d’IA, un modèle hébergé sur votre propre serveur ; ces données restent alors à l’intérieur de votre réseau.</dd></dl></li>
<li><p class="kw-flow-dest">Vos propres systèmes et sites web</p><dl><dt>Ce qui part</dt><dd>Ce que les étapes saisissent, téléversent et envoient.</dd><dt>Quand</dt><dd>Un workflow s’exécute, exactement comme vous l’avez construit.</dd><dt>Pour l’arrêter</dt><dd>Retirez l’étape.</dd></dl></li>
<li><p class="kw-flow-dest">Votre serveur de messagerie et vos canaux d’alerte</p><dl><dt>Ce qui part</dt><dd>L’e-mail qu’envoie une étape. Pour une alerte : ce qui s’est passé, le workflow et un lien de retour, jamais la sortie d’une exécution.</dd><dt>Quand</dt><dd>Vous connectez une boîte mail ou ajoutez un canal d’alerte.</dd><dt>Pour l’arrêter</dt><dd>Déconnectez la boîte mail, ou retirez le canal.</dd></dl></li>
<li><p class="kw-flow-dest">Dagu Cloud, exploité par Descarty</p><dl><dt>Ce qui part</dt><dd>Votre offre, la version de Kitewell, ainsi que le nom et l’ID de cet ordinateur. Pour un projet synchronisé : ses workflows et les noms de ses secrets, jamais leurs valeurs, ainsi que l’état de chaque exécution avec les noms de ses étapes en échec. Pour le modèle inclus de Kitewell : chaque requête, que Dagu Cloud transmet à OpenRouter. Pour la recherche web de l’assistant : les mots de chaque recherche, que Dagu Cloud transmet à Serper et ne conserve pas.</dd><dt>Quand</dt><dd>Vous vous connectez, synchronisez un projet, utilisez le modèle inclus, ou l’assistant fait une recherche sur le web. Rien n’est envoyé avant que vous vous connectiez.</dd><dt>Pour l’arrêter</dt><dd>Déconnectez-vous, ou arrêtez la synchronisation du projet. Le propriétaire de l’espace de travail peut désactiver l’état des exécutions dans Dagu Cloud.</dd></dl></li>
<li><p class="kw-flow-dest">ChatGPT ou Claude, via le relais de Kitewell</p><dl><dt>Ce qui part</dt><dd>Ce que l’app demande à Kitewell : workflows, exécutions et leurs journaux, feuilles, connaissances. Le relais le transmet sans rien en conserver.</dd><dt>Quand</dt><dd>Vous connectez une app.</dd><dt>Pour l’arrêter</dt><dd>Désactivez l’accès à distance, ou révoquez l’app.</dd></dl></li>
</ol>
</div>

Kitewell n’envoie rien d’autre. Il n’y a ni suivi d’utilisation, ni rapport de
plantage, ni outil d’analyse. Descarty ne reçoit les données que traitent vos
exécutions que dans les requêtes que vous envoyez via le modèle inclus de
Kitewell ou la recherche web de l’assistant. La seule autre requête est une
vérification de version, qui ne transporte rien qui vous concerne.

## Ce qui ne part jamais

- **Valeurs des secrets.** Chiffrées sur cet ordinateur, masquées dans les
  journaux, et jamais exportées, sauvegardées ni synchronisées. Un projet
  synchronisé transporte le nom d’un secret ; chaque ordinateur détient sa
  propre valeur.
- **Connexions.** Les connexions aux boîtes mail, les connexions enregistrées
  aux sites web et les clés SSH sont chiffrées ou conservées dans un fichier
  que seul votre utilisateur peut lire, et exclues des sauvegardes. Leurs clés
  sont scellées par une clé d’appareil que détient le système d’exploitation.
- **Journaux et sorties des exécutions.** Conservés dans le dossier de données
  pendant 30 jours par défaut. Un projet synchronisé signale l’état de chaque
  exécution et les noms des étapes en échec, jamais ses paramètres, ses
  journaux, ses sorties ni les valeurs des feuilles.
- **Fichiers Excel.** Lus et écrits sur place. Les cellules ne partent que si
  vous demandez à un modèle ou à une app connectée de les lire.

## Choisir où l’IA s’exécute

Chaque fonction d’IA utilise un modèle que vous avez ajouté sous
**Agents et modèles**, ou le modèle inclus de Kitewell. Sur un ordinateur
connecté à Dagu Cloud, le modèle inclus ne demande aucune clé : ses requêtes
passent par Dagu Cloud pour aller à OpenRouter. Un serveur que vous faites
tourner vous-même, comme Ollama, garde les consignes, le texte des pages et
les captures d’écran à l’intérieur de votre réseau.

Un mot de passe que saisit une étape de site web ou de bureau est écrit
`%name%` : seul le nom parvient au modèle.

## Quatre points à connaître

- Les workflows s’exécutent avec vos autorisations. Une étape de commande peut
  lire tout ce que vous pouvez lire : n’exécutez que des définitions et des
  commandes de confiance.
- La capture d’écran d’une étape de bureau montre tout l’écran, y compris les
  autres fenêtres. Fermez ce qui ne doit pas être vu.
- Les e-mails et les requêtes de webhook sont des entrées non fiables : leur
  texte peut orienter une commande ou un agent. **Vérifier et exécuter** vous
  avertit lorsqu’un workflow fait cela.
- Les sauvegardes et les exportations ne sont pas chiffrées. Elles excluent
  les secrets et les connexions, mais contiennent tout le reste tel qu’il a été
  écrit.

## Pour une évaluation de sécurité

La [page sécurité](https://descarty.com/en/security/) de Descarty résume tout
cela pour les services informatiques et les évaluations de sécurité, et sa
[présentation de la sécurité](https://descarty.com/en/resources/) répond aux
questions que posent habituellement les questionnaires de sécurité.

La [référence des flux de données](/fr/docs/reference/data-flow/) liste chaque
destination, avec les adresses, les tailles, les durées de conservation et le
mode de chiffrement de chacune.
