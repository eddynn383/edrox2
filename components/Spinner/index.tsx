import spinner from "./spinner.module.css"

const Spinner = () => {
    return ( 
        <span className={spinner.container}>
            <span className="sr-only">Loading...</span>
        </span>
    );
}
 
export { Spinner };