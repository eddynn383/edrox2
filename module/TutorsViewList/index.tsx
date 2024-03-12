import { usePathname, useRouter } from "next/navigation";
import { Cover } from "@/components";
import ProfileAvatar from "@/public/assets/images/profile-avatar.png";
import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"
import { getTutor } from "@/actions/tutor";

interface TutorProps {
    data?: any
}


const Tutor = ({ data }: TutorProps) => {
    console.log(data)
    // const tutor = getTutor(data.tutorId)

    // console.log(tutor)
    
    return ( 
        <div className={csx["tutor-view"]}>
            {/* <div className={csx["tutor-view-left"]}>
                <Cover src={image ? image : ProfileAvatar} alt={name} width={44} height={44} defSize />
            </div>
            <div className={csx["tutor-view-right"]}>
                <span className={csx["tutor-view-name"]}>{name}</span>
                <span className={csx["tutor-view-ratings"]}>{ratings}</span>
            </div> */}
        </div>
    );
}



interface TutorsViewListProps {
    tutors: any;
}

const TutorsViewList = ({ tutors }: TutorsViewListProps) => {
    return ( 
        <ul className={msx["tutors-view-list"]}>
            {
                tutors.map((item: any) => (
                    <li className={msx["tutors-view-list-item"]} key={item.id}>
                        <Tutor data={item.tutors} />
                    </li>
                ))
            }
        </ul>
    );
}
 
export default TutorsViewList;