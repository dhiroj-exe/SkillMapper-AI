import { PageAnimationWrapper } from "@/components/page-animation-wrapper";
import { ResumeForm } from "@/components/resume-builder/resume-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react";


export default function ResumeBuilderPage() {
  return (
    <PageAnimationWrapper>
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8">
                <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                AI Resume Builder
                </h1>
                <p className="mt-2 text-muted-foreground">
                Fill in your details and let our AI craft a professional resume for you.
                </p>
            </div>
            
            <ResumeForm />

            <div className="mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      How does the AI Resume Builder work?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    Our AI analyzes the information you provide and rewrites it to be more impactful. It improves your professional summary, suggests relevant skills, and refines your work experience descriptions using industry-standard action verbs to help your resume stand out to recruiters.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                  <div className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      Is my data safe?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, your privacy is important to us. The data you enter is only used to generate your resume and is not stored or used for any other purpose.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
        </div>
      </div>
    </PageAnimationWrapper>
  );
}
