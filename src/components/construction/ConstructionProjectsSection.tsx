import { Button } from "@/components/ui/Button";
import { TamayVideoGallery } from "@/components/reviews/TamayVideoGallery";
import {
  ADA_RESTROOM_PROJECT_VIDEOS,
  CONSTRUCTION_PROJECT_VIDEOS,
} from "@/lib/constructionVideos";

export function ConstructionProjectsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-tamay-primary font-semibold leading-tight">
          See the Work
        </h2>

        <div className="mt-10">
          <h3 className="font-heading text-xl text-tamay-primary font-semibold mb-6">Residential Projects</h3>
          <TamayVideoGallery
            projects={CONSTRUCTION_PROJECT_VIDEOS}
            showTitle={false}
            instanceId="construction-residential"
          />
        </div>

        <div className="mt-16">
          <h3 className="font-heading text-xl text-tamay-primary font-semibold mb-6">Commercial Projects</h3>
          <TamayVideoGallery
            projects={ADA_RESTROOM_PROJECT_VIDEOS}
            showTitle={false}
            instanceId="construction-ada"
          />
        </div>

        <div className="text-center mt-10">
          <Button href="/gallery" variant="primary">
            More projects
          </Button>
        </div>
      </div>
    </section>
  );
}
