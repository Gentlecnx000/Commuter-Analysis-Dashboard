interface CostBarItem {
  label: string;
  value: number;
  color: string;
}

export function CostBar({ items }: { items: CostBarItem[] }) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const pct = (item.value / max) * 100;
        return (
          <div key={item.label} className="flex items-center gap-3">
            <div className="w-24 text-xs text-[#6b7280] text-right flex-shrink-0">{item.label}</div>
            <div className="flex-1 bg-[#f1f5f9] rounded-full h-6 relative overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${pct}%`, backgroundColor: item.color }}
              />
              <div className="absolute inset-0 flex items-center px-2">
                <span className="text-xs font-medium text-white drop-shadow">
                  ${item.value.toLocaleString("en-CA", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
