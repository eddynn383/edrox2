import { IPropsStar } from "./interface"
import { FaStar } from "react-icons/fa6";
import star from "./star.module.css"

const Star = ({ value, containerId, idx }: IPropsStar) => {
    const integer = Math.floor(value);
    const decimal = value - integer;

    const progress = idx <= integer
        ? 100 : idx === integer + 1
            ? Math.floor(decimal * 100) : 0;

    return (
        <span className={star.container} data-progress={progress}>
            <label className={star.label} htmlFor={`${containerId}-star-${idx}`}>{idx + 1}</label>
            <input className={star.input} id={`${containerId}-star-${idx}`} type="radio" defaultChecked={idx <= value ? true : false} />
            <span className={star.icon}>
                <span className={star["icon-fill"]} style={{ width: `${progress}%` }}>
                    <FaStar />
                </span>
                <span className={star["icon-base"]}>
                    <FaStar />
                </span>
            </span>
        </span>
    )
}

export { Star }