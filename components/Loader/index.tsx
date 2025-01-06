import loader from "./loader.module.css"

interface LoaderProps {
    animation?: string;
}

const Loader = ({ animation = "triangles" }: LoaderProps) => {
    return (
        <div className={loader.placeholder}>
            <div className={loader.container} data-animation={animation}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export { Loader }