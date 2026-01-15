import { 
  speakers, talks, bookings,
  type Speaker, type InsertSpeaker,
  type Talk, type InsertTalk,
  type Booking, type InsertBooking
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getSpeakers(): Promise<Speaker[]>;
  getSpeaker(id: number): Promise<Speaker | undefined>;
  createSpeaker(speaker: InsertSpeaker): Promise<Speaker>;
  
  getTalks(): Promise<Talk[]>;
  createTalk(talk: InsertTalk): Promise<Talk>;
  
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class DatabaseStorage implements IStorage {
  async getSpeakers(): Promise<Speaker[]> {
    return await db.select().from(speakers);
  }

  async getSpeaker(id: number): Promise<Speaker | undefined> {
    const [speaker] = await db.select().from(speakers).where(eq(speakers.id, id));
    return speaker;
  }

  async createSpeaker(speaker: InsertSpeaker): Promise<Speaker> {
    const [newSpeaker] = await db.insert(speakers).values(speaker).returning();
    return newSpeaker;
  }

  async getTalks(): Promise<Talk[]> {
    return await db.select().from(talks);
  }

  async createTalk(talk: InsertTalk): Promise<Talk> {
    const [newTalk] = await db.insert(talks).values(talk).returning();
    return newTalk;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }
}

export const storage = new DatabaseStorage();
