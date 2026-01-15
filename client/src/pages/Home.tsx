import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mic2, Users, Calendar } from "lucide-react";
import { useRef } from "react";
import { useSpeakers } from "@/hooks/use-speakers";
import { SpeakerCard } from "@/components/SpeakerCard";

export default function Home() {
  const { data: speakers } = useSpeakers();
  const featuredSpeakers = speakers?.slice(0, 3);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background z-10" />
          {/* Abstract geometric background image */}
          <img 
            src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=2000" 
            alt="Abstract Sound Waves" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ y, opacity }}
          className="relative z-20 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium text-sm mb-6 backdrop-blur-md">
              The Annual Future Tech Conference
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8"
          >
            Amplify Your Voice, <br />
            <span className="text-gradient">Ignite Minds</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Join the world's leading visionaries, creators, and innovators for three days of inspiration and connection.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/book">
              <Button size="lg" className="rounded-full text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30">
                Reserve Your Seat <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/talks">
              <Button size="lg" variant="outline" className="rounded-full text-lg h-14 px-8 border-2 hover:bg-muted/50">
                Watch Past Talks
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: "Attendees", value: "5,000+" },
              { icon: Mic2, label: "World-Class Speakers", value: "40+" },
              { icon: Calendar, label: "Days of Innovation", value: "3" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-display font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured Speakers</h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Learn from the pioneers shaping our digital future.
              </p>
            </div>
            <Link href="/speakers">
              <Button variant="ghost" className="hidden md:flex group">
                View All Speakers <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSpeakers?.map((speaker, i) => (
              <SpeakerCard key={speaker.id} speaker={speaker} index={i} />
            ))}
            {!featuredSpeakers && (
               /* Loading Skeleton */
               [1, 2, 3].map((i) => (
                 <div key={i} className="h-[500px] rounded-2xl bg-muted animate-pulse" />
               ))
            )}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/speakers">
              <Button className="w-full" variant="outline">View All Speakers</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px]" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Ready to be part of the <span className="text-primary">Echo?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Secure your spot today. Early bird tickets are selling out fast. Don't miss the opportunity to connect with the best.
          </p>
          <Link href="/book">
             <Button size="lg" className="rounded-full text-lg h-16 px-10 bg-foreground text-background hover:bg-foreground/90">
               Get Your Ticket Now
             </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
