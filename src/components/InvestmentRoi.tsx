import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, IndianRupee } from "lucide-react";

const ease = [0.23, 1, 0.32, 1] as const;

interface InvestmentRoiProps {
  propertyPrice: number;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const InvestmentRoi = ({ propertyPrice }: InvestmentRoiProps) => {
  const [appreciationRate, setAppreciationRate] = useState(8);
  const [rentalYield, setRentalYield] = useState(3);
  const [holdingPeriod, setHoldingPeriod] = useState(5);

  const projections = useMemo(() => {
    const years = Array.from({ length: holdingPeriod }, (_, i) => i + 1);
    return years.map((year) => {
      const futureValue = propertyPrice * Math.pow(1 + appreciationRate / 100, year);
      const capitalGain = futureValue - propertyPrice;
      const totalRentalIncome = propertyPrice * (rentalYield / 100) * year;
      const totalReturn = capitalGain + totalRentalIncome;
      const roiPercent = (totalReturn / propertyPrice) * 100;
      return { year, futureValue, capitalGain, totalRentalIncome, totalReturn, roiPercent };
    });
  }, [propertyPrice, appreciationRate, rentalYield, holdingPeriod]);

  const final = projections[projections.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className="border border-border p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp size={20} className="text-accent" />
        <h3 className="label-caps text-foreground">Investment ROI</h3>
      </div>

      {/* Controls */}
      <div className="space-y-6 mb-8">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-text-secondary">Annual Appreciation</span>
            <span className="text-sm font-medium text-foreground">{appreciationRate}%</span>
          </div>
          <input
            type="range"
            min={3}
            max={15}
            step={0.5}
            value={appreciationRate}
            onChange={(e) => setAppreciationRate(Number(e.target.value))}
            className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-text-secondary">Rental Yield</span>
            <span className="text-sm font-medium text-foreground">{rentalYield}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={6}
            step={0.5}
            value={rentalYield}
            onChange={(e) => setRentalYield(Number(e.target.value))}
            className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-text-secondary">Holding Period</span>
            <span className="text-sm font-medium text-foreground">{holdingPeriod} years</span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            step={1}
            value={holdingPeriod}
            onChange={(e) => setHoldingPeriod(Number(e.target.value))}
            className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="bg-surface p-6 mb-6">
        <p className="text-sm text-text-secondary mb-1">Total ROI ({holdingPeriod} yrs)</p>
        <p className="font-display text-3xl font-semibold text-foreground">
          {final.roiPercent.toFixed(1)}%
        </p>
      </div>

      {/* Projection bars */}
      <div className="space-y-3 mb-6">
        {projections.map((p) => {
          const barWidth = Math.min((p.roiPercent / final.roiPercent) * 100, 100);
          return (
            <div key={p.year} className="flex items-center gap-3">
              <span className="text-xs text-text-secondary w-10 tabular-nums">Yr {p.year}</span>
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${barWidth}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: p.year * 0.05, ease }}
                />
              </div>
              <span className="text-xs font-medium text-foreground w-14 text-right tabular-nums">
                {p.roiPercent.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Breakdown */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex justify-between">
          <span className="text-sm text-text-secondary">Property Value (Yr {holdingPeriod})</span>
          <span className="text-sm font-medium text-foreground">{formatCurrency(final.futureValue)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-text-secondary">Capital Gain</span>
          <span className="text-sm font-medium text-foreground">{formatCurrency(final.capitalGain)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-text-secondary">Total Rental Income</span>
          <span className="text-sm font-medium text-foreground">{formatCurrency(final.totalRentalIncome)}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-border">
          <span className="text-sm font-medium text-foreground">Total Return</span>
          <span className="text-sm font-semibold text-accent flex items-center gap-0.5">
            <IndianRupee size={14} />
            {Math.round(final.totalReturn).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default InvestmentRoi;
