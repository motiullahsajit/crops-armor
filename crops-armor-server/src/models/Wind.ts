import { Schema, model } from "mongoose";

export interface Wind {
  YEAR: number;
  JAN: number;
  FEB: number;
  MAR: number;
  APR: number;
  MAY: number;
  JUN: number;
  JUL: number;
  AUG: number;
  SEP: number;
  OCT: number;
  NOV: number;
  DEC: number;
  ANN: number;
}

const windSchema = new Schema<Wind>({
  YEAR: { type: Number, required: true },
  JAN: { type: Number, required: true },
  FEB: { type: Number, required: true },
  MAR: { type: Number, required: true },
  APR: { type: Number, required: true },
  MAY: { type: Number, required: true },
  JUN: { type: Number, required: true },
  JUL: { type: Number, required: true },
  AUG: { type: Number, required: true },
  SEP: { type: Number, required: true },
  OCT: { type: Number, required: true },
  NOV: { type: Number, required: true },
  DEC: { type: Number, required: true },
  ANN: { type: Number, required: true },
});

export default model<Wind>("Wind", windSchema);
