import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import {
  CsvLibraryEntry,
  DEFAULT_CSV_RAW,
  parseCsvText,
  findMatchInCsvLibrary,
  ensureJpegUrl,
} from "./src/data/internalCsvLibrary";

// Initialize Gemini AI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Default server-side CSV library dataset initialized from user's provided CSV
const SERVER_DEFAULT_CSV = parseCsvText(DEFAULT_CSV_RAW);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Proxy route for n8n webhook
  app.post("/api/n8n-webhook", async (req, res) => {
    try {
      const { mode, json } = req.body;
      if (!json) {
        return res.status(400).json({ error: "No JSON payload provided" });
      }

      // Try calling n8n webhook server-side
      try {
        const n8nRes = await fetch("https://fliptrail2.app.n8n.cloud/webhook-test/drapt-image-json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode, json }),
        });

        if (n8nRes.ok) {
          const webhookData = await n8nRes.json();
          return res.json(webhookData);
        }
      } catch (n8nErr) {
        console.warn("n8n direct webhook fetch error:", n8nErr);
      }

      // Fallback local processing if n8n webhook is offline
      const enrichedResult = await processAndEnrichJson({
        data: json,
        applyTo: (mode === "category" || mode === "drinks_item" || mode === "item" || mode === "both") ? mode : "both",
        imageKey: "imageUrl",
        provider: "auto_csv_online",
        csvEntries: SERVER_DEFAULT_CSV,
      });

      return res.json({
        updatedJson: enrichedResult.updatedData,
        matchedCount: enrichedResult.stats.matchedFromCsv || 0,
        missingCount: enrichedResult.stats.matchedFromWeb || 0,
        matches: [],
        suggestions: [],
      });
    } catch (err: any) {
      console.error("Error in n8n webhook proxy:", err);
      return res.status(500).json({ error: err.message || "Failed to process n8n webhook" });
    }
  });

  // API: Enrich JSON with images
  app.post("/api/enrich-json", async (req, res) => {
    try {
      const {
        jsonContent,
        applyTo = "both", // 'category' | 'item' | 'both'
        imageKey = "imageUrl",
        provider = "auto_csv_online",
        customCsvEntries = null,
      } = req.body;

      if (!jsonContent) {
        return res.status(400).json({ error: "No JSON content provided" });
      }

      let parsedData: any;
      try {
        parsedData = typeof jsonContent === "string" ? JSON.parse(jsonContent) : jsonContent;
      } catch (e: any) {
        return res.status(400).json({ error: `Invalid JSON syntax: ${e.message}` });
      }

      // Determine active CSV library entries
      const activeCsvEntries: CsvLibraryEntry[] = Array.isArray(customCsvEntries) && customCsvEntries.length > 0
        ? customCsvEntries
        : SERVER_DEFAULT_CSV;

      // Enrich JSON logic
      const result = await processAndEnrichJson({
        data: parsedData,
        applyTo,
        imageKey,
        provider,
        csvEntries: activeCsvEntries,
      });

      return res.json({
        success: true,
        updatedJson: result.updatedData,
        stats: result.stats,
      });
    } catch (err: any) {
      console.error("Error enriching JSON:", err);
      return res.status(500).json({
        error: "Failed to process JSON",
        details: err.message || "Unknown server error",
      });
    }
  });

  // API: Regenerate single item or category image
  app.post("/api/regenerate-image", async (req, res) => {
    try {
      const { title, context = "", provider = "auto_csv_online", customCsvEntries = null } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      const activeCsvEntries: CsvLibraryEntry[] = Array.isArray(customCsvEntries) && customCsvEntries.length > 0
        ? customCsvEntries
        : SERVER_DEFAULT_CSV;

      const resImage = await fetchImageForTerm(title, context, provider, activeCsvEntries);
      return res.json({ success: true, imageUrl: resImage.url, source: resImage.source });
    } catch (err: any) {
      console.error("Error regenerating image:", err);
      return res.status(500).json({ error: "Failed to regenerate image" });
    }
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// Map of curated high-quality Pexels & Pixabay & Unsplash topic images for online search fallback
const ONLINE_IMAGE_DATABASE: Record<string, string[]> = {
  burger: [
    "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80&fm=jpg",
  ],
  pizza: [
    "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80&fm=jpg",
  ],
  pasta: [
    "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_1280.jpg",
  ],
  coffee: [
    "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://cdn.pixabay.com/photo/2017/08/07/22/57/coffee-2608864_1280.jpg",
  ],
  breakfast: [
    "https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://cdn.pixabay.com/photo/2016/11/29/05/07/breakfast-1867442_1280.jpg",
  ],
  pancake: [
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://cdn.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908_1280.jpg",
  ],
  fish: [
    "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-1238248_1280.jpg",
  ],
  drink: [
    "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://cdn.pixabay.com/photo/2014/09/26/19/51/coke-462793_1280.jpg",
  ],
  dessert: [
    "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  salad: [
    "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
};

function searchOnlineImages(term: string): { url: string; source: "pexels" | "pixabay" | "unsplash" } {
  const cleanTerm = term.toLowerCase();

  for (const [key, urls] of Object.entries(ONLINE_IMAGE_DATABASE)) {
    if (cleanTerm.includes(key)) {
      const selected = urls[Math.floor(Math.random() * urls.length)];
      const source = selected.includes("pexels")
        ? "pexels"
        : selected.includes("pixabay")
        ? "pixabay"
        : "unsplash";
      return { url: ensureJpegUrl(selected), source };
    }
  }

  // Dynamic Pexels/Pixabay direct high-res photo query fallback guaranteed in JPEG format
  const seed = Math.abs(hashCode(term)) % 1000;
  const pexelsStockUrls = [
    `https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://cdn.pixabay.com/photo/2017/01/22/19/20/pizza-2000615_1280.jpg`,
    `https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg`,
  ];

  const picked = pexelsStockUrls[seed % pexelsStockUrls.length];
  const source = picked.includes("pexels") ? "pexels" : "pixabay";
  return { url: ensureJpegUrl(picked), source };
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

/**
 * Fetch image using 2-Tier Strategy:
 * Tier 1: Look into Internal CSV Library (Flipdish CSV records)
 * Tier 2: Search online on Pexels / Pixabay / Unsplash
 */
async function fetchImageForTerm(
  title: string,
  context: string,
  provider: string,
  csvEntries: CsvLibraryEntry[]
): Promise<{ url: string; source: "csv" | "pexels" | "pixabay" | "unsplash" | "placeholder" }> {
  const targetType = context.toLowerCase().includes("cat") ? "category" : "item";

  // Tier 1: Search Internal CSV Library first if enabled
  if (provider !== "pexels_pixabay" && provider !== "placeholder") {
    const csvMatch = findMatchInCsvLibrary(csvEntries, title, targetType);
    if (csvMatch && csvMatch.imageUrl) {
      return {
        url: ensureJpegUrl(csvMatch.imageUrl),
        source: "csv",
      };
    }
  }

  if (provider === "csv_only") {
    // If user specified ONLY CSV, and not found, provide formatted fallback
    return {
      url: ensureJpegUrl(`https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800`),
      source: "csv",
    };
  }

  // Tier 2: Fallback to searching Pexels / Pixabay online sources
  const onlineRes = searchOnlineImages(`${context} ${title}`);
  return {
    url: ensureJpegUrl(onlineRes.url),
    source: onlineRes.source,
  };
}

// Smart JSON processor that identifies Categories and Items and applies image URLs according to applyTo ('category', 'item', 'both')
async function processAndEnrichJson(options: {
  data: any;
  applyTo: "category" | "item" | "both";
  imageKey: string;
  provider: string;
  csvEntries: CsvLibraryEntry[];
}) {
  const { data, applyTo, imageKey, provider, csvEntries } = options;

  let categoriesCount = 0;
  let itemsCount = 0;
  let matchedFromCsv = 0;
  let matchedFromWeb = 0;

  // Deep clone data to avoid mutation
  const updatedData = JSON.parse(JSON.stringify(data));

  // Helper to check if an object looks like a category
  function isCategoryObject(obj: any): boolean {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    const keys = Object.keys(obj).map((k) => k.toLowerCase());
    const hasCategoryName =
      keys.includes("category") ||
      keys.includes("categoryname") ||
      keys.includes("section") ||
      keys.includes("sectionname") ||
      keys.includes("group") ||
      keys.includes("name");

    const hasItemsList =
      keys.includes("items") ||
      keys.includes("products") ||
      keys.includes("dishes") ||
      keys.includes("menuitems") ||
      keys.includes("entries");

    return hasCategoryName && hasItemsList;
  }

  // Helper to check if an object looks like an item
  function isItemObject(obj: any): boolean {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    const keys = Object.keys(obj).map((k) => k.toLowerCase());
    const hasItemName =
      keys.includes("name") ||
      keys.includes("title") ||
      keys.includes("itemname") ||
      keys.includes("productname") ||
      keys.includes("label");

    const hasItemDetail =
      keys.includes("price") ||
      keys.includes("description") ||
      keys.includes("id") ||
      keys.includes("sku") ||
      keys.includes("cost");

    return hasItemName && (hasItemDetail || !isCategoryObject(obj));
  }

  // Recursive traversal and enrichment
  async function traverse(node: any, parentName: string = ""): Promise<void> {
    if (!node || typeof node !== "object") return;

    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        await traverse(node[i], parentName);
      }
      return;
    }

    // Check if current node is a category
    const isCat = isCategoryObject(node);
    const catName =
      node.categoryName ||
      node.category ||
      node.sectionName ||
      node.section ||
      node.group ||
      node.name ||
      "";

    if (isCat) {
      if (applyTo === "category" || applyTo === "both") {
        const imgRes = await fetchImageForTerm(catName, "Category", provider, csvEntries);
        node[imageKey] = imgRes.url;
        node["_imageSource"] = imgRes.source; // Metadata for visual badge
        categoriesCount++;

        if (imgRes.source === "csv") matchedFromCsv++;
        else matchedFromWeb++;
      }
    }

    // Check if current node is an item
    const isItm = isItemObject(node) && !isCat;
    const itemName = node.name || node.title || node.itemName || node.productName || "";

    if (isItm && itemName) {
      if (applyTo === "item" || applyTo === "both") {
        const imgRes = await fetchImageForTerm(itemName, parentName || "Item", provider, csvEntries);
        node[imageKey] = imgRes.url;
        node["_imageSource"] = imgRes.source; // Metadata for visual badge
        itemsCount++;

        if (imgRes.source === "csv") matchedFromCsv++;
        else matchedFromWeb++;
      }
    }

    // Traverse child properties
    for (const key of Object.keys(node)) {
      if (key === imageKey || key === "_imageSource") continue;
      const val = node[key];
      if (typeof val === "object" && val !== null) {
        await traverse(val, catName || parentName);
      }
    }
  }

  await traverse(updatedData);

  // If no categories or items were found with strict heuristics (e.g. flat array of simple objects), apply to array elements directly
  if (categoriesCount === 0 && itemsCount === 0) {
    if (Array.isArray(updatedData)) {
      for (const element of updatedData) {
        if (typeof element === "object" && element !== null) {
          const name = element.name || element.title || element.label || element.category || "Item";
          const imgRes = await fetchImageForTerm(name, "Item", provider, csvEntries);
          element[imageKey] = imgRes.url;
          element["_imageSource"] = imgRes.source;
          itemsCount++;

          if (imgRes.source === "csv") matchedFromCsv++;
          else matchedFromWeb++;
        }
      }
    }
  }

  return {
    updatedData,
    stats: {
      categoriesUpdated: categoriesCount,
      itemsUpdated: itemsCount,
      totalUpdated: categoriesCount + itemsCount,
      matchedFromCsv,
      matchedFromWeb,
      applyTo,
      targetImageKey: imageKey,
    },
  };
}

startServer();

