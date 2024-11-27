import { Item, JobsRawFields, JobsCleanedFields, ProgrammeRawFields } from "../../../../app/interfaces";

export default function jobMapper(
  item: Item<JobsRawFields>,
  programmes: Item<ProgrammeRawFields>[]
): JobsCleanedFields {
    type CountryOption = {
        name: string;
        id: string;
    };
    
    const options: CountryOption[] = [
        { name: "England", id: "8bfa419fe90a77e86564ddc2507a38a3" },
        { name: "France", id: "043c9a1c7e7b2ec6b5b53df29e21bb09" },
        { name: "Kenya", id: "abf39fb12527e9f2f42cfd77235dab7f" },
        { name: "India", id: "94127d0a10225371e05bae00e456c522" },
        { name: "Singapore", id: "087201eaca2bfd5f925032e8f8e5c226" },
        { name: "Egypt", id: "289fc2e3d2199f820981af7b13b3d724" },
        { name: "Bangladesh", id: "8e991ff7ef6753c50957423acd4c7f78" },
        { name: "Pakistan", id: "22daf204c49a6c7ba815ac23ca4e76e7" },
        { name: "United States", id: "9e7bdb007a770476336464f1f61a9b28" },
        { name: "Scotland", id: "ac02e4f2c2bc964f67806e389ff9b0ea" },
        { name: "Mexico", id: "668f7664289321fe1231e6413b57e516" },
        { name: "Brazil", id: "12c582a78ccfadc486eb923a7fc3f00d" },
        { name: "Argentina", id: "2f9cfa1834977974549de1f5fca002e6" },
        { name: "Peru", id: "9d167665c18916a1ca9e60322934eed3" },
        { name: "South Africa", id: "30d6dddbfa7fd00334ca28ea2efd852e" },
        { name: "Philippines", id: "79ddc948a18432fe1d00e7ac073f381f" }
    ];
    
    function getCountryNameById(countryId: string): string {
        const country = options.find(option => option.id === countryId);
        return country ? country.name : "";
    }
  const { fieldData } = item;

  const programmeMatch = programmes.find(prog => prog.id === fieldData["label-programmed"]);
  const labelProgrammed = programmeMatch ? { name: programmeMatch.fieldData.name || "", slug: programmeMatch.fieldData.slug || "", arabicName: programmeMatch.fieldData["name-arabic"]||'' } : { name: "N/A", slug: "N/A", arabicName: "N/A"};

  const relatedProgrammes = fieldData["related-programme"]
    ? fieldData["related-programme"].map((programmeId) => {
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
      })
    : [];

  return {
    nameArabic: fieldData["name-arabic"] || "",
    link: fieldData["link"] || "",
    labelProgrammed: labelProgrammed,
    relatedProgramme: relatedProgrammes,
    postedOn: fieldData["posted-on"] || "",
    closingDate: fieldData["closing-date"] || "",
    type: fieldData.type || "",
    country: fieldData.country? getCountryNameById(fieldData.country) : "",
    city: fieldData.city || "",
    description: fieldData.description || "",
    descriptionArabic: fieldData["description-arabic"] || "",
    name: fieldData.name || "",
    slug: fieldData.slug || ""
  };
}
