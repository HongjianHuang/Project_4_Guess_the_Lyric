import { useState } from 'react'



const Poll = (props) => {
    const pollID = props.match.params.pollID
    console.log(pollID);


    return (
        <h3>question</h3>
    )
}

export default Poll;