import { Item, PartnersRawFields, PartnersCleanedFields, TagRawFields } from "../../../../app/interfaces"

export default function partnerMapper(
  item: Item<PartnersRawFields>,
  tags: Item<TagRawFields>[]
): PartnersCleanedFields {
  const { fieldData } = item;

  const relatedTags = fieldData.tags
    ? fieldData.tags.map((tagId) => {
        const tagMatch = tags.find(tag => tag.id === tagId);
        return tagMatch
          ? {
              name: tagMatch.fieldData.name || "",
              arabicName: tagMatch.fieldData["name-arabic"] || "",
              slug: tagMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A", arabicName  : "N/A"};
      })
    : [];

  return {
    arabicName: fieldData["arabic-name"] || "",
    website: fieldData.website || "",
    logo: {
      url: fieldData.logo?.url || "",
      alt: fieldData.logo?.alt || ""
    },
    shortDescription: fieldData["short-description"] || "",
    shortDescriptionArabic: fieldData["short-description-arabic"] || "",
    group: fieldData.group || "",
    tags: relatedTags,
    name: fieldData.name || "",
    slug: fieldData.slug || ""
  };
}
