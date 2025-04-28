import { 
  type User, type InsertUser, 
  type Gallery, type InsertGallery,
  type Artwork, type InsertArtwork
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private galleries: Map<number, Gallery>;
  private artworks: Map<number, Artwork>;
  private userIdCounter: number;
  private galleryIdCounter: number;
  private artworkIdCounter: number;

  constructor() {
    this.users = new Map();
    this.galleries = new Map();
    this.artworks = new Map();
    this.userIdCounter = 1;
    this.galleryIdCounter = 1;
    this.artworkIdCounter = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Gallery operations
  async createGallery(insertGallery: InsertGallery): Promise<Gallery> {
    const id = this.galleryIdCounter++;
    const gallery: Gallery = { 
      ...insertGallery, 
      id,
      createdAt: new Date()
    };
    this.galleries.set(id, gallery);
    return gallery;
  }

  async getGallery(id: number): Promise<Gallery | undefined> {
    return this.galleries.get(id);
  }

  async getUserGalleries(userId: number): Promise<Gallery[]> {
    return Array.from(this.galleries.values()).filter(
      (gallery) => gallery.userId === userId
    );
  }

  async getAllGalleries(): Promise<Gallery[]> {
    return Array.from(this.galleries.values());
  }

  async getFeaturedGalleries(): Promise<Gallery[]> {
    return Array.from(this.galleries.values()).filter(
      (gallery) => gallery.featured
    );
  }

  async updateGallery(id: number, galleryUpdate: Partial<InsertGallery>): Promise<Gallery | undefined> {
    const gallery = this.galleries.get(id);
    if (!gallery) return undefined;
    
    const updatedGallery = { ...gallery, ...galleryUpdate };
    this.galleries.set(id, updatedGallery);
    return updatedGallery;
  }

  // Artwork operations
  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    const id = this.artworkIdCounter++;
    const artwork: Artwork = { 
      ...insertArtwork, 
      id,
      createdAt: new Date()
    };
    this.artworks.set(id, artwork);
    return artwork;
  }

  async getArtwork(id: number): Promise<Artwork | undefined> {
    return this.artworks.get(id);
  }

  async getGalleryArtworks(galleryId: number): Promise<Artwork[]> {
    return Array.from(this.artworks.values()).filter(
      (artwork) => artwork.galleryId === galleryId
    );
  }

  async getUserArtworks(userId: number): Promise<Artwork[]> {
    return Array.from(this.artworks.values()).filter(
      (artwork) => artwork.userId === userId
    );
  }
}

export const storage = new MemStorage();
