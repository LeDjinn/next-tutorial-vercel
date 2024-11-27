interface Collection {
    id: string;
    displayName: string;
    singularName: string;
    slug: string;
    createdOn: string;
    lastUpdated: string;
  }
  export default function getCorrespondingValue(collections: Collection[], arg: string): string {
    for (const collection of collections) {
      if (collection.id === arg) {
        return collection.slug;
      }
      if (collection.slug === arg) {
        return collection.id;
      }
    }
    return '';
  }
  