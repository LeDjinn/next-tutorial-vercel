import {
  EventFieldData,
  Item,
  MultimediaCleanedFields,
  MultimediaRawFields,
  PeopleRawFields,
  ProgrammeRawFields,
  SourceRawFields,
} from "../../../../app/interfaces";
import { formatDate } from "../utils/formDate";
import { Source } from "postcss";
import { arrayBuffer } from "stream/consumers";
export default function multimediaMapper(
  item: Item<MultimediaRawFields>,
  programmes: Item<ProgrammeRawFields>[],
  events: Item<EventFieldData>[],
  sources: Item<SourceRawFields>[],
  people: Item<PeopleRawFields>[]
): MultimediaCleanedFields {
  const { fieldData } = item;
  const optionsType = [
    {
      name: "video",
      id: "12c285a1559398d7807de54a56160616",
    },
    {
      name: "audio",
      id: "f3c29d41192018e7b692df578cc317c4",
    },
    {
      name: "other",
      id: "8b855376e67bdc8bc85ebdd8911fcd35",
    },
    {
      name: "photo",
      id: "6baffb4a3887be45a6a433d870505907",
    },
  ];
  function getNameById(id: string): "video" | "audio" | "other" | "photo" {
    const option = optionsType.find((option) => option.id === id);
    return option
      ? (option.name as "video" | "audio" | "other" | "photo")
      : "other";
  }
  const sourceMatch = sources.find((source) => source.id === fieldData.source);
  const source = sourceMatch
    ? {
        name: sourceMatch.fieldData.name || "",
        arabicName: sourceMatch.fieldData["name-arabic"] || "",
        slug: sourceMatch.fieldData.slug || "",
      }
    : { name: "N/A", slug: "N/A", arabicName: "N/A" };
  const realtedLabelProgramme = programmes.find(
    (programme) => programme.id === fieldData["programme-label"]
  );
  const programmeLabel = {
    name: realtedLabelProgramme?.fieldData.name || "",
    slug: realtedLabelProgramme?.fieldData.slug || "",
    arabicName: realtedLabelProgramme?.fieldData["name-arabic"] || "",
    shortname: realtedLabelProgramme?.fieldData["shortname"] || "",
  };
  const relatedProgrammes =
    fieldData["related-programmes"]?.map((programmeId) => {
      const programmeMatch = programmes.find(
        (programme) => programme.id === programmeId
      );
      return programmeMatch
        ? {
            name: programmeMatch.fieldData.name || "",
            arabicName: programmeMatch.fieldData["name-arabic"] || "",
            slug: programmeMatch.fieldData.slug || "",
          }
        : { name: "N/A", slug: "N/A", arabicName: "N/A" };
    }) || [];

  const relatedPeople =
    fieldData["related-people"]?.map((personId) => {
      const peopleMatch = people.find((person) => person.id === personId);
      return peopleMatch
        ? {
            name: peopleMatch.fieldData.name || "",
            arabicName: peopleMatch.fieldData["name-arabic"] || "",
            slug: peopleMatch.fieldData.slug || "",
          }
        : { name: "N/A", slug: "N/A", arabicName: "N/A" };
    }) || [];

  const relatedEvent =
    fieldData["related-event"]?.map((eventId) => {
      const eventMatch = events.find((event) => event.id === eventId);
      return eventMatch
        ? {
            name: eventMatch.fieldData.name || "",
            arabicName: eventMatch.fieldData["arabic-title"] || "",
            slug: eventMatch.fieldData.slug || "",
          }
        : { name: "N/A", slug: "N/A", arabicName: "N/A" };
    }) || [];

  const thumbnail = fieldData.thumbnail
    ? { url: fieldData.thumbnail.url || "", alt: fieldData.thumbnail.alt || "" }
    : { url: "", alt: "" };

  const heroVideoAudio = fieldData["hero-video-audio"]
    ? {
        url: fieldData["hero-video-audio"].url || "",
        alt: fieldData["hero-video-audio"].alt || "",
      }
    : { url: "", alt: "" };

  const squareListen1x2 = fieldData["square-listen-1x2"]
    ? {
        url: fieldData["square-listen-1x2"].url || "",
        alt: fieldData["square-listen-1x2"].alt || "",
      }
    : { url: "", alt: "" };

  // Ensure `type` field is one of the allowed values
  const allowedTypes = ["video", "audio", "photo", "other"];
  const iframe = fieldData["video-link"]?.metadata.html || "";

  return {
    createdOn: item["createdOn"] || "",
    nameArabic: fieldData["name-arabic"] || "N/A",
    pushToGr: fieldData["push-to-gr"] || false,
    programmeLabel: programmeLabel,
    relatedProgrammes: relatedProgrammes,
    collectionName: "multimedia",
    datePublished: formatDate(fieldData["date"] || ""),
    innovationRelated: fieldData["innovation-related"] || [],
    relatedPeople: relatedPeople,
    relatedEvent: relatedEvent,
    thumbnail: thumbnail,
    heroVideoAudio: heroVideoAudio,
    squareListen1x2: squareListen1x2,
    noEmbedCode: fieldData["no-embed-code"] || false,
    embedCode: fieldData["embed-code"] || "N/A",
    description: fieldData["description"] || "N/A",
    date: formatDate(fieldData["date"] || ""),
    type: fieldData.type ? getNameById(fieldData.type) : "other",
    sources: source,
    originalLink: fieldData["original-link"] || "N/A",
    videoLink: iframe || "N/A",
    linkAudio: fieldData["link-audio"] || "N/A",
    name: fieldData["name"] || "N/A",
    slug: `multimedia/${fieldData.slug}` || "N/A",
  };
}
