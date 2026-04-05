import { CommuteMetrics } from "../lib/engine";
import { CostBar } from "./CostBar";

interface DilemmaTabProps {
  metrics: CommuteMetrics;
  rent: number;
  selectedRoute: string;
}

function BurdenRow({
  label,
  burden,
  guardrail,
  icon,
}: {
  label: string;
  burden: number;
  guardrail: number;
  icon: string;
}) {
  const isBankrupt = burden > guardrail;
  const pct = Math.min(burden * 100, 200);
  const guardrailPct = Math.min(guardrail * 100, 200);

  return (
    <div className="bg-[#13151f] border border-[#1e2133] rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <span className="font-semibold text-white">{label}</span>
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span className={`text-3xl font-black ${isBankrupt ? "text-[#ef4444]" : "text-[#10b981]"}`}>
          {(burden * 100).toFixed(1)}%
        </span>
        <span className="text-xs text-[#6b7280] mb-1">burden ratio</span>
      </div>
      <div className="relative h-2 bg-[#1e2133] rounded-full overflow-visible mb-1">
        <div
          className={`h-full rounded-full transition-all ${isBankrupt ? "bg-[#ef4444]" : "bg-[#10b981]"}`}
          style={{ width: `${Math.min((pct / 150) * 100, 100)}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#f59e0b]"
          style={{ left: `${Math.min((guardrailPct / 150) * 100, 100)}%` }}
          title={`Guardrail: ${guardrailPct.toFixed(1)}%`}
        />
      </div>
      <div className="flex justify-between text-xs text-[#6b7280]">
        <span>0%</span>
        <span className="text-[#f59e0b]">Guardrail: {(guardrail * 100).toFixed(1)}%</span>
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
      { label: "Rent", value: rent, color: "#4fc3f7" },
      { label: "Cash Drain", value: drive.totalMEngine, color: "#ef4444" },
      { label: "Time Tax", value: drive.timeTax, color: "#ec4899" },
    ];

    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-1">A/B Utility Comparison</h2>
        <div className="mb-6 p-4 bg-[#f59e0b18] border border-[#f59e0b40] rounded-xl">
          <p className="text-sm font-semibold text-[#f59e0b] mb-1">Qualitative Override</p>
          <p className="text-xs text-[#fde68a]">
            Transit is systematically unviable for this route. You are a{" "}
            <strong>Captive Driver</strong>, forced to absorb the financial burden of car ownership
            regardless of the mathematical output.
          </p>
        </div>
        <BurdenRow label="Option A: Drive" burden={drive.burden} guardrail={drive.guardrail} icon="🚗" />
        <div className="mt-6 bg-[#13151f] border border-[#1e2133] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#a0a0b0] mb-4 uppercase tracking-wider">
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

  const combinedBreakdown = [
    { label: "Rent", drive: rent, transit: rent },
    { label: "Cash Drain", drive: drive.totalMEngine, transit: transit.monthlyCost },
    { label: "Time Tax", drive: drive.timeTax, transit: transit.timeTax },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-white mb-1">A/B Utility Comparison</h2>

      {isExtreme && (
        <div className="mb-5 p-4 bg-[#f59e0b18] border border-[#f59e0b40] rounded-xl">
          <p className="text-sm font-semibold text-[#f59e0b] mb-1">Qualitative Override</p>
          <p className="text-xs text-[#fde68a]">
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
          <div className="p-5 bg-[#ef444420] border border-[#ef444450] rounded-xl">
            <p className="text-base font-bold text-[#ef4444] mb-2">THE NO-WIN DILEMMA</p>
            <p className="text-sm text-[#fca5a5]">
              Both options breach your sustainability guardrail. Driving bankrupts your wallet; Transit
              bankrupts your time. This geographic location is fundamentally unviable for your income
              and theoretical workload.
            </p>
          </div>
        )}
        {driveWins && (
          <div className="p-5 bg-[#10b98120] border border-[#10b98140] rounded-xl">
            <p className="text-base font-bold text-[#10b981] mb-2">Recommendation: Drive</p>
            <p className="text-sm text-[#6ee7b7]">
              Despite the high sunk costs, the transit network is too inefficient. Driving preserves
              more of your total utility.
            </p>
          </div>
        )}
        {transitWins && (
          <div className="p-5 bg-[#4fc3f720] border border-[#4fc3f740] rounded-xl">
            <p className="text-base font-bold text-[#4fc3f7] mb-2">Recommendation: Transit</p>
            <p className="text-sm text-[#bae6fd]">
              The PRESTO fare caps successfully protect your utility. Transit is the mathematically
              optimal choice.
            </p>
          </div>
        )}
      </div>

      <div className="bg-[#13151f] border border-[#1e2133] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#a0a0b0] mb-5 uppercase tracking-wider">
          Cost Structure Visualizer
        </h3>
        <ComparisonBars items={combinedBreakdown} />
      </div>
    </div>
  );
}

function ComparisonBars({
  items,
}: {
  items: { label: string; drive: number; transit: number }[];
}) {
  const allValues = items.flatMap((i) => [i.drive, i.transit]);
  const max = Math.max(...allValues, 1);

  return (
    <div className="space-y-5">
      {items.map((item) => (
        <div key={item.label}>
          <div className="text-xs text-[#6b7280] mb-2 font-medium">{item.label}</div>
          <div className="space-y-1.5">
            <BarRow
              label="Drive"
              value={item.drive}
              max={max}
              color="#ef4444"
            />
            <BarRow
              label="Transit"
              value={item.transit}
              max={max}
              color="#4fc3f7"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function BarRow({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#6b7280] w-12 flex-shrink-0">{label}</span>
      <div className="flex-1 bg-[#1e2133] rounded-full h-5 relative overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-medium text-white w-16 text-right">
        ${value.toLocaleString("en-CA", { maximumFractionDigits: 0 })}
      </span>
    </div>
  );
}
