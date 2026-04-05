interface BurdenGaugeProps {
  label: string;
  burden: number;
  guardrail: number;
}

export function BurdenGauge({ label, burden, guardrail }: BurdenGaugeProps) {
  const isBankrupt = burden > guardrail;
  const burdenPct = burden * 100;
  const guardrailPct = guardrail * 100;
  const maxDisplay = 150;
  const fillPct = Math.min((burdenPct / maxDisplay) * 100, 100);
  const guardrailPos = Math.min((guardrailPct / maxDisplay) * 100, 100);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
          Dynamic Guardrail ({label})
        </span>
        <span className="text-xs font-bold text-[#d97706] font-mono">
          {guardrailPct.toFixed(1)}%
        </span>
      </div>

      <div className={`text-3xl font-black mb-3 ${isBankrupt ? "text-[#dc2626]" : "text-[#16a34a]"}`}>
        Burden: {burdenPct.toFixed(1)}%
      </div>

      <div className="relative h-4 bg-[#f1f5f9] rounded-full overflow-visible">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isBankrupt
              ? "bg-gradient-to-r from-[#dc2626] to-[#b91c1c]"
              : "bg-gradient-to-r from-[#16a34a] to-[#15803d]"
          }`}
          style={{ width: `${fillPct}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#d97706] z-10"
          style={{ left: `${guardrailPos}%` }}
        />
        <div
          className="absolute top-full mt-1 text-[10px] text-[#d97706] -translate-x-1/2"
          style={{ left: `${guardrailPos}%` }}
        >
          {guardrailPct.toFixed(0)}%
        </div>
      </div>

      <div className="flex justify-between text-xs text-[#9ca3af] mt-5">
        <span>0%</span>
        <span>75%</span>
        <span>150%+</span>
      </div>
    </div>
  );
}
