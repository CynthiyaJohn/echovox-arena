import { z } from 'zod';
import { insertBookingSchema, speakers, talks, bookings } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  speakers: {
    list: {
      method: 'GET' as const,
      path: '/api/speakers',
      responses: {
        200: z.array(z.custom<typeof speakers.$inferSelect>()),
      },
    },
  },
  talks: {
    list: {
      method: 'GET' as const,
      path: '/api/talks',
      responses: {
        200: z.array(z.custom<typeof talks.$inferSelect>()),
      },
    },
  },
  bookings: {
    create: {
      method: 'POST' as const,
      path: '/api/bookings',
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
