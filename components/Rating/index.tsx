import { Star } from "@/components/Star"
import { RatingProps } from "./interface"
import sx from "@/styles/component.module.scss";

const Rating = ({ score, reviews, showRatings=true, minified=false }: RatingProps) => {
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
                {
                    !minified &&
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
                }
                {
                    minified && 
                    <span className={sx["rating-score-stars"]}>
                        <Star key={1} idx={1} value={1} />
                    </span>
                }
            </span>
            { showRatings && <span className={sx["rating-reviews"]}>({reviews} {reviewslabel()})</span>}
        </div>
    )
}

export { Rating }