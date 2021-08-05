const Result = (props) => {
  const { result } = props;
  const sumValues = Object.values(result).reduce((a, b) => a + b);

  return (
    <div className="result">
      <h3>Result</h3>
      { result ? Object.keys(result).map(function(item, i) {
        return(
          <p key={i}>{item}: {result[item]} </p>
        )
        }) : null
      }
      <p>Total: {sumValues}</p>

      <h4>Percentage</h4>
      { result ? Object.keys(result).map(function(item, i) {
        return(
          <p key={i}>{item}: {((result[item] / sumValues) * 100).toFixed(1)}%</p>
        )
        }) : null
      }
    </div>
  );
};
export default Result;
