import { CardHorizontalImageProps, FeatureCleanedFields, ProgrammeCleanedFields, RowData } from "../../../../app/interfaces";

export function mapProgrammeToRowData(programme: ProgrammeCleanedFields, features: FeatureCleanedFields[]): RowData {
  const mapSocialMediaLink = (name: string, url: string) => ({
    name: url ? name : 'no social',
    url: url || '',
  });

  const relatedFeatures = features.filter(feature => feature.programmeLabel.name === programme.name);

  return {
    repository: {
      top: {
        name: programme.name,
        slug: programme.slug,
        nameArabic: programme.nameArabic,
        descriptionArabic: programme.bylineArabic,
        description: programme.shortNameArabic,
        mission: programme.byline,
        missionArabic: programme.bylineArabic,
        year: programme.yearEstablished,
        partners: programme.partners.map(partner => partner.name),
        partnersArabic: programme.partners.map(partner => partner.arabicName),
      },
      content: {
        established: { 
          data: { 
            established: [programme.yearEstablished, programme.yearClosed]
              .filter(Boolean)
              .map(year => ({ name: String(year), url: "" })) 
          } 
        },
        research: { 
          data: { 
            research: [{ name: programme.fieldEnglishResearch, url: '' }] 
          } 
        },
        researchArabic: { 
          data: { 
            research: [{ name: programme.fieldArabicResearch, url: '' }] 
          } 
        },
        logo: { url: programme.logoSvgOriginalRatio.url, alt: programme.logoSvgLightOriginalRatio.alt },
        logoDark: { url: programme.logoSvgLightOriginalRatio.url, alt: programme.logoSvgOriginalRatio.alt },
        button: { href: programme.website, text: programme.buttonText },
        headquarters: { 
          data: { 
            headquarters: [programme.headquartersEnglish]
              .filter(Boolean)
              .map(hq => ({ name: hq, url: "" })) 
          } 
        },
        leadership: { 
          data: { 
            leadership: programme.leadership
              .map(leader => ({ name: leader.name, url: `/people/${leader.slug}` || "" })) 
          } 
        },
        "key initiatives": { 
          data: { 
            initiatives: programme.features
              .map(feature => ({ name: feature.name, url: feature.slug || "" })) 
          } 
        },
        leadershipArabic: { 
          data: { 
            leadership: programme.leadership
              .map(leader => ({ name: leader.arabicName, url: `/people/${leader.slug}` || "" })) 
          } 
        },
        "key initiativesArabic": { 
          data: { 
            initiatives: programme.features
              .map(feature => ({ name: feature.arabicName, url: feature.slug || "" })) 
          } 
        },
        "key partners": { 
          data: { 
            partners: programme.partners
              .map(partner => ({ name: partner.name, url:  "" })) 
          } 
        },
        "key partnersArabic": { 
          data: { 
            partners: programme.partners
              .map(partner => ({ name: partner.arabicName, url: partner.slug || "" })) 
          } 
        },
        fullDescription: programme.text,
        fullDescriptionArabic: programme.summaryArabic,
        socialMediaLinks: {
          length: 6,
          instagram: mapSocialMediaLink('instagram', programme.instagram),
          youtube: mapSocialMediaLink('youtube', programme.youtube),
          linkedin: mapSocialMediaLink('linkedin', programme.linkedin),
          facebook: mapSocialMediaLink('facebook', programme.facebook),
          twitter: mapSocialMediaLink('twitter', programme.twitter),
        },
        stats: [
          { title: programme.impact01Title, content: programme.impact01 },
          { title: programme.impact02Title, content: programme.impact02 },
          { title: programme.impact03Title, content: programme.impact03 },
          { title: programme.impact04Title, content: programme.impact04 },
          { title: programme.impact05Title, content: programme.impact05 },
          { title: programme.impact06Title, content: programme.impact06 },
        ],
        listContent: programme.relatedProgrammes.map(rp => ({
          title: rp.name,
          source: rp.slug,
          date: new Date(), // Assuming current date for simplicity, replace with actual date if available
        })),
        features: relatedFeatures.length
          ? relatedFeatures.map(feature => ({
              image: <CardHorizontalImageProps>{
                imageUrl: feature.square.url,
                type: feature.type,
              },
              title: feature.name,
              clickAction: feature.clickAction,
              isLightBox: feature.ligthBoxVideoOrImage,
              isTab: feature.newTab,
              customLink: feature.customLink,
            }))
          : [],
      },
    },
  };
}
