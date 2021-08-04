import { Link } from "react-router-dom";

const VotingForm = (props) => {

    const { onChangeValue, objectArray, showResult, pollID, vote, handleClick } = props;

    return(
        <form className="vote" onChange={onChangeValue}>

            {objectArray[1] ?
                Object.keys(objectArray[1]).map(function (object, i) {
                    return (
                        <label key={i}>
                            <input type="radio" value={object} name="vote" /> {object}
                        </label>
                    );
                })
                : null}

            {showResult ? null : ((vote !== "") ?
                <Link to={`${pollID}/result`} onClick={handleClick}>
                    <button>Vote</button>
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