import { Suspense } from 'react';
import { learningResourceCuration } from '@/ai/flows/learning-resource-curation';
import type { LearningResourceCurationOutput } from '@/ai/flows/learning-resource-curation';
import { RecommendationsClient } from '@/components/recommendations/recommendations-client';
import { PageAnimationWrapper } from '@/components/page-animation-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

type RecommendationsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function RecommendationsPage({ searchParams }: RecommendationsPageProps) {
  const userSkills = typeof searchParams.skills === 'string' ? searchParams.skills.split(',') : [];
  const desiredCareerPath = typeof searchParams.career === 'string' ? searchParams.career : '';

  let recommendations: LearningResourceCurationOutput | null = null;
  let error: string | null = null;

  if (userSkills.length > 0 && desiredCareerPath) {
    try {
      recommendations = await learningResourceCuration({
        userSkills,
        desiredCareerPath,
      });
    } catch (e) {
      console.error(e);
      error = "Sorry, we couldn't generate recommendations at this time. Please try again later.";
    }
  } else {
    error = "Please provide your skills and a desired career path to get recommendations.";
  }

  const mockCareers = [
    {
      title: 'AI/ML Engineer',
      match: '92%',
      description: 'Design and develop machine learning and deep learning systems.',
    },
    {
      title: 'Data Scientist',
      match: '85%',
      description: 'Analyze and interpret complex data to help organizations make better decisions.',
    },
    {
      title: 'Cloud Solutions Architect',
      match: '78%',
      description: 'Design and deploy scalable, resilient, and secure cloud infrastructure.',
    },
  ];

  return (
    <PageAnimationWrapper>
      <div className="container py-12 md:py-24">
        <RecommendationsClient
          recommendations={recommendations}
          mockCareers={mockCareers}
          error={error}
          desiredCareer={desiredCareerPath}
        />
      </div>
    </PageAnimationWrapper>
  );
}

function LoadingSkeleton() {
    return (
      <div className="space-y-12">
        <div>
          <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-6 w-1/3 mb-4" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-2/3" />
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-6 w-1/3 mb-4" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-4/6" />
                </CardContent>
            </Card>
        </div>
      </div>
    )
  }
  
export default function RecommendationsPageWrapper(props: RecommendationsPageProps) {
    return (
        <Suspense fallback={<div className="container py-12 md:py-24"><LoadingSkeleton /></div>}>
            <RecommendationsPage {...props} />
        </Suspense>
    )
}