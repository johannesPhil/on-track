import { useQuery } from "@tanstack/react-query";
import {
  saveImageToLocalStorage,
  getImageFromLocalStorage,
  getDailyKey,
} from "../../utils/unsplash";

const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random";

// Pure API fetch function for React Query
export const fetchUnsplashImage = async () => {
  const response = await fetch(
    `${UNSPLASH_API_URL}?client_id=${
      import.meta.env.VITE_UNSPLASH_KEY
    }&orientation=landscape&query=nature,minimal,abstract&w=1920&h=1080`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return {
    url: data.urls.regular,
    fullUrl: data.urls.full,
    author: data.user.name,
    authorUrl: data.user.links.html,
    description:
      data.description || data.alt_description || "Beautiful background",
    downloadUrl: data.links.download_location,
  };
};

export const useBackgroundImage = () => {
  return useQuery({
    queryKey: ["backgroundImage", getDailyKey()],
    queryFn: async () => {
      try {
        // Try to fetch from API
        const imageData = await fetchUnsplashImage();

        // Save to localStorage for future fallback
        saveImageToLocalStorage(imageData);

        return imageData;
      } catch (error) {
        console.error("Error fetching from Unsplash API:", error);

        // Fallback to localStorage
        const cachedImage = getImageFromLocalStorage();
        if (cachedImage) {
          console.log("Using cached image from localStorage");
          return cachedImage;
        }

        // Final fallback
        throw new Error("No image available");
      }
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - data stays fresh for a day
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days - keep in React Query cache
    retry: 1, // Only retry once before falling back
    retryDelay: 1000, // Wait 1 second before retry

    // Return cached data while refetching in background if stale
    refetchOnWindowFocus: false,
    refetchOnMount: false,

    // Provide initial data from localStorage if available
    initialData: () => {
      const cached = getImageFromLocalStorage();
      return cached || undefined;
    },

    // Only use initial data if it exists and is from today
    initialDataUpdatedAt: () => {
      const cached = getImageFromLocalStorage();
      if (cached) {
        // Return today's timestamp so React Query knows when this data was "fetched"
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today.getTime();
      }
      return 0;
    },
  });
};
