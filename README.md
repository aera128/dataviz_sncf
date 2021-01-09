# Projet IHM 2021 - Master 2 Informatique IDC

## Requis
- yarn (https://yarnpkg.com/)

## Installation
```
git clone https://github.com/aera128/dataviz_sncf.git
cd dataviz_sncf
yarn install
```

## Lancer serveur de développement
```
yarn serve
```

## Compiler version production
```
yarn build
```

## Description

Cette application vue cli permet de visualiser des statistiques concernant les objets perdus et restitués dans le réseau SNCF.
Le but étant de visualiser l'ampleur du nombre d'objets perdus par les usagers du réseau SNCF.
Nous utilisons directement les données de l'API proposés par la SNCF notamment les datasets :
- objets-trouves-restitution pour les objets trouvés
- referentiel-gares-voyageurs pour lister et cartographier les différentes gares
- enquetes-gares-connexions-repartition-repartition-par-classe-dage pour visualiser l'age moyen des usagers
- reglarite-mensuelle-tgv-nationale pour visualiser la moyenne des retards

Le projet se compose de différentes vues

## Librairies
- Leaflet pour afficher la carte du monde
- ChartJS pour générer des graphes
- GridJS pour générer des tableaux avec un système de recherche, triage et pagination automatique
- Axios pour la récupération des données via requêtes http
- Bootstrap 4 pour le CSS
- Fontawesome 5 pour les icons du site
- typejs pour l'animation d'écriture de la page d'accueil
- vue-page-transition pour les animations de page a chaque changement de route

##Pages

### Accueil --> /
Cette vue est la page d'accueil du site, il est proposé de se rediriger vers d'autres vues pour naviguer sur le site

### Carte -> /map
La carte permet de voir les principales gares de france. Il est possible de rechercher une gare grâce à une barre de 
recherche situé en haut à gauche de la carte. En cliquant sur un marker représentant une gare, une bulle d'information
apparait affichant diverses informations sur la gare en question et il est possible d'être rediriger vers la vue listant
les statistiques de cette gare seulement lorsqu'il y a des informations disponibles.

### Gare -> /station
Cette vue permet de visualiser différentes informations à propos d'une gare :
- le nombre d'objets perdus et restitués par ans
- les types d'objets les plus perdus dans cette gare
- un tableau listant tous les objets perdus avec possibilité de rechercher dans ce tableau

### Statistiques -> /stats
Cette vue permet de visualiser globalement les informations concernant les objets perdus sur le réseau ferroviaire dont:
- le nombre d'objets perdus et restitués par ans
- le nombre de retards par mois par ans
- une courbe de l'age moyen des usagers
- les types d'objets les plus perdus
- les gares les plus fréquentées en france

### A Propos -> /about
Cette vue établi un descriptif des auteurs et liste les librairies utilisées


