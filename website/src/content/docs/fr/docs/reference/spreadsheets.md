---
title: Référence Excel
---

Tout ce que la page [Automatiser Excel](/fr/docs/spreadsheets/) laisse de côté
sur les classeurs. Les étapes de feuille de calcul sont disponibles dans
toutes les offres.

## Deux façons d’utiliser un classeur

Comme lignes d’une feuille : liez le classeur à une feuille, et chaque ligne
devient une exécution dont le résultat revient dans cette ligne. Choisissez
cette façon quand le classeur *est* le travail, une liste de tâches à
traiter.

Comme étapes d’un workflow : ajoutez une tâche du groupe
**Feuilles de calcul** du sélecteur de tâches et indiquez-lui le chemin du
fichier ; elle lit ou écrit à ce moment de l’exécution.

Choisissez cette façon quand un classeur n’est qu’une partie d’un travail plus
large : un fichier qui arrive par e-mail, une facture mensuelle remplie à
partir d’un modèle.

## Ce que Kitewell lit

Il lit les classeurs que votre bureau utilise déjà. Une ligne de titre
au-dessus du tableau, un en-tête fusionné sur deux lignes, des sous-totaux au
milieu, des notes en dessous, des chiffres pleine chasse, des dates en ères
japonaises, des codes postaux commençant par des zéros : Kitewell détermine où
se trouve le tableau et ce que contient chaque colonne.

Dans cette version, une feuille liée transmet au workflow, sous forme de
texte, les chiffres pleine chasse et les dates en ères japonaises écrits en
texte. Les étapes de feuille de calcul, elles, les lisent comme des nombres et
des dates.

Quand vous liez un classeur, chaque ligne de l’aperçu propose
**Utiliser la ligne 3 comme noms de colonnes**, et **Pas de noms de colonnes**
est là pour une simple liste. Les lignes au-dessus des noms, les lignes vides
et les lignes de total sont exclues, et chacune de ces catégories est
comptée.

Une case à cocher propose d’inclure malgré tout les lignes de total, et une
autre d’exclure les lignes masquées dans Excel.

Seule une colonne dont les valeurs ne se répètent jamais et ne sont jamais
vides peut être choisie sous **Les lignes sont retrouvées par** ; les autres
apparaissent grisées avec la mention « valeurs répétées ou manquantes ».
**Position de la ligne** est la solution de repli, et il ne faut alors ni
trier ni insérer de lignes tant que des résultats sont en attente.

## Ce qui revient dans votre fichier

Si la feuille a déjà une colonne portant le nom de la colonne réécrite, cette
colonne est utilisée ; un nouveau nom ajoute une colonne à droite. Aucun ID
d’exécution, aucune colonne de clé interne et aucun commentaire de cellule ne
sont ajoutés. **Run at** est écrit sous la forme `2026-10-01 09:30`.

Les mots suivent la langue des en-têtes du classeur lui-même : une feuille
dont les en-têtes sont en japonais reçoit 状態, エラー, 実行日時 et 済 / 一部失敗
/ 失敗 / 中止 / 却下, et des en-têtes en chinois ou en coréen reçoivent les mêmes
mots en chinois ou en coréen. Des en-têtes en kanji seuls ne comptent comme du
chinois que si vous lisez Kitewell en chinois. Tous les autres en-têtes,
français compris, reçoivent les mots anglais.

Si Excel a été fermé sans enregistrer et a laissé derrière lui son fichier de
verrouillage, **Il n'est pas ouvert** le supprime. Une copie est nommée
de même dans la langue du nom du fichier : `(結果)`, `(结果)` ou `(결과)` plutôt
que `(results)`.

**Annuler** refuse si vous avez modifié le classeur depuis l’écriture, plutôt
que d’abandonner vos modifications, et laisse le fichier actuel à côté sous le
nom `supplier-invoices (before undo).xlsx`. Dans cette version, l’écriture
suivante remet les résultats annulés.

**Relire le classeur** indique ce qu’il a trouvé, par exemple
« 1 nouvelles · 1 mises à jour · 1 absentes de la feuille ». Si la ligne
d’en-tête a perdu la colonne de clé ou une colonne qu’utilise une entrée, la
lecture s’arrête et nomme ce qui manque ; liez de nouveau le classeur pour
choisir à nouveau les colonnes.

**Délier** met fin à la liaison : les lignes restent dans la feuille et les
résultats cessent d’être réécrits dans le fichier.

## Étapes de feuille de calcul

Dans un workflow, le groupe **Feuilles de calcul** du sélecteur de tâches
propose dix tâches :

| Tâche | Rôle |
| --- | --- |
| Lire une feuille de calcul | Les lignes d’une feuille, seulement celles que vous voulez, chaque colonne lue comme texte, nombre ou date |
| Vérifier une feuille de calcul | S’arrêter avant toute autre action quand des cellules sont incorrectes |
| Réécrire les résultats | L’état et les valeurs, dans les lignes d’où ils viennent |
| Écrire une feuille de calcul | Un nouveau classeur ou une nouvelle feuille, remplacés ou complétés |
| Ajouter des lignes à une feuille de calcul | Des lignes sous la dernière ligne, alignées sur l’en-tête |
| Remplir un modèle | Les cellules ou les cellules nommées d’un modèle, enregistré comme copie |
| Convertir une feuille de calcul | Une feuille en CSV (UTF-8 ou Shift_JIS), JSON ou JSON Lines |
| Ajouter, copier, renommer ou supprimer une feuille | Commencer un mois à partir d’une feuille modèle, relançable sans risque |
| Décrire un classeur | Les feuilles, les en-têtes et les types, pour les étapes suivantes |
| Lire un formulaire | Les champs d’un devis ou d’une commande présentés sous forme de formulaire, quelle que soit leur mise en page |

Choisir le **Classeur** dans une étape affiche ses feuilles sous forme
d’onglets et les 20 premières lignes converties telles que l’étape les lira,
en nommant le tableau et la ligne d’en-tête détectés.

**Vérifier** demande au moteur si l’étape échouerait sur cet ordinateur
(classeur, feuille ou colonne manquants) avant que vous n’exécutiez quoi que
ce soit. Chaque adresse de cellule dans sa réponse est un bouton qui vous
montre cette cellule.

**Tester** affiche les lignes sous forme de tableau. Pendant un test, une
étape qui écrit se contente d’indiquer ce qu’elle changerait, sauf si vous
cochez **Enregistrer le fichier pendant les tests**. Convertir une feuille de
calcul fait exception : un test de cette tâche écrit réellement son fichier
de sortie.

Une colonne à laquelle une étape suivante fait référence a besoin d’un nom
court en lettres sans accents, par exemple `invoice` pour « Invoice No ».
**Nom pour les étapes suivantes**, à côté de chaque colonne dans
**Lire une feuille de calcul**, permet de le saisir, et l’éditeur en suggère
un.

Toute étape qui écrit a trois réglages : **Exécution à blanc** indique les
changements sans les enregistrer ; une attente de quelques minutes au plus,
pendant laquelle un classeur ouvert dans Excel est réessayé avant que l’étape
n’échoue ; et, activé par défaut, l’enregistrement via un fichier temporaire,
afin de ne jamais laisser un classeur à moitié écrit.

## Le même travail en étapes

Quand le classeur n’est qu’une partie d’un workflow plus large, construisez le
traitement des factures sous forme d’étapes plutôt qu’avec une feuille liée :

1. **Lire une feuille de calcul** lit la feuille Invoices. Sous
   **Seulement les lignes où…**, choisissez la colonne Status et laissez la
   valeur vide, pour ne lire que les factures pas encore traitées.
2. **Pour chaque élément** parcourt ces lignes une par une.
3. Dans la boucle se trouve l’étape qui enregistre la facture sur le portail :
   une [étape de site web](/fr/docs/browser/), une
   [étape de bureau](/fr/docs/desktop/) ou une commande. Elle produit le
   numéro d’accusé de réception.
4. **Réécrire les résultats**, toujours dans la boucle, écrit `Done` dans
   Status et le numéro d’accusé de réception dans Receipt No, sur la ligne
   d’où vient la facture.

Comme la réécriture se trouve dans la boucle, une ligne en échec garde son
Status vide, et la prochaine exécution la reprend. Les étapes de feuille de
calcul n’utilisent pas l’écran, quelles que soient les étapes placées entre
elles.

## Des formulaires, pas des tableaux

Un devis ou une commande présenté sous forme de formulaire, avec des libellés
et des valeurs dispersés sur la feuille plutôt que des lignes sous un
en-tête, se lit avec **Lire un formulaire**.

Sous **Ce qu'est ce formulaire, et ce qu'il faut y trouver**, décrivez ce
qu’est le formulaire. Sous **Champs à trouver**, nommez chaque champ, son type
et l’apparence de son libellé sur la feuille, dans la langue de la feuille.

Un modèle répond en indiquant la cellule où se trouve chaque champ, puis le
moteur lit lui-même les valeurs dans ces cellules : aucune valeur n’est
inventée.

Désactiver **Envoyer au modèle les valeurs des cellules** ne laisse voir au
modèle que le type de contenu de chaque cellule, ce qui garde les montants et
les dates sur cet ordinateur.

**Retenir cette mise en page, pour lire le même formulaire sans le modèle** est
activé par défaut : un même formulaire type ne demande plus aucun appel au
modèle. **Oublier les cellules retenues** fait que l’exécution suivante pose
de nouveau la question ; utilisez-le quand la mise en page d’un formulaire a
changé, ou quand un champ a été lu dans la mauvaise cellule.

## Confidentialité

- Le classeur est lu sur cet ordinateur, par Kitewell. Le fichier n’est jamais
  téléversé, et son chemin ne quitte jamais l’appareil.
- **Configurer à partir de ce fichier** demande à l’assistant de construire le
  workflow à partir du classeur ouvert. Il envoie les noms des colonnes, le
  type observé dans chacune et les 10 premières lignes, chaque cellule étant
  tronquée à une ligne. **N'envoyer que les noms de colonnes** n’envoie que
  les noms.
- Un classeur protégé par mot de passe n’est ouvert que sur cet ordinateur. Le
  mot de passe est conservé comme référence à un [secret](/fr/docs/secrets/)
  sous **Mot de passe, en référence à un secret** ; il n’est jamais écrit dans
  le workflow ni enregistré dans les journaux. Un classeur protégé ne peut pas
  être prévisualisé, ni même importé tant que le mot de passe n’a pas été
  retiré dans Excel.
- La liaison qui se [synchronise avec Dagu Cloud](/fr/docs/cloud-sync/)
  transporte le nom du fichier, la feuille, l’appareil qui le détient et la
  correspondance des colonnes, jamais le chemin. Les lignes de la feuille
  voyagent avec elle, et elles contiennent les valeurs des cellules lues dans
  le classeur.
- Le chemin du fichier, la ligne Excel dont provient chaque ligne de la
  feuille, les résultats lus depuis les exécutions et les copies conservées
  pour l’annulation restent sur l’appareil qui a exécuté la feuille. Une
  [sauvegarde de l’espace de travail](/fr/docs/backups/) inclut toutefois ces
  copies.

Voir [Ce qui quitte votre ordinateur](/fr/docs/data-flow/) pour une vue
d’ensemble.

## Limites

- `.xlsx` et `.xlsm`. Un fichier `.xls` ou `.ods` doit d’abord être enregistré
  au format `.xlsx` dans Excel.
- Une lecture contient au plus 5 000 lignes et environ 900 Ko. Au-delà de
  l’une ou l’autre limite, l’étape indique ce qu’elle a gardé et demande une
  plage plus étroite, moins de colonnes ou un filtre de lignes.
- Une feuille contient au plus 5 000 lignes et 30 colonnes de résultat, et une
  boucle traite 1 000 éléments. Un fichier importé fait au plus 16 Mio.
- Les lignes masquées d’un classeur lié sont lues avec les autres. Seul un
  fichier importé propose de les exclure.
- Les graphiques, les tableaux croisés dynamiques, les mises en forme
  conditionnelles et les règles de validation déjà présents dans un fichier
  sont conservés, mais aucun n’est créé, et un tableau croisé dynamique n’est
  pas actualisé. Sous Windows, une étape de macro peut en actualiser un.
- Google Sheets n’est pas encore pris en charge.

Une étape qui pilote un site web ou une app de bureau a toujours besoin de
cette application : seules les étapes de feuille de calcul se passent de
l’écran.
