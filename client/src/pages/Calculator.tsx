import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCalculate } from "@/hooks/use-calculate";
import { formatCurrency } from "@/lib/utils";

const formSchema = z.object({
  monthlyRevenue: z.string().refine(
    (val) => !isNaN(Number(val.replace(/[^0-9.-]+/g, ""))),
    "Por favor insira um número válido"
  ),
  monthlyExpenses: z.string().refine(
    (val) => !isNaN(Number(val.replace(/[^0-9.-]+/g, ""))),
    "Por favor insira um número válido"
  ),
  currentBalance: z.string().refine(
    (val) => !isNaN(Number(val.replace(/[^0-9.-]+/g, ""))),
    "Por favor insira um número válido"
  ),
});

export default function Calculator() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyRevenue: "",
      monthlyExpenses: "",
      currentBalance: "",
    },
  });

  const { burnRate, runway, runwayDate } = useCalculate({
    monthlyRevenue: Number(form.watch("monthlyRevenue").replace(/[^0-9.-]+/g, "")),
    monthlyExpenses: Number(form.watch("monthlyExpenses").replace(/[^0-9.-]+/g, "")),
    currentBalance: Number(form.watch("currentBalance").replace(/[^0-9.-]+/g, "")),
  });

  const onReset = () => {
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Calculadora de Runway Financeiro</CardTitle>
          <CardDescription className="text-muted-foreground">
            Runway é o tempo que uma empresa tem antes de ficar sem dinheiro, baseado em quanto está 
            gastando por mês. É geralmente medido em meses e ajuda empresas a planejarem quando 
            podem precisar de mais financiamento ou atingir a lucratividade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="monthlyRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receita Mensal</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="0.00"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.-]+/g, "");
                          field.onChange(formatCurrency(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlyExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Despesas Operacionais Mensais</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="0.00"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.-]+/g, "");
                          field.onChange(formatCurrency(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentBalance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saldo Atual em Caixa</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="0.00"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.-]+/g, "");
                          field.onChange(formatCurrency(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <span className="font-medium">Taxa de Queima (Burn Rate)</span>
                    <p className="text-sm text-muted-foreground">Quanto dinheiro você gasta por mês além da receita</p>
                  </div>
                  <span className="text-lg font-semibold">{formatCurrency(burnRate)}/mês</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <span className="font-medium">Runway</span>
                    <p className="text-sm text-muted-foreground">Por quanto tempo seu dinheiro vai durar no ritmo atual</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">
                      {runway === Infinity ? "∞" : `${Math.floor(runway)} meses`}
                    </span>
                    {runway !== Infinity && runway % 1 !== 0 && (
                      <span className="text-lg ml-1">
                        e {Math.round((runway % 1) * 30)} dias
                      </span>
                    )}
                    {runwayDate !== "∞" && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Acabará em {runwayDate}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={onReset}
                >
                  Limpar
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}