import { useState, useMemo } from "react";
import { ROUTE_MATRIX, ROUTE_KEYS } from "../data/routes";
import { computeMetrics } from "../lib/engine";
import { Sidebar } from "../components/Sidebar";
import { CarTab } from "../components/CarTab";
import { TransitTab } from "../components/TransitTab";
import { DilemmaTab } from "../components/DilemmaTab";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "car", label: "Option A: Car (M-Engine)" },
  { id: "transit", label: "Option B: Transit (PT-Engine)" },
  { id: "dilemma", label: "The Ultimate Dilemma" },
] as const;

type TabId = typeof TABS[number]["id"];

export default function Dashboard() {
  const [netIncome, setNetIncome] = useState(5027);
  const [rent, setRent] = useState(1200);
  const [workingDays, setWorkingDays] = useState(20);
  const [workingHours, setWorkingHours] = useState(8);
  const [selectedRoute, setSelectedRoute] = useState(ROUTE_KEYS[0]);
  const [carPrice, setCarPrice] = useState(22000);
  const [insurance, setInsurance] = useState(830);
  const [parking, setParking] = useState(150);
  const [activeTab, setActiveTab] = useState<TabId>("car");

  const metrics = useMemo(() => {
    return computeMetrics({
      netIncome,
      rent,
      workingDays,
      workingHours,
      carPrice,
      insurance,
      parking,
      route: ROUTE_MATRIX[selectedRoute],
      selectedRouteName: selectedRoute,
    });
  }, [netIncome, rent, workingDays, workingHours, selectedRoute, carPrice, insurance, parking]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f1117] text-[#fafafa]">
      <Sidebar
        netIncome={netIncome} setNetIncome={setNetIncome}
        rent={rent} setRent={setRent}
        workingDays={workingDays} setWorkingDays={setWorkingDays}
        workingHours={workingHours} setWorkingHours={setWorkingHours}
        selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute}
        carPrice={carPrice} setCarPrice={setCarPrice}
        insurance={insurance} setInsurance={setInsurance}
        parking={parking} setParking={setParking}
        routeKeys={ROUTE_KEYS}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 pt-6 pb-4 border-b border-[#262730]">
          <h1 className="text-2xl font-bold text-white mb-1">
            The Commuter Trap: Ultimate Sandbox
          </h1>
          <p className="text-sm text-[#a0a0b0]">
            A Dynamic Commute Affordability &amp; A/B Comparison Simulator. Driven by the{" "}
            <span className="text-[#ff6b6b] font-medium">Spatial Impedance Matrix</span> and{" "}
            <span className="text-[#4fc3f7] font-medium">PRESTO Fare Caps</span>, this dashboard
            evaluates the true utility drain of your geographic arbitrage strategy.
          </p>
          <div className="mt-3 px-4 py-2 rounded-lg bg-[#1a1d2e] border border-[#2a2d3e] text-sm">
            <span className="text-[#a0a0b0]">Global Baseline — Real Post-Tax Hourly Wage: </span>
            <span className="font-bold text-[#4fc3f7]">
              ${metrics.realHourlyWage.toFixed(2)}/hr
            </span>
            <span className="text-[#a0a0b0]">
              {" "}· All parameters dynamically linked to your{" "}
            </span>
            <span className="text-white font-medium">{workingDays}-day</span>
            <span className="text-[#a0a0b0]"> work schedule.</span>
          </div>
        </div>
        <div className="border-b border-[#262730] flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-[#ff6b6b] text-white"
                  : "border-transparent text-[#a0a0b0] hover:text-white"
              )}
            >
              {tab.id === "car" && "🚗 "}
              {tab.id === "transit" && "🚌 "}
              {tab.id === "dilemma" && "⚖️ "}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeTab === "car" && (
            <CarTab
              metrics={metrics}
              rent={rent}
              insurance={insurance}
              parking={parking}
            />
          )}
          {activeTab === "transit" && (
            <TransitTab
              metrics={metrics}
              rent={rent}
              selectedRoute={selectedRoute}
              route={ROUTE_MATRIX[selectedRoute]}
            />
          )}
          {activeTab === "dilemma" && (
            <DilemmaTab
              metrics={metrics}
              rent={rent}
              selectedRoute={selectedRoute}
            />
          )}
        </div>
      </div>
    </div>
  );
}
