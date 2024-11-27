import { CardProgrammeProps, MediaCardProps, MultimediaCleanedFields, ProgrammeCleanedFields } from"../../../../app/interfaces";

export function mapMultimediaToMediaCard(multimedia: MultimediaCleanedFields): MediaCardProps {
    return {
        name: multimedia.name || '',
        source: multimedia.sources.name,
        datePublished: multimedia.datePublished,
        programme: {name: multimedia.programmeLabel.shortname ||'test', slug: multimedia.relatedProgrammes[0]?.slug||''},
        type: multimedia.type,

        imageUrl: multimedia.thumbnail.url,
        alt: multimedia.thumbnail.alt,
   
        slug : `${multimedia.slug}`
    };
  }