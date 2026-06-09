import { RankingInstrumentosFinancieros } from "./RankingInstrumentosFinancieros";
import { TestInversor } from "./TestInversor";
import { CardList } from "./CardList";

export function Home() {
  return (
    <>
      <RankingInstrumentosFinancieros />
      <CardList />
      <TestInversor />
    </>
  );
}
