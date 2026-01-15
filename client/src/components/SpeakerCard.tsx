import { motion } from "framer-motion";
import { Speaker } from "@shared/schema";
import { Twitter, Linkedin, Globe } from "lucide-react";

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
}

export function SpeakerCard({ speaker, index }: SpeakerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full bg-card border border-border/50 rounded-2xl overflow-hidden card-hover flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
          
          {/* Descriptive comment for Unsplash */}
          {/* Professional speaker portrait or headshot */}
          <img 
            src={speaker.photoUrl} 
            alt={speaker.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Floating Social Links */}
          <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {speaker.socialLinks?.twitter && (
              <a href={speaker.socialLinks.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {speaker.socialLinks?.linkedin && (
              <a href={speaker.socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
             {speaker.socialLinks?.website && (
              <a href={speaker.socialLinks.website} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
            {speaker.name}
          </h3>
          <p className="text-primary font-medium text-sm mb-3">{speaker.title}</p>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {speaker.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
