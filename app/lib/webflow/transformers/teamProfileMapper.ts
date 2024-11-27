import { FieldDataTeamProfile, Item, TeamMember } from "@/app/interfaces";
import { it } from "node:test";

export default function teamProfileMapper(
  item: Item<FieldDataTeamProfile>
): TeamMember {
  return {
    id: item.id,
    name: item.fieldData.name,
    nameArabic: item.fieldData["name-arabic"],
    photoHiRes: item.fieldData["photo-hires"]||"",
    postionArabic: item.fieldData["position-arabic"],
    biographyArabic: item.fieldData["biography-arabic"],
    imageUrl: item.fieldData.photo.url,
    slug: item.fieldData.slug,
    position: item.fieldData.position,
    order: item.fieldData.order,
    paragraphDescription: item.fieldData["paragraph-description"],
    metaDescription: item.fieldData["meta-description"],
    altTextImage: item.fieldData.photo.alt || "",
    filter: item.fieldData.filter,
  };
}
