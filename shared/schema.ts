import { pgTable, text, serial, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  bio: text("bio"),
  profileImage: text("profile_image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  galleries: many(galleries),
  artworks: many(artworks),
}));

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

// Gallery schema
export const galleries = pgTable("galleries", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  coverImage: text("cover_image"),
  userId: serial("user_id").notNull(),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const galleriesRelations = relations(galleries, ({ one, many }) => ({
  user: one(users, {
    fields: [galleries.userId],
    references: [users.id],
  }),
  artworks: many(artworks),
}));

export const insertGallerySchema = createInsertSchema(galleries).omit({
  id: true,
  createdAt: true,
});

// Artwork schema
export const artworks = pgTable("artworks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  medium: varchar("medium", { length: 100 }),
  imageUrl: text("image_url").notNull(),
  galleryId: serial("gallery_id").notNull(),
  userId: serial("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const artworksRelations = relations(artworks, ({ one }) => ({
  gallery: one(galleries, {
    fields: [artworks.galleryId],
    references: [galleries.id],
  }),
  user: one(users, {
    fields: [artworks.userId],
    references: [users.id],
  }),
}));

export const insertArtworkSchema = createInsertSchema(artworks).omit({
  id: true,
  createdAt: true,
});

// Medium types for validation
export const mediumTypes = [
  "oil",
  "acrylic", 
  "watercolor",
  "digital",
  "mixed_media",
  "sculpture",
  "photography",
  "drawing",
  "printmaking",
  "textile",
  "ceramic",
  "other"
] as const;

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Gallery = typeof galleries.$inferSelect;
export type InsertGallery = z.infer<typeof insertGallerySchema>;

export type Artwork = typeof artworks.$inferSelect;
export type InsertArtwork = z.infer<typeof insertArtworkSchema>;