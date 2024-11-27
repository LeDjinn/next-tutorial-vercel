import {
  Item,
  AwardsRawFields,
  AwardsCleanedFields,
  ProgrammeRawFields,
  PeopleRawFields,
  CategorieRawFields,
  CategorieCleanedFields,
} from "../../../../app/interfaces";

export default function categoryMapper(
  item: Item<CategorieRawFields>
): CategorieCleanedFields {
  return {
    nameArabic: item.fieldData["name-arabic"] || "",
    name: item.fieldData["name"] || "",
    slug: item.fieldData["slug"] || "",
  };
}
