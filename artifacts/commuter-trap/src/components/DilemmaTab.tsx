import { CommuteMetrics } from "../lib/engine";
import { CostBar } from "./CostBar";

interface DilemmaTabProps {
  metrics: CommuteMetrics;
  rent: number;
  selectedRoute: string;
}

function BurdenRow({ label, burden, guardrail, icon }: { label: string; burden: number; guardrail: number; icon: string }) {
  const isBankrupt = burden > guardrail;
  const maxDisplay = 150;
  const fillPct = Math.min((burden * 100 / maxDisplay) * 100, 100);
  const guardrailPos = Math.min((guardrail * 100 / maxDisplay) * 100, 100);

  return (
    <div className="bg-white border border-[#e0e4ed] rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <span className="font-semibold text-[#1a1f2e]">{label}</span>
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span className={`text-3xl font-black ${isBankrupt ? "text-[#dc2626]" : "text-[#16a34a]"}`}>
          {(burden * 100).toFixed(1)}%
        </span>
        <span className="text-xs text-[#6b7280] mb-1">burden ratio</span>
      </div>
      <div className="relative h-2 bg-[#f1f5f9] rounded-full overflow-visible mb-1">
        <div
          className={`h-full rounded-full transition-all ${isBankrupt ? "bg-[#dc2626]" : "bg-[#16a34a]"}`}
          style={{ width: `${fillPct}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#d97706]"
          style={{ left: `${guardrailPos}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-[#9ca3af]">
        <span>0%</span>
        <span className="text-[#d97706]">Guardrail: {(guardrail * 100).toFixed(1)}%</span>
        <span>150%+</span>
      </div>
    </div>
  );
}

export function DilemmaTab({ metrics, rent, selectedRoute }: DilemmaTabProps) {
  const { drive, transit } = metrics;
  const isExtreme = selectedRoute.startsWith("Extreme") || selectedRoute.startsWith("Reverse");

  if (transit.systemFailure) {
    const driveBreakdown = [
      { label: "Rent", value: rent, color: "#0284c7" },
      { label: "Cash Drain", value: drive.totalMEngine, color: "#dc2626" },
      { label: "Time Tax", value: drive.timeTax, color: "#db2777" },
    ];
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#1a1f2e] mb-1">A/B Utility Comparison</h2>
        <div className="mb-6 p-4 bg-[#fffbeb] border border-[#fde68a] rounded-xl">
          <p className="text-sm font-semibold text-[#b45309] mb-1">Qualitative Override</p>
          <p className="text-xs text-[#92400e]">
            Transit is systematically unviable for this route. You are a{" "}
            <strong>Captive Driver</strong>, forced to absorb the financial burden of car ownership
            regardless of the mathematical output.
          </p>
        </div>
        <BurdenRow label="Option A: Drive" burden={drive.burden} guardrail={drive.guardrail} icon="🚗" />
        <div className="mt-6 bg-white border border-[#e0e4ed] rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#6b7280] mb-4 uppercase tracking-wider">
            Cost Structure (Driving Only)
          </h3>
          <CostBar items={driveBreakdown} />
        </div>
      </div>
    );
  }

  const bothBankrupt = drive.burden > drive.guardrail && transit.burden > transit.guardrail;
  const driveWins = !bothBankrupt && drive.burden < transit.burden;
  const transitWins = !bothBankrupt && transit.burden <= drive.burden;

  const combinedItems = [
    { label: "Rent", drive: rent, transit: rent },
    { label: "Cash Drain", drive: drive.totalMEngine, transit: transit.monthlyCost },
    { label: "Time Tax", drive: drive.timeTax, transit: transit.timeTax },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#1a1f2e] mb-1">A/B Utility Comparison</h2>

      {isExtreme && (
        <div className="mb-5 p-4 bg-[#fffbeb] border border-[#fde68a] rounded-xl">
          <p className="text-sm font-semibold text-[#b45309] mb-1">Qualitative Override</p>
          <p className="text-xs text-[#92400e]">
            While mathematics may favor transit due to PRESTO caps, ground-truth data indicates
            severe Schedule Delay Penalties (SDP) for this non-traditional corridor. Low morning
            frequencies may practically force car ownership.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <BurdenRow label="Option A: Drive" burden={drive.burden} guardrail={drive.guardrail} icon="🚗" />
        <BurdenRow label="Option B: Transit" burden={transit.burden} guardrail={transit.guardrail} icon="🚌" />
      </div>

      <div className="mb-6">
        {bothBankrupt && (
          <div className="p-5 bg-[#fef2f2] border border-[#fecaca] rounded-xl">
            <p className="text-base font-bold text-[#dc2626] mb-2">THE NO-WIN DILEMMA</p>
            <p className="text-sm text-[#991b1b]">
              Both options breach your sustainability guardrail. Driving bankrupts your wallet; Transit
              bankrupts your time. This geographic location is fundamentally unviable for your income
              and theoretical workload.
            </p>
          </div>
        )}
        {driveWins && (
          <div className="p-5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl">
            <p className="text-base font-bold text-[#16a34a] mb-2">Recommendation: Drive</p>
            <p className="text-sm text-[#166534]">
              Despite the high sunk costs, the transit network is too inefficient. Driving preserves
              more of your total utility.
            </p>
          </div>
        )}
        {transitWins && (
          <div className="p-5 bg-[#eff6ff] border border-[#bfdbfe] rounded-xl">
            <p className="text-base font-bold text-[#1d4ed8] mb-2">Recommendation: Transit</p>
            <p className="text-sm text-[#1e3a8a]">
              The PRESTO fare caps successfully protect your utility. Transit is the mathematically
              optimal choice.
            </p>
          </div>
        )}
      </div>

      <div className="bg-white border border-[#e0e4ed] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#6b7280] mb-5 uppercase tracking-wider">
          Cost Structure Visualizer
        </h3>
        <ComparisonBars items={combinedItems} />
      </div>
    </div>
  );
}

function ComparisonBars({ items }: { items: { label: string; drive: number; transit: number }[] }) {
  const allValues = items.flatMap((i) => [i.drive, i.transit]);
  const max = Math.max(...allValues, 1);

  return (
    <div className="space-y-5">
      {items.map((item) => (
        <div key={item.label}>
          <div className="text-xs text-[#6b7280] mb-2 font-medium">{item.label}</div>
          <div className="space-y-1.5">
            <BarRow label="Drive" value={item.drive} max={max} color="#dc2626" />
            <BarRow label="Transit" value={item.transit} max={max} color="#0284c7" />
          </div>
        </div>
      ))}
    </div>
  );
}

function BarRow({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#6b7280] w-12 flex-shrink-0">{label}</span>
      <div className="flex-1 bg-[#f1f5f9] rounded-full h-5 relative overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
        <div className="absolute inset-0 flex items-center px-2">
          <span className="text-xs font-medium text-white drop-shadow">
            ${value.toLocaleString("en-CA", { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>
    </div>
  );
}
