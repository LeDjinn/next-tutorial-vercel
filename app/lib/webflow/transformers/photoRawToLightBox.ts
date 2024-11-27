import { Item, PhotoFieldsRaw, ImageLightbox, ProgrammeRawFields, PeopleRawFields } from "../../../../app/interfaces";
import { formatDate } from "../utils/formDate";

export default function photoMapper(
  item: Item<PhotoFieldsRaw>,
  programmes: Item<ProgrammeRawFields>[],
  people: Item<PeopleRawFields>[]
): ImageLightbox {
  const { fieldData } = item;

  const relatedProgrammes = fieldData["programmes-multi-reference"]
    ? fieldData["programmes-multi-reference"].map((programmeId) => {
        const programmeMatch = programmes.find(
          (programme) => programme.id === programmeId
        );
        return programmeMatch
          ? {
              name: programmeMatch.fieldData.name || "",
              slug: programmeMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A" };
      })
    : [];
  const programmeLabel = programmes.find((programme)=> programme.id === fieldData["programme-label"])
  const relatedPeople = fieldData["people-multi-reference"]
    ? fieldData["people-multi-reference"].map((personId) => {
        const peopleMatch = people.find((person) => person.id === personId);
        return peopleMatch
          ? {
              name: peopleMatch.fieldData.name || "",
              slug: peopleMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A" };
      })
    : [];


  return {
    src: fieldData["main-image"]?.url || "",
    alt: fieldData["main-image"]?.alt || "",
    location: fieldData["location-2"] || "",
    year: fieldData.date ? formatDate(fieldData.date) : "",
    people: fieldData["people-multi-reference"]?.join(", ") || "",
    programme2: fieldData["programme-label"] || "",

    nameArabic: fieldData["name-arabic"] || "",
    mainImage: {
      fileId: fieldData["main-image"]?.fileId || "",
      url: fieldData["main-image"]?.url || "",
      alt: fieldData["main-image"]?.alt || ""
    },
    altText: fieldData["alt-text"] || "",
    date: fieldData.date || "",
    description: fieldData.description || "",
    descriptionArabic: fieldData["description-arabic"] || "",
    source: fieldData.source || "",
    programmeLabel: {name: programmeLabel?.fieldData.name || "", slug: programmeLabel?.fieldData.slug || ""},
    programmesMultiReference: relatedProgrammes,
    tags: fieldData.tags || [],
    peopleMultiReference: relatedPeople,
    location2: fieldData["location-2"] || "",
    locationArabic: fieldData["location-arabic"] || "",
    highResolution: fieldData["high-resolution"] || "",
    name: fieldData.name || "",
    slug: fieldData.slug || ""
  };
}
