import type { RouteData } from "../data/routes";

export interface EngineInputs {
  netIncome: number;
  rent: number;
  workingDays: number;
  workingHours: number;
  carPrice: number;
  insurance: number;
  parking: number;
  route: RouteData;
  selectedRouteName: string;
}

export interface DriveMetrics {
  oneWayMins: number;
  monthlyKm: number;
  monthlyHours: number;
  depreciation: number;
  fuelCost: number;
  maintenanceCost: number;
  totalMEngine: number;
  timeTax: number;
  xRate: number;
  guardrail: number;
  burden: number;
}

export interface TransitMetrics {
  systemFailure: boolean;
  oneWayMins: number;
  monthlyHours: number;
  monthlyCost: number;
  timeTax: number;
  xRate: number;
  guardrail: number;
  burden: number;
  frictionLabel: string;
  qualityLabel: string;
}

export interface CommuteMetrics {
  realHourlyWage: number;
  monthlyWorkingHours: number;
  monthlyTrips: number;
  drive: DriveMetrics;
  transit: TransitMetrics;
}

export function computeMetrics(inputs: EngineInputs): CommuteMetrics {
  const { netIncome, rent, workingDays, workingHours, carPrice, insurance, parking, route } = inputs;

  const monthlyWorkingHours = workingDays * workingHours;
  const realHourlyWage = monthlyWorkingHours > 0 ? netIncome / monthlyWorkingHours : 0;
  const monthlyTrips = workingDays * 2;

  // --- M-Engine (Driving) ---
  const driveOneWayMins = route.dist * route.c;
  const driveMonthlyKm = route.dist * monthlyTrips;
  const driveMonthlyHours = (driveOneWayMins * monthlyTrips) / 60;

  const depreciation = (carPrice * 0.15918) / 12;
  const fuelCost = (driveMonthlyKm / 100) * 6.7 * 1.40;
  const maintenanceRate = driveMonthlyKm > 0 ? 890 / (driveMonthlyKm * 12) : 0;
  const maintenanceCost = driveMonthlyKm * maintenanceRate;
  const totalMEngine = depreciation + insurance + parking + fuelCost + maintenanceCost;

  const driveTimeTax = driveMonthlyHours * (realHourlyWage * 0.5);
  const driveXRate = monthlyWorkingHours > 0 ? (driveMonthlyHours * 0.5) / monthlyWorkingHours : 0;
  const driveGuardrail = 0.45 + driveXRate;
  const driveBurden = netIncome > 0 ? (rent + totalMEngine + driveTimeTax) / netIncome : 0;

  // --- PT-Engine (Transit) ---
  let monthlyCost = 0;
  for (let i = 1; i <= monthlyTrips; i++) {
    if (i <= 35) {
      monthlyCost += route.pt_fare;
    } else if (i <= 40) {
      monthlyCost += route.pt_fare * 0.14;
    }
    // i > 40: free (PRESTO cap)
  }

  const ptSystemFailure = route.pt_am === 999.0 || route.pt_pm === 999.0;

  let transitOneWayMins = 0;
  let transitMonthlyHours = 0;
  let transitTimeTax = 0;
  let transitXRate = 0;

  if (!ptSystemFailure) {
    transitOneWayMins = (route.pt_am + route.pt_pm) / 2;
    transitMonthlyHours = (transitOneWayMins * monthlyTrips) / 60;
    transitTimeTax = transitMonthlyHours * (realHourlyWage * 0.5);
    transitXRate = monthlyWorkingHours > 0 ? (transitMonthlyHours * 0.5) / monthlyWorkingHours : 0;
  }

  const transitGuardrail = 0.45 + transitXRate;
  const transitBurden = netIncome > 0 ? (rent + monthlyCost + transitTimeTax) / netIncome : 0;

  const frictionLabel =
    route.pt_transfers === 0
      ? "Seamless"
      : route.pt_transfers === 1
      ? "Moderate Friction"
      : "Extreme Cognitive Load";

  const qualityLabel = route.pt_mode.includes("Bus") ? "Dead Time (High Drain)" : "Productive Time";

  return {
    realHourlyWage,
    monthlyWorkingHours,
    monthlyTrips,
    drive: {
      oneWayMins: driveOneWayMins,
      monthlyKm: driveMonthlyKm,
      monthlyHours: driveMonthlyHours,
      depreciation,
      fuelCost,
      maintenanceCost,
      totalMEngine,
      timeTax: driveTimeTax,
      xRate: driveXRate,
      guardrail: driveGuardrail,
      burden: driveBurden,
    },
    transit: {
      systemFailure: ptSystemFailure,
      oneWayMins: transitOneWayMins,
      monthlyHours: transitMonthlyHours,
      monthlyCost,
      timeTax: transitTimeTax,
      xRate: transitXRate,
      guardrail: transitGuardrail,
      burden: transitBurden,
      frictionLabel,
      qualityLabel,
    },
  };
}
