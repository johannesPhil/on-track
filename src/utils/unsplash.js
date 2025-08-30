// Generate a date-based cache key that changes daily
export const getDailyKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

// localStorage utilities
export const saveImageToLocalStorage = (imageData) => {
  try {
    const cacheKey = `unsplash-bg-${getDailyKey()}`;
    localStorage.setItem(cacheKey, JSON.stringify(imageData));
    cleanupOldCache();
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getImageFromLocalStorage = () => {
  try {
    const cacheKey = `unsplash-bg-${getDailyKey()}`;
    const cached = localStorage.getItem(cacheKey);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error("Error parsing cached image:", error);
    return null;
  }
};

// Clean up cache entries older than 7 days
const cleanupOldCache = () => {
  try {
    const keys = Object.keys(localStorage);
    const unsplashKeys = keys.filter((key) => key.startsWith("unsplash-bg-"));

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    unsplashKeys.forEach((key) => {
      const dateStr = key.replace("unsplash-bg-", "");
      const [year, month, day] = dateStr.split("-").map(Number);
      const cacheDate = new Date(year, month - 1, day);

      if (cacheDate < sevenDaysAgo) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Error cleaning up cache:", error);
  }
};

// Preload image to avoid flash
export const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};
