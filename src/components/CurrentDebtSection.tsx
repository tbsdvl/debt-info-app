import Section from './Section.tsx';
import CurrentDebt from './CurrentDebt.tsx';

const CurrentDebtSection = () => {
  return <Section id={'current'} component={<CurrentDebt />} />;
}

export default CurrentDebtSection;
