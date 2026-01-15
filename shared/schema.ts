import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const speakers = pgTable("speakers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  photoUrl: text("photo_url").notNull(),
  socialLinks: jsonb("social_links").$type<{ twitter?: string; linkedin?: string; website?: string }>().default({}),
});

export const talks = pgTable("talks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  speakerId: serial("speaker_id").references(() => speakers.id),
  description: text("description").notNull(),
  duration: text("duration").notNull(), // e.g. "45 min"
  thumbnailUrl: text("thumbnail_url").notNull(),
  videoUrl: text("video_url").notNull(), // YouTube embed URL
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  eventType: text("event_type").notNull(), // Keynote, Workshop, Panel
  date: text("date").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertSpeakerSchema = createInsertSchema(speakers).omit({ id: true });
export const insertTalkSchema = createInsertSchema(talks).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });

// === TYPES ===

export type Speaker = typeof speakers.$inferSelect;
export type InsertSpeaker = z.infer<typeof insertSpeakerSchema>;

export type Talk = typeof talks.$inferSelect;
export type InsertTalk = z.infer<typeof insertTalkSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
