import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  netIncome: number; setNetIncome: Dispatch<SetStateAction<number>>;
  rent: number; setRent: Dispatch<SetStateAction<number>>;
  workingDays: number; setWorkingDays: Dispatch<SetStateAction<number>>;
  workingHours: number; setWorkingHours: Dispatch<SetStateAction<number>>;
  selectedRoute: string; setSelectedRoute: Dispatch<SetStateAction<string>>;
  carPrice: number; setCarPrice: Dispatch<SetStateAction<number>>;
  insurance: number; setInsurance: Dispatch<SetStateAction<number>>;
  parking: number; setParking: Dispatch<SetStateAction<number>>;
  routeKeys: string[];
}

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-[#6b7280] mb-1">{children}</label>;
}

function NumberInput({ value, onChange, step = 100 }: { value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <input
      type="number"
      value={value}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full bg-white border border-[#d1d5db] text-[#1a1f2e] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#0284c7] transition-colors"
    />
  );
}

function RangeInput({ value, onChange, min, max, label }: { value: number; onChange: (v: number) => void; min: number; max: number; label?: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-[#6b7280] mb-1">
        <span>{label}</span>
        <span className="text-[#1a1f2e] font-semibold">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#dc2626] cursor-pointer"
      />
      <div className="flex justify-between text-xs text-[#9ca3af] mt-0.5">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-3 px-4">
        {title}
      </h3>
      <div className="px-4 space-y-3">{children}</div>
    </div>
  );
}

export function Sidebar(props: SidebarProps) {
  const {
    netIncome, setNetIncome,
    rent, setRent,
    workingDays, setWorkingDays,
    workingHours, setWorkingHours,
    selectedRoute, setSelectedRoute,
    carPrice, setCarPrice,
    insurance, setInsurance,
    parking, setParking,
    routeKeys,
  } = props;

  return (
    <aside className="w-72 flex-shrink-0 bg-white border-r border-[#e0e4ed] overflow-y-auto shadow-sm">
      <div className="py-5">
        <div className="px-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚦</span>
            <span className="text-sm font-bold text-[#1a1f2e]">Parameters</span>
          </div>
        </div>

        <SidebarSection title="Global Parameters">
          <div>
            <SidebarLabel>Monthly Net Income ($)</SidebarLabel>
            <NumberInput value={netIncome} onChange={setNetIncome} step={100} />
          </div>
          <div>
            <SidebarLabel>Expected Monthly Rent ($)</SidebarLabel>
            <NumberInput value={rent} onChange={setRent} step={100} />
          </div>
        </SidebarSection>

        <SidebarSection title="Work Intensity">
          <RangeInput value={workingDays} onChange={setWorkingDays} min={10} max={25} label="Working Days / Month" />
          <RangeInput value={workingHours} onChange={setWorkingHours} min={4} max={12} label="Daily Working Hours" />
        </SidebarSection>

        <SidebarSection title="Geographic Arbitrage">
          <div>
            <SidebarLabel>O-D Matrix Route</SidebarLabel>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="w-full bg-white border border-[#d1d5db] text-[#1a1f2e] rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#0284c7] transition-colors"
            >
              {routeKeys.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </SidebarSection>

        <SidebarSection title="M-Engine Variables">
          <div>
            <SidebarLabel>Used Car Purchase Price ($)</SidebarLabel>
            <NumberInput value={carPrice} onChange={setCarPrice} step={1000} />
          </div>
          <div>
            <SidebarLabel>Monthly Car Insurance ($)</SidebarLabel>
            <NumberInput value={insurance} onChange={setInsurance} step={10} />
          </div>
          <div>
            <SidebarLabel>Expected Monthly Parking ($)</SidebarLabel>
            <NumberInput value={parking} onChange={setParking} step={10} />
          </div>
        </SidebarSection>
      </div>
    </aside>
  );
}
