interface NewsPageProps {
    params: {
      topic: string;
      slug: string;
    };
    title: string;
    arabicTitle: string;
    imageUrl: string;
    richText1: string;
    richText2: string;
    post: {
      title: string;
      summary: string;
      topic: {
        name: string;
        slug: string;
      };
      prev: {
        name: string;
        slug: string;
      };
      next: {
        name: string;
        slug: string;
      };
    } | null;
    array12: number[];
    source: string;
    datePublished: string;
    arrayPeople: { name: string }[];
    relatedProgrammes: { name: string; href: string }[];
    relatedPeople: { name: string; href: string }[];
  }
  
  interface FieldData {
    "date-published": string;
    "external-link": string;
    "push-to-gr": boolean;
    "featured": boolean;
    "remove-from-news-grid": boolean;
    "excerpt": string;
    "summary": string;
    "name": string;
    "thumbnail-alt-text": string;
    "arabic-title": string;
    "slug": string;
    'thumbnail': Image;
    "hero-image": Image;
    "programme-s": string[];
    people: string[];
    sources: string;
    programme: string;
  }
  
  interface Image {
    fileId: string;
    url: string;
    alt: string | null;
  }
  
  interface Item {
    id: string;
    cmsLocaleId: string | null;
    lastPublished: string | null;
    lastUpdated: string;
    createdOn: string;
    isArchived: boolean;
    isDraft: boolean;
    fieldData: FieldData;
  }
  
  function calculateReadTime(text: string): string {
    const wordsPerMinute = 200;
    const numberOfWords = text ? text.split(/\s+/).length : 0;
    const minutes = Math.ceil(numberOfWords / wordsPerMinute);
    return `${minutes} min read`;
  }
  
  const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    if (date instanceof Date && !isNaN(date.valueOf())) {
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } else {
      return 'Invalid Date';
    }
  }
  
  export default function mapItemNews(item: Item, arraySource: Item[], arrayProgramme: Item[],arrayPeople: Item[]): NewsPageProps {
    const matchSource = arraySource.find(source => source.id === item.fieldData.sources);
    const matchProgramme = arrayProgramme.find(programme => programme.id === item.fieldData.programme);
    const matchPeople = item.fieldData.people && item.fieldData.people.length > 0
    ? item.fieldData.people
        .map(personId => arrayPeople.find(people => people.id === personId))
        .filter(person => person !== undefined)
    : [];
  
    return {
      params: {
        topic: item.fieldData.programme,
        slug: item.fieldData.slug,
      },
      title: item.fieldData.name || '',
      imageUrl: item.fieldData['hero-image']?.url || '/path/to/default/hero-image.jpg',
      richText1: item.fieldData.excerpt || '',
      richText2: item.fieldData.summary || '',
      post: {
        title: item.fieldData.name || '',
        summary: item.fieldData.summary || '',
        topic: {
          name: matchProgramme ? matchProgramme.fieldData.name : 'Unknown Topic',
          slug: item.fieldData.slug,
        },
        prev: {
          name: 'Previous Post Placeholder',
          slug: 'previous-post-slug',
        },
        next: {
          name: 'Next Post Placeholder',
          slug: 'next-post-slug',
        },
      },
      array12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Placeholder array
      source: matchSource ? matchSource.fieldData.name : 'Unknown Source',
      datePublished: formatDate(item.fieldData["date-published"] || ''),
      arrayPeople: matchPeople.map(person => person ? { name: person.id} : { name: 'Unknown Person'}),
     arabicTitle: item.fieldData["arabic-title"] || '',
      relatedProgrammes: matchProgramme ? [{ name: matchProgramme.fieldData.name, href: `/programme/${matchProgramme.id}` }] : [],
      relatedPeople: matchPeople.map(person => person ? { name: person.fieldData.name, href: `/people/${person.id}` } : { name: 'Unknown Person', href: '#' }),
    };
  }
  