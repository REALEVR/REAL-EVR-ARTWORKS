import { 
  type User, type InsertUser, 
  type Gallery, type InsertGallery,
  type Artwork, type InsertArtwork,
  users, galleries, artworks
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Gallery operations
  createGallery(gallery: InsertGallery): Promise<Gallery>;
  getGallery(id: number): Promise<Gallery | undefined>;
  getUserGalleries(userId: number): Promise<Gallery[]>;
  getAllGalleries(): Promise<Gallery[]>;
  getFeaturedGalleries(): Promise<Gallery[]>;
  updateGallery(id: number, gallery: Partial<InsertGallery>): Promise<Gallery | undefined>;
  
  // Artwork operations
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
  getArtwork(id: number): Promise<Artwork | undefined>;
  getGalleryArtworks(galleryId: number): Promise<Artwork[]>;
  getUserArtworks(userId: number): Promise<Artwork[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  // Gallery operations
  async createGallery(insertGallery: InsertGallery): Promise<Gallery> {
    const [gallery] = await db
      .insert(galleries)
      .values(insertGallery)
      .returning();
    return gallery;
  }

  async getGallery(id: number): Promise<Gallery | undefined> {
    const [gallery] = await db
      .select()
      .from(galleries)
      .where(eq(galleries.id, id));
    return gallery;
  }

  async getUserGalleries(userId: number): Promise<Gallery[]> {
    return db
      .select()
      .from(galleries)
      .where(eq(galleries.userId, userId));
  }

  async getAllGalleries(): Promise<Gallery[]> {
    return db.select().from(galleries);
  }

  async getFeaturedGalleries(): Promise<Gallery[]> {
    return db
      .select()
      .from(galleries)
      .where(eq(galleries.featured, true));
  }

  async updateGallery(id: number, galleryUpdate: Partial<InsertGallery>): Promise<Gallery | undefined> {
    const [gallery] = await db
      .update(galleries)
      .set(galleryUpdate)
      .where(eq(galleries.id, id))
      .returning();
    return gallery;
  }

  // Artwork operations
  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    const [artwork] = await db
      .insert(artworks)
      .values(insertArtwork)
      .returning();
    return artwork;
  }

  async getArtwork(id: number): Promise<Artwork | undefined> {
    const [artwork] = await db
      .select()
      .from(artworks)
      .where(eq(artworks.id, id));
    return artwork;
  }

  async getGalleryArtworks(galleryId: number): Promise<Artwork[]> {
    return db
      .select()
      .from(artworks)
      .where(eq(artworks.galleryId, galleryId));
  }

  async getUserArtworks(userId: number): Promise<Artwork[]> {
    return db
      .select()
      .from(artworks)
      .where(eq(artworks.userId, userId));
  }
}

export const storage = new DatabaseStorage();
