import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MODEL_METRICS } from "@/lib/prediction";
import { Brain, Database, BarChart3, Lightbulb, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const factors = [
  { name: "GRE Score", weight: "Medium", description: "Graduate Record Examination - standardized test for graduate admissions" },
  { name: "TOEFL Score", weight: "Medium", description: "Test of English as a Foreign Language - measures English proficiency" },
  { name: "CGPA", weight: "High", description: "Cumulative Grade Point Average - your undergraduate academic performance" },
  { name: "University Rating", weight: "Low", description: "Reputation/ranking of your target university (1-5 scale)" },
  { name: "Statement of Purpose", weight: "Low", description: "Quality of your written statement explaining goals and motivation" },
  { name: "Letter of Recommendation", weight: "Medium", description: "Strength of recommendations from professors or employers" },
  { name: "Research Experience", weight: "Medium", description: "Whether you have prior research experience in your field" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">How Our Predictor Works</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding the machine learning model behind your admission predictions
          </p>
        </div>

        <div className="space-y-8">
          {/* The Model */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                The Machine Learning Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our predictor uses a <strong>Linear Regression</strong> model, a supervised machine learning algorithm 
                that finds the relationship between multiple input features and a continuous output variable.
              </p>
              <p className="text-muted-foreground">
                The model was trained on historical graduate admission data from various universities, 
                learning the patterns between student profiles and their admission outcomes.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                <p className="text-foreground">Prediction = β₀ + β₁(GRE) + β₂(TOEFL) + β₃(Rating) + β₄(SOP) + β₅(LOR) + β₆(CGPA) + β₇(Research)</p>
              </div>
            </CardContent>
          </Card>

          {/* The Dataset */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Training Dataset
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The model was trained on the <strong>UCLA Graduate Admission Dataset</strong>, which contains 
                admission data from graduate programs. The dataset includes various student parameters and 
                their corresponding admission chances.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Sample Records</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">7</div>
                  <div className="text-sm text-muted-foreground">Input Features</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">70/30</div>
                  <div className="text-sm text-muted-foreground">Train/Test Split</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{MODEL_METRICS.r2}</div>
                  <div className="text-sm text-muted-foreground">R² Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Performance */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Model Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our model achieves strong performance on the test dataset:
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-foreground">Model Accuracy</span>
                  <span className="font-bold text-primary">{MODEL_METRICS.accuracy}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-foreground">R² Score (Variance Explained)</span>
                  <span className="font-bold text-primary">{MODEL_METRICS.r2}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-foreground">Mean Absolute Error</span>
                  <span className="font-bold text-primary">±{(MODEL_METRICS.mae * 100).toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Factors Considered */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Factors Considered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {factors.map((factor) => (
                  <div key={factor.name} className="flex items-start gap-4 p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{factor.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          factor.weight === "High" ? "bg-primary/20 text-primary" :
                          factor.weight === "Medium" ? "bg-yellow-500/20 text-yellow-600" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {factor.weight} Impact
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{factor.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Limitations */}
          <Card className="border-yellow-500/30 bg-yellow-500/5">
            <CardHeader>
              <CardTitle className="text-yellow-600">Important Limitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2">
                <li>This model uses historical data and may not reflect current admission trends</li>
                <li>Essays, interviews, and personal statements are not quantifiable in this model</li>
                <li>Different universities and programs have varying requirements</li>
                <li>Research quality and publications are not captured, only presence/absence</li>
                <li>This prediction should be one of many factors in your decision-making</li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center pt-6">
            <Button asChild size="lg">
              <Link to="/predict">
                <GraduationCap className="mr-2 h-5 w-5" />
                Try the Predictor
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
