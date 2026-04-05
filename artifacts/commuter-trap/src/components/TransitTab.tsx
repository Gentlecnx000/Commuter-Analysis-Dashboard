import { CommuteMetrics } from "../lib/engine";
import { RouteData } from "../data/routes";
import { BurdenGauge } from "./BurdenGauge";
import { CostBar } from "./CostBar";

interface TransitTabProps {
  metrics: CommuteMetrics;
  rent: number;
  selectedRoute: string;
  route: RouteData;
}

function InfoRow({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-xs text-[#6b7280] flex-shrink-0">{label}</span>
      <span className={`text-sm text-right font-medium ${valueClass || "text-white"}`}>{value}</span>
    </div>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="bg-[#0f1117] rounded-lg p-3 border border-[#1e2133]">
      <p className="text-xs text-[#6b7280] mb-1">{label}</p>
      <p className={`text-lg font-bold ${accent === "orange" ? "text-[#f97316]" : "text-[#4fc3f7]"}`}>
        {value}
      </p>
    </div>
  );
}

function TransferBadge({ count }: { count: number }) {
  const color = count === 0 ? "text-[#10b981] bg-[#10b98118]" : count === 1 ? "text-[#f59e0b] bg-[#f59e0b18]" : "text-[#ef4444] bg-[#ef444418]";
  const label = count === 0 ? "Seamless" : count === 1 ? "Moderate Friction" : "Extreme Cognitive Load";
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${color}`}>
      {count} transfer{count !== 1 ? "s" : ""} — {label}
    </span>
  );
}

export function TransitTab({ metrics, rent, route }: TransitTabProps) {
  const { transit } = metrics;

  if (transit.systemFailure) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-1">Public Transit Analysis</h2>
        <p className="text-sm text-[#6b7280] mb-6">
          Characterized by Artificial Price Caps and Systemic Friction.
        </p>
        <div className="p-5 bg-[#ef444420] border border-[#ef444450] rounded-xl">
          <p className="text-lg font-bold text-[#ef4444] mb-2">
            SYSTEMIC TRANSIT FAILURE
          </p>
          <p className="text-sm text-[#fca5a5]">
            This route is mathematically or physically impossible during the morning peak. No viable
            AM transit service exists for this origin-destination pair. You are a{" "}
            <strong>Captive Driver</strong>, forced to absorb the financial burden of car ownership
            regardless of the mathematical output.
          </p>
        </div>
      </div>
    );
  }

  const isBankrupt = transit.burden > transit.guardrail;
  const qualityClass = route.pt_mode.includes("Bus") ? "text-[#f59e0b]" : "text-[#10b981]";

  const breakdown = [
    { label: "Rent", value: rent, color: "#4fc3f7" },
    { label: "PRESTO Fare", value: transit.monthlyCost, color: "#7c3aed" },
    { label: "Time Tax", value: transit.timeTax, color: "#ec4899" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-white mb-1">Public Transit Analysis</h2>
      <p className="text-sm text-[#6b7280] mb-6">
        Characterized by Artificial Price Caps and Systemic Friction.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#13151f] border border-[#1e2133] rounded-xl p-5 space-y-3">
          <InfoRow label="Primary Mode" value={route.pt_mode} />
          <InfoRow label="Est. One-Way Time" value={`${transit.oneWayMins.toFixed(0)} mins`} />
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#6b7280]">Network Friction</span>
            <TransferBadge count={route.pt_transfers} />
          </div>
          <InfoRow
            label="Time Quality"
            value={transit.qualityLabel}
            valueClass={qualityClass}
          />
          <div className="border-t border-[#1e2133] pt-3 grid grid-cols-2 gap-3">
            <MetricCard
              label="PRESTO Cost (Capped)"
              value={`$${transit.monthlyCost.toLocaleString("en-CA", { maximumFractionDigits: 0 })}`}
            />
            <MetricCard
              label="Total Time Tax"
              value={`$${transit.timeTax.toLocaleString("en-CA", { maximumFractionDigits: 0 })}`}
              accent="orange"
            />
          </div>
        </div>

        <div className="bg-[#13151f] border border-[#1e2133] rounded-xl p-5">
          <BurdenGauge label="PT-Engine" burden={transit.burden} guardrail={transit.guardrail} />
          {isBankrupt ? (
            <div className="mt-4 p-3 bg-[#ef444420] border border-[#ef444440] rounded-lg">
              <p className="text-sm font-semibold text-[#ef4444] mb-1">Temporal Bankruptcy</p>
              <p className="text-xs text-[#fca5a5]">
                The systemic friction of this route extracts too much of your utility via the Time
                Tax.
              </p>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-[#10b98120] border border-[#10b98140] rounded-lg">
              <p className="text-sm font-semibold text-[#10b981]">Sustainable</p>
              <p className="text-xs text-[#6ee7b7]">Transit remains within your utility guardrail.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#13151f] border border-[#1e2133] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#a0a0b0] mb-4 uppercase tracking-wider">
          Cost Structure Breakdown (PT-Engine)
        </h3>
        <CostBar items={breakdown} />
      </div>
    </div>
  );
}
