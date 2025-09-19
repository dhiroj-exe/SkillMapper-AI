import { SkillForm } from "@/components/skills/skill-form";
import { PageAnimationWrapper } from "@/components/page-animation-wrapper";

export default function SkillInputPage() {
  return (
    <PageAnimationWrapper>
      <div className="container py-12 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Map Your Skills
          </h1>
          <p className="mt-4 text-muted-foreground">
            Tell us about your skills and career aspirations. Our AI will
            analyze your profile to suggest the best career paths and learning
            resources for you.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-xl">
          <SkillForm />
        </div>
      </div>
    </PageAnimationWrapper>
  );
}
