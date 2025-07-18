const CareerStats = ({ careerStats }) => {
  return (
    <div className="row">
      <div className="col">
        <div className="table-responsive">
          <table className="table table-dark table-striped  table-sm">
            <thead>
              <tr>
                <th>Season</th>
                <th>Club</th>
                <th>Games Played</th>
                <th>Goals Scored</th>
                <th>Assists</th>
              </tr>
            </thead>
            <tbody>
              {careerStats.map((item, index) => (
                <tr key={index}>
                  <td>{item.SEASON}</td>
                  <td>{item.CLUB}</td>
                  <td>{item.LEAGUE_GAMESPLAYED}</td>
                  <td>{item.LEAUGE_GOALSSCORED}</td>
                  <td>{item.LEAGUE_ASSISTS}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CareerStats;
