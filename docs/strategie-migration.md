# Strategie de migration

## Objectif produit

Creer une application locale de bureau d'etudes batiment, organisee par corps d'etat:

- Hydraulique.
- Aeraulique.
- Plomberie sanitaire.
- Thermique et climatisation.
- Ventilation.
- Gaz, vapeur et air comprime.
- Quantitatifs et metrees.
- Utilitaires et conversions.
- Bibliotheque technique issue des Excel.

## Ce qui est faisable rapidement

Une application web statique peut deja regrouper les modules simples, les tables de reference et les notes minute. C'est le meilleur rapport valeur / temps, car elle ne demande ni serveur ni infrastructure.

Les modules les plus rapides a fiabiliser sont:

- Calcul pratique fluides: debit, diametre, vitesse.
- Vase d'expansion.
- Debit gaz.
- Calorifuge.
- Gaine aeraulique simple.
- Debit d'air dans gaine.
- Pertes de charge air par troncons.
- Debit plomberie EF/ECS.
- Psychrometrie de base.
- Tuyauterie air comprime.
- Conversions d'unites.

## Ce qui prendra plus de temps

Les modules suivants sont faisables, mais demandent une migration plus methodique:

- Deperditions piece par piece.
- VMC hygro collectif.
- Evacuations DTU 60.11.
- Pertes de charge detaillees avec singularites.
- Vapeur saturee et tables TechVapor.
- Notes de calcul completes avec edition PDF.

## Methode recommandee

1. Choisir un module Excel source.
2. Identifier les cellules de saisie, les cellules de resultat et les tables.
3. Reproduire la formule dans l'application.
4. Tester 3 a 5 cas identiques entre Excel et l'application.
5. Ajouter une sortie de note de calcul.
6. Marquer le module comme valide.

## Decoupage propose

### V1 courte

- Catalogue des modules.
- 8 a 10 calculateurs simples.
- Note minute copiable.
- Donnees locales dans le code.

### V2 metier

- Gestion de projets.
- Sauvegarde locale.
- Import/export JSON.
- Notes de calcul PDF.
- Tables de reference extraites des Excel.

### V3 produit complet

- Veritable base de donnees technique.
- Assistant de note de calcul par lot.
- Bibliotheque de formules documentee.
- Modules avances: VMC, DTU, pertes de charge detaillees, deperditions.
