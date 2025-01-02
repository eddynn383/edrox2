import { Card } from "../Card"
import { IPropsSkeleton } from "./interface"
import skeleton from "./skeleton.module.css"

const Bone = ({ className = skeleton.bone, background = "var(--primary-background-200)", foreground = "var(--primary-background-300)", width, height, radius, animationType, animationDuration, extraStyle, ...props }: IPropsSkeleton) => {
    return (
        <span className={className} data-animation-type={animationType} data-animation-duration={animationDuration} style={{ width: width, height: height, borderRadius: radius, backgroundColor: background, ...extraStyle }} {...props}>
            <span className={skeleton.marker} style={{ backgroundImage: `linear-gradient(to right, transparent, ${foreground}, transparent)` }}></span>
        </span >
    )
}

const SkeletonCard = () => {
    return (
        <div className={skeleton.card}>
            <div className={skeleton.cover}>
                <Bone width="100%" height="100%" radius="8px 8px 0 0" animationType="" animationDuration={300} extraStyle={{ "aspectRatio": "16 / 9" }} />
            </div>
            <div className={skeleton.content}>
                <div className={skeleton.top}>
                    <div className={skeleton["price-rating"]}>
                        <Bone width="100px" height="24px" radius="4px" animationType="" animationDuration={300} />
                        <Bone width="100px" height="24px" radius="4px" animationType="" animationDuration={300} />
                    </div>
                    <div className={skeleton.info}>
                        <div className={skeleton.title}>
                            <Bone width="100%" height="28px" radius="4px" animationType="" animationDuration={300} />
                            {/* <Bone width="160px" height="24px" radius="8px" animationType="" animationDuration={300} /> */}
                        </div>
                        <div className={skeleton.description}>
                            <Bone width="100%" height="16px" radius="4px" animationType="" animationDuration={300} />
                            <Bone width="50%" height="16px" radius="4px" animationType="" animationDuration={300} />
                        </div>
                        <div className={skeleton.metadata}>
                            <Bone width="100px" height="16px" radius="4px" animationType="" animationDuration={300} />
                            <Bone width="100px" height="16px" radius="4px" animationType="" animationDuration={300} />
                        </div>
                    </div>
                </div>
                {/* <div className={skeleton.bottom}>
                    <span className={skeleton.instructor}>
                        <Bone width="24px" height="24px" radius="12px" animationType="" animationDuration={300} />
                        <Bone width="80px" height="16px" radius="8px" animationType="" animationDuration={300} />
                    </span>
                    <Bone width="120px" height="16px" radius="8px" animationType="" animationDuration={300} />
                </div> */}
            </div>
        </div>
    )
}

const SkeletonMenu = () => {
    return (
        <div className={skeleton.menu}>
            <div className={skeleton.item}>
                <Bone width="100px" height="16px" radius="4px" animationType="" animationDuration={300} />
            </div>
            <div className={skeleton.item}>
                <Bone width="140px" height="16px" radius="4px" animationType="" animationDuration={300} />
            </div>
            <div className={skeleton.item}>
                <Bone width="135px" height="16px" radius="4px" animationType="" animationDuration={300} />
            </div>
            <div className={skeleton.item}>
                <Bone width="160px" height="16px" radius="4px" animationType="" animationDuration={300} />
            </div>
            <div className={skeleton.item}>
                <Bone width="80px" height="16px" radius="4px" animationType="" animationDuration={300} />
            </div>
        </div>
    )
}

const SkeletonProfile = () => {
    return (
        <div className={skeleton.profile}>
            <div className={skeleton.left}>
                <div className={skeleton.image}>
                    <Bone width="100%" height="100%" radius="4px" animationType="" animationDuration={300} />
                </div>
            </div>
            <div className={skeleton.right}>
                <div className={skeleton.name}>
                    <Bone width="140px" height="16px" radius="4px" animationType="" animationDuration={300} />
                </div>
                <div className={skeleton.email}>
                    <Bone width="70px" height="16px" radius="4px" animationType="" animationDuration={300} />
                </div>
            </div>
        </div>
    )
}

const ChapterSkeleton = () => {
    return (
        <div className={skeleton.chapters}>
            {Array.from({ length: 3 }).map((_, i) => (
                <Card mode="solid" shade="200" key={i}>
                    <div className={skeleton.chapter}>
                        <div className={skeleton.left}>
                            <Bone width="200px" height="20px" radius="4px" animationType="" animationDuration={300} />
                            {/* <Bone width="300px" height="4px" radius="4px" animationType="" animationDuration={300} /> */}
                        </div>
                        <div className={skeleton.right}>
                            <Bone width="32px" height="32px" radius="4px" animationType="" animationDuration={300} />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export { Bone, SkeletonCard, SkeletonMenu, SkeletonProfile, ChapterSkeleton }