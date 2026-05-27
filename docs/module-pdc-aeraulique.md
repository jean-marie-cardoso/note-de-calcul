# Module pertes de charge air

Sources utilisees:

- `Réseau Aéraulique/Tableur aeraulique vierge.xls`
- `Réseau Aéraulique/Réseau aéraulique_model_V01.xls`

## Donnees reprises

- Structure des colonnes du tableur: debit, longueur, vitesse reelle, j, jL, pdc ponctuelle, coefficient `d`, `d rv2/2`, pdc totale.
- Diametres commerciaux: 60, 80, 100, 125, 160, 200, 250, 315, 355, 400, 450, 500, 560, 630, 710, 800, 900, 1000, 1120, 1250 mm.
- Rugosites visibles dans le tableur: acier galvanise, conduit spirale, inox, aluminium, flexible, plastique, beton, brique, etc.

## Calcul retenu

- Vitesse: `v = Q / S`
- Pression dynamique: `pv = rho x v2 / 2`
- Diametre equivalent rectangulaire: `De = 1.3 x (a x b)^0.625 / (a + b)^0.25`
- Nombre de Reynolds: `Re = rho x v x De / mu`
- Coefficient de frottement: Haaland en turbulent, `64 / Re` en laminaire.
- Perte lineaire: `j = lambda x pv / De`
- Perte totale troncon: `jL + pdc fixe + d x pv`

## Limite V1

Le module est exploitable pour predimensionnement et notes internes, mais il faudra encore le comparer a quelques cas saisis dans Excel pour verrouiller les conventions exactes du fichier d'origine.
