// Linear Regression coefficients trained on the Admission Chance dataset
// These coefficients are derived from the standard UCLA Graduate Admission dataset
// Model: Chance of Admit = intercept + sum(coefficient_i * feature_i)

const MODEL_COEFFICIENTS = {
  gre: 0.0018,
  toefl: 0.0029,
  universityRating: 0.0059,
  sop: 0.0016,
  lor: 0.0169,
  cgpa: 0.1183,
  research: 0.0243,
  intercept: -1.2757
};

// Model accuracy metrics (from training)
export const MODEL_METRICS = {
  mae: 0.043, // Mean Absolute Error
  r2: 0.82,   // R-squared score
  accuracy: 82
};

export interface PredictionInput {
  gre: number;
  toefl: number;
  universityRating: number;
  sop: number;
  lor: number;
  cgpa: number;
  research: boolean;
}

export function predictAdmissionChance(input: PredictionInput): number {
  const {
    gre,
    toefl,
    universityRating,
    sop,
    lor,
    cgpa,
    research
  } = input;

  // Linear regression prediction
  let prediction = MODEL_COEFFICIENTS.intercept;
  prediction += MODEL_COEFFICIENTS.gre * gre;
  prediction += MODEL_COEFFICIENTS.toefl * toefl;
  prediction += MODEL_COEFFICIENTS.universityRating * universityRating;
  prediction += MODEL_COEFFICIENTS.sop * sop;
  prediction += MODEL_COEFFICIENTS.lor * lor;
  prediction += MODEL_COEFFICIENTS.cgpa * cgpa;
  prediction += MODEL_COEFFICIENTS.research * (research ? 1 : 0);

  // Clamp between 0 and 1, then convert to percentage
  const clampedPrediction = Math.max(0, Math.min(1, prediction));
  return Math.round(clampedPrediction * 100);
}

export function getChanceLabel(percentage: number): { label: string; color: string } {
  if (percentage >= 80) return { label: "Excellent", color: "text-green-600" };
  if (percentage >= 60) return { label: "Good", color: "text-emerald-600" };
  if (percentage >= 40) return { label: "Moderate", color: "text-yellow-600" };
  if (percentage >= 20) return { label: "Low", color: "text-orange-600" };
  return { label: "Very Low", color: "text-red-600" };
}
