import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee } from "lucide-react";

const ease = [0.23, 1, 0.32, 1] as const;

interface EmiCalculatorProps {
  propertyPrice: number;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const EmiCalculator = ({ propertyPrice }: EmiCalculatorProps) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalPayment, totalInterest, loanAmount } = useMemo(() => {
    const dp = (downPaymentPercent / 100) * propertyPrice;
    const loan = propertyPrice - dp;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;

    if (monthlyRate === 0) {
      const e = loan / months;
      return { emi: e, totalPayment: loan, totalInterest: 0, loanAmount: loan };
    }

    const e = (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const total = e * months;
    return { emi: e, totalPayment: total, totalInterest: total - loan, loanAmount: loan };
  }, [propertyPrice, downPaymentPercent, interestRate, tenure]);

  const principalPercent = (loanAmount / totalPayment) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className="border border-border p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <Calculator size={20} className="text-accent" />
        <h3 className="label-caps text-foreground">EMI Calculator</h3>
      </div>

      {/* Sliders */}
      <div className="space-y-6 mb-8">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-text-secondary">Down Payment</span>
            <span className="text-sm font-medium text-foreground">{downPaymentPercent}% ({formatCurrency((downPaymentPercent / 100) * propertyPrice)})</span>
          </div>
          <input
            type="range"
            min={10}
            max={90}
            step={5}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-text-secondary">Interest Rate</span>
            <span className="text-sm font-medium text-foreground">{interestRate}% p.a.</span>
          </div>
          <input
            type="range"
            min={6}
            max={14}
            step={0.25}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-text-secondary">Loan Tenure</span>
            <span className="text-sm font-medium text-foreground">{tenure} years</span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

      {/* Result */}
      <div className="bg-surface p-6 mb-6">
        <p className="text-sm text-text-secondary mb-1">Monthly EMI</p>
        <p className="font-display text-3xl font-semibold text-foreground flex items-center gap-1">
          <IndianRupee size={24} />
          {Math.round(emi).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Breakdown bar */}
      <div className="h-3 w-full rounded-full overflow-hidden flex mb-4">
        <div className="bg-accent h-full transition-all duration-500" style={{ width: `${principalPercent}%` }} />
        <div className="bg-secondary h-full transition-all duration-500" style={{ width: `${100 - principalPercent}%` }} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-accent" />
          <div>
            <p className="text-xs text-text-secondary">Principal</p>
            <p className="text-sm font-medium text-foreground">{formatCurrency(loanAmount)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-secondary" />
          <div>
            <p className="text-xs text-text-secondary">Interest</p>
            <p className="text-sm font-medium text-foreground">{formatCurrency(totalInterest)}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between">
          <span className="text-sm text-text-secondary">Total Payment</span>
          <span className="text-sm font-medium text-foreground">{formatCurrency(totalPayment)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EmiCalculator;
