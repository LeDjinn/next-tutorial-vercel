import {
    Item,
    ProgrammeRawFields,

    PeopleRawFields,
    PartnersRawFields,
    ProgrammeCleanedFields
  } from "@/app/interfaces";
  import { formatDate } from "../utils/formDate";
  
  export default function programmeMapper(
    item: Item<ProgrammeRawFields>,
    people: Item<PeopleRawFields>[],
    partners: Item<PartnersRawFields>[],
    programmes: Item<ProgrammeRawFields>[]
  ): ProgrammeCleanedFields {
    const { fieldData } = item;
    const options = [
      {
        "name": "Centre",
        "id": "35a64f7b74cdf1054834e3cf6716e379"
      },
      {
        "name": "Fund",
        "id": "97db51b2bbf21724ef99187a3223b816"
      },
      {
        "name": "Scholarship",
        "id": "9793a3ca1eb9d160057b2c42b2d48c86"
      },
      {
        "name": "Project",
        "id": "09d5a039bdc2e46d6987ce7c09a41bc0"
      },
      {
        "name": "Programme",
        "id": "a1e61c0cc2923f64b29ca5da3e41e427"
      },
      {
        "name": "Lab",
        "id": "730944f73272c28e4ae4052f7611ceff"
      },
      {
        "name": "Community Jameel",
        "id": "bb96b247f8c989b67ca5ada5b5cb10df"
      }
    ];
    
    function getNameById(id:string) {
      const option = options.find(option => option.id === id);
      return option ? option.name : 'other';
    }
    
    const leadership =
      fieldData.leadership?.map((personId) => {
        const peopleMatch = people.find((person) => person.id === personId);
        return peopleMatch
          ? {
              name: peopleMatch.fieldData.name || "",
              arabicName: peopleMatch.fieldData["name-arabic"] || "",
              slug: peopleMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A" , arabicName: "N/A"};
      }) || [];
  
    const relatedPartners =
      fieldData.partners?.map((partnerId) => {
        const partnerMatch = partners.find((partner) => partner.id === partnerId);
        return partnerMatch
          ? {
              name: partnerMatch.fieldData.name || "",
              arabicName: partnerMatch.fieldData["arabic-name"]|| "",
              slug: partnerMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A",arabicName: "N/A"};
      }) || [];
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
          : { name: "N/A", slug: "N/A", arabicName: "N/A"};
      }) || [];
  
    return {
      pushToGr: fieldData["push-to-gr"] || "",
      logoSvgLightOriginalRatio:{
        url: fieldData["logo-svg-light-original-ratio"]?.url || "",
        alt: fieldData["logo-svg-dark"]?.alt || ""
      },
      logoSvgOriginalRatio:{
        url: fieldData["logo-svg-original-ratio"]?.url || "",
        alt: fieldData["logo-svg-original-ratio"]?.alt || ""
      },
      type: fieldData.type ? getNameById(fieldData.type) :"other",
      linkToPage: fieldData["link-to-page"] || "",
      nameArabic: fieldData["name-arabic"] || "",
      shortname: fieldData.shortname || "",
      shortNameArabic: fieldData["short-name-arabic"] || "",
      byline: fieldData.byline || "",
      buttonText: fieldData["button-text"] || "",
      bylineArabic: fieldData["byline-arabic"] || "",
      description: fieldData.description || "",
      text: fieldData.text || "",
      summaryArabic: fieldData["summary-arabic"] || "",
      fieldEnglishResearch: fieldData["field-english"] || "",
      fieldArabicResearch: fieldData["field-arabic"] || "",
      yearEstablished: fieldData["year-established"] || "",
      yearClosed: fieldData["year-closed"] || "",
      headquartersEnglish: fieldData["headquarters-english"] || "",
      headquartersArabic: fieldData["headquarters-arabic"] || "",
      logoSvgSquareOverlay: {
        url: fieldData["logo-svg-square-overlay"]?.url || "",
        alt: fieldData["logo-svg-square-overlay"]?.alt || ""
      },
      logoSvgDark: {
        url: fieldData["logo-svg-dark"]?.url || "",
        alt: fieldData["logo-svg-dark"]?.alt || ""
      },
      card: {
        url: fieldData.card?.url || "",
        alt: fieldData.card?.alt || ""
      },
      hero: {
        url: fieldData.hero?.url || "",
        alt: fieldData.hero?.alt || ""
      },
      openGraph: {
        url: fieldData["open-graph"]?.url || "",
        alt: fieldData["open-graph"]?.alt || ""
      },
      mainVideo: fieldData["main-video"] || "",
      features: fieldData.features?.map(feature => ({
        name: 'feature name ',
        arabicName  : 'feature arabic name',
        slug: 'feature.slug'
      })) || [],
      partners: relatedPartners,
      leadership: leadership,
      relatedProgrammes:relatedProgrammes,
      collectionName: "programme",
      longitude: fieldData.longitude || "",
      latitude: fieldData.latitude || "",
      website: fieldData.website || "",
      linkedin: fieldData.linkedin || "",
      instagram: fieldData.instagram || "",
      twitter: fieldData.twitter || "",
      youtube: fieldData.youtube || "",
      facebook: fieldData.facebook || "",
      order: fieldData.order || "",
      colour: fieldData.colour || "",
      impact01: fieldData["impact-01"] || "",
      impact01Title: fieldData["impact-01-title"] || "",
      impact01TitleArabic: fieldData["impact-01-title-arabic"] || "",
      impact02: fieldData["impact-02"] || "",
      impact02Title: fieldData["impact-02-title"] || "",
      impact02TitleArabic: fieldData["impact-02-title-arabic"] || "",
      impact03: fieldData["impact-03"] || "",
      impact03Title: fieldData["impact-03-title"] || "",
      impact03TitleArabic: fieldData["impact-03-title-arabic"] || "",
      impact04: fieldData["impact-04"] || "",
      impact04Title: fieldData["impact-04-title"] || "",
      impact04TitleArabic: fieldData["impact-04-title-arabic"] || "",
      impact05: fieldData["impact-05"] || "",
      impact05Title: fieldData["impact-05-title"] || "",
      impact05TitleArabic: fieldData["impact-05-title-arabic"] || "",
      impact06: fieldData["impact-06"] || "",
      impact06Title: fieldData["impact-06-title"] || "",
      impact06TitleArabic: fieldData["impact-06-title-arabic"] || "",
      name: fieldData.name || "",
      slug: fieldData.slug || ""
    };
  }
  