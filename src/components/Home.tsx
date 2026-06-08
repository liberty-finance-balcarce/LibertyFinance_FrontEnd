import { RankingInstrumentosFinancieros } from "./RankingInstrumentosFinancieros";
import { TestInversor } from "./TestInversor";
import { CardList } from "./CardList";
import { LoadingSpinner } from "./LoadingSpinner";

export function Home() {
  return (
    <>
      <RankingInstrumentosFinancieros />
      <CardList />
      <TestInversor />
      <LoadingSpinner logo="/assets/logo-icon.png" size={120} />
    </>
  );
}
