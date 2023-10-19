import {getCurrentDebtQuery} from '../queries';
import {Typography} from '@mui/material';

const CurrentDebt = () => {
  const {isLoading, data} = getCurrentDebtQuery();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (data) {
    return (
      <>
          <h2>Current Debt to the Penny on {data.effectiveDate}</h2>
          <Typography>
            Government Holdings: ${data.governmentHoldings}
          </Typography>
          <Typography>
            Public Debt: ${data.publicDebt}
          </Typography>
          <Typography>
            Total Debt: ${data.totalDebt}
          </Typography>
      </>
    );
  }
}

export default CurrentDebt;
