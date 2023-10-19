import Header from './components/Header.tsx';
import CurrentDebtSection from './components/CurrentDebtSection.tsx';
import DebtInfoChartSection from './components/DebtInfoChartSection.tsx';

const App = () => {
  return (
    <>
      <Header />
      <CurrentDebtSection />
      <DebtInfoChartSection />
    </>
  );
}

export default App;
