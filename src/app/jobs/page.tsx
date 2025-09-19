import { PageAnimationWrapper } from '@/components/page-animation-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_JOBS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, PercentCircle } from 'lucide-react';

export default function JobsPage() {
  return (
    <PageAnimationWrapper>
      <div className="container py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Curated Job Postings
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Explore job opportunities that align with your skills and career goals.
          </p>
        </div>

        <div className="grid gap-6">
          {MOCK_JOBS.map((job, index) => (
            <Card key={index} className="glassmorphism hover:border-primary transition-colors duration-300 group">
              <CardContent className="p-6 grid md:grid-cols-4 items-center gap-6">
                <div className="md:col-span-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-headline text-xl font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                      <p className="text-muted-foreground font-medium flex items-center gap-2 mt-1">
                        <Briefcase className="w-4 h-4" /> {job.company}
                        <span className="text-muted-foreground/50 mx-1">|</span>
                        <MapPin className="w-4 h-4" /> {job.location}
                      </p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-2 font-semibold text-primary">
                        <PercentCircle className="w-5 h-5" />
                        <span>{job.match}% Match</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{job.posted}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                    <div className="text-right sm:hidden mb-4">
                      <div className="flex items-center gap-2 font-semibold text-primary">
                        <PercentCircle className="w-5 h-5" />
                        <span>{job.match}% Match</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{job.posted}</p>
                    </div>
                  <Button className="w-full md:w-auto">Apply Now</Button>
                  <Button variant="outline" className="w-full md:w-auto">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageAnimationWrapper>
  );
}
