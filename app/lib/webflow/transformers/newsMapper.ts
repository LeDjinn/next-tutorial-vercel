import {
  Item,
  NewsRawFields,
  NewsCleanedFields,
  ProgrammeRawFields,
  PeopleRawFields,
  SourceRawFields,
  TagRawFields,
  EventFieldData,
} from "../../../../app/interfaces";
import { getIdByDisplayName } from "../getByDisplayName";
import { formatDate } from "../utils/formDate";
import { formatDateArabic } from "../utils/fromDateArabic";


export default function newsMapper(
  item: Item<NewsRawFields>,
  programmes: Item<ProgrammeRawFields>[],
  people: Item<PeopleRawFields>[],
  sources: Item<SourceRawFields>[],
  tags: Item<TagRawFields>[],
  events: Item<EventFieldData>[]
): NewsCleanedFields {
  const { fieldData } = item;

  const sourceMatch = sources.find((source) => source.id === fieldData.sources);
  const source = sourceMatch
    ? {
        name: sourceMatch.fieldData.name || "",
        slug: sourceMatch.fieldData.slug || "",
        arabicName: sourceMatch.fieldData["name-arabic"] || "",
      }
    : { name: "N/A", slug: "N/A", arabicName: "N/A" };

  const programmeMatch = programmes.find(
    (prog) => prog.id === fieldData.programme
  );
  const programme = programmeMatch
    ? {
        name: programmeMatch.fieldData.name || "",
        slug: programmeMatch.fieldData.slug || "",
        shortname: programmeMatch.fieldData["shortname"] || "helloo",
        arabicName: programmeMatch.fieldData["name-arabic"] || "",
      }
    : { name: "N/A", slug: "N/A", arabicName: "N/A", shortname: "N/A" };

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
            }
          : { name: "N/A", slug: "N/A", arabicName: "N/A" };
      })
    : [];

  const relatedPeople = fieldData.people
    ? fieldData.people.map((personId) => {
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

  const relatedInnovations = fieldData["innovation-s"]
    ? fieldData["innovation-s"].map((innovationId) => {
        const innovationMatch = programmes.find(
          (programme) => programme.id === innovationId
        );
        return innovationMatch
          ? {
              name: innovationMatch.fieldData.name || "",
              arabicName: innovationMatch.fieldData["name-arabic"] || "",
              slug: innovationMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A", arabicName: "N/A" };
      })
    : [];

  const relatedEvents = fieldData["related-event-s"]
    ? fieldData["related-event-s"].map((eventId) => {
        const eventMatch = events.find((event) => event.id === eventId);
        return eventMatch
          ? {
              name: eventMatch.fieldData.name || "",
              arabicName: eventMatch.fieldData["arabic-title"] || "",
              slug: eventMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A", arabicName: "N/A" };
      })
    : [];

  const relatedTeamMembers = fieldData["related-team-members"]
    ? fieldData["related-team-members"].map((teamMemberId) => {
        const teamMemberMatch = people.find(
          (person) => person.id === teamMemberId
        );
        return teamMemberMatch
          ? {
              name: teamMemberMatch.fieldData.name || "",
              arabicName: teamMemberMatch.fieldData["name-arabic"] || "",
              slug: teamMemberMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A", arabicName: "N/A" };
      })
    : [];

  const relatedTags = fieldData.tags
    ? fieldData.tags.map((tagId) => {
        const tagMatch = tags.find((tag) => tag.id === tagId);
        return tagMatch
          ? {
              name: tagMatch.fieldData.name || "",
              arabicName: tagMatch.fieldData["name-arabic"] || "",
              slug: tagMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A", arabicName: "N/A" };
      })
    : [];
    const collectionId =  getIdByDisplayName('News');

  return {
    webflowId: item.id,
    webflowCollectionId: collectionId,
    createdOn: item.createdOn || "",
    arabicTitle: fieldData["arabic-title"] || "",
    collectionName: "press",
    pushToGr: fieldData["push-to-gr"] || false,
    featured: fieldData.featured || false,
    externalLink: fieldData["external-link"] || "",
    datePublished: formatDate(fieldData["date-published"] || "") || "",
    datePublishedArabic: formatDateArabic(fieldData["date-published"] || "") || "",
    sources: source,
    programme: programme,
    programmeS: relatedProgrammes,
    people: relatedPeople,
    innovationS: relatedInnovations,
    relatedEvent: {
      name: fieldData["related-event"] || "",
      arabicName: fieldData["arabic-title"] || "",
      slug: fieldData["related-event"] || "",
    },
    relatedEventS: relatedEvents,
    summary: fieldData.summary || "",
    summaryArabic: fieldData["summary-arabic"] || "",
    excerpt: fieldData.excerpt || "",
    thumbnail: {
      url: fieldData.thumbnail?.url || "",
      alt: fieldData.thumbnail?.alt || "",
    },
    heroImage: {
      url: fieldData["hero-image"]?.url || "",
      alt: fieldData["hero-image"]?.alt || "",
    },
    thumbnailAltText: fieldData["thumbnail-alt-text"] || "",
    imageAltTextArabic: fieldData["image-alt-text-arabic"] || "",
    relatedTeamMembers: relatedTeamMembers,
    tags: relatedTags,
    removeFromNewsGrid: fieldData["remove-from-news-grid"] || false,
    name: fieldData.name || "",
    slug: `/media/${fieldData.slug}` || "",
    originalSlug: fieldData.slug || "",
  };
}
