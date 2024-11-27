import { Item, TagRawFields, TagCleanedFields } from "@/app/interfaces";

export default function tagMapper(
  item: Item<TagRawFields>
): TagCleanedFields {
  const { fieldData } = item;

  return {
    nameArabic: fieldData["name-arabic"] || "",
    name: fieldData.name || "",
    slug: fieldData.slug || ""
  };
}
