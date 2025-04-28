import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  bio: text("bio"),
  profileImage: text("profile_image"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

// Gallery schema
export const galleries = pgTable("galleries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  coverImage: text("cover_image"),
  userId: integer("user_id").notNull(),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGallerySchema = createInsertSchema(galleries).omit({
  id: true,
  createdAt: true,
});

// Artwork schema
export const artworks = pgTable("artworks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  medium: text("medium"),
  imageUrl: text("image_url").notNull(),
  galleryId: integer("gallery_id").notNull(),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertArtworkSchema = createInsertSchema(artworks).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Gallery = typeof galleries.$inferSelect;
export type InsertGallery = z.infer<typeof insertGallerySchema>;

export type Artwork = typeof artworks.$inferSelect;
export type InsertArtwork = z.infer<typeof insertArtworkSchema>;
