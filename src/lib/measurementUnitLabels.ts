import { MeasurementUnit } from "@/lib/enum/MeasurementUnit";

export const measurementUnitLabels: Record<MeasurementUnit, { singular: string; plural: string }> =
  {
    G: { singular: "g", plural: "g" },
    KG: { singular: "kg", plural: "kg" },
    MG: { singular: "mg", plural: "mg" },
    ML: { singular: "ml", plural: "ml" },
    L: { singular: "l", plural: "l" },
    UN: { singular: "unidade", plural: "unidades" },

    COLHER: { singular: "Colher", plural: "Colheres" },
    COLHER_CHA: { singular: "Colher de Chá", plural: "Colheres de Chá" },
    COLHER_SOPA: { singular: "Colher de Sopa", plural: "Colheres de Sopa" },

    XICARA: { singular: "Xícara", plural: "Xícaras" },
    PITADA: { singular: "Pitada", plural: "Pitadas" },
  };
