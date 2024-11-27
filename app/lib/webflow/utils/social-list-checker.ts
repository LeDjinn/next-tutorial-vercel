import { SocialMediaLinks } from "@/app/interfaces";

export function socialListChecker(list: SocialMediaLinks) {   
    if (
        list.facebook?.url === "" && 
        list.instagram?.url === "" && 
        list.twitter?.url === "" && 
        list.youtube?.url === ""
    ) {
        return false;
    }
    return true;
}