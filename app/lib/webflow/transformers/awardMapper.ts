import {
  Item,
  AwardsRawFields,
  AwardsCleanedFields,
  ProgrammeRawFields,
  PeopleRawFields,
} from "../../../../app/interfaces";

export default function awardMapper(
  item: Item<AwardsRawFields>,
  programmes: Item<ProgrammeRawFields>[],
  people: Item<PeopleRawFields>[]
): AwardsCleanedFields {
  type Option = {
    name: string;
    id: string;
  };

  const options: Option[] = [
    { name: "External", id: "1cf6737ae7d358d9f90a8b74e136cf2e" },
    { name: "Community", id: "00c4a057f5450a9619a242a3f75daeb1" },
  ];

  function getNameById(id: string): string {
    const option = options.find((option) => option.id === id);
    return option ? option.name : "";
  }
  const { fieldData } = item;

  const relatedProgrammes = fieldData["programme-related"]
    ? fieldData["programme-related"].map((programmeId) => {
        const programmeMatch = programmes.find(
          (programme) => programme.id === programmeId
        );
        return programmeMatch
          ? {
              name: programmeMatch.fieldData.name || "",
              arabicName: programmeMatch.fieldData["name-arabic"] || "",
              slug: programmeMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A", arabicName: "N/A"};
      })
    : [];

  const relatedPeople = fieldData["people-related"]
    ? fieldData["people-related"].map((personId) => {
        const peopleMatch = people.find((person) => person.id === personId);
        return peopleMatch
          ? {
              name: peopleMatch.fieldData.name || "",
              arabicName: peopleMatch.fieldData["name-arabic"] || "",
              slug: peopleMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A" , arabicName: "N/A"};
      })
    : [];

  return {
    nameArabic: fieldData["name-arabic"] || "",
    customLink: fieldData["custom-link"] || "",
    logo: {
      url: fieldData["logo"]?.url || "",
      alt: fieldData["logo"]?.alt || "",
    },
    thumbnail: {
      url: fieldData["thumbnail"]?.url || "",
      alt: fieldData["thumbnail"]?.alt || "",
    },
    image: {
      url: fieldData["image"]?.url || "",
      alt: fieldData["image"]?.alt || "",
    },
    openGraph: {
      url: fieldData["open-graph"]?.url || "",
      alt: fieldData["open-graph"]?.alt || "",
    },
    description: fieldData["description"] || "",
    descriptionArabic: fieldData["description-arabic"] || "",
    type: fieldData.type ? getNameById(fieldData.type) : "",
    date: fieldData.date || "",
    peopleRelated: relatedPeople,
    programmeRelated: relatedProgrammes,
    name: fieldData.name || "",
    slug: fieldData.slug || "",
  };
}
