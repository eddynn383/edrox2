"use server"

import { Cover, Rating } from "@/components";
import ProfileAvatar from "@/public/assets/images/profile-avatar.png";
import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"
import { getTutorById } from "@/data/tutors";

interface TutorProps {
    id: string
}

type Tutor = {
    image: string;
    name: string;
}



const Tutor = async ({ id }: TutorProps) => {
    console.log(id)
    const tutor = await getTutorById(id)

    const name = tutor?.name
    const image = tutor?.image
    let rating = tutor?.rating

    if (!tutor) {
        return null
    }
        console.log(tutor)
    
    return ( 
        <div className={csx["tutor-view"]}>
            <div className={csx["tutor-view-left"]}>
                <Cover src={image ? image : ProfileAvatar} alt={name ? name : `tutor-${id}`} width={44} height={44} defSize />
            </div>
            <div className={csx["tutor-view-right"]}>
                <span className={csx["tutor-view-name"]}>{name}</span>
                {rating && <Rating score={rating?.avg} reviews={rating?.count} minified={true} />}
            </div>
        </div>
    );
}



interface TutorsViewListProps {
    tutors: any;
}

const TutorsViewList = async ({ tutors }: TutorsViewListProps) => {
    console.log(tutors)
    return ( 
        <ul className={msx["tutors-view-list"]}>
            {
                tutors.map((item: any) => (
                    <li className={msx["tutors-view-list-item"]} key={item.tutorId}>
                        <Tutor id={item.tutorId} />
                    </li>
                ))
            }
        </ul>
    );
}
 
export default TutorsViewList;