import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { predictChance } from "../utils/prediction";

import { GraduationCap, Calculator, Info, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
  gre: z.coerce.number().min(290, "GRE must be at least 290").max(340, "GRE cannot exceed 340"),
  toefl: z.coerce.number().min(92, "TOEFL must be at least 92").max(120, "TOEFL cannot exceed 120"),
  universityRating: z.string().min(1, "Please select a rating"),
  sop: z.string().min(1, "Please select a rating"),
  lor: z.string().min(1, "Please select a rating"),
  cgpa: z.coerce.number().min(6.8, "CGPA must be at least 6.8").max(9.92, "CGPA cannot exceed 9.92"),
  research: z.boolean()
});

type FormData = z.infer<typeof formSchema>;

export default function PredictPage() {
  const [prediction, setPrediction] = useState<number | null>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gre: 320,
      toefl: 110,
      universityRating: "3",
      sop: "3",
      lor: "3",
      cgpa: 8.5,
      research: false
    }
  });

  const onSubmit = (data: FormData) => {
    const result = predictAdmissionChance({
      gre: data.gre,
      toefl: data.toefl,
      universityRating: parseInt(data.universityRating),
      sop: parseInt(data.sop),
      lor: parseInt(data.lor),
      cgpa: data.cgpa,
      research: data.research
    });
    setPrediction(result);
  };

  const chanceInfo = prediction !== null ? getChanceLabel(prediction) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Calculator className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Predict Your Admission Chance</h1>
          <p className="text-muted-foreground">Enter your academic details to get an instant prediction</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Your Profile
              </CardTitle>
              <CardDescription>Fill in all fields for accurate prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="gre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          GRE Score
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>Graduate Record Examination score (290-340)</TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="320" {...field} />
                        </FormControl>
                        <FormDescription>Range: 290 - 340</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="toefl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          TOEFL Score
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>Test of English as a Foreign Language (92-120)</TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="110" {...field} />
                        </FormControl>
                        <FormDescription>Range: 92 - 120</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="universityRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          University Rating
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>Rating of your target university (1=lowest, 5=highest)</TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="sop"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            SOP Rating
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>Statement of Purpose strength</TooltipContent>
                            </Tooltip>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Rating" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((n) => (
                                <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            LOR Strength
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>Letter of Recommendation strength</TooltipContent>
                            </Tooltip>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Rating" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((n) => (
                                <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="cgpa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Undergraduate CGPA
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>Cumulative Grade Point Average on 10-point scale</TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="8.5" {...field} />
                        </FormControl>
                        <FormDescription>Range: 6.8 - 9.92</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="research"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Research Experience</FormLabel>
                          <FormDescription>
                            Do you have research experience?
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg">
                    Predict Admission Chance
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results Card */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Prediction Result</CardTitle>
                <CardDescription>Your estimated chance of admission</CardDescription>
              </CardHeader>
              <CardContent>
                {prediction !== null ? (
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="text-6xl font-bold text-primary">{prediction}%</div>
                      <div className={`text-lg font-medium ${chanceInfo?.color}`}>
                        {chanceInfo?.label} Chance
                      </div>
                    </div>
                    
                    <Progress value={prediction} className="h-4" />
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Model Accuracy: {MODEL_METRICS.accuracy}% (R² = {MODEL_METRICS.r2})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Mean Absolute Error: ±{(MODEL_METRICS.mae * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <GraduationCap className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p>Fill in the form and click "Predict" to see your results</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-yellow-500/5">
              <CardContent className="pt-4">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-yellow-600 mb-1">Disclaimer</p>
                    <p>
                      Predictions are estimates based on historical data and are not guarantees of admission. 
                      Actual decisions depend on essays, interviews, and institutional needs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
