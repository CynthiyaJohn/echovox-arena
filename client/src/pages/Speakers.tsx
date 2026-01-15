import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useSpeakers } from "@/hooks/use-speakers";
import { SpeakerCard } from "@/components/SpeakerCard";
import { motion } from "framer-motion";

export default function Speakers() {
  const { data: speakers, isLoading } = useSpeakers();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Meet the <span className="text-gradient">Visionaries</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our lineup features industry leaders, radical thinkers, and creative pioneers who are redefining the boundaries of what's possible.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[500px] rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {speakers?.map((speaker, index) => (
                <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
