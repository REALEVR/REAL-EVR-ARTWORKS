import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(dateObj);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getArtMediumOptions() {
  return [
    { value: "oil", label: "Oil Painting" },
    { value: "acrylic", label: "Acrylic" },
    { value: "watercolor", label: "Watercolor" },
    { value: "digital", label: "Digital" },
    { value: "mixed_media", label: "Mixed Media" },
    { value: "sculpture", label: "Sculpture" },
    { value: "photography", label: "Photography" },
    { value: "drawing", label: "Drawing" },
    { value: "printmaking", label: "Printmaking" },
    { value: "textile", label: "Textile" },
    { value: "ceramic", label: "Ceramic" },
    { value: "other", label: "Other" },
  ];
}

export function getGalleryStyleOptions() {
  return [
    { value: "all", label: "All" },
    { value: "abstract", label: "Abstract" },
    { value: "figurative", label: "Figurative" },
    { value: "landscape", label: "Landscape" },
    { value: "portrait", label: "Portrait" },
    { value: "sculpture", label: "Sculpture" },
    { value: "digital", label: "Digital" },
    { value: "photography", label: "Photography" },
    { value: "conceptual", label: "Conceptual" },
  ];
}
