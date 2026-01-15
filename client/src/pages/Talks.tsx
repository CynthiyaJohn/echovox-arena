import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useTalks } from "@/hooks/use-talks";
import { TalkCard } from "@/components/TalkCard";
import { motion } from "framer-motion";

export default function Talks() {
  const { data: talks, isLoading } = useTalks();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Explore <span className="text-primary">Talks</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Missed a session? Watch recordings of all keynotes and panels from previous years.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-video rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {talks?.map((talk, index) => (
                <TalkCard key={talk.id} talk={talk} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
