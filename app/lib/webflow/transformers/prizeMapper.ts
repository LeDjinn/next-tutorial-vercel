import { Item, PrizesRawFields, PrizesCleanedFields, PeopleRawFields, AwardsRawFields } from "../../../../app/interfaces";

export default function prizeMapper(
  item: Item<PrizesRawFields>,
  awards: Item<AwardsRawFields>[],
  people: Item<PeopleRawFields>[]
): PrizesCleanedFields {
  const { fieldData } = item;

  const awardMatch = awards.find(award => award.id === fieldData.award);
  const award = awardMatch ? { name: awardMatch.fieldData.name || "", slug: awardMatch.fieldData.slug || "" , arabicName: awardMatch.fieldData["name-arabic"] || ""
  } : { name: "N/A", slug: "N/A" , arabicName: "N/A"};

  const relatedPeople = fieldData["winners-people"]
    ? fieldData["winners-people"].map((personId) => {
        const peopleMatch = people.find((person) => person.id === personId);
        return peopleMatch
          ? {
              name: peopleMatch.fieldData.name || "",
              arabicName: peopleMatch.fieldData["name-arabic"] || "",
              slug: peopleMatch.fieldData.slug || "",
            }
          : { name: "N/A", slug: "N/A", arabicName  : "N/A"};
      })
    : [];

  return {
    nameArabic: fieldData["name-arabic"] || "",
    award: award,
    awardYear: fieldData["award-year"] || 0,
    winnersPeople: relatedPeople,
    summary: fieldData["summary"] || "",
    summaryArabic: fieldData["summary-arabic"] || "",
    name: fieldData.name || "",
    slug: fieldData.slug || ""
  };
}
