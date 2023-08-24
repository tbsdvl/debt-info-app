import {getDebtByDateRangeQuery} from '../queries';
import {Typography} from "@mui/material";

const DebtInfoChart = () => {
  const {isLoading, data} = getDebtByDateRangeQuery();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (data) {
    return (
      <>
          <Typography>
            Has Data!
          </Typography>
      </>
    );
  }
}

export default DebtInfoChart;