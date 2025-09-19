import { QuizClient } from "@/components/quiz/quiz-client";
import { PageAnimationWrapper } from "@/components/page-animation-wrapper";

const quizQuestions = [
    {
      question: "When faced with a difficult problem, you are more likely to:",
      answers: [
        "Break it down into smaller, logical steps.",
        "Brainstorm creative and unconventional solutions.",
        "Collaborate with others to find a solution together.",
        "Rely on past experiences and proven methods.",
      ],
    },
    {
      question: "Which of these activities sounds most appealing?",
      answers: [
        "Organizing a complex dataset to find hidden patterns.",
        "Designing a beautiful and user-friendly website.",
        "Leading a team to achieve a common goal.",
        "Building a tangible product with your hands.",
      ],
    },
    {
        question: "I prefer working in an environment that is:",
        answers: [
          "Structured and predictable.",
          "Dynamic and fast-paced.",
          "Collaborative and team-oriented.",
          "Independent and autonomous.",
        ],
      },
      {
        question: "When learning something new, you prefer:",
        answers: [
          "Reading books and theoretical articles.",
          "Watching tutorials and visual demonstrations.",
          "Participating in group discussions and workshops.",
          "Jumping right in and learning by doing.",
        ],
      },
      {
        question: "What motivates you the most?",
        answers: [
          "Solving complex intellectual challenges.",
          "Creating something aesthetically pleasing.",
          "Helping and empowering other people.",
          "Seeing concrete results from your work.",
        ],
      },
      {
        question: "Your ideal work-life balance would be:",
        answers: [
          "A standard 9-to-5 schedule.",
          "Flexible hours and the ability to work remotely.",
          "A results-oriented environment, regardless of hours.",
          "A project-based schedule with clear start and end dates.",
        ],
      },
      {
        question: "In a group project, you are most often the one who:",
        answers: [
          "Analyzes the requirements and creates a plan.",
          "Comes up with the big, innovative ideas.",
          "Makes sure everyone is heard and working together.",
          "Focuses on executing the tasks and getting things done.",
        ],
      },
      {
        question: "Which of these fields are you most interested in?",
        answers: [
          "Science and Technology.",
          "Arts and Design.",
          "Business and Management.",
          "Health and a/o",
        ],
      },
      {
        question: "You enjoy tasks that require:",
        answers: [
          "Attention to detail and precision.",
          "Big-picture thinking and strategy.",
          "Empathy and communication skills.",
          "Practical, hands-on application.",
        ],
      },
      {
        question: "Long-term, you would rather be known for:",
        answers: [
          "Your deep expertise in a specific field.",
          "Your groundbreaking creative work.",
          "Your ability to lead and inspire others.",
          "The impactful products or services you've built.",
        ],
      },
];

export default function QuizPage() {
    return (
        <PageAnimationWrapper>
            <div className="container py-12 md:py-24">
                <QuizClient questions={quizQuestions} />
            </div>
        </PageAnimationWrapper>
    );
}
