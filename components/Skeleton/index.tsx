import sx from "@/styles/component.module.scss"
import { IPropsSkeleton } from "./interface"

const Bone = ({ background="var(--background-color-200)", foreground="var(--background-color-300)", width, height, radius, animationType, animationDuration }: IPropsSkeleton) => {
    return (
        <span className={sx["skeleton-bone"]} data-animation-type={animationType} data-animation-duration={animationDuration} style={{width: width, height: height, borderRadius: radius, backgroundColor: background}}>
            <span className={sx["skeleton-marker"]} style={{backgroundImage: `linear-gradient(to right, transparent, ${foreground}, transparent)`}}></span>
        </span >
    )
}

const SkeletonCard = () => {
    return (
        <div className={sx["skeleton-card"]}>
            <div className={sx["skeleton-card-top"]}>
                <Bone width="376px" height="210px" radius="8px" animationType="" animationDuration={300} />
            </div>
            <div className={sx["skeleton-card-bottom"]}>
                <div className={sx["skeleton-card-bottom-top"]}>
                    <div className={sx["skeleton-card-price-rating"]}>
                        <Bone width="38px" height="24px" radius="8px" animationType="" animationDuration={300} />
                        <Bone width="98px" height="24px" radius="8px" animationType="" animationDuration={300} />
                    </div>
                    <div className={sx["skeleton-card-title"]}>
                        <Bone width="100%" height="24px" radius="8px" animationType="" animationDuration={300} />
                        <Bone width="160px" height="24px" radius="8px" animationType="" animationDuration={300} />
                    </div>
                </div>
                <div className={sx["skeleton-card-bottom-bottom"]}>
                    <span className={sx["skeleton-card-instructor"]}>
                        <Bone width="24px" height="24px" radius="12px" animationType="" animationDuration={300} />
                        <Bone width="80px" height="16px" radius="8px" animationType="" animationDuration={300} />
                    </span>
                    <Bone width="120px" height="16px" radius="8px" animationType="" animationDuration={300} />
                </div>
            </div>
        </div>
    )
}

const SkeletonMenu = () => {
    return (
        <div className={sx["skeleton-menu"]}>
            <div className={sx["skeleton-menu-item"]}>
                <Bone width="100px" height="16px" radius="4px" animationType="" animationDuration={300} />
            </div>
            <div className={sx["skeleton-menu-item"]}>
                <Bone width="140px" height="16px" radius="4px" animationType="" animationDuration={300} />
            </div>
            <div className={sx["skeleton-menu-item"]}>
                <Bone width="135px" height="16px" radius="4px" animationType="" animationDuration={300} />
            </div>
            <div className={sx["skeleton-menu-item"]}>
                <Bone width="160px" height="16px" radius="4px" animationType="" animationDuration={300} />
            </div>
            <div className={sx["skeleton-menu-item"]}>
                <Bone width="80px" height="16px" radius="4px" animationType="" animationDuration={300} />
            </div>
        </div>
    )
}

const SkeletonProfile = () => {
    return (
        <div className={sx["skeleton-profile"]}>
            <div className={sx["skeleton-profile-left"]}>
                <div className={sx["skeleton-profile-image"]}>
                    <Bone width="100%" height="100%" radius="4px" animationType="" animationDuration={300} />
                </div>
            </div>
            <div className={sx["skeleton-profile-right"]}>
                <div className={sx["skeleton-profile-name"]}>
                    <Bone width="140px" height="16px" radius="4px" animationType="" animationDuration={300} />
                </div>
                <div className={sx["skeleton-profile-email"]}>
                    <Bone width="70px" height="16px" radius="4px" animationType="" animationDuration={300} />
                </div>
            </div>
        </div>
    )
}

export { Bone, SkeletonCard, SkeletonMenu, SkeletonProfile }