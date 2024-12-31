import { useMemo } from "react";
import { format, add } from "date-fns";

interface CalculatorInputs {
  monthlyRevenue: number;
  monthlyExpenses: number;
  currentBalance: number;
}

export function useCalculate({ monthlyRevenue, monthlyExpenses, currentBalance }: CalculatorInputs) {
  return useMemo(() => {
    const burnRate = monthlyExpenses - monthlyRevenue;
    const runway = burnRate <= 0 ? Infinity : currentBalance / burnRate;
    const runwayDate = burnRate <= 0 
      ? "∞"
      : format(add(new Date(), { months: Math.floor(runway) }), "MM/dd/yyyy");

    return {
      burnRate,
      runway,
      runwayDate
    };
  }, [monthlyRevenue, monthlyExpenses, currentBalance]);
}
