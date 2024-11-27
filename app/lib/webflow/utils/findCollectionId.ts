
  
  export function getIdByDisplayName(slug:string) {
    const collections = [
        { id: "61ee828a15a3182ecebde53f", displayName: "Team", slug: "team" },
        { id: "61ee828a15a3183d2abde540", displayName: "Programmes", slug: "programme" },
        { id: "61ee828a15a31828fcbde541", displayName: "Categories", slug: "categories" },
        { id: "61ee828a15a3183262bde542", displayName: "Posts", slug: "post" },
        { id: "61ee828a15a3185c99bde543", displayName: "News", slug: "news" },
        { id: "61ee828a15a3185051bde544", displayName: "Tags", slug: "tags" },
        { id: "61ee828a15a3183f55bde545", displayName: "Sources", slug: "sources" },
        { id: "6225fe8b1f52b40001a99d66", displayName: "Events", slug: "whats-on" },
        { id: "6225ffe9b0cebfbd804959d2", displayName: "Partners", slug: "partners" },
        { id: "62271a6df4ceb0027d91e6c4", displayName: "People", slug: "people" },
        { id: "62752651d15f281220c102cb", displayName: "Multimedia", slug: "media" },
        { id: "627526abf37b3421d8aa3b5b", displayName: "Shops", slug: "shop" },
        { id: "62ecca53bf75bb29c1d0c790", displayName: "Learns", slug: "learn" },
        { id: "62ecd708bf75bb25b5d163c5", displayName: "Publications", slug: "publications" },
        { id: "63dccbcd9528305cbe16279c", displayName: "Awards", slug: "awards" },
        { id: "640ae90e2e2b16dffd00ff83", displayName: "Legals", slug: "legal" },
        { id: "64353d603e27f6df4c6d067a", displayName: "Jobs", slug: "jobs" },
        { id: "64427f1c1691de58f5b981f3", displayName: "Innovations", slug: "innovations" },
        { id: "64622cc06cf71bde35ae1f69", displayName: "Transcripts", slug: "transcripts" },
        { id: "6464c693391ec7097876061f", displayName: "Features", slug: "features" },
        { id: "64aed077835b06888cf9e4c0", displayName: "Photos", slug: "photos" },
        { id: "64bacc0e3a6d944fe0e92519", displayName: "Recipes", slug: "recipes" },
        { id: "65257bd388d1d0f3aede2ca3", displayName: "Prizes", slug: "prizes" },
        { id: "65682e7c463a46440c603860", displayName: "Harvesting hopes", slug: "harvesting-hope" },
        { id: "65787489acb2dfe84b222e7f", displayName: "Ksas", slug: "ksa" },
        { id: "662b9a518308527ce5ebe005", displayName: "Countries", slug: "country" }
      ];
    const collection = collections.find(item => item.displayName === slug);
    return collection ? collection.id :'';
  }