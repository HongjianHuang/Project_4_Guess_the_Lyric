const AnswerOption =(props)=>{
    const {poll} = props;
    console.log(props);
    
    return(
        <div>
            {/* <ul>
            {poll.__proto__.constructor.keys(poll).map((item,i) => (
            <li className="travelcompany-input" key={i}>
            <span className="input-label">{item}</span>
            {<button onClick = {props.clickFunction()}>Remove</button>}
            </li>
            ))}
            </ul> */}
        </div>
    )
}

export default AnswerOption;