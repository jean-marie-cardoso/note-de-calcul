const pipeTables = {
  acier: [
    { ref: "DN15 - 17.2 x 2", d: 13.2 },
    { ref: "DN20 - 21.3 x 2.3", d: 16.7 },
    { ref: "DN25 - 26.9 x 2.3", d: 22.3 },
    { ref: "DN32 - 33.7 x 2.9", d: 27.9 },
    { ref: "DN40 - 42.4 x 2.9", d: 36.6 },
    { ref: "DN50 - 60.3 x 3.2", d: 53.9 },
    { ref: "DN65 - 76.1 x 3.2", d: 69.7 },
    { ref: "DN80 - 88.9 x 3.2", d: 82.5 },
    { ref: "DN100 - 114.3 x 3.6", d: 107.1 }
  ],
  cuivre: [
    { ref: "Cu 12/14", d: 12 },
    { ref: "Cu 14/16", d: 14 },
    { ref: "Cu 16/18", d: 16 },
    { ref: "Cu 20/22", d: 20 },
    { ref: "Cu 26/28", d: 26 },
    { ref: "Cu 32/35", d: 32 },
    { ref: "Cu 40/42", d: 40 },
    { ref: "Cu 50/52", d: 50 },
    { ref: "Cu 60/64", d: 60 }
  ],
  per: [
    { ref: "PER 12 x 1.1", d: 9.8 },
    { ref: "PER 16 x 1.5", d: 13 },
    { ref: "PER 20 x 1.9", d: 16.2 },
    { ref: "PER 25 x 2.3", d: 20.4 },
    { ref: "PER 32 x 2.9", d: 26.2 },
    { ref: "PER 40 x 3.7", d: 32.6 },
    { ref: "PER 50 x 4.6", d: 40.8 },
    { ref: "PER 63 x 5.8", d: 51.4 }
  ]
};

const standardVesselVolumes = [8, 12, 18, 25, 35, 50, 80, 100, 150, 200, 300, 500, 750, 1000];

module.exports = {
  pipeTables,
  standardVesselVolumes
};
