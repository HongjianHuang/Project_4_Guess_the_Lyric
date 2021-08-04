const Modal = (props) => {

    const { active, setActive } = props

    return(
        <div className={active ? null : "hide"}>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="closeButton">
                        <button onClick={() => setActive(false)}> X </button>
                    </div>
                    <div className="errorMessage">
                        <p>Error message will go here</p>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Modal;