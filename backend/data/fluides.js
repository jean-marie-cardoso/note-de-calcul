const compressedAirPipes = [
  { nominal: 15, retained: 20, outer: 21.3, thickness: 2.6, inner: 16.1, inch: '1/2"' },
  { nominal: 20, retained: 25, outer: 26.9, thickness: 2.6, inner: 21.7, inch: '3/4"' },
  { nominal: 25, retained: 32, outer: 33.7, thickness: 3.2, inner: 27.3, inch: '1"' },
  { nominal: 32, retained: 40, outer: 42.4, thickness: 3.2, inner: 36, inch: '1 1/4"' },
  { nominal: 40, retained: 50, outer: 48.3, thickness: 3.2, inner: 41.9, inch: '1 1/2"' },
  { nominal: 50, retained: 65, outer: 60.3, thickness: 3.6, inner: 53.1, inch: '2"' },
  { nominal: 65, retained: 85, outer: 76.1, thickness: 3.6, inner: 68.9, inch: '2 1/2"' },
  { nominal: 80, retained: 100, outer: 88.9, thickness: 4, inner: 80.9, inch: '3"' },
  { nominal: 100, retained: 125, outer: 114.3, thickness: 4.5, inner: 105.3, inch: '4"' },
  { nominal: 125, retained: 150, outer: 139.7, thickness: 4.5, inner: 130.7, inch: '5"' },
  { nominal: 150, retained: 200, outer: 168.3, thickness: 4.5, inner: 159.3, inch: '6"' },
  { nominal: 200, retained: 250, outer: 219.1, thickness: 6.3, inner: 206.5, inch: '8"' },
  { nominal: 250, retained: 300, outer: 273, thickness: 6.3, inner: 260.4, inch: '10"' }
];

const compressedAirEquivalentLengths = {
  20: { globe: 0.6, tee: 0.5, elbow: 0.6, longElbow: 0.6, valve: 0.3 },
  25: { globe: 0.6, tee: 0.6, elbow: 0.5, longElbow: 0.3, valve: 0.3 },
  32: { globe: 0.9, tee: 0.75, elbow: 0.55, longElbow: 0.4, valve: 0.4 },
  40: { globe: 1.2, tee: 0.9, elbow: 0.6, longElbow: 0.5, valve: 0.5 },
  50: { globe: 2, tee: 1.5, elbow: 0.7, longElbow: 0.6, valve: 0.85 },
  65: { globe: 2.5, tee: 2, elbow: 0.9, longElbow: 0.7, valve: 1.1 },
  85: { globe: 4.3788, tee: 3.0909, elbow: 1.2364, longElbow: 0.9788, valve: 1.9576 },
  100: { globe: 6, tee: 4, elbow: 1.5, longElbow: 1.2, valve: 2.7 },
  125: { globe: 8.5, tee: 5.5, elbow: 1.8, longElbow: 1.5, valve: 4 },
  150: { globe: 11, tee: 7, elbow: 2.1, longElbow: 1.8, valve: 5 },
  200: { globe: 16, tee: 10, elbow: 2.7, longElbow: 2.5, valve: 7 },
  250: { globe: 21, tee: 15, elbow: 3.4, longElbow: 3, valve: 9 },
  300: { globe: 21, tee: 15, elbow: 3.4, longElbow: 3, valve: 9 }
};

module.exports = {
  compressedAirPipes,
  compressedAirEquivalentLengths
};
