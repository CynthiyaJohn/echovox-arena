import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingSpeakers = await storage.getSpeakers();
  if (existingSpeakers.length === 0) {
    console.log("Seeding database...");
    
    const speakersData = [
      {
        name: "Aria Voss",
        title: "Narrative Alchemist",
        bio: "Aria transforms complex data into compelling stories that move mountains and minds. With a background in data science and theatre, she bridges the gap between logic and emotion.",
        photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
        socialLinks: { twitter: "ariavoss", linkedin: "ariavoss" }
      },
      {
        name: "Jax Thorn",
        title: "Futurist Poet",
        bio: "Jax challenges our perceptions of tomorrow through the rhythm of today. His spoken word performances on AI and ethics have gone viral globally.",
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
        socialLinks: { twitter: "jaxthorn", website: "jaxthorn.com" }
      },
      {
        name: "Elena Rush",
        title: "Digital Anthropologist",
        bio: "Elena studies how online communities form, evolve, and sometimes collapse. Her insights help brands build lasting connections.",
        photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
        socialLinks: { linkedin: "elenarush" }
      },
      {
        name: "Marcus Chen",
        title: "Sound Architect",
        bio: "Marcus designs auditory experiences that alter consciousness. He explores the intersection of music, neuroscience, and productivity.",
        photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
        socialLinks: { twitter: "marcuschensound" }
      },
      {
        name: "Sarah Jenkins",
        title: "Sustainable Innovator",
        bio: "Sarah is pioneering zero-waste solutions for the tech industry. Her talks inspire action towards a greener, cleaner future.",
        photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
        socialLinks: { linkedin: "sarahjenkins" }
      },
      {
        name: "David Okafor",
        title: "Urban Explorer",
        bio: "David documents the hidden layers of our cities. His photography and storytelling reveal the beauty in the mundane and the forgotten.",
        photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
        socialLinks: { website: "davidokafor.art" }
      }
    ];

    const createdSpeakers = [];
    for (const s of speakersData) {
      createdSpeakers.push(await storage.createSpeaker(s));
    }

    const talksData = [
      {
        title: "The Data of Emotion",
        speakerId: createdSpeakers[0].id,
        description: "How to use analytics to craft stories that resonate.",
        duration: "45 min",
        thumbnailUrl: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
      },
      {
        title: "Algorithms in Rhyme",
        speakerId: createdSpeakers[1].id,
        description: "Exploring the poetic potential of artificial intelligence.",
        duration: "30 min",
        thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        title: "Tribe Dynamics Online",
        speakerId: createdSpeakers[2].id,
        description: "Understanding the glue that holds digital communities together.",
        duration: "50 min",
        thumbnailUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        title: "Soundscapes for Focus",
        speakerId: createdSpeakers[3].id,
        description: "Designing audio environments for deep work.",
        duration: "40 min",
        thumbnailUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
       {
        title: "Green Tech Revolution",
        speakerId: createdSpeakers[4].id,
        description: "Practical steps for a sustainable tech ecosystem.",
        duration: "55 min",
        thumbnailUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
       {
        title: "Hidden Cities",
        speakerId: createdSpeakers[5].id,
        description: "Uncovering the secrets of urban landscapes.",
        duration: "35 min",
        thumbnailUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ];

    for (const t of talksData) {
      await storage.createTalk(t);
    }
    
    console.log("Database seeded successfully!");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed the DB asynchronously
  seedDatabase().catch(console.error);

  app.get(api.speakers.list.path, async (req, res) => {
    const speakers = await storage.getSpeakers();
    res.json(speakers);
  });

  app.get(api.talks.list.path, async (req, res) => {
    const talks = await storage.getTalks();
    res.json(talks);
  });

  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const booking = await storage.createBooking(input);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
