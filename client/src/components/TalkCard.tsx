import { motion } from "framer-motion";
import { Talk } from "@shared/schema";
import { Play, Clock } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface TalkCardProps {
  talk: Talk;
  index: number;
}

export function TalkCard({ talk, index }: TalkCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          <div className="relative rounded-2xl overflow-hidden bg-card border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-5 h-5 text-white fill-white ml-1" />
                </div>
              </div>
              
              {/* Descriptive comment for Unsplash */}
              {/* Conference stage presentation or tech talk thumbnail */}
              <img 
                src={talk.thumbnailUrl} 
                alt={talk.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-xs font-medium text-white flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {talk.duration}
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="font-display font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                {talk.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {talk.description}
              </p>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black border-none">
        <div className="aspect-video w-full">
          <iframe 
            src={talk.videoUrl} 
            title={talk.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
