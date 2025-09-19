"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Book, AlertTriangle, ArrowRight, Target } from "lucide-react";

type RecommendationsClientProps = {
  recommendations: {
    skillGaps: string[];
    recommendedResources: string[];
  } | null;
  mockCareers: {
    title: string;
    match: string;
    description: string;
  }[];
  error: string | null;
  desiredCareer: string;
};

export function RecommendationsClient({
  recommendations,
  mockCareers,
  error,
  desiredCareer
}: RecommendationsClientProps) {

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Your Personalized Career Plan
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Based on your profile, here are our AI-powered recommendations to become a {desiredCareer}.
        </p>
      </div>

      <div>
        <h2 className="font-headline text-2xl font-semibold tracking-tight mb-6 text-center">Recommended Career Paths</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockCareers.map((career, index) => (
            <Card key={index} className="glassmorphism hover:border-primary transition-colors duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-headline text-xl">{career.title}</CardTitle>
                  <Badge className="bg-primary/20 text-primary border-primary/50">{career.match} Match</Badge>
                </div>
                <CardDescription>{career.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="#" className="text-sm font-semibold text-primary inline-flex items-center group">
                  Learn More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {recommendations && (
        <div className="grid gap-8 md:grid-cols-2">
            <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <Target className="text-primary"/>
                        Skill Gaps Identified
                    </CardTitle>
                    <CardDescription>
                        To become a {desiredCareer}, focus on acquiring these skills.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {recommendations.skillGaps.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-sm">{skill}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <Book className="text-primary"/>
                        Recommended Learning Resources
                    </CardTitle>
                    <CardDescription>
                        Curated resources to help you bridge your skill gaps.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                        {recommendations.recommendedResources.map((resource, index) => (
                            <li key={index} className="hover:text-foreground transition-colors">
                                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">{resource}</a>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      )}

    </div>
  );
}
