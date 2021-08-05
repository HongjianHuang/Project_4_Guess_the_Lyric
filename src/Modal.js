import "./FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = (props) => {

    const { active, setActive } = props

    return(
        <div className={active ? null : "hide"}>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="closeButton">
                        <button onClick={() => setActive(false)}>
                            <FontAwesomeIcon icon="times" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="errorMessage">
                        <p>Error:</p>
                        <p>Please enter a valid input.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Modal;