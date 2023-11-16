import placeholder from "./resources/placeholderimage.jpg"
import "./frontpage.css"
export default function Frontpage() {
    return <>
        <MovieElement/>
        <HeaderElement text="treding"/>
        <MovieElement/>
        <HeaderElement text="upcoming"/>
        <MovieElement/>
        <HeaderElement text="recent reviews"/>
        <MovieElement/>
    </>

    function MovieElement() {
        return (
            <div className="moviecontainer">
                <img src={placeholder} alt="bigdogstatus" className="elementimage">
                </img><article className="movieinfo">
                    <div className="title">George orwell</div>
                    <div className="title">Fantasy</div>
                    <div className="title">3/5</div>
                </article>
            </div>
        );
    }
    function HeaderElement(props) {
        return (
            <div className="headingelement">
            <h className="Movieheading">{props.text}</h>
            </div>
        );
    }
}