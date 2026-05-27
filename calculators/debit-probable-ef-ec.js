/*
 * Calcul du débit instantané probable EF & EC (plomberie).
 *
 * Ce module expose une fonction de calcul qui s'appuie sur les indices
 * d'appareils sanitaires et d'équipements extraits du tableur
 * « Calcul débit Pb EF‑EC ». Les indices sont chargés depuis le fichier
 * JSON `apparels_ef_ec.json` généré par le script d'extraction.
 *
 * La formule appliquée s'inspire des feuilles Excel :
 *   – pour chaque appareil, on multiplie l'indice (l/s) par la quantité saisie ;
 *   – on additionne les débits unitaires pour obtenir un débit de base ;
 *   – on applique un coefficient de simultanéité :
 *       coeff = 1 si le nombre d'appareils est inférieur à 3 ;
 *       sinon coeff = 0,8 × kLuxe / √(N − 1),
 *       où kLuxe dépend du niveau de confort (1 : standard, 2 : confort +, 3 : luxe).
 *   – les WC à robinet de chasse sont regroupés par tranches (0, 1, 2, 3, 4 ou 5)
 *     et multipliés par leur indice de 1,5 l/s.
 *
 * La fonction retourne un objet contenant le détail des calculs.
 */

const apparelsData = require('../data/apparels_ef_ec.json');

/**
 * Calcule le débit instantané probable.
 *
 * @param {Object} inputs Un dictionnaire associant le nom de chaque appareil à la quantité saisie.
 *                        Les clés doivent correspondre aux libellés présents dans apparels_ef_ec.json.
 *                        Exemple : {"évier - timbre office": 2, "Lavabo": 3, ...}
 * @param {Number} luxeLevel Niveau de confort (1 : standard, 2 : confort +, 3 : luxe). Défaut : 1.
 * @returns {Object} Un objet contenant :
 *   - debitSanit : débit réel des appareils sanitaires (hors WC) en l/s
 *   - debitWC : débit des WC à robinet de chasse en l/s
 *   - debitTotal : débit total (sanitaires + WC) en l/s
 *   - coeffSimulSanit : coefficient de simultanéité appliqué aux sanitaires
 *   - countSanit : nombre total d'appareils sanitaires saisis
 *   - wcGroup : nombre de groupes de WC (0 à 5)
 */
function calculateDebitProbable(inputs = {}, luxeLevel = 1) {
  const apparels = apparelsData.apparels;
  const wcFlush = apparelsData.wc_flush;

  // Débits de base et comptage des appareils sanitaires
  let sumSanit = 0;
  let countSanit = 0;
  // On parcourt tous les appareils sauf les WC à robinet de chasse
  for (const app of apparels) {
    const qty = Number(inputs[app.name] ?? 0);
    if (!Number.isFinite(qty) || qty <= 0) {
      continue;
    }
    sumSanit += app.index * qty;
    countSanit += qty;
  }

  // Calcul du coefficient de simultanéité pour les sanitaires
  let kLuxeFactor;
  if (luxeLevel === 1) {
    kLuxeFactor = 1;
  } else if (luxeLevel === 2) {
    kLuxeFactor = 1.25;
  } else {
    kLuxeFactor = 1.5;
  }

  let coeffSimulSanit = 1;
  if (countSanit >= 3) {
    coeffSimulSanit = 0.8 * kLuxeFactor / Math.sqrt(countSanit - 1);
  }

  const debitSanit = sumSanit * coeffSimulSanit;

  // Traitement des WC à robinet de chasse (groupes par tranches)
  const wcCount = Number(inputs[wcFlush.name] ?? 0);
  let wcGroup = 0;
  if (wcCount >= 1 && wcCount < 4) {
    wcGroup = 1;
  } else if (wcCount >= 4 && wcCount < 13) {
    wcGroup = 2;
  } else if (wcCount >= 13 && wcCount < 25) {
    wcGroup = 3;
  } else if (wcCount >= 25 && wcCount < 51) {
    wcGroup = 4;
  } else if (wcCount >= 51) {
    wcGroup = 5;
  }
  const debitWC = wcGroup * wcFlush.index;

  // Débit total = sanitaires + WC
  const debitTotal = debitSanit + debitWC;
  return {
    debitSanit: Number(debitSanit.toFixed(3)),
    debitWC: Number(debitWC.toFixed(3)),
    debitTotal: Number(debitTotal.toFixed(3)),
    coeffSimulSanit: Number(coeffSimulSanit.toFixed(3)),
    countSanit: Number(countSanit),
    wcGroup: Number(wcGroup)
  };
}

module.exports = {
  calculateDebitProbable
};