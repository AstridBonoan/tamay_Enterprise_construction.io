import { SITE } from "./site";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Tamay+Enterprises+Inc/@41.2621069,-72.9526724,17z/data=!4m8!3m7!1s0x89e8775d7376cd55:0x8dd3577fdc927647!8m2!3d41.2621069!4d-72.9526724!9m1!1b1!16s%2Fg%2F11n92rd69n?entry=ttu";

export const GOOGLE_RATING = {
  score: 4.9,
  count: 65,
  businessName: SITE.legalName,
} as const;

export type Review = {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  avatarColor?: string;
};

export const REVIEWS: Review[] = [
  {
    id: "bria-h",
    author: "Bria Hovhannissian",
    date: "5/14/2026",
    rating: 5,
    text: "Carlos and Thomas did a perfect and professional job. They were on time, respectful of our home, and the finished work exceeded our expectations. Highly recommend Tamay Enterprises.",
    avatarColor: "bg-orange-500",
  },
  {
    id: "maria-p",
    author: "Maria P.",
    date: "4/28/2026",
    rating: 5,
    text: "Outstanding renovation experience from start to finish. Clear communication, fair pricing, and quality craftsmanship throughout our kitchen project.",
    avatarColor: "bg-tamay-primary",
  },
  {
    id: "frank-d",
    author: "Frank D.",
    date: "4/12/2026",
    rating: 5,
    text: "Professional team that handled our bathroom remodel with care. They kept the workspace clean and finished ahead of schedule. Will use them again.",
    avatarColor: "bg-teal-500",
  },
  {
    id: "sarah-m",
    author: "Sarah M.",
    date: "3/30/2026",
    rating: 5,
    text: "Tamay Enterprises transformed our basement into a beautiful living space. Honest estimates, skilled workers, and excellent attention to detail.",
    avatarColor: "bg-purple-500",
  },
  {
    id: "james-k",
    author: "James K.",
    date: "3/18/2026",
    rating: 5,
    text: "Reliable construction company in West Haven. They repaired structural issues and matched the existing finish perfectly. Very satisfied with the results.",
    avatarColor: "bg-rose-500",
  },
  {
    id: "lisa-r",
    author: "Lisa R.",
    date: "2/22/2026",
    rating: 5,
    text: "Great experience with their assembly and installation team. TV mounting, shelving, and small repairs were all done quickly and professionally.",
    avatarColor: "bg-amber-600",
  },
  {
    id: "david-t",
    author: "David T.",
    date: "2/8/2026",
    rating: 5,
    text: "We hired Tamay for a full home renovation and couldn't be happier. They coordinated every trade smoothly and kept us informed at every step.",
    avatarColor: "bg-sky-600",
  },
  {
    id: "ana-v",
    author: "Ana V.",
    date: "1/19/2026",
    rating: 5,
    text: "Excellent service and fair pricing. The crew was courteous, punctual, and the quality of work speaks for itself. Five stars all the way.",
    avatarColor: "bg-emerald-600",
  },
  {
    id: "mike-a",
    author: "Mike A.",
    date: "1/5/2026",
    rating: 5,
    text: "Tamay Enterprises handled our property improvements with professionalism and speed. Responsive team that truly cares about getting the job done right.",
    avatarColor: "bg-indigo-500",
  },
];
