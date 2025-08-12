import express from "express";
import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertGallerySchema, insertArtworkSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";

// Extend Express Request type to include 'file' and 'files' for multer
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
      files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[];
    }
  }
}

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage_config = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueId = nanoid(10);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueId}${ext}`);
  },
});

const upload = multer({ storage: storage_config });

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use("/uploads", express.static(uploadDir));

  // API Routes
  // Users
  app.post("/api/users/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);

      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  app.post("/api/users/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: "Login failed", error });
    }
  });

  app.get("/api/users", async (req: Request, res: Response) => {
    try {
      const users = await storage.getAllUsers();
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      res.status(200).json(usersWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users", error });
    }
  });

  app.get("/api/users/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user", error });
    }
  });

  // Galleries
  app.post("/api/galleries", upload.single("coverImage"), async (req: Request, res: Response) => {
    try {
      const galleryData = {
        title: req.body.title,
        description: req.body.description || null,
        userId: parseInt(req.body.userId, 10),
        featured: req.body.featured === 'true' || req.body.featured === true,
        coverImage: req.file ? `/uploads/${req.file.filename}` : null,
      };

      const validatedData = insertGallerySchema.parse(galleryData);
      const gallery = await storage.createGallery(validatedData);

      res.status(201).json(gallery);
    } catch (error) {
      const errorMessage = typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error);
      res.status(400).json({ message: "Invalid gallery data", error: errorMessage });
    }
  });

  app.get("/api/galleries", async (req: Request, res: Response) => {
    try {
      const galleries = await storage.getAllGalleries();
      res.status(200).json(galleries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch galleries", error });
    }
  });

  app.get("/api/galleries/featured", async (req: Request, res: Response) => {
    try {
      const featuredGalleries = await storage.getFeaturedGalleries();
      res.status(200).json(featuredGalleries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured galleries", error });
    }
  });

  app.get("/api/galleries/:id", async (req: Request, res: Response) => {
    try {
      const gallery = await storage.getGallery(parseInt(req.params.id));

      if (!gallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }

      res.status(200).json(gallery);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery", error });
    }
  });

  app.get("/api/users/:userId/galleries", async (req: Request, res: Response) => {
    try {
      const userGalleries = await storage.getUserGalleries(parseInt(req.params.userId));
      res.status(200).json(userGalleries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user galleries", error });
    }
  });

  // Artworks
  app.post("/api/artworks", upload.single("image"), async (req: Request, res: Response) => {
    try {
      let artworkData = req.body;

      if (req.file && req.file.filename) {
        artworkData.imageUrl = `/uploads/${req.file.filename}`;
      } else {
        return res.status(400).json({ message: "Image file is required" });
      }

      const validatedData = insertArtworkSchema.parse(artworkData);
      const artwork = await storage.createArtwork(validatedData);

      res.status(201).json(artwork);
    } catch (error) {
      res.status(400).json({ message: "Invalid artwork data", error });
    }
  });

  app.get("/api/artworks/:id", async (req: Request, res: Response) => {
    try {
      const artwork = await storage.getArtwork(parseInt(req.params.id));

      if (!artwork) {
        return res.status(404).json({ message: "Artwork not found" });
      }

      res.status(200).json(artwork);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artwork", error });
    }
  });

  app.get("/api/galleries/:galleryId/artworks", async (req: Request, res: Response) => {
    try {
      const galleryArtworks = await storage.getGalleryArtworks(parseInt(req.params.galleryId));
      res.status(200).json(galleryArtworks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery artworks", error });
    }
  });

  app.get("/api/users/:userId/artworks", async (req: Request, res: Response) => {
    try {
      const userArtworks = await storage.getUserArtworks(parseInt(req.params.userId));
      res.status(200).json(userArtworks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user artworks", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
