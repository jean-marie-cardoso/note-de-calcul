# Module tuyauterie air comprime

Source principale:

- `Air Comprimé/Détermination tuyauterie air comprimé.xls`

## Donnees reprises

- Saisies du classeur: debit, temperature, pression effective origine, pression minimum disponible, longueur de tuyauterie, diametre retenu.
- Singularites: coudes grand rayon, coudes rayon moyen, tes, vannes, robinets a soupape.
- Table tubes: DN, diametre exterieur, epaisseur, diametre interieur et correspondance pouces.
- Longueurs equivalentes visibles dans la feuille `valeurs`.

## Calcul retenu

La V1 reprend l'approche empirique du classeur:

- longueur equivalente = longueur droite + singularites
- diametre theorique = fonction du debit, de la longueur equivalente, de la pression absolue et de la perte admissible
- perte reelle = meme relation appliquee au diametre interieur retenu
- controle = comparaison entre perte reelle et perte admissible

Une vitesse estimee est aussi calculee par detente du debit a la pression de service.

## Verification

Avec les valeurs du fichier source:

- debit: 27 m3/h
- pression effective: 10 bar
- pression minimum: 9.75 bar
- longueur droite: 51 m
- accessoires: 4 coudes grand rayon, 5 coudes, 7 tes, 2 vannes
- diametre retenu: DN15 / diametre retenu 20

Le module retrouve un diametre theorique d'environ 15.4 mm, coherent avec le classeur.
