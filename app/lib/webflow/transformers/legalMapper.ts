import { Item, LegalRawFields, LegalCleanFields } from "../../../../app/interfaces";

export default function legalMapper(
  item: Item<LegalRawFields>
): LegalCleanFields {
  const { fieldData } = item;

  return {
    nameArabic: fieldData["name-arabic"] || "",
    body: fieldData["body"] || "",
    bodyArabic: fieldData["body-arabic"] || "",
    name: fieldData.name || "",
    slug: fieldData.slug || ""
  };
}
