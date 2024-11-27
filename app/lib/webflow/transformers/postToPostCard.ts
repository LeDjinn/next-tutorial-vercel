import { Item, NewsMainProps, PostFieldsCleaned } from "../../../../app/interfaces";


   export function postToPostCard(item:PostFieldsCleaned): NewsMainProps {
    const  fieldData  = item;
     return {
        tag: '',  // Assuming 'name' is the string you need for the tag
        title: fieldData.name,
        arabicTitle: fieldData.arabicTitle,
        description: '',
        source: fieldData.name,
        datePublished: fieldData.datePublished,
        readTime: '6 min',

        postLink: `/announcements/${fieldData.slug}`,
        categoryLink: `/announcements/${fieldData.slug}`,  // Assuming 'url' is the string you need for the category link
        authorLink: 'N/A',
        postImage: fieldData.thumbnail.url,
        authorImage: 'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg',
    
     };
   }