import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials",
  description: "Client reviews and testimonial videos from Tamay Enterprises in West Haven, CT.",
};

const testimonials = [
  "Chris Yoon - testimonial",
  "Lucas de valdivia - testimonial",
  "MARIE-PAUL - testimonial",
  "Rosemary - testimonial",
  "Maryse - testimonial",
  "Brian & sarah - testimonial",
  "MIKE ADARKWAH - testimonial",
];

export default function ReviewsPage() {
  return (
    <div className="py-14 max-w-5xl mx-auto px-4">
      <SectionHeading title="Reviews" />
      <div className="space-y-12">
        {testimonials.map((name) => (
          <section key={name} className="border-b border-gray-200 pb-12 last:border-0">
            <h2 className="font-heading text-xl text-tamay-primary font-semibold mb-6 text-center">
              {name}
            </h2>
            <div className="aspect-video bg-gray-900 max-w-3xl mx-auto flex items-center justify-center text-gray-500">
              <p className="text-sm px-4 text-center">
                Video placeholder — add your embed URL or local video for {name}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
