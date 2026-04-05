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
  return <label className="block text-xs font-medium text-[#a0a0b0] mb-1">{children}</label>;
}

function NumberInput({
  value,
  onChange,
  step = 100,
  min,
}: {
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      step={step}
      min={min}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full bg-[#1a1d2e] border border-[#2a2d3e] text-white rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#4fc3f7] transition-colors"
    />
  );
}

function RangeInput({
  value,
  onChange,
  min,
  max,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  label?: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs text-[#a0a0b0] mb-1">
        <span>{label}</span>
        <span className="text-white font-medium">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#ff6b6b] cursor-pointer"
      />
      <div className="flex justify-between text-xs text-[#555] mt-0.5">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6b7280] mb-3 px-4">
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
    <aside className="w-72 flex-shrink-0 bg-[#0d0f1a] border-r border-[#1e2133] overflow-y-auto">
      <div className="py-5">
        <div className="px-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚦</span>
            <span className="text-sm font-bold text-white">Parameters</span>
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
          <RangeInput
            value={workingDays}
            onChange={setWorkingDays}
            min={10}
            max={25}
            label="Working Days / Month"
          />
          <RangeInput
            value={workingHours}
            onChange={setWorkingHours}
            min={4}
            max={12}
            label="Daily Working Hours"
          />
        </SidebarSection>

        <SidebarSection title="Geographic Arbitrage">
          <div>
            <SidebarLabel>O-D Matrix Route</SidebarLabel>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="w-full bg-[#1a1d2e] border border-[#2a2d3e] text-white rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#4fc3f7] transition-colors"
            >
              {routeKeys.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
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
