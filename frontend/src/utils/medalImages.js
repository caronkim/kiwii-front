import gold1Image from "../assets/medal/gold1.png";
import sliver2Image from "../assets/medal/silver2.png";
import bronze3Image from "../assets/medal/bronze3.png";
import sliver4Image from "../assets/medal/silver4.png";
import sliver5Image from "../assets/medal/silver5.png";
import sliver6Image from "../assets/medal/silver6.png";
import sliver7Image from "../assets/medal/silver7.png";
import sliver8Image from "../assets/medal/silver8.png";
import sliver9Image from "../assets/medal/silver9.png";
import sliver10Image from "../assets/medal/silver10.png";


export function medalImages(rank) {
    switch (rank) {
        case 1:
            return gold1Image;
        case 2:
            return sliver2Image;
        case 3:
            return bronze3Image;
        case 4:
            return sliver4Image;
        case 5:
            return sliver5Image;
        case 6:
            return sliver6Image;
        case 7:
            return sliver7Image;
        case 8:
            return sliver8Image;
        case 9:
            return sliver9Image;
        case 10:
            return sliver10Image;
        default:
            return "";

    }
}