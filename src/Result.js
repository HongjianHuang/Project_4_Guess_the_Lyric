const Result = (props) => {
  const { result } = props;
  const sumValues = Object.values(result).reduce((a, b) => a + b);

  return (
    <div className="result">
      <h3>Results</h3>
      { result ? Object.keys(result).map(function(item, i) {
        return(
          <p key={i}>{item}: {result[item]} ({((result[item] / sumValues) * 100).toFixed(1)}%)</p>
        )
        }) : null
      }
      <p>Total Votes: {sumValues}</p>
    </div>
  );
};
export default Result;
