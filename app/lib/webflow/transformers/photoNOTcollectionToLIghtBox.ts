import {ImageLightbox,  } from "../../../../app/interfaces";



export default function photoNotFromCollectionMapper(
  item: any,

): ImageLightbox {
  



  return {
    src: item.url || "",
    alt: item.alt || "",
    location:  "",
    year:  '',
    people:  "",
    programme2: "",

    nameArabic:  "",
    mainImage: {
      fileId:  "",
      url:  "",
      alt:  ""
    },
    altText:  "",
    date: "",
    description:  "",
    descriptionArabic:   "",
    source:  "",
    programmeLabel:   {name: "", slug: ""},
    programmesMultiReference: [{name: "", slug: ""}],
    tags:  [],
    peopleMultiReference:[],
    location2:  "",
    locationArabic:  "",
    highResolution:  "",
    name:  "",
    slug:  ""
  };
}
