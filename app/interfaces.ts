import { StaticImageData } from "next/image";

interface ImageProps {
  url: string;
  alt: string;
}
interface DataEntry {
  name: string;
  url: string;
}

export interface DataItem {
  [key: string]: DataEntry[] | undefined;
}

export type DataChecksType = Array<DataItem | undefined>;

export interface HomeCardProps {
  imageUrl: string;
  alt: string;
  title: string;
  subtitle: string;
  link: string;
  openInNewTab?: boolean;
  clickAction: string;
}
export interface RelatedColection {
  name: string;
  arabicName: string;
  shortname?: string;
  slug: string;
  url?: string;
}

export interface ButtonCJProps {
  children: React.ReactNode;
}
export interface CardProgrammeProps {
  imageUrl: string;
  locale?: string;
  arabicProgrammeTitle?: string;
  arabicProgrammeType?: string;
  programmeTitle: string;
  programmeType: string;
  order: string;
  slug: string;
  altText: string;
}
export type CardHorizontalImageProps = {
  imageUrl: StaticImageData | string;
  type?: string;
  title?: string;
};

export interface ListContentProps {
  title: string;
  source: string;
  date: string | Date;
}
export interface ListSmallProps {
  data?: { [key: string]: { name: string; url: string }[] };
}

export interface StatProps {
  title: string;
  content: string;
}
export interface SocialMediaLink {
  url: string;
  name: string;
}
export interface SocialMediaLinks {
  length: number;
  instagram?: SocialMediaLink;
  youtube?: SocialMediaLink;
  linkedin?: SocialMediaLink;
  facebook?: SocialMediaLink;
  twitter?: SocialMediaLink;
  tiktok?: SocialMediaLink;
  github?: SocialMediaLink;
  website?: SocialMediaLink;
}
export interface Image {
  url: string;
}
export interface ListSmallData {
  [key: string]: string[];
}

export interface RowTopData {
  name: string;
  slug: string;
  nameArabic: string;
  description: string;
  descriptionArabic: string;
  mission: string;
  missionArabic: string;
  year: string;
  partners: string[];
  partnersArabic: string[];
}
export interface RowContentData {
  research?: ListSmallProps;
  researchArabic?: ListSmallProps;
  established?: ListSmallProps;
  logo?: { url: string; alt: string };
  logoDark?: { url: string; alt: string };
  button: { text: string; href: string };
  headquarters?: ListSmallProps;
  headquartersArabic?: ListSmallProps;
  leadership?: ListSmallProps;
  leadershipArabic?: ListSmallProps;
  "key initiatives"?: ListSmallProps;
  "key initiativesArabic"?: ListSmallProps;
  "key partners"?: ListSmallProps;
  "key partnersArabic"?: ListSmallProps;
  fullDescription: string;
  fullDescriptionArabic: string;
  socialMediaLinks: SocialMediaLinks;
  stats: StatProps[];
  listContent: ListContentProps[];
  features:
    | {
        image: CardHorizontalImageProps;
        title: string;
        clickAction: string;
        customLink: string;
      }[]
    | [];
}

export interface RowData {
  repository: {
    top: RowTopData;
    content: RowContentData;
  };
}
export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  current: boolean;
  children?: NavSubItem[];
}

export interface NavSubItem {
  name: string;
  href: string;
  current?: boolean; // Optional, as not all subItems might use it
}

export interface TeamMember {
  id?: string;
  name: string;
  imageUrl: string;
  slug?: string;
  position: string;
  nameArabic: string;
  biographyArabic: string;
  postionArabic: string;
  order: number;
  paragraphDescription?: string;
  metaDescription?: string;
  altTextImage?: string;
  photo?: TeamMemberPhoto;
  photoHiRes?: string;
  filter?: string;
}
interface TeamMemberPhoto {
  url: string;
  alt: string;
}

export interface AuthorCardProps {
  author: TeamMember;
  socialPlatforms: string[];
}
export interface FieldDataTeamProfile {
  newsOnOff: boolean;
  position: string;
  name: string;
  slug: string;
  filter: string;
  "photo-hires"?: string;
  order: number;
  "name-arabic": string;
  "meta-description-arabic": string;
  "biography-arabic": string;
  "position-arabic": string;
  "paragraph-description": string;
  "meta-description": string;
  photo: Image;
}

export interface Image {
  fileId: string;
  url: string;
  alt: string | null;
}

export interface Item<T> {
  id: string;
  cmsLocaleId: string | null;
  lastPublished: string | null;
  lastUpdated: string;
  createdOn: string;
  isArchived: boolean;
  isDraft: boolean;
  fieldData: T;
}

export interface EventFieldData {
  "main-video-embed-code": string;
  "video-2-embed-code": string;
  "video-3-embed-code": string;
  createdOn: string;
  "push-to-gr": boolean;
  "programme-label": string;
  "related-programme-s": string[];
  "in-the-media": string;
  thumbnail: {
    fileId: string;
    url: string;
    alt: string | null;
  };
  "hero-image": {
    fileId: string;
    url: string;
    alt: string | null;
  };
  "open-graph-image": {
    fileId: string;
    url: string;
    alt: string | null;
  };
  "hero-image-caption": string;
  featured: boolean;
  "arabic-title": string;
  "seo-meta-description": string;
  "seo-title": string;
  "teaser-text": string;
  "signup-embed": string;
  "short-description-2": string;
  "event-date": string;
  "end-date": string;
  time: string;
  address: string;
  "location-link": string;
  "livestream-link": string;
  "attendance-type": string;
  "contact-details": string;
  "button-cta-text": string;
  "rsvp-link": string;
  "trailer-livestream-highlights-video-link": { metadata: { html: string } };
  "video-2": string;
  "video-3": string;
  tags: string[];
  "related-people": string[];
  organisers: string[];
  partners: string[];
  "participants-affiliated-institutions": string[];
  "rich-text": string;
  "image-gallery": { url: string; alt: string }[];
  "gallery-photo-credits": string;
  "news-on-off": boolean;
  "custom-code-for-hiding-weglot": string;
  group: string;
  name: string;
  slug: string;
  city?: string;
}

// EVENTS DATA START //

export interface EventFieldDataCleaned {
  mainVideoEmbedCode: string;
  webflowCollectionId: string;

  originalSlug: string;
  webflowId: string;
  video2EmbedCode: string;
  video3EmbedCode: string;
  createdOn: string;
  pushToGr: boolean;
  programmeLabel: string;
  programmeLabelShort?: string;
  inTheMedia: string;
  sources: RelatedColection;
  collectionName: "event";
  isDraft: boolean;
  relatedProgrammes: string[];
  thumbnail: ImageProps;
  heroImage: ImageProps;
  datePublished: string;
  openGraphImage: ImageProps;
  heroImageCaption: string;
  featured: boolean;
  arabicTitle: string;
  seoMetaDescription: string;
  seoTitle: string;
  teaserText: string;
  signupEmbed: string;
  shortDescription2: string;
  eventDate: string;
  eventDateArabic: string;
  endDateArabic: string;
  endDate: string;
  time: string;
  address: string;
  locationLink: string;
  livestreamLink: string;
  attendanceType: string;
  contactDetails: string;
  buttonCtaText: string;
  rsvpLink: string;
  trailerLivestreamHighlightsVideoLink: string;
  video2: string;
  video3: string;
  tags: string[];
  relatedPeople: RelatedColection[];
  organisers: {
    name: string;
    slug: string;
    website: string;
    logo: ImageProps;
  }[];
  partners: {
    name: string;
    slug: string;
    website: string;
    logo: ImageProps;
  }[];
  participantsAffiliatedInstitutions: {
    name: string;
    slug: string;
    website: string;
    logo: ImageProps;
  }[];
  richText: string;
  imageGallery: ImageProps[];
  galleryPhotoCredits: string;
  newsOnOff: boolean;
  customCodeForHidingWeglot: string;
  group: string;
  name: string;
  slug: string;
  city: string;
}

export interface EventCardProps {
  id: string;
  name: string;
  description: string;
  programme: string;
  imageUrl: string;
  source: {
    name: string;
    imageUrl: string;
    date: string;
    readTime: string;
  };
}

// EVENTS DATA END //

export interface ProgrammeRawFields {
  "push-to-gr"?: string;
  type?: string;
  "link-to-page"?: string;
  "name-arabic"?: string;
  shortname?: string;
  "short-name-arabic"?: string;
  byline?: string;
  "byline-arabic"?: string;
  description?: string;
  text?: string;
  "button-text"?: string;
  "summary-arabic"?: string;
  "field-english"?: string;
  "field-arabic"?: string;
  "year-established"?: string;
  "year-closed"?: string;
  "headquarters-english"?: string;
  "headquarters-arabic"?: string;
  "logo-svg-original-ratio"?: { url: string; alt: string };
  "logo-svg-light-original-ratio"?: { url: string; alt: string };
  "logo-svg-square-overlay"?: { url: string; alt: string };
  "logo-svg-dark"?: { url: string; alt: string };
  card?: { url: string; alt: string };
  hero?: { url: string; alt: string };
  "open-graph"?: { url: string; alt: string };
  "main-video"?: string;
  features?: string[];
  partners?: string[];
  leadership?: string[];
  "related-programmes"?: string[];
  longitude?: string;
  latitude?: string;
  website?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  facebook?: string;
  order?: string;
  colour?: string;
  "impact-01"?: string;
  "impact-01-title"?: string;
  "impact-01-title-arabic"?: string;
  "impact-02"?: string;
  "impact-02-title"?: string;
  "impact-02-title-arabic"?: string;
  "impact-03"?: string;
  "impact-03-title"?: string;
  "impact-03-title-arabic"?: string;
  "impact-04"?: string;
  "impact-04-title"?: string;
  "impact-04-title-arabic"?: string;
  "impact-05"?: string;
  "impact-05-title"?: string;
  "impact-05-title-arabic"?: string;
  "impact-06"?: string;
  "impact-06-title"?: string;
  "impact-06-title-arabic"?: string;
  name?: string;
  slug?: string;
}
export interface ProgrammeCleanedFields {
  logoSvgOriginalRatio: ImageProps;
  logoSvgLightOriginalRatio: ImageProps;
  pushToGr: string;
  type: string;
  collectionName: "programme";
  linkToPage: string;
  nameArabic: string;
  buttonText: string;
  shortname: string;
  shortNameArabic: string;
  byline: string;
  bylineArabic: string;
  description: string;
  text: string;
  summaryArabic: string;
  fieldEnglishResearch: string;
  fieldArabicResearch: string;
  yearEstablished: string;
  yearClosed: string;
  headquartersEnglish: string;
  headquartersArabic: string;
  logoSvgSquareOverlay: ImageProps;
  logoSvgDark: ImageProps;
  card: ImageProps;
  hero: ImageProps;
  openGraph: ImageProps;
  mainVideo: string;
  features: RelatedColection[];
  partners: RelatedColection[];
  leadership: RelatedColection[];
  relatedProgrammes: RelatedColection[];
  longitude: string;
  latitude: string;
  website: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  youtube: string;
  facebook: string;
  order: string;
  colour: string;
  impact01: string;
  impact01Title: string;
  impact01TitleArabic: string;
  impact02: string;
  impact02Title: string;
  impact02TitleArabic: string;
  impact03: string;
  impact03Title: string;
  impact03TitleArabic: string;
  impact04: string;
  impact04Title: string;
  impact04TitleArabic: string;
  impact05: string;
  impact05Title: string;
  impact05TitleArabic: string;
  impact06: string;
  impact06Title: string;
  impact06TitleArabic: string;
  name: string;
  slug: string;
}
export interface PartnersRawFields {
  "arabic-name"?: string;
  website?: string;
  logo?: { url: string; alt: string };
  "short-description"?: string;
  "short-description-arabic"?: string;
  group?: string;
  tags?: string[];
  name?: string;
  slug?: string;
}
export interface PartnersCleanedFields {
  arabicName: string;
  website: string;
  logo: ImageProps;
  shortDescription: string;
  shortDescriptionArabic: string;
  group: string;
  tags: RelatedColection[];
  name: string;
  slug: string;
}
export interface PhotoFieldsRaw {
  "name-arabic"?: string;
  "main-image"?: { fileId: string; url: string; alt: string | "" };
  "alt-text"?: string;
  date?: string;
  description?: string;
  "description-arabic"?: string;
  source?: string;
  "programme-label"?: string;
  "programmes-multi-reference"?: string[];
  tags?: string[];
  "people-multi-reference"?: string[];
  "location-2"?: string;
  "location-arabic"?: string;
  "high-resolution"?: string;
  name?: string;
  slug?: string;
}
export interface ImageLightbox {
  src: string;
  alt: string;
  location: string;
  year: string;
  people: string;
  programme2: string;
  nameArabic: string;
  mainImage: { fileId: string; url: string; alt: string };
  altText: string;
  date: string;
  description: string;
  descriptionArabic: string;
  source: string;
  programmeLabel: { name: string; slug: string };
  programmesMultiReference: { name: string; slug: string }[];
  tags: string[];
  peopleMultiReference: { name: string; slug: string }[];
  location2: string;
  locationArabic: string;
  highResolution: string;
  name: string;
  slug: string;
}

export interface LightboxProps {
  image: ImageLightbox;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}
export interface FieldsPostRaw {
  "hero-video-arabic-youtube-video-id"?: string;
  "video-as-hero-yes-no"?: boolean;
  "hero-video-youtube-embed-id"?: string;
  "arabic-complete-incomplete": boolean;
  createdOn: string;
  "arabic-title"?: string;
  "push-to-gr"?: boolean;
  "programme-2"?: string;
  "programmes-multiple"?: string[];
  thumbnail?: { url: string; alt: string };
  "main-image"?: { url: string; alt: string };
  "open-graph-image"?: { fileId: string; url: string; alt: string | null };
  "date-published"?: string;
  location?: string;
  "location-arabic"?: string;
  "seo-title"?: string;
  "seo-title-arabic"?: string;
  "seo-meta"?: string;
  "seo-meta-arabic"?: string;
  summary?: string;
  "summary-arabic"?: string;
  body?: string;
  "body-arabic"?: string;
  "alt-text-for-hero-image"?: string;
  "alt-text-hero-image-arabic"?: string;
  "photo-credit-hero-image"?: string;
  "hero-image-photo-credit-arabic"?: string;
  "theme-3"?: string[];
  "blogs-categories-2"?: string;
  featured?: boolean;
  "image-carousel"?: { url: string; alt: string }[];
  "image-gallery-credits-arabic"?: string;
  "image-carousel-credits"?: string;
  "related-event"?: string;
  people?: string[];
  innovations?: string[];
  name?: string;
  slug?: string;
  "bullet-points-english"?: string;
  "bullet-points-arabic"?: string;
}

export interface PeopleRawFields {
  createdOn: string;
  "name-arabic"?: string;
  "arabic-on-off"?: boolean;
  "push-to-gr"?: boolean;
  hero?: boolean;
  "related-programme"?: string;
  "related-programmes"?: string[];
  color?: string;
  role?: string;
  "role-arabic"?: string;
  "short-description"?: string;
  "short-description-arabic"?: string;
  biography?: string;
  "biography-arabic"?: string;
  events?: string;
  "events-arabic"?: string;
  "research-area-english"?: string;
  "research-areas-arabic"?: string;
  type?: {
    name: string;
    id: string;
  };
  "hero-image"?: { url: string; alt: string };
  "profile-picture"?: { url: string; alt: string };
  "related-people-s"?: string[];
  "partner-organisation"?: string[];
  "instagram-link"?: string;
  "linkedin-link"?: string;
  "twitter-link"?: string;
  facebook?: string;
  "youtube-link"?: string;
  github?: string;
  "website-link"?: string;
  shop?: string;
  photos?: { url: string; alt: string }[];
  "hide-news"?: boolean;
  "hide-multimedia"?: boolean;
  "hide-events"?: boolean;
  "hide-publications"?: boolean;
  "hide-photos"?: boolean;
  "hide-events-rich-text"?: boolean;
  multimedia?: string[];
  tag?: string[];
  order?: number;
  country?: string;
  name?: string;
  slug?: string;
  "feature-video"?: string;
}
export interface PostFieldsCleaned {
  webflowId: string;
  webflowCollectionId: string;
  originalSlug: string;
  videoAsHeroYesNo: boolean;
  heroVideoYoutubeEmbedId: string;
  heroVideoArabicYoutubeVideoId: string;
  isPostArabic: boolean;
  createdOn: string;
  arabicTitle: string;
  pushToGr: boolean;
  programme: RelatedColection;
  programmesMultiple: RelatedColection[];
  thumbnail: ImageProps;
  mainImage: ImageProps;
  sources: RelatedColection;
  openGraphImage: string;
  datePublished: string;
  datePublishedArabic: string;
  location: string;
  locationArabic: string;
  seoTitle: string;
  seoTitleArabic: string;
  seoMeta: string;
  seoMetaArabic: string;
  collectionName: "news";
  summary: string;
  summaryArabic: string;
  body: string;
  bodyArabic: string;
  altTextForHeroImage: string;
  altTextHeroImageArabic: string;
  photoCreditHeroImage: string;
  heroImagePhotoCreditArabic: string;
  theme3: RelatedColection[];
  blogsCategories2: string;
  blogsCategories2Arabic: string;
  featured: boolean;
  imageCarousel: ImageProps[];
  imageGalleryCreditsArabic: string;
  imageCarouselCredits: string;
  relatedEvent: RelatedColection;
  people: RelatedColection[];
  innovations: string[];
  name: string;
  slug: string;
  bulletPointsEnglish: string;
  bulletPointsArabic: string;
}
export interface Author {
  name: string;
  url: string;
  avatar: string;
  role: string;
  body: {
    code: string;
  };
  social_links: {
    name: string;
    url: string;
  }[];
}

export interface Category {
  name: string;
  url: string;
}

export interface ArticleProps {
  article: {
    title: string;
    description: string;
    image: string;
    mainImage: string;
    date: string;
    time_to_read_in_minutes: number;
    body: {
      code: string;
    };
    tags: string[];
    category: Category;
    author: Author;
  };
}
export interface PeopleCleanedFields {
  createdOn: string;
  name: string;
  nameArabic: string;
  hero: boolean;
  collectionName: "people";
  relatedProgramme: RelatedColection;
  relatedProgrammes: RelatedColection[];
  color: string;
  role: string;
  roleArabic: string;
  shortDescription: string;
  shortDescriptionArabic: string;
  biography: string;
  biographyArabic: string;
  events: string;
  eventsArabic: string;
  researchAreaEnglish: string;
  researchAreasArabic: string;
  type: {
    name: string;
    id: string;
  };
  heroImage: ImageProps;
  profilePicture: ImageProps;
  relatedPeople: RelatedColection[];
  partnerOrganisation: RelatedColection[];
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
  facebook: string;
  youtubeLink: string;
  github: string;
  websiteLink: string;
  shop: string;
  photos: ImageProps[];
  hideNews: boolean;
  hideMultimedia: boolean;
  hideEvents: boolean;
  hidePublications: boolean;
  hidePhotos: boolean;
  hideEventsRichText: boolean;
  multimedia: RelatedColection[];
  tag: RelatedColection[];
  order: number;
  country: string;
  slug: string;
  pushToGr: boolean;
  arabicOnOff: boolean;
  featureVideo: string;
}
export interface MultimediaRawFields {
  createdOn: string;
  "name-arabic"?: string;
  "push-to-gr"?: boolean;
  "programme-label"?: string;
  "related-programmes"?: string[];
  "innovation-related"?: string[];
  "related-people"?: string[];
  "related-event"?: string[];
  thumbnail?: { url: string; alt: string };
  "hero-video-audio"?: { url: string; alt: string };
  "square-listen-1x2"?: { url: string; alt: string };
  "no-embed-code"?: boolean;
  "embed-code"?: string;
  description?: string;
  date?: string;
  type?: "video" | "audio" | "photo" | "other";
  source?: string;
  "original-link"?: string;
  "video-link"?: { metadata: { html: string } };
  "link-audio"?: string;
  name: string;
  slug: string;
}
export interface MultimediaCleanedFields {
  createdOn: string;
  nameArabic: string;
  pushToGr: boolean;
  collectionName: "multimedia";
  programmeLabel: RelatedColection;
  relatedProgrammes: RelatedColection[];
  innovationRelated: string[];
  relatedPeople: RelatedColection[];
  relatedEvent: RelatedColection[];
  thumbnail: ImageProps;
  heroVideoAudio: ImageProps;
  squareListen1x2: ImageProps;
  noEmbedCode: boolean;
  embedCode: string;
  description: string;
  date: string;
  datePublished: string;
  type: "video" | "audio" | "photo" | "other";
  sources: RelatedColection;
  originalLink: string;
  videoLink: string;
  linkAudio: string;
  name: string;
  slug: string;
}
export interface FeatureRawFields {
  "name-arabic"?: string;
  "top-feature"?: boolean;
  "lightbox-video-or-image"?: boolean;
  order?: number;
  "click-action"?: string;
  "custom-link"?: string;
  "new-tab"?: boolean;
  label?: string;
  "label-arabic"?: string;
  "short-text"?: string;
  "short-text-arabic"?: string;
  type?: string;
  square?: { url: string; alt: string };
  "image-16x9"?: { url: string; alt: string };
  hero?: { url: string; alt: string };
  "date-display"?: string;
  "programme-label"?: string;
  "programme-s"?: string[];
  name?: string;
  slug?: string;
}

export interface FeatureCleanedFields {
  nameArabic: string;
  topFeature: boolean;
  order: number;
  customLink: string;
  ligthBoxVideoOrImage: boolean;
  newTab: boolean;
  label: string;
  clickAction: string;
  labelArabic: string;
  shortText: string;
  shortTextArabic: string;
  type: string;
  square: ImageProps;
  image16x9: ImageProps;
  hero: ImageProps;
  dateDisplay: string;
  programmeLabel: RelatedColection;
  programmeS: RelatedColection[];
  name: string;
  slug: string;
}

export interface NewsCleanedFields {
  createdOn: string;
  arabicTitle: string;
  pushToGr: boolean;
  collectionName: "press";
  webflowId: string;
  webflowCollectionId: string;
  originalSlug: string;
  featured: boolean;
  externalLink: string;
  datePublished: string;
  datePublishedArabic: string;
  sources: RelatedColection;
  programme: RelatedColection;
  programmeS: RelatedColection[];
  people: RelatedColection[];
  innovationS: RelatedColection[];
  relatedEvent: RelatedColection;
  relatedEventS: RelatedColection[];
  summary: string;
  summaryArabic: string;
  excerpt: string;
  thumbnail: ImageProps;
  heroImage: ImageProps;
  thumbnailAltText: string;
  imageAltTextArabic: string;
  relatedTeamMembers: RelatedColection[];
  tags: RelatedColection[];
  removeFromNewsGrid: boolean;
  name: string;
  slug: string;
}
export interface MediaCardProps {
  imageUrl: string;
  alt: string;
  source: string;
  datePublished: string;
  type: string;
  programme: { name: string; slug: string };
  name: string;
  slug: string;
}
export interface NewsMainProps {
  arabicTitle: string;
  tag: string;
  title: string;
  description: string;
  source: string;
  datePublished: string;
  readTime: string;
  postLink: string;
  categoryLink: string;
  authorLink: string;
  postImage: string;
  authorImage: string;
}
export interface PublicationsRawFields {
  createdOn: string;
  "name-arabic"?: string;
  "date-published"?: string;
  type?: string;
  "book-cover-image"?: { url: string; alt: string };
  thumbnail?: { url: string; alt: string };
  text?: string;
  "summary-arabic"?: string;
  "push-to-gr"?: boolean;
  "external-link"?: string;
  document?: { url: string; alt: string };
  "source-2"?: string;
  "programme-s"?: string[];
  "author-s-meta-text"?: string;
  "author-s-meta-text-arabic"?: string;
  people?: string[];
  name?: string;
  slug?: string;
}
export interface PublicationsCleanedFields {
  createdOn: string;
  nameArabic: string;
  datePublished: string;
  type: string;
  bookCoverImage: ImageProps;
  sources: RelatedColection;
  thumbnail: ImageProps;
  text: string;
  collectionName: "publications";
  programeShortname: string;
  summaryArabic: string;
  pushToGr: boolean;
  externalLink: string;
  document: ImageProps;
  source2: string;
  programmeS: RelatedColection[];
  authorMetaText: string;
  authorMetaTextArabic: string;
  people: RelatedColection[];
  name: string;
  slug: string;
}
export interface AwardsRawFields {
  "name-arabic"?: string;
  "custom-link"?: string;
  logo?: { url: string; alt: string };
  thumbnail?: { url: string; alt: string };
  image?: { url: string; alt: string };
  "open-graph"?: { url: string; alt: string };
  description?: string;
  "description-arabic"?: string;
  type?: string;
  date?: string;
  "people-related"?: string[];
  "programme-related"?: string[];
  name?: string;
  slug?: string;
}
export interface AwardsCleanedFields {
  nameArabic: string;
  customLink: string;
  logo: ImageProps;
  thumbnail: ImageProps;
  image: ImageProps;
  openGraph: ImageProps;
  description: string;
  descriptionArabic: string;
  type: string;
  date: string;
  peopleRelated: RelatedColection[];
  programmeRelated: RelatedColection[];
  name: string;
  slug: string;
}
export interface PrizesRawFields {
  "name-arabic"?: string;
  award?: string;
  "award-year"?: number;
  "winners-people"?: string[];
  summary?: string;
  "summary-arabic"?: string;
  name?: string;
  slug?: string;
}
export interface PrizesCleanedFields {
  nameArabic: string;
  award: RelatedColection;
  awardYear: number;
  winnersPeople: RelatedColection[];
  summary: string;
  summaryArabic: string;
  name: string;
  slug: string;
}
export interface LegalRawFields {
  "name-arabic"?: string;
  body?: string;
  "body-arabic"?: string;
  name?: string;
  slug?: string;
}
export interface LegalCleanFields {
  nameArabic: string;
  body: string;
  bodyArabic: string;
  name: string;
  slug: string;
}
export interface TagRawFields {
  "name-arabic"?: string;
  name?: string;
  slug?: string;
}
export interface TagCleanedFields {
  nameArabic: string;
  name: string;
  slug: string;
}
export interface SourceRawFields {
  "name-arabic"?: string;
  "short-name"?: string;
  "short-name-arabic"?: string;
  logo?: { url: string; alt: string };
  "logo-native"?: { url: string; alt: string };
  name?: string;
  slug?: string;
}
export interface SourceCleanedFields {
  nameArabic: string;
  shortName: string;
  shortNameArabic: string;
  logo: ImageProps;
  logoNative: ImageProps;
  name: string;
  slug: string;
}
export interface JobsRawFields {
  "name-arabic"?: string;
  link?: string;
  "label-programmed"?: string;
  "related-programme"?: string[];
  "posted-on"?: string;
  "closing-date"?: string;
  type?: string;
  country?: string;
  city?: string;
  description?: string;
  "description-arabic"?: string;
  name?: string;
  slug?: string;
}
export interface JobsCleanedFields {
  nameArabic: string;
  link: string;
  labelProgrammed: RelatedColection;
  relatedProgramme: RelatedColection[];
  postedOn: string;
  closingDate: string;
  type: string;
  country: string;
  city: string;
  description: string;
  descriptionArabic: string;
  name: string;
  slug: string;
}

export interface CategorieRawFields {
  "name-arabic"?: string;
  name?: string;
  slug?: string;
}
export interface CategorieCleanedFields {
  nameArabic: string;
  name: string;
  slug: string;
}
export interface NewsRawFields {
  webflowId: string;
  webflowCollectionId: string;

  createdOn: string;
  "arabic-title"?: string;
  "push-to-gr"?: boolean;
  featured?: boolean;
  "external-link"?: string;
  "date-published"?: string;
  sources?: string;
  programme?: string;
  "programme-s"?: string[];
  people?: string[];
  "innovation-s"?: string[];
  "related-event"?: string;
  "related-event-s"?: string[];
  summary?: string;
  "summary-arabic"?: string;
  excerpt?: string;
  thumbnail?: { url: string; alt: string };
  "hero-image"?: { url: string; alt: string };
  "thumbnail-alt-text"?: string;
  "image-alt-text-arabic"?: string;
  "related-team-members"?: string[];
  tags?: string[];
  "remove-from-news-grid"?: boolean;
  name?: string;
  slug?: string;
}
export type UnifiedFields =
  | PostFieldsCleaned
  | MultimediaCleanedFields
  | NewsCleanedFields
  | EventFieldDataCleaned
  | PublicationsCleanedFields;

export interface UnifiedComponentProps {
  data: UnifiedFields;
}
export type AgnosticFields =
  | PostFieldsCleaned
  | MultimediaCleanedFields
  | NewsCleanedFields
  | EventFieldDataCleaned
  | PublicationsCleanedFields
  | PeopleCleanedFields;

export interface AgnosticComponentProps {
  data: AgnosticFields;
}
export interface AgnosticCardProps {
  createdOn: string;
  slug: string;
  imageSrc: string;
  programShortname: string;
  title: string;
  datePublished: string;
  collectionName: string;
  source: string;
  shortDescription?: string;
}
