const Result = (props) => {
  //console.log(props);
  const { result } = props;
  return (
    <div className="result">
      <h3>result</h3>
      <p>{result.yes}</p>
      <p>{result.no}</p>
    </div>
  );
};
export default Result;
