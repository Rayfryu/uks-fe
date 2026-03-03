export type Category =
  | "All"
  | "Mental Health"
  | "Women's Health"
  | "Nutrition"
  | "Detox"
  | "Gut Health"
  | "Conditions"
  | "Philosophy";

export interface Article {
  id: number;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
  readTime: number;
  image: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Top foods for improved training performance",
    description:
      "Part I of a five-part series exploring performance nutrition through a functional lens. This article examines how bone broth and liver support neural drive, joint health, recovery, and metabolic resilience to enhance your training.",
    category: "Nutrition",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "The dark side of vaping",
    description:
      "Despite widespread belief, vaping does not reliably help people quit smoking and frequently leads to dual use. Studies link e-cigarettes to lung injury, heavy metal exposure, hormonal disruption, fertility issues, cardiovascular damage, and more.",
    category: "Detox",
    readTime: 3,
    image: "https://images.unsplash.com/photo-1567093780278-b2e38c1b5c3a?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Combatting postpartum depression",
    description:
      "Evidence suggests that nutrients, movement, touch, light exposure, and lifestyle-based interventions—such as saffron, folate, exercise, massage, seafood intake, infant massage, and bright light therapy—may meaningfully support postpartum mental health.",
    category: "Women's Health",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Understanding anxiety disorders",
    description:
      "A comprehensive look at the spectrum of anxiety disorders, from generalized anxiety to panic disorder, and evidence-based approaches to managing symptoms through therapy, lifestyle changes, and mindfulness practices.",
    category: "Mental Health",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "The gut-brain connection explained",
    description:
      "Your gut microbiome communicates directly with your brain through the vagus nerve. Discover how the trillions of bacteria in your digestive system influence mood, cognition, and mental health in surprising ways.",
    category: "Gut Health",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Living well with autoimmune conditions",
    description:
      "Managing an autoimmune condition requires a multi-faceted approach. From dietary interventions and stress management to sleep optimization, learn how lifestyle changes can reduce flares and improve quality of life.",
    category: "Conditions",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "The philosophy of slow living",
    description:
      "In a world that prizes speed and productivity, slow living offers a radical alternative. Explore the philosophical roots of the slow movement and practical ways to reclaim intention, presence, and meaning in daily life.",
    category: "Philosophy",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Seed cycling for hormonal balance",
    description:
      "Seed cycling is a food-based protocol that involves eating specific seeds during different phases of the menstrual cycle to support estrogen and progesterone levels naturally and reduce PMS symptoms.",
    category: "Women's Health",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "A 7-day digital detox guide",
    description:
      "Constant screen exposure is linked to disrupted sleep, heightened anxiety, and reduced attention spans. This practical guide walks you through a structured one-week digital detox to reset your nervous system.",
    category: "Detox",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
  },
];

export const CATEGORIES: Category[] = [
  "All",
  "Mental Health",
  "Women's Health",
  "Nutrition",
  "Detox",
  "Gut Health",
  "Conditions",
  "Philosophy",
];
