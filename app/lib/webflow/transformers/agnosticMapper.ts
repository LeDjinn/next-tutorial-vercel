import {
  AgnosticCardProps,
  AgnosticComponentProps,
  EventFieldDataCleaned,
  MultimediaCleanedFields,
  NewsCleanedFields,
  PeopleCleanedFields,
  PostFieldsCleaned,
  ProgrammeCleanedFields,
  PublicationsCleanedFields,
} from "../../../../app/interfaces";



function isPostFieldsCleaned(data: any): data is PostFieldsCleaned {
  return data.collectionName === "news";
}

function isMultimediaCleanedFields(data: any): data is MultimediaCleanedFields {
  return data.collectionName === "multimedia";
}

function isNewsCleanedFields(data: any): data is NewsCleanedFields {
  return data.collectionName === "press";
}
function isProgrammeCleanedFields(data: any): data is ProgrammeCleanedFields {
    return data.collectionName === "programme";
    }
function isEventFieldDataCleaned(data: any): data is EventFieldDataCleaned {
  return data.collectionName === "event";
}

function isPublicationsCleanedFields(
  data: any
): data is PublicationsCleanedFields {
  return data.collectionName === "publications";
}

function isPeopleCleanedFields(data: any): data is PeopleCleanedFields {
  return data.collectionName === "people";
}

export default function agnosticMapper(
  data: any
): AgnosticCardProps {
  let title = "";
  let slug = "";
  let createdOn = "";
  let imageSrc = "";
  let programShortname = "";
  let datePublished = "";
  let source = "";
  let collectionName = "";
  let shortDescription = "";
  if (isMultimediaCleanedFields(data)) {
    createdOn = data.createdOn;
    imageSrc = data.thumbnail.url;
    title = data.name;
    slug = `${data.slug}`;
    collectionName = data.collectionName;
    programShortname = data.programmeLabel.shortname || "";
    datePublished = data.datePublished;
    source = data.sources.name;
  }
  if (isPostFieldsCleaned(data)) {
    imageSrc = data.thumbnail.url;
    title = data.name;
    slug = data.slug;
    collectionName = data.collectionName;
    programShortname = data.programme.shortname || "";
    datePublished = data.datePublished;
    source = data.programme.shortname || "";
  }
  if (isNewsCleanedFields(data)) {
    createdOn = data.createdOn;
    imageSrc = data.thumbnail.url;
    title = data.name;
    slug = data.slug;
    collectionName = 'MEDIA';
    programShortname = data.programme.shortname || "";
    datePublished = data.datePublished;
    source = data.sources.name;
  }
  if (isProgrammeCleanedFields(data)) {
    createdOn = ''
    imageSrc = data.logoSvgDark.url;
    title = data.name;
    slug = `/programmes/${data.slug}`;
    collectionName = 'programme'
    programShortname = data.shortname || "";
    datePublished = '';
    source = '';
  }
  if (isEventFieldDataCleaned(data)) {
    createdOn = data.createdOn;
    imageSrc = data.thumbnail.url;
    title = data.name;
    slug = data.slug;
    collectionName = data.collectionName;
    programShortname = data.programmeLabel || "";
    datePublished = data.datePublished;
    source = data.programmeLabel || "";
  }
  if (isPublicationsCleanedFields(data)) {
    createdOn = data.createdOn;
    imageSrc = data.thumbnail.url;
    title = data.name;
    slug = data.slug;
    collectionName = data.collectionName;
    programShortname = data.programeShortname ;
    datePublished = data.datePublished;
    source =data.source2 || "";
  }
  if (isPeopleCleanedFields(data)) {
    createdOn = data.createdOn;
    imageSrc = data.profilePicture.url;
    title = data.name;
    slug = data.slug;
    collectionName = data.collectionName;
    programShortname = "";
    datePublished = "";
    source = "";
    shortDescription = data.shortDescription || 'test';
  }

  return {
    createdOn: createdOn,
    title: title,
    slug: slug,
    imageSrc: imageSrc,
    programShortname: programShortname,
    datePublished: datePublished,
    source: source,
    collectionName: collectionName,
    shortDescription: shortDescription,
  };
}
