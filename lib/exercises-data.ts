import type { Exercise } from "./types";

// Biblioteca predefinida de ejercicios comunes organizados por grupo muscular
export const PREDEFINED_EXERCISES: Exercise[] = [
  // PECHO
  {
    id: "press-banca",
    name: "Press de Banca",
    muscleGroup: "pecho",
    equipment: "Barra",
    isCustom: false,
  },
  {
    id: "press-banca-inclinado",
    name: "Press de Banca Inclinado",
    muscleGroup: "pecho",
    equipment: "Barra",
    isCustom: false,
  },
  {
    id: "press-mancuernas",
    name: "Press con Mancuernas",
    muscleGroup: "pecho",
    equipment: "Mancuernas",
    isCustom: false,
  },
  {
    id: "aperturas",
    name: "Aperturas con Mancuernas",
    muscleGroup: "pecho",
    equipment: "Mancuernas",
    isCustom: false,
  },
  {
    id: "fondos-pecho",
    name: "Fondos en Paralelas (Pecho)",
    muscleGroup: "pecho",
    equipment: "Peso corporal",
    isCustom: false,
  },

  // ESPALDA
  {
    id: "dominadas",
    name: "Dominadas",
    muscleGroup: "espalda",
    equipment: "Peso corporal",
    isCustom: false,
  },
  {
    id: "remo-barra",
    name: "Remo con Barra",
    muscleGroup: "espalda",
    equipment: "Barra",
    isCustom: false,
  },
  {
    id: "remo-mancuerna",
    name: "Remo con Mancuerna",
    muscleGroup: "espalda",
    equipment: "Mancuernas",
    isCustom: false,
  },
  {
    id: "peso-muerto",
    name: "Peso Muerto",
    muscleGroup: "espalda",
    equipment: "Barra",
    isCustom: false,
  },
  {
    id: "jalon-polea",
    name: "Jalón al Pecho",
    muscleGroup: "espalda",
    equipment: "Polea",
    isCustom: false,
  },

  // PIERNAS
  {
    id: "sentadilla",
    name: "Sentadilla",
    muscleGroup: "piernas",
    equipment: "Barra",
    isCustom: false,
  },
  {
    id: "prensa-piernas",
    name: "Prensa de Piernas",
    muscleGroup: "piernas",
    equipment: "Máquina",
    isCustom: false,
  },
  {
    id: "peso-muerto-rumano",
    name: "Peso Muerto Rumano",
    muscleGroup: "piernas",
    equipment: "Barra",
    isCustom: false,
  },
  {
    id: "zancadas",
    name: "Zancadas",
    muscleGroup: "piernas",
    equipment: "Mancuernas",
    isCustom: false,
  },
  {
    id: "curl-femoral",
    name: "Curl Femoral",
    muscleGroup: "piernas",
    equipment: "Máquina",
    isCustom: false,
  },
  {
    id: "extension-cuadriceps",
    name: "Extensión de Cuádriceps",
    muscleGroup: "piernas",
    equipment: "Máquina",
    isCustom: false,
  },
  {
    id: "elevacion-gemelos",
    name: "Elevación de Gemelos",
    muscleGroup: "piernas",
    equipment: "Máquina",
    isCustom: false,
  },

  // HOMBROS
  {
    id: "press-militar",
    name: "Press Militar",
    muscleGroup: "hombros",
    equipment: "Barra",
    isCustom: false,
  },
  {
    id: "press-hombros-mancuernas",
    name: "Press de Hombros con Mancuernas",
    muscleGroup: "hombros",
    equipment: "Mancuernas",
    isCustom: false,
  },
  {
    id: "elevaciones-laterales",
    name: "Elevaciones Laterales",
    muscleGroup: "hombros",
    equipment: "Mancuernas",
    isCustom: false,
  },
  {
    id: "elevaciones-frontales",
    name: "Elevaciones Frontales",
    muscleGroup: "hombros",
    equipment: "Mancuernas",
    isCustom: false,
  },
  {
    id: "pajaros",
    name: "Pájaros (Deltoides Posterior)",
    muscleGroup: "hombros",
    equipment: "Mancuernas",
    isCustom: false,
  },

  // BRAZOS
  {
    id: "curl-barra",
    name: "Curl con Barra",
    muscleGroup: "brazos",
    equipment: "Barra",
    isCustom: false,
  },
  {
    id: "curl-mancuernas",
    name: "Curl con Mancuernas",
    muscleGroup: "brazos",
    equipment: "Mancuernas",
    isCustom: false,
  },
  {
    id: "curl-martillo",
    name: "Curl Martillo",
    muscleGroup: "brazos",
    equipment: "Mancuernas",
    isCustom: false,
  },
  {
    id: "press-frances",
    name: "Press Francés",
    muscleGroup: "brazos",
    equipment: "Barra",
    isCustom: false,
  },
  {
    id: "extensiones-triceps",
    name: "Extensiones de Tríceps en Polea",
    muscleGroup: "brazos",
    equipment: "Polea",
    isCustom: false,
  },
  {
    id: "fondos-triceps",
    name: "Fondos para Tríceps",
    muscleGroup: "brazos",
    equipment: "Peso corporal",
    isCustom: false,
  },

  // ABDOMEN
  {
    id: "crunch",
    name: "Crunch Abdominal",
    muscleGroup: "abdomen",
    equipment: "Peso corporal",
    isCustom: false,
  },
  {
    id: "plancha",
    name: "Plancha",
    muscleGroup: "abdomen",
    equipment: "Peso corporal",
    isCustom: false,
  },
  {
    id: "elevacion-piernas",
    name: "Elevación de Piernas",
    muscleGroup: "abdomen",
    equipment: "Peso corporal",
    isCustom: false,
  },
  {
    id: "abdominales-bicicleta",
    name: "Abdominales en Bicicleta",
    muscleGroup: "abdomen",
    equipment: "Peso corporal",
    isCustom: false,
  },
  {
    id: "rueda-abdominal",
    name: "Rueda Abdominal",
    muscleGroup: "abdomen",
    equipment: "Rueda",
    isCustom: false,
  },

  // CARDIO
  {
    id: "correr",
    name: "Correr",
    muscleGroup: "cardio",
    equipment: "Cinta/Exterior",
    isCustom: false,
  },
  {
    id: "bicicleta",
    name: "Bicicleta Estática",
    muscleGroup: "cardio",
    equipment: "Bicicleta",
    isCustom: false,
  },
  {
    id: "eliptica",
    name: "Elíptica",
    muscleGroup: "cardio",
    equipment: "Elíptica",
    isCustom: false,
  },
  {
    id: "remo-cardio",
    name: "Remo (Cardio)",
    muscleGroup: "cardio",
    equipment: "Máquina de remo",
    isCustom: false,
  },
  {
    id: "saltar-cuerda",
    name: "Saltar la Cuerda",
    muscleGroup: "cardio",
    equipment: "Cuerda",
    isCustom: false,
  },
];

// Helper para obtener ejercicios por grupo muscular
export function getExercisesByMuscleGroup(
  muscleGroup: string,
  customExercises: Exercise[] = [],
): Exercise[] {
  const allExercises = [...PREDEFINED_EXERCISES, ...customExercises];
  return allExercises.filter((ex) => ex.muscleGroup === muscleGroup);
}

// Helper para buscar ejercicios
export function searchExercises(
  query: string,
  customExercises: Exercise[] = [],
): Exercise[] {
  const allExercises = [...PREDEFINED_EXERCISES, ...customExercises];
  const lowerQuery = query.toLowerCase();
  return allExercises.filter(
    (ex) =>
      ex.name.toLowerCase().includes(lowerQuery) ||
      ex.muscleGroup.toLowerCase().includes(lowerQuery) ||
      ex.equipment?.toLowerCase().includes(lowerQuery),
  );
}
