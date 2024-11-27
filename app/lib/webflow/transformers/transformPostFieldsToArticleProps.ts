import { ArticleProps, PostFieldsCleaned } from "@/app/interfaces";



  
  export function transformPostFieldsToArticleProps(post: PostFieldsCleaned): ArticleProps {

    const arrayTags= post.theme3 && post.theme3.length > 0 ? post.theme3.map(tag=>tag.name) : [];
    return {
      article: {
        title: post.seoTitle,
        description: post.body,
        image: post.thumbnail.url,
        date: post.datePublished,
        time_to_read_in_minutes: 5, // This value can be calculated or derived if needed
        body: {
          code: post.body, // Assuming `code` in body is the same as `body` in PostFieldsCleaned
        },
        tags: arrayTags,
        mainImage: post.mainImage.url,
        category: {
          name: post.programme.name,
          url: post.programme.url || '',
        },
        author: {
          name: post.name,
          url: `/author/${post.slug}`, // Assuming URL structure
          avatar: post.thumbnail.url,
          role: 'Author', // Assuming a default role, if not provided
          body: {
            code: post.body, // Assuming the author's body content is the same
          },
          social_links: [], // Assuming no social links as PostFieldsCleaned doesn't provide them
        },
      },
    };
  }
  

  