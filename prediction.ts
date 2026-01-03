interface InputData {
  gre: number;
  toefl: number;
  cgpa: number;
  research: boolean;
}

export function predictChance(data: InputData): number {
  const greScore = data.gre / 340;
  const toeflScore = data.toefl / 120;
  const cgpaScore = data.cgpa / 10;

  let chance =
    greScore * 0.4 +
    toeflScore * 0.3 +
    cgpaScore * 0.25 +
    (data.research ? 0.05 : 0);

  return Math.min(Math.max(chance * 100, 0), 100);
}
