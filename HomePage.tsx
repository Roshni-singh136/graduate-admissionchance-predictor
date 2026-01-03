import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Target, BarChart3, BookOpen, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Accurate Predictions",
    description: "Machine learning model trained on real admission data with 82% accuracy"
  },
  {
    icon: BarChart3,
    title: "Multiple Factors",
    description: "Analyzes GRE, TOEFL, CGPA, research experience, and more"
  },
  {
    icon: BookOpen,
    title: "Data-Driven Insights",
    description: "Understand which factors matter most for your application"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <GraduationCap className="h-16 w-16 text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Graduate Admission
          <span className="block text-primary">Chance Predictor</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Predict your chances of getting into a graduate program using our 
          machine learning model trained on historical admission data from top universities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/predict">
              Check Your Chances
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-foreground mb-12">
          Why Use Our Predictor?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-3xl mx-auto border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold text-center text-foreground mb-6">
              How It Works
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</span>
                <div>
                  <h4 className="font-medium text-foreground">Enter Your Details</h4>
                  <p className="text-sm text-muted-foreground">Provide your GRE, TOEFL scores, CGPA, and other relevant information</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <h4 className="font-medium text-foreground">ML Model Analyzes</h4>
                  <p className="text-sm text-muted-foreground">Our linear regression model processes your data using trained coefficients</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <h4 className="font-medium text-foreground">Get Your Prediction</h4>
                  <p className="text-sm text-muted-foreground">Receive an estimated admission chance percentage instantly</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Disclaimer */}
      <section className="container mx-auto px-4 pb-16">
        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          <strong>Disclaimer:</strong> Predictions are estimates based on historical data and are not guarantees of admission. 
          Actual admission decisions depend on many additional factors including essays, interviews, and institutional needs.
        </p>
      </section>
    </div>
  );
}
