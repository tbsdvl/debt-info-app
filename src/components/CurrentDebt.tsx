import {useQuery, useQueryClient} from 'react-query';
import {getCurrentDebt} from '../api';
import {Typography} from '@mui/material';

const CurrentDebt = () => {
  const {isLoading, data} = useQuery('current', getCurrentDebt);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (data) {
    return (
      <>
        <section id="current" className="bg-gray-900 text-lime-600 text-lg p-2 font-sans">
          <div className="bg-gray-800 rounded p-2">
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
          </div>
        </section>
      </>
    )
  }
}

export default CurrentDebt;
