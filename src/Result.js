const Result = (props) => {
  console.log(props);
  const { result } = props;
  const total = result.yes + result.no; 

  return (
    <div className="result">
      <h3>result</h3>
      <p>Yes: {result.yes}</p>
      <p>No: {result.no}</p>
      <p>Total Votes: {total}</p>

    </div>
  );
};
export default Result;


// {
//   !showResult ?
          
//           :
//     <Result result={objectArray[1] ? objectArray[1] : { yes: 0, no: 0 }} />
// }
