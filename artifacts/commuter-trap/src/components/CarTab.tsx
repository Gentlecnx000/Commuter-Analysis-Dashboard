import { CommuteMetrics } from "../lib/engine";
import { BurdenGauge } from "./BurdenGauge";
import { CostBar } from "./CostBar";

interface CarTabProps {
  metrics: CommuteMetrics;
  rent: number;
  insurance: number;
  parking: number;
}

function InfoRow({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-xs text-[#6b7280] flex-shrink-0">{label}</span>
      <span className={`text-sm text-right font-medium ${valueClass || "text-[#1a1f2e]"}`}>{value}</span>
    </div>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="bg-[#f8fafc] rounded-lg p-3 border border-[#e0e4ed]">
      <p className="text-xs text-[#6b7280] mb-1">{label}</p>
      <p className={`text-lg font-bold ${accent === "orange" ? "text-[#ea580c]" : "text-[#0284c7]"}`}>
        {value}
      </p>
    </div>
  );
}

export function CarTab({ metrics, rent, insurance, parking }: CarTabProps) {
  const { drive } = metrics;
  const isBankrupt = drive.burden > drive.guardrail;
  const distOneWay = drive.monthlyKm / metrics.monthlyTrips;

  const breakdown = [
    { label: "Rent", value: rent, color: "#0284c7" },
    { label: "Depreciation", value: drive.depreciation, color: "#7c3aed" },
    { label: "Insurance", value: insurance, color: "#d97706" },
    { label: "Parking", value: parking, color: "#059669" },
    { label: "Fuel", value: drive.fuelCost, color: "#dc2626" },
    { label: "Maintenance", value: drive.maintenanceCost, color: "#ea580c" },
    { label: "Time Tax", value: drive.timeTax, color: "#db2777" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#1a1f2e] mb-1">Car Ownership Analysis</h2>
      <p className="text-sm text-[#6b7280] mb-6">Characterized by High Sunk Costs and Fixed Cash Drain.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-[#e0e4ed] rounded-xl p-5 space-y-3 shadow-sm">
          <InfoRow label="Physical Distance (one-way)" value={`${distOneWay.toFixed(1)} km`} />
          <InfoRow label="Est. One-Way Time" value={`${drive.oneWayMins.toFixed(0)} mins`} />
          <InfoRow
            label="Time Quality"
            value="High-Stress Dead Time (100% Focus Required)"
            valueClass="text-[#dc2626]"
          />
          <div className="border-t border-[#e0e4ed] pt-3 grid grid-cols-2 gap-3">
            <MetricCard
              label="Total Monthly Cash Drain"
              value={`$${drive.totalMEngine.toLocaleString("en-CA", { maximumFractionDigits: 0 })}`}
            />
            <MetricCard
              label="Total Time Tax"
              value={`$${drive.timeTax.toLocaleString("en-CA", { maximumFractionDigits: 0 })}`}
              accent="orange"
            />
          </div>
        </div>

        <div className="bg-white border border-[#e0e4ed] rounded-xl p-5 shadow-sm">
          <BurdenGauge label="M-Engine" burden={drive.burden} guardrail={drive.guardrail} />
          {isBankrupt ? (
            <div className="mt-4 p-3 bg-[#fef2f2] border border-[#fecaca] rounded-lg">
              <p className="text-sm font-semibold text-[#dc2626] mb-1">Financial Bankruptcy</p>
              <p className="text-xs text-[#991b1b]">
                This route creates an unsustainable financial bleed when driving. Fixed costs like
                Insurance and Parking consume too much net income.
              </p>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg">
              <p className="text-sm font-semibold text-[#16a34a]">Sustainable</p>
              <p className="text-xs text-[#166534]">This route is within your financial guardrail.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-[#e0e4ed] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#6b7280] mb-4 uppercase tracking-wider">
          Cost Structure Breakdown (M-Engine)
        </h3>
        <CostBar items={breakdown} />
      </div>
    </div>
  );
}
