import { EventCardProps, EventFieldDataCleaned } from "../../../../app/interfaces";

export function mapEventFieldDataToEventCard(eventData: EventFieldDataCleaned): EventCardProps {
    return {
      id: eventData.slug,
      name: eventData.name,
      description: eventData.teaserText,
      programme: eventData.programmeLabel,
      imageUrl: eventData.heroImage.url,
      source: {
        name: "Event Source", // This is a placeholder as the source name is not available in EventFieldDataCleaned
        imageUrl: eventData.heroImage.url,
        date: eventData.eventDate,
        readTime: "N/A" // This is a placeholder as read time is not available in EventFieldDataCleaned
      }
    };
  }