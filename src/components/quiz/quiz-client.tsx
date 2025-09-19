'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { careerQuiz, CareerQuizOutput } from '@/ai/flows/career-quiz-flow';
import { Loader, Sparkles, TrendingUp, ThumbsUp, ThumbsDown } from 'lucide-react';

type QuizQuestion = {
  question: string;
  answers: string[];
};

type QuizClientProps = {
  questions: QuizQuestion[];
};

export function QuizClient({ questions }: QuizClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CareerQuizOutput | null>(null);

  const handleNextQuestion = async () => {
    if (currentAnswer) {
      const newAnswers = [...selectedAnswers, currentAnswer];
      setSelectedAnswers(newAnswers);
      setCurrentAnswer(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizFinished(true);
        setIsLoading(true);
        try {
          const quizResults = await careerQuiz({ answers: newAnswers });
          setResults(quizResults);
        } catch (error) {
          console.error("Error getting quiz results:", error);
          // Handle error state in UI
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const progress = (currentQuestionIndex / questions.length) * 100;

  if (quizFinished) {
    return (
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Your Career Matches
          </h1>
          <p className="mt-4 text-muted-foreground">
            Based on your answers, here are some career paths you might enjoy.
          </p>
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader className="w-12 h-12 animate-spin text-primary" />
            <p className='text-muted-foreground'>Analyzing your results...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {results?.recommendations.map((rec, index) => (
              <Card key={index} className="glassmorphism flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <Sparkles className="text-primary w-6 h-6" /> {rec.career}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-1">
                    <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><ThumbsUp className="text-green-500"/> Pros</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {rec.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><ThumbsDown className="text-red-500"/> Cons</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {rec.cons.map((con, i) => <li key={i}>{con}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><TrendingUp className="text-blue-500"/> Salary Trend</h4>
                        <p className="text-sm text-muted-foreground">{rec.salaryTrend}</p>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Career Match Quiz
            </h1>
            <p className="mt-2 text-muted-foreground">
                Answer a few questions to find the right career path for you.
            </p>
        </div>
      <Card className="glassmorphism">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <CardTitle>Question {currentQuestionIndex + 1}/{questions.length}</CardTitle>
          <CardDescription className="text-lg pt-2">{currentQuestion.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentAnswer ?? ''} onValueChange={setCurrentAnswer} className="space-y-4">
            {currentQuestion.answers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
                <RadioGroupItem value={answer} id={`q${currentQuestionIndex}-a${index}`} />
                <Label htmlFor={`q${currentQuestionIndex}-a${index}`} className="text-base flex-1 cursor-pointer">
                  {answer}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Button
            onClick={handleNextQuestion}
            disabled={!currentAnswer}
            className="w-full mt-8"
            size="lg"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
