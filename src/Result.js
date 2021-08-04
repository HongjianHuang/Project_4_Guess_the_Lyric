const Result = (props) => {
  console.log(props);
  const { result } = props;
  const total = result.Yes + result.No;
  console.log(result);

  return (
    <div className="result">
      <h3>Result</h3>
      <p>Yes: {result.Yes}</p>
      <p>No: {result.No}</p>
      <p>Total Votes: {total}</p>

      <h4>Percentage</h4>
      <p>Yes: {(result.Yes / total) * 100}%</p>
      <p>No: {(result.No / total) * 100}%</p>
    </div>
  );
};
export default Result;

// {
//   !showResult ?

//           :
//     <Result result={objectArray[1] ? objectArray[1] : { Yes: 0, No: 0 }} />
// }
