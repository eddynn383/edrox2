import { Star } from "@/components/Star"
import { RatingProps } from "./interface"
import rating from "./rating.module.css"

const Rating = ({ score, reviews, containerId, showRatings=true, minified=false }: RatingProps) => {
    const reviewslabel = () => {
        if(reviews === 1) {
            // console.log("is true")
            return "review"
        } else {
            // console.log("is false")
            return "reviews"
        }    
    }
    // console.log("review", reviews)
    // console.log("reviewslabel: ", reviewslabel())

    return (
    
        <div className={rating.container}>            
            <span className={rating.score}>
                <span className={rating.value}>{score}</span>
                {
                    !minified &&
                    <span className={rating.stars}>
                        {
                            [...Array(5)].map((item, idx) => {
                                const i = idx + 1
                                return (
                                    <Star key={idx} containerId={containerId} idx={Number(i)} value={Number(score)} />
                                )
                            })
                        }
                    </span>
                }
                {
                    minified && 
                    <span className={rating.stars}>
                        <Star key={1} containerId={containerId} idx={1} value={1} />
                    </span>
                }
            </span>
            { showRatings && <span className={rating.reviews}>({reviews} {reviewslabel()})</span>}
        </div>
    )
}

export { Rating }