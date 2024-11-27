import { Item, SourceRawFields, SourceCleanedFields } from "@/app/interfaces";

export default function sourceMapper(
  item: Item<SourceRawFields>
): SourceCleanedFields {
  const { fieldData } = item;

  return {
    nameArabic: fieldData["name-arabic"] || "",
    shortName: fieldData["short-name"] || "",
    shortNameArabic: fieldData["short-name-arabic"] || "",
    logo: {
      url: fieldData["logo"]?.url || "",
      alt: fieldData["logo"]?.alt || ""
    },
    logoNative: {
      url: fieldData["logo-native"]?.url || "",
      alt: fieldData["logo-native"]?.alt || ""
    },
    name: fieldData.name || "",
    slug: fieldData.slug || ""
  };
}
