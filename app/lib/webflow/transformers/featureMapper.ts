import {
    PostFieldsCleaned,
    Item,
    PartnersRawFields,
    ProgrammeRawFields,
    FieldsPostRaw,
    PeopleRawFields,
    EventFieldData,
    FeatureRawFields,
    FeatureCleanedFields,
  } from "../../../../app/interfaces";
  type Option = {
    name: string;
    id: string;
  };
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
  const actionsOptions: Option[] =  [
    {
      "name": "External link",
      "id": "3bc4782a3799bf2d17b3461f92a42f4a"
    },
    {
      "name": "Internal link",
      "id": "bf44ddc6fdd3d743e367e47069dccba7"
    },
    {
      "name": "Video embed code",
      "id": "dcb0bb8b677255006dd810462abb8bc8"
    },
    {
      "name": "Image link",
      "id": "184e74ec7843ded973047f492a97ad4d"
    }
  ]
  const options: Option[] = [
    {
      "name": "Announcement",
      "id": "0ad951a951e73d504a1c6db9ebec7528"
    },
    {
      "name": "Event",
      "id": "11ca5b800a405a6d71bbc2e1fe23a10e"
    },
    {
      "name": "Launch",
      "id": "4a5cc7f4620a3616e8ed3fa7d4fcadba"
    },
    {
      "name": "Watch",
      "id": "57434717c21777a7853871434a1cf524"
    },
    {
      "name": "Listen",
      "id": "d61a30816c103df5fe81212262a9c68e"
    },
    {
      "name": "Award",
      "id": "9f9c048e7e000a796dc8cdfd70b3f439"
    },
    {
      "name": "Jobs",
      "id": "0e1b4d737159c42afe0efc86d7e0a1bd"
    },
    {
      "name": "Publication",
      "id": "26c14d69deceeef1cb8a18c6d8b59eb0"
    },
    {
      "name": "Innovation",
      "id": "83b281eff71880aa0a21bfbad95cdf6e"
    },
    {
      "name": "Product",
      "id": "c5243cbe473595168227b974a09fc2c0"
    },
    {
      "name": "News",
      "id": "9f3e79e5982b3c48a64fe83dfdabf2c8"
    },
    {
      "name": "Spinout",
      "id": "eae045e214777815f47dd071dbceb89f"
    },
    {
      "name": "Research",
      "id": "d073d57a4ac8e3f4a62ee8ec5e94ff96"
    }
  ];

  function getNameById(id: string): string {
    const option = options.find((option) => option.id === id);
    return option ? option.name : "";
  }
  function getActionNameById(id: string): string {
    const option = actionsOptions.find((option) => option.id === id);
    return option ? option.name : "";
  }
  export default function featureMapper(
    item: Item<FeatureRawFields>,
  
    
    programmes: Item<ProgrammeRawFields>[],
 
  ): FeatureCleanedFields {
    const { fieldData } = item;
    const programmeMatch = programmes.find(
      (programme) => programme.id === fieldData["programme-label"]
    );
    const relatedProgrammes =
      fieldData["programme-s"] &&
      fieldData["programme-s"].length > 0
        ? fieldData["programme-s"].map((programmeId) => {
            const programmeMatch = programmes.find(
              (programme) => programme.id === programmeId
            );
            return programmeMatch
              ? {
                  name: programmeMatch.fieldData.name || "",
                  arabicName: programmeMatch.fieldData["name-arabic"] || "",
                  url: programmeMatch.fieldData.website || "",
                  slug: programmeMatch.fieldData.slug || "",
                }
              : { name: "N/A", url: "N/A", slug: "N/A" , arabicName: "N/A"};
          })
        : [{ name: "N/A", url: "N/A", slug: "N/A", arabicName: "N/A"}];
   
  
   
    return {
        nameArabic: fieldData["name-arabic"] || "",
        topFeature: fieldData["top-feature"] || false,
        order: fieldData.order || 0,
        customLink: fieldData["custom-link"] || "",
        newTab: fieldData["new-tab"] || false,
        label: fieldData.label || "",
        labelArabic: fieldData["label-arabic"] || "",
        clickAction: fieldData["click-action"] ? getActionNameById(fieldData["click-action"]) : "",
        shortText: fieldData["short-text"] || "",
        shortTextArabic: fieldData["short-text-arabic"] || "",
        ligthBoxVideoOrImage: fieldData["lightbox-video-or-image"] || false,
        type:  fieldData.type ?  getNameById(fieldData.type) : "",
        square: {
          url: fieldData.square?.url || "",
          alt: fieldData.square?.alt || ""
        },
        image16x9: {
          url: fieldData["image-16x9"]?.url || "",
          alt: fieldData["image-16x9"]?.alt || ""
        },
        hero: {
          url: fieldData.hero?.url || "",
          alt: fieldData.hero?.alt || ""
        },
        dateDisplay: formatDate(fieldData["date-display"] || ""),
        programmeLabel: programmeMatch
          ? {
              name: programmeMatch.fieldData.name || "",
              arabicName: programmeMatch.fieldData["name-arabic"] || "",
              slug: programmeMatch.fieldData.slug || ""
            }
          : { name: "N/A", slug: "N/A", arabicName: "N/A"},
        programmeS: relatedProgrammes,
        name: fieldData.name || "",
        slug: fieldData.slug || ""
      };
    }