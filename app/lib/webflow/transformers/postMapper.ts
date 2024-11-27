import {
  PostFieldsCleaned,
  Item,
  PartnersRawFields,
  CategorieRawFields,
  ProgrammeRawFields,
  FieldsPostRaw,
  PeopleRawFields,
  EventFieldData,
  TagRawFields,
} from "../../../../app/interfaces";
import { getIdByDisplayName } from "../getByDisplayName";
import { formatDateArabic } from "../utils/fromDateArabic";

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

export default function postMapper(
  item: Item<FieldsPostRaw>,
  categories: Item<CategorieRawFields>[],
  events: Item<EventFieldData>[],
  programmes: Item<ProgrammeRawFields>[],
  people: Item<PeopleRawFields>[]
): PostFieldsCleaned {
  const { fieldData } = item;
  const programmeMatch = programmes.find(
    (programme) => programme.id === fieldData["programme-2"]
  );
  const categoriesMatch = categories.find(
    (category) => category.id === fieldData["blogs-categories-2"]
  );
  const imagesCarousel =
    fieldData["image-carousel"] && fieldData["image-carousel"]?.length > 0
      ? fieldData["image-carousel"].map((image) => {
          return { url: image.url || "", alt: image.alt || "" };
        })
      : [{ url: "", alt: "" }];
  const relatedTags =
    fieldData["theme-3"] && fieldData["theme-3"].length > 0 
      ? fieldData["theme-3"].map((tagId) => {
          const tagMatch = categories.find((tag) => tag.id === tagId);
          return tagMatch
            ? {
                name: tagMatch.fieldData.name || "",
                slug: tagMatch.fieldData.slug || "",
                arabicName: tagMatch.fieldData["name-arabic"] || "",
              }
            : { name: "N/A", slug: "N/A", arabicName: "N/A" };
        })
      : [];
  const relatedProgrammes =
    fieldData["programmes-multiple"] &&
    fieldData["programmes-multiple"].length > 0
      ? fieldData["programmes-multiple"].map((programmeId) => {
          const programmeMatch = programmes.find(
            (programme) => programme.id === programmeId
          );
          return programmeMatch
            ? {
                name: programmeMatch.fieldData.name || "",
                url: programmeMatch.fieldData.website || "",
                arabicName: programmeMatch.fieldData["name-arabic"] || "",
                slug: programmeMatch.fieldData.slug || "",
              }
            : { name: "N/A", url: "N/A", slug: "N/A", arabicName: "N/A" };
        })
      : [{ name: "N/A", url: "N/A", slug: "N/A", arabicName: "N/A" }];
  const relatedPeople =
    fieldData.people && fieldData.people.length > 0
      ? fieldData.people.map((programmeId) => {
          const peopleMatch = people.find(
            (people) => people.id === programmeId
          );
          return peopleMatch
            ? {
                name: peopleMatch.fieldData.name || "",
                arabicName: peopleMatch.fieldData["name-arabic"] || "",
                slug: peopleMatch.fieldData.slug || "",
              }
            : { name: "N/A", slug: "N/A", arabicName: "N/A" };
        })
      : [{ name: "N/A", url: "N/A", slug: "N/A", arabicName: "N/A" }];

  const eventMatch = events.find(
    (programme) => programme.id === fieldData["related-event"]
  );
  const programeShortName = {
    name: programmeMatch?.fieldData.shortname || "N/A",
    slug: `/porgrammes/${programmeMatch?.fieldData.slug}`,
    arabicName: programmeMatch?.fieldData["name-arabic"] || "N/A",
  };
  const collectionId =  getIdByDisplayName('Posts');


  return {
    originalSlug: fieldData.slug || "",
    webflowCollectionId: collectionId,
    webflowId: item.id,
    videoAsHeroYesNo: fieldData["video-as-hero-yes-no"] || false,
    heroVideoYoutubeEmbedId: fieldData["hero-video-youtube-embed-id"] || "",
    heroVideoArabicYoutubeVideoId: fieldData["hero-video-arabic-youtube-video-id"] || "",
    createdOn: item.createdOn,
    isPostArabic: fieldData["arabic-complete-incomplete"] || false,
    arabicTitle: fieldData["arabic-title"] || "",
    pushToGr: fieldData["push-to-gr"] || false,
    programme: programmeMatch
      ? {
          name: programmeMatch.fieldData.name || "",
          url: programmeMatch.fieldData.website || "",
          arabicName: programmeMatch.fieldData["name-arabic"] || "",
          slug: programmeMatch.fieldData.slug || "",
          shortname: programmeMatch.fieldData.shortname || "",
        }
      : {
          name: "N/A",
          url: "N/A",
          slug: "N/A",
          arabicName: "N/A",
          shortname: "N/A",
        },
    programmesMultiple: relatedProgrammes,
    thumbnail: fieldData.thumbnail
      ? {
          url: fieldData.thumbnail.url || "",
          alt: fieldData.thumbnail.alt || "",
        }
      : { url: "", alt: "" },
    mainImage: fieldData["main-image"]
      ? {
          url: fieldData["main-image"].url || "",
          alt: fieldData["main-image"].alt || "",
        }
      : { url: "", alt: "" },
    openGraphImage: fieldData["open-graph-image"]?.url || "N/A",
    bulletPointsEnglish: fieldData["bullet-points-english"] || "",
    bulletPointsArabic: fieldData["bullet-points-arabic"] || "",
    datePublished: formatDate(fieldData["date-published"] || ""),
    datePublishedArabic : formatDateArabic(fieldData["date-published"] || ""),
    location: fieldData["location"] || "N/A",
    locationArabic: fieldData["location-arabic"] || "N/A",
    seoTitle: fieldData["seo-title"] || "N/A",
    sources: programeShortName,
    seoTitleArabic: fieldData["seo-title-arabic"] || "N/A",
    seoMeta: fieldData["seo-meta"] || "N/A",
    seoMetaArabic: fieldData["seo-meta-arabic"] || "N/A",
    summary: fieldData["summary"] || "N/A",
    summaryArabic: fieldData["summary-arabic"] || "N/A",
    body: fieldData["body"] || "N/A",
    bodyArabic: fieldData["body-arabic"] || "N/A",
    altTextForHeroImage: fieldData["alt-text-for-hero-image"] || "N/A",
    altTextHeroImageArabic: fieldData["alt-text-hero-image-arabic"] || "N/A",
    photoCreditHeroImage: fieldData["photo-credit-hero-image"] || "N/A",
    heroImagePhotoCreditArabic:
      fieldData["hero-image-photo-credit-arabic"] || "N/A",
    theme3: relatedTags,
    blogsCategories2: categoriesMatch?.fieldData.name || "N/A",
    blogsCategories2Arabic: categoriesMatch?.fieldData["name-arabic"] || "N/A",
    featured: fieldData.featured || false,
    imageCarousel: imagesCarousel,
    collectionName: "news",
    imageGalleryCreditsArabic:
      fieldData["image-gallery-credits-arabic"] || "N/A",
    imageCarouselCredits: fieldData["image-carousel-credits"] || "N/A",
    relatedEvent: eventMatch
      ? {
          name: eventMatch.fieldData.name || "",
          arabicName: eventMatch.fieldData["arabic-title"] || "",
          slug: eventMatch.fieldData.slug || "",
        }
      : { name: "N/A", slug: "N/A", arabicName: "N/A" },
    people: relatedPeople,
    innovations: ["N/A"],
    name: fieldData.name || "N/A",
    slug: `/news/${fieldData.slug}` || "N/A",
  };
}
