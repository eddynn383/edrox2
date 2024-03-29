import { Star } from "@/components/Star"
import { RatingProps } from "./interface"
import sx from "@/styles/component.module.scss";

const Rating = ({ score, reviews }: RatingProps) => {
    const reviewslabel = () => {
        if(reviews === 1) {
            console.log("is true")
            return "review"
        } else {
            console.log("is false")
            return "reviews"
        }    
    }
    console.log("review", reviews)
    console.log("reviewslabel: ", reviewslabel())

    return (
        <div className={sx["rating"]}>
            <span className={sx["rating-score"]}>
                <span className={sx["rating-score-value"]}>{score}</span>
                <span className={sx["rating-score-stars"]}>
                    {
                        [...Array(5)].map((item, idx) => {
                            const i = idx + 1
                            return (
                                <Star key={idx} idx={Number(i)} value={Number(score)} />
                            )
                        })
                    }
                </span>
            </span>
            {<span className={sx["rating-reviews"]}>({reviews} {reviewslabel()})</span>}
        </div>
    )
}

export { Rating }