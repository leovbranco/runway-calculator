import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    "Please enter a valid number"
  ),
  monthlyExpenses: z.string().refine(
    (val) => !isNaN(Number(val.replace(/[^0-9.-]+/g, ""))),
    "Please enter a valid number"
  ),
  currentBalance: z.string().refine(
    (val) => !isNaN(Number(val.replace(/[^0-9.-]+/g, ""))),
    "Please enter a valid number"
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
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Financial Runway Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="monthlyRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Revenue</FormLabel>
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
                    <FormLabel>Monthly Operating Expenses</FormLabel>
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
                    <FormLabel>Current Cash Balance</FormLabel>
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
                  <span className="font-medium">Burn Rate</span>
                  <span className="text-lg">{formatCurrency(burnRate)}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Runway</span>
                  <span className="text-lg">
                    {runway.toFixed(1)} months ({runwayDate})
                  </span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={onReset}
                >
                  Clear
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
