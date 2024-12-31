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
    // Se o burnRate for negativo ou zero, assumimos um período muito longo (400 meses)
    const runway = burnRate <= 0 ? 400 : currentBalance / burnRate;
    const runwayDate = format(
      add(new Date(), { months: Math.floor(runway) }), 
      "MM/dd/yyyy"
    );

    return {
      burnRate,
      runway,
      runwayDate
    };
  }, [monthlyRevenue, monthlyExpenses, currentBalance]);
}