import { Link } from "react-router-dom";

const VotingForm = (props) => {

    const { onChangeValue, objectArray, showResult, pollID, vote, handleClick } = props;

    return(
        <form className="vote" onChange={onChangeValue}>

            {objectArray[1] ?
                Object.keys(objectArray[1]).map(function (object, i) {
                    return (
                        // <div className="radioContainer"key={i}>
                        //     <div className="radioWrapper"></div>
                        //     <input type="radio" className="radioInput"value={object} name="vote" />
                        //     <label className="radioLabel">
                        //         <span className="spanRadioButton">{object}</span>
                        //     </label>
                        // </div>

                        <div  key={i}className="form__group">
                            <div className="form__radio-group">
                                <input type="radio" name="size" id="small" className="form__radio-input"/>
                                <label className="form__label-radio" for="small" className="form__radio-label">
                                    <span className="form__radio-button"></span> {object}
                                </label>
                            </div>
                        </div>
                    );
                })
                : null}

            {showResult ? null : ((vote !== "") ?
                <Link to={`${pollID}/result`} onClick={handleClick}>
                    <button className="importantButton">Vote</button>
                </Link>
                :
                <Link to={`${pollID}`} onClick={handleClick}>
                    <button >Vote</button>
                </Link>
            )}

        </form>
    )



}

export default VotingForm;