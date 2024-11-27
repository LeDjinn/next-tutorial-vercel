import {
  Item,
  PublicationsRawFields,
  PublicationsCleanedFields,
  SourceRawFields,
  ProgrammeRawFields,
  PeopleRawFields,
  PartnersRawFields,
} from "@/app/interfaces";
import { formatDate } from "../utils/formDate";
type Option = {
  name: string;
  id: string;
};
const options: Option[] = [
  {
    name: "Book",
    id: "0142d9a5bd074133b0510f595f521816",
  },
  {
    name: "Report",
    id: "e2f9095600a905892e4dc0b6228f5907",
  },
  {
    name: "Research",
    id: "2872d14a30a92486a473d207c987526b",
  },
  {
    name: "Magazine",
    id: "15609f302065af2a711819223c18e165",
  },
  {
    name: "Article",
    id: "540b259a17c4dea7054320a979c39dfd",
  },
  {
    name: "Essay",
    id: "40651da4fe77e88b071179c3d156ec20",
  },
  {
    name: "Policy Brief",
    id: "432d4928f90f69f15b74478e85f92e2f",
  },
];
function getNameById(id: string): string {
  const option = options.find((option) => option.id === id);
  return option ? option.name : "";
}

export default function publicationMapper(
  item: Item<PublicationsRawFields>,
  programmes: Item<ProgrammeRawFields>[],
  people: Item<PeopleRawFields>[],
  partners: Item<PartnersRawFields>[],
  sources: Item<SourceRawFields>[]
): PublicationsCleanedFields {
  const { fieldData } = item;
  const sourceMatch = sources.find(
    (source) => source.id === fieldData["source-2"]
  );
  const sourceMatchName = sourceMatch?.fieldData.name || "";
  const relatedProgrammes = fieldData["programme-s"]
    ? fieldData["programme-s"].map((programmeId) => {
        const programmeMatch = programmes.find(
          (programme) => programme.id === programmeId
        );
        return programmeMatch
          ? {
              name: programmeMatch.fieldData.name || "",
              arabicName: programmeMatch.fieldData["name-arabic"] || "",
              slug: programmeMatch.fieldData.slug || "",
              shortName: programmeMatch.fieldData.shortname || "N/A",
            }
          : { name: "N/A", slug: "N/A", arabicName: "N/A", shortName: "N/A" };
      })
    : [];

  const relatedPeople = fieldData["people"]
    ? fieldData["people"].map((personId) => {
        const peopleMatch = people.find((person) => person.id === personId);
        return peopleMatch
          ? {
              name: peopleMatch.fieldData.name || "",
              arabicName: peopleMatch.fieldData["name-arabic"] || "",
              slug: peopleMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A", arabicName: "N/A" };
      })
    : [];

  const validateSource = {
    name: "ff" ,
    slug: "N/A",
    arabicName: relatedProgrammes[0]?.arabicName || "",
  };
  
  const shortName = relatedProgrammes.length > 0 ? relatedProgrammes[0].shortName : "N/A";

  return {
    createdOn : item["createdOn"],
    nameArabic: fieldData["name-arabic"] || "",
    datePublished: fieldData["date-published"]
      ? formatDate(fieldData["date-published"])
      : "",
    type: fieldData.type ? getNameById(fieldData.type) : "",
    bookCoverImage: {
      url: fieldData["book-cover-image"]?.url || "",
      alt: fieldData["book-cover-image"]?.alt || "",
    },
    thumbnail: {
      url: fieldData.thumbnail?.url || "",
      alt: fieldData.thumbnail?.alt || "",
    },
    text: fieldData.text || "",
    summaryArabic: fieldData["summary-arabic"] || "",
    pushToGr: fieldData["push-to-gr"] || false,
    externalLink: fieldData["external-link"] || "",
    document: {
      url: fieldData.document?.url || "",
      alt: fieldData.document?.alt || "",
    },
    source2: sourceMatchName,
    programeShortname: shortName, // Ensure it's always a string
    sources: validateSource,
    collectionName: "publications",
    programmeS: relatedProgrammes,
    authorMetaText: fieldData["author-s-meta-text"] || "",
    authorMetaTextArabic: fieldData["author-s-meta-text-arabic"] || "",
    people: relatedPeople,
    name: fieldData.name || "",
    slug: `/publications/${fieldData.slug}` || "",
  };
}
