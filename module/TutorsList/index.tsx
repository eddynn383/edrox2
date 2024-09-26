"use server"

import { Cover, Rating } from "@/components";
import ProfileAvatar from "@/public/assets/images/profile-avatar.png";
import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"
import { getTutorById } from "@/data/tutors";
import tutorSx from "./tutor.module.css"

interface TutorProps {
    id: string
}

type Tutor = {
    image: string;
    name: string;
}



const Tutor = async ({ id }: TutorProps) => {
    // console.log(id)
    const tutor = await getTutorById(id)

    const name = tutor?.name
    const image = tutor?.image
    let rating = tutor?.rating

    if (!tutor) {
        return null
    }
        // console.log(tutor)
    
    return ( 
        <div className={tutorSx.container}>
            <div className={tutorSx.left}>
                <Cover src={image ? image : ProfileAvatar} alt={name ? name : `tutor-${id}`} width={44} height={44} defSize />
            </div>
            <div className={tutorSx.right}>
                <span className={tutorSx.name}>{name}</span>
                {rating && <Rating containerId={id} score={rating?.avg} reviews={rating?.count} minified={true} />}
            </div>
        </div>
    );
}



interface TutorsListProps {
    tutors: any;
}

export const TutorsList = async ({ tutors }: TutorsListProps) => {
    // console.log(tutors)
    return ( 
        <ul className={tutorSx.list}>
            {
                tutors.map((item: any) => (
                    <li className={tutorSx.item} key={item.tutorId}>
                        <Tutor id={item.tutorId} />
                    </li>
                ))
            }
        </ul>
    );
}