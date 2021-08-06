import { Link } from "react-router-dom";

const VotingForm = (props) => {

    const { onChangeValue, objectArray, showResult, pollID, vote, handleClick } = props;

    return(
        <form className="vote" onChange={onChangeValue}>
            {/* Will show the options added by user as radio buttons. 
            If no options are present page will render as empty */}
            {objectArray[1] ?
                Object.keys(objectArray[1]).map(function (object, i) {
                    return (
                        <div key={i}>
                            <div class="radioContainer">
                                <label htmlFor="small">
                                    {object}
                                </label>
                                <input type="radio" name="size" id="small" value={object} />
                            </div>
                        </div>
                    );
                })
                : null}

                {/* Shows the result after vote button has been clicked, if there is no value chosen when vote button is clicked page will stay the same */}
            {showResult ? null : ((vote !== "") ?
                <Link to={`${pollID}/result`} onClick={handleClick}>
                    <button className="importantButton">Vote</button>
                </Link>
                :
                <Link to={`${pollID}`} onClick={handleClick}>
                    <button>Vote</button>
                </Link>
            )}
        </form>
    )
}

export default VotingForm;