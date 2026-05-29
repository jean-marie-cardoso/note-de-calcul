const conversionGroups = {
  length: {
    label: "Distances",
    base: "m",
    units: [
      { id: "m", label: "metre (m)", factor: 1 },
      { id: "km", label: "kilometre (km)", factor: 1000 },
      { id: "cm", label: "centimetre (cm)", factor: 0.01 },
      { id: "mm", label: "millimetre (mm)", factor: 0.001 },
      { id: "in", label: "pouce (in)", factor: 0.0254 },
      { id: "ft", label: "pied (ft)", factor: 0.3048 },
      { id: "yd", label: "yard (yd)", factor: 0.9144 },
      { id: "mile", label: "mile terrestre", factor: 1609.347 },
      { id: "nmi", label: "mile nautique international", factor: 1851.99 },
      { id: "nmi_uk", label: "mile nautique anglais", factor: 1853.19 },
      { id: "ua", label: "unite astronomique", factor: 1.496e11 },
      { id: "al", label: "annee lumiere", factor: 9.461e15 },
      { id: "ang", label: "angstrom", factor: 1e-10 }
    ]
  },
  area: {
    label: "Surfaces",
    base: "m2",
    units: [
      { id: "m2", label: "metre carre (m2)", factor: 1 },
      { id: "km2", label: "kilometre carre (km2)", factor: 1e6 },
      { id: "cm2", label: "centimetre carre (cm2)", factor: 0.0001 },
      { id: "ha", label: "hectare (ha)", factor: 10000 },
      { id: "are", label: "are (a)", factor: 100 },
      { id: "acre", label: "acre", factor: 4046.86 },
      { id: "mile2", label: "mile carre", factor: 2.59e6 },
      { id: "yd2", label: "yard carre", factor: 0.8361 },
      { id: "ft2", label: "pied carre", factor: 0.0929 },
      { id: "in2", label: "pouce carre", factor: 0.00064516 },
      { id: "barn", label: "barn", factor: 1e-28 }
    ]
  },
  volume: {
    label: "Volumes",
    base: "m3",
    units: [
      { id: "m3", label: "metre cube (m3)", factor: 1 },
      { id: "l", label: "litre", factor: 0.001 },
      { id: "dm3", label: "decimetre cube (dm3)", factor: 0.001 },
      { id: "cm3", label: "centimetre cube (cm3)", factor: 1e-6 },
      { id: "tonneau_mer", label: "tonneau de mer", factor: 1.44 },
      { id: "tonneau_jauge", label: "tonneau de jauge", factor: 2.832 },
      { id: "usgal", label: "gallon US", factor: 0.003785 },
      { id: "ukgal", label: "gallon UK", factor: 0.004546 },
      { id: "usbbl", label: "baril US", factor: 0.159 },
      { id: "ukbbl", label: "baril UK", factor: 0.164 },
      { id: "cuyd", label: "yard cube", factor: 0.765 },
      { id: "cuft", label: "pied cube", factor: 0.02833 },
      { id: "cuin", label: "pouce cube", factor: 0.00001639 },
      { id: "uspint", label: "pinte US", factor: 0.000473 },
      { id: "ukpint", label: "pinte UK", factor: 0.000568 },
      { id: "usbushel", label: "bushel US", factor: 0.03524 },
      { id: "ukbushel", label: "bushel UK", factor: 0.03636 }
    ]
  },
  mass: {
    label: "Masses",
    base: "kg",
    units: [
      { id: "kg", label: "kilogramme (kg)", factor: 1 },
      { id: "t", label: "tonne", factor: 1000 },
      { id: "g", label: "gramme (g)", factor: 0.001 },
      { id: "mg", label: "milligramme (mg)", factor: 0.000001 },
      { id: "longton", label: "long ton", factor: 1016.05 },
      { id: "shortton", label: "short ton", factor: 907.2 },
      { id: "lb", label: "livre US", factor: 0.4536 },
      { id: "oz", label: "once US", factor: 0.02835 },
      { id: "grain", label: "grain", factor: 0.00006481 },
      { id: "quintal", label: "quintal", factor: 100 },
      { id: "carat", label: "carat", factor: 0.0002 },
      { id: "u", label: "unite masse atomique", factor: 1.66053e-27 }
    ]
  },
  pressure: {
    label: "Pressions",
    base: "Pa",
    units: [
      { id: "pa", label: "pascal (Pa)", factor: 1 },
      { id: "kpa", label: "kilopascal (kPa)", factor: 1000 },
      { id: "bar", label: "bar", factor: 100000 },
      { id: "mbar", label: "millibar (mbar)", factor: 100 },
      { id: "atm", label: "atmosphere (atm)", factor: 101325 },
      { id: "mmhg", label: "mm Hg / torr", factor: 133.3 },
      { id: "mmce", label: "mmCE", factor: 9.80665 },
      { id: "mce", label: "mCE", factor: 9806.65 }
    ]
  },
  energy: {
    label: "Energies",
    base: "J",
    units: [
      { id: "j", label: "joule (J)", factor: 1 },
      { id: "kj", label: "kilojoule (kJ)", factor: 1000 },
      { id: "erg", label: "erg", factor: 1e-7 },
      { id: "cal", label: "calorie thermochimique", factor: 4.184 },
      { id: "calit", label: "calorie IT", factor: 4.1868 },
      { id: "kcal", label: "kilocalorie", factor: 4184 },
      { id: "wh", label: "wattheure (Wh)", factor: 3600 },
      { id: "kwh", label: "kilowattheure (kWh)", factor: 3.6e6 },
      { id: "th", label: "thermie", factor: 4.18e6 },
      { id: "cvh", label: "chevalheure", factor: 2.648e6 },
      { id: "btu", label: "BTU", factor: 1055 },
      { id: "ev", label: "electronvolt", factor: 1.602e-19 },
      { id: "frigorie", label: "frigorie", factor: 4180 }
    ]
  },
  power: {
    label: "Puissances",
    base: "W",
    units: [
      { id: "w", label: "watt (W)", factor: 1 },
      { id: "kw", label: "kilowatt (kW)", factor: 1000 },
      { id: "cv", label: "cheval-vapeur (cv)", factor: 735.5 },
      { id: "frigh", label: "frigorie par heure", factor: 1.161 },
      { id: "kcalh", label: "kcal/h", factor: 1.163 },
      { id: "btuh", label: "BTU/h", factor: 0.293071 }
    ]
  },
  angle: {
    label: "Angles",
    base: "degre",
    units: [
      { id: "deg", label: "degre", factor: 1 },
      { id: "rad", label: "radian", factor: 180 / Math.PI },
      { id: "grad", label: "grade", factor: 0.9 },
      { id: "min", label: "minute", factor: 1 / 60 },
      { id: "sec", label: "seconde", factor: 1 / 3600 }
    ]
  },
  temperature: {
    label: "Temperatures",
    base: "C",
    units: [
      { id: "c", label: "Celsius (deg C)" },
      { id: "f", label: "Fahrenheit (deg F)" },
      { id: "k", label: "Kelvin (K)" }
    ]
  }
};

const conversionReferences = [
  ["Distances", "1 in = 25,4 mm", "1 mile nautique UK = 1,85319 km", "1 mile = 1,609347 km"],
  ["Surfaces", "1 ha = 10 000 m2", "1 acre = 0,404686 ha", "1 sq ft = 0,0929 m2"],
  ["Volumes", "1 litre = 1e-3 m3", "1 tonneau de mer = 1,44 m3", "1 tonneau de jauge = 2,832 m3"],
  ["Masses", "1 pound = 0,4536 kg", "1 ounce = 28,35 g", "1 quintal = 100 kg"],
  ["Energies", "1 kWh = 3,6e6 J", "1 BTU = 1,055e3 J", "1 kcal = 4184 J"],
  ["Pressions", "1 atm = 1,01325 bar", "1 mm Hg = 133,3 Pa", "1 Pa = 1e-5 bar"],
  ["Puissances", "1 cv = 735,5 W", "1 frigorie/h = 1,161 W", "1 kcal/h = 1,163 W"],
  ["Temperatures", "deg F = 1,8 x deg C + 32", "K = deg C + 273,15", ""]
];

module.exports = {
  conversionGroups,
  conversionReferences
};
