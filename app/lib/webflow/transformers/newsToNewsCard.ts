import { NewsCleanedFields, NewsMainProps } from "../../../../app/interfaces";


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

export function newsToNewsCard(news: NewsCleanedFields): NewsMainProps {
    return {
        tag: 'test',
        arabicTitle: news.arabicTitle,
        title: news.name,
        description: news.excerpt,
        source: 'source',
        datePublished: news.datePublished,
        readTime: '6 min',
        postLink: news.slug,
        categoryLink: news.slug,
        authorLink: `sources/${news.slug}`,
        postImage: news.thumbnail.url,
        authorImage: '/path/to/author/image.jpg',
    };
}

