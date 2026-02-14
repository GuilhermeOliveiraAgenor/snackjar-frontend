import { MeasurementUnit } from "./enum/MeasurementUnit";
import { measurementUnitLabels } from "./measurementUnitLabels";

export function formatMeasurementUnit(unit: string, amount: string) {
  const value = Number(amount);

  const labels = measurementUnitLabels[unit as MeasurementUnit];

  if (!labels) return unit;

  return value === 1 ? labels.singular : labels.plural;
}
