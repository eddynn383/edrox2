import { Icon } from "@/components/Icon"
import { IPropsStar } from "./interface"
import { FaStar } from "react-icons/fa6";
import sx from "@/styles/component.module.scss"

const Star = ({ value, idx }: IPropsStar) => {
    const integer = Math.floor(value);
    const decimal = value - integer;

    const progress = idx <= integer
        ? 100 : idx === integer + 1
            ? Math.floor(decimal * 100) : 0;

    return (
        <span className={sx["star"]} data-progress={progress}>
            <label htmlFor={`star-${idx}`}>{idx + 1}</label>
            <input id={`star-${idx}`} type="radio" defaultChecked={idx <= value ? true : false} />
            <span className={sx["star-icon"]}>
                <span className={sx["star-icon-fill"]} style={{ width: `${progress}%` }}>
                    <FaStar />
                </span>
                <span className={sx["star-icon-base"]}>
                    <FaStar />
                </span>
            </span>
        </span>
    )
}

export { Star }