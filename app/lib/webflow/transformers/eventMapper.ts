import {
  EventFieldData,
  EventFieldDataCleaned,
  Item,
  PartnersRawFields,
  ProgrammeRawFields,
  PeopleRawFields,
} from "../../../../app/interfaces";
import { getIdByDisplayName } from "../getByDisplayName";
import { formatDateArabic } from "../utils/fromDateArabic";
function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const numberOfWords = text ? text.split(/\s+/).length : 0;
  const minutes = Math.ceil(numberOfWords / wordsPerMinute);
  return `${minutes} min read`;
}
const formatDate = (date: Date | string): string => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  if (date instanceof Date && !isNaN(date.valueOf())) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } else {
    return "Invalid Date";
  }
};
export default function eventMapper(
  item: Item<EventFieldData>,
  arrayPartners: Item<PartnersRawFields>[],
  arrayProgramme: Item<ProgrammeRawFields>[],
  people: Item<PeopleRawFields>[]
): EventFieldDataCleaned {
  const imagesCarousel =
    item.fieldData["image-gallery"] &&
    item.fieldData["image-gallery"]?.length > 0
      ? item.fieldData["image-gallery"].map((image) => {
          return { url: image.url || "", alt: image.alt || "" };
        })
      : [{ url: "", alt: "" }];
  const matchPeople =
    item.fieldData["related-people"] &&
    item.fieldData["related-people"].length > 0
      ? item.fieldData["related-people"].map((personId) => {
          const personMatch = people.find((person) => person.id === personId);
          return personMatch
            ? {
                name: personMatch.fieldData.name || "",
                arabicName: personMatch.fieldData["name-arabic"] || "",
                slug: personMatch.fieldData.slug || "",
              }
            : { name: "N/A", slug: "N/A", arabicName: "N/A" };
        })
      : [];
  const matchPartners =
    item.fieldData.partners && item.fieldData.partners.length > 0
      ? item.fieldData.partners
          .map((partnerId) =>
            arrayPartners.find((partner) => partner.id === partnerId)
          )
          .filter((partner) => partner !== undefined)
      : [];
  const matchRepresentatives =
    item.fieldData["participants-affiliated-institutions"] &&
    item.fieldData["participants-affiliated-institutions"].length > 0
      ? item.fieldData["participants-affiliated-institutions"]
          .map((partnerId) =>
            arrayPartners.find((partner) => partner.id === partnerId)
          )
          .filter((partner) => partner !== undefined)
      : [];
  const matchOrganisers =
    item.fieldData.organisers && item.fieldData.organisers.length > 0
      ? item.fieldData.organisers
          .map((organiserId) =>
            arrayPartners.find((partner) => partner.id === organiserId)
          )
          .filter((partner) => partner !== undefined)
      : [];
  const matchProgrammes =
    item.fieldData["related-programme-s"] &&
    item.fieldData["related-programme-s"].length > 0
      ? item.fieldData["related-programme-s"]
          .map((programmeId) =>
            arrayProgramme.find((programme) => programme.id === programmeId)
          )
          .filter((programme) => programme !== undefined)
      : [];
  const programmeLabelCleaned = matchProgrammes
    .map((prog) => (prog ? prog.fieldData.name : ""))
    .filter((name): name is string => name !== undefined);
  const programmeLabelShortCleaned = matchProgrammes
    .map((prog) => (prog ? prog.fieldData.shortname : ""))
    .filter((name): name is string => name !== undefined);
  const fakeSource = {
    name: programmeLabelCleaned[0],
    arabicName: matchProgrammes[0]?.fieldData["field-arabic"] || "N/A",
    slug: "N/A",
  };
  const collectionId =  getIdByDisplayName('Events');
  return {
    createdOn: item.createdOn,
    originalSlug: item.fieldData.slug,
    webflowCollectionId: collectionId,
    webflowId: item.id,
    video2EmbedCode: item.fieldData["video-2-embed-code"] || "",
    video3EmbedCode: item.fieldData["video-3-embed-code"] || "",
    mainVideoEmbedCode: item.fieldData["main-video-embed-code"] || "",
    pushToGr: item.fieldData["push-to-gr"] || false,
    programmeLabel: programmeLabelCleaned[0] || "",
    programmeLabelShort: programmeLabelShortCleaned[0] || "",
    inTheMedia: item.fieldData["in-the-media"] || "",
    sources: fakeSource,
    relatedProgrammes: matchProgrammes
      .map((prog) => (prog ? prog.fieldData.name : ""))
      .filter((name): name is string => name !== undefined),
    thumbnail: {
      url: item.fieldData.thumbnail?.url || "",
      alt: item.fieldData.thumbnail?.alt || "",
    },
    heroImage: {
      url: item.fieldData["hero-image"]?.url || "",
      alt: item.fieldData["hero-image"]?.alt || "",
    },
    openGraphImage: {
      url: item.fieldData["open-graph-image"]?.url || "",
      alt: item.fieldData["open-graph-image"]?.alt || "",
    },
    isDraft: item.isDraft,
    heroImageCaption: item.fieldData["hero-image-caption"] || "",
    datePublished: formatDate(item.fieldData["event-date"] || ""),
    featured: item.fieldData.featured || false,
    arabicTitle: item.fieldData["arabic-title"] || "",
    seoMetaDescription: item.fieldData["seo-meta-description"] || "",
    seoTitle: item.fieldData["seo-title"] || "",
    teaserText: item.fieldData["teaser-text"] || "",
    signupEmbed: item.fieldData["signup-embed"] || "",
    shortDescription2: item.fieldData["short-description-2"] || "",
    eventDate: formatDate(item.fieldData["event-date"] || ""),
    eventDateArabic: formatDateArabic(item.fieldData["event-date"] || ""),
    endDate: formatDate(
      item.fieldData["end-date"] || item.fieldData["event-date"] || ""
    ),
    endDateArabic: formatDateArabic(item.fieldData["end-date"] || ""),
    time: item.fieldData.time || "",
    address: item.fieldData.address || "",
    locationLink: item.fieldData["location-link"] || "",
    livestreamLink: item.fieldData["livestream-link"] || "",
    attendanceType: item.fieldData["attendance-type"] || "",
    contactDetails: item.fieldData["contact-details"] || "",
    buttonCtaText: item.fieldData["button-cta-text"] || "",
    rsvpLink: item.fieldData["rsvp-link"] || "",
    collectionName: "event",

    trailerLivestreamHighlightsVideoLink: item.fieldData[
      "trailer-livestream-highlights-video-link"
    ]
      ? item.fieldData["trailer-livestream-highlights-video-link"].metadata.html
      : "",
    video2: item.fieldData["video-2"] || "",
    video3: item.fieldData["video-3"] || "",
    tags: item.fieldData.tags || [],
    relatedPeople: matchPeople,
    organisers: matchOrganisers.map((organiser) => {
      return {
        name: organiser?.fieldData.name || "",
        slug: organiser?.fieldData.slug || "",
        website: organiser?.fieldData.website || "",
        logo: {
          url: organiser?.fieldData.logo?.url || "",
          alt: organiser?.fieldData.logo?.alt || "",
        },
      };
    }),
    partners: matchPartners.map((partner) => {
      return {
        name: partner?.fieldData.name || "",
        slug: partner?.fieldData.slug || "",
        website: partner?.fieldData.website || "",
        logo: {
          url: partner?.fieldData.logo?.url || "",
          alt: partner?.fieldData.logo?.alt || "",
        },
      };
    }),
    participantsAffiliatedInstitutions: matchRepresentatives.map(
      (organiser) => {
        return {
          name: organiser?.fieldData.name || "",
          slug: organiser?.fieldData.slug || "",
          website: organiser?.fieldData.website || "",
          logo: {
            url: organiser?.fieldData.logo?.url || "",
            alt: organiser?.fieldData.logo?.alt || "",
          },
        };
      }
    ),
    richText: item.fieldData["rich-text"] || "",
    imageGallery: imagesCarousel || [],
    galleryPhotoCredits: item.fieldData["gallery-photo-credits"] || "",
    newsOnOff: item.fieldData["news-on-off"] || false,
    customCodeForHidingWeglot:
      item.fieldData["custom-code-for-hiding-weglot"] || "",
    group: item.fieldData.group || "",
    name: item.fieldData.name || "",
    slug: `/events/${item.fieldData.slug}` || "",
    city: item.fieldData.city || "",
  };
}
