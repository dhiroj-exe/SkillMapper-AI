import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Briefcase, Target } from 'lucide-react';
import { PageAnimationWrapper } from '@/components/page-animation-wrapper';

export default function Home() {
  return (
    <PageAnimationWrapper>
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div className="relative pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent">
                Welcome to SkillMapper AI
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Your AI-Powered Career Navigator to your dream job.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="group">
                  <Link href="/skills">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 md:px-6 pb-24">
           <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Features</h2>
              <p className="mt-4 text-muted-foreground">Discover how SkillMapper AI can transform your career path.</p>
            </div>
             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
               <div className="glassmorphism rounded-xl p-6 text-center flex flex-col items-center">
                 <Target className="w-12 h-12 mb-4 text-primary"/>
                 <h3 className="font-headline text-xl font-semibold">AI Career Recommendations</h3>
                 <p className="mt-2 text-muted-foreground">Receive personalized career path suggestions based on your unique profile.</p>
               </div>
               <div className="glassmorphism rounded-xl p-6 text-center flex flex-col items-center">
                 <Briefcase className="w-12 h-12 mb-4 text-primary"/>
                 <h3 className="font-headline text-xl font-semibold">Job Postings</h3>
                 <p className="mt-2 text-muted-foreground">Explore relevant job openings that match your skills and career goals.</p>
               </div>
               <div className="glassmorphism rounded-xl p-6 text-center flex flex-col items-center">
                 <Bot className="w-12 h-12 mb-4 text-primary"/>
                 <h3 className="font-headline text-xl font-semibold">AI Chatbot Assistant</h3>
                 <p className="mt-2 text-muted-foreground">Get instant answers to your career questions from our smart AI assistant.</p>
               </div>
               <div className="glassmorphism rounded-xl p-6 text-center flex flex-col items-center">
                 <h3 className="font-headline text-xl font-semibold">Personalized Dashboard</h3>
                 <p className="mt-2 text-muted-foreground">Track your progress and visualize your career growth timeline.</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </PageAnimationWrapper>
  );
}
