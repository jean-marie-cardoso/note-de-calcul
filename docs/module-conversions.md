# Module conversions d'unites

Source principale:

- `Conversions/tableau de conversion.xls`

Sources complementaires consultees:

- `Convertisseur.xls`
- `Programmes/Chaufferie/conversion.xls`

## Donnees reprises

Le fichier source est une table de rapports de conversion. La V1 integre les familles suivantes:

- distances
- surfaces
- volumes
- masses
- pressions
- energies
- puissances
- angles
- temperatures

## Calcul retenu

Chaque famille utilise une unite de base:

- metre pour les longueurs
- m2 pour les surfaces
- m3 pour les volumes
- kg pour les masses
- Pa pour les pressions
- J pour les energies
- W pour les puissances
- degre pour les angles
- deg C comme passage intermediaire pour les temperatures

La conversion generale est:

`valeur cible = valeur source x facteur source / facteur cible`

Les temperatures utilisent les formules specifiques du tableau:

- `deg F = 1,8 x deg C + 32`
- `K = deg C + 273,15`
