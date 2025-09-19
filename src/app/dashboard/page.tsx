import { PageAnimationWrapper } from '@/components/page-animation-wrapper';
import { AnalyticsChart } from '@/components/dashboard/analytics-chart';
import { CareerRoadmap } from '@/components/dashboard/career-roadmap';
import { SkillProgress } from '@/components/dashboard/skill-progress';
import { MOCK_SKILLS, MOCK_ROADMAP, MOCK_CHART_DATA } from '@/lib/mock-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export default function DashboardPage() {
  return (
    <PageAnimationWrapper>
      <div className="container py-12 md:py-16">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Your Career Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track your progress, visualize your journey, and stay motivated.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Activity className="text-primary" />
                  Weekly Progress
                </CardTitle>
                <CardDescription>
                  Your learning activity over the last 7 days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsChart data={MOCK_CHART_DATA} />
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle className="font-headline">Career Roadmap</CardTitle>
                <CardDescription>
                  Your personalized timeline to becoming a Full-Stack Developer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CareerRoadmap items={MOCK_ROADMAP} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle className="font-headline">Skill Progress</CardTitle>
                <CardDescription>
                  Your current skill mastery levels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkillProgress skills={MOCK_SKILLS} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageAnimationWrapper>
  );
}
