# site-presentation

## Generation des fichiers statiques

Pas encore possible.

* `npm run build` pour préparer les fichiers statiques.
Les fichiers présents dans le répertoire `src` seront traités dont de
 nouveaux fichiers seront généré dans le répertoire `dist`.
* `npm start` pour lancer le site en local.

## Mettre à jour le site statique

Pas encore possible

* Depuis le répertoire racine, aller dans le répertoire `dist` contenant
 les fichiers statiques via la commande `cd dist`.
 * Vérifier que vous êtes bien sur la branche `master`
* `git commit -am '<Votre message de commit>'` pour prendre en compte les
 nouvelles modifications.

## Contributions

* Faites un fork du répertoire
* Cloner votre répertoire
* Créer une branche sur laquelle travailler. Le nom de la branche doit
 comprendre un de ces préfixes (suivi d'un nom de branche décrivant
  brièvement ce qui est apporté au code) :
    - `dev/` pour le développement d'une nouvelle fonctionnalité, de la mise
     en place d'un design, ou bien la modification du contenu.
    - `bugfixes/` pour la résolution de bogues.
    - `releases/` pour les différentes versions du projet.
Comme noms de branche, nous pouvons envisager :
'dev/implementation-nodejs', 'dev/design-flatui' ou bien 'bugfixes
/303' (si on a un bug qui s'appelle 303..) et 'releases/1.0'.
* Pousser les modifications vers votre répertoire via la commande `git push
 origin <nom de votre branche` afin d'ajouter votre branche créée pr
 éalablement ainsi que les modifications qu'elle contient.
* Aller sur la page du répertoire sur laquelle vous avez fait un fork.
* Créer un pull request décrivant les ajouts/modifications faites.


