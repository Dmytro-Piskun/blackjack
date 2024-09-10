import Balance from "@/components/Balance/Balance";
import Controls from "@/components/Controls/Controls";
import Options from "@/components/Options/Options";
import Table from "@/components/Table/Table";


export default function Home() {
  return (
    <div className="w-full h-[100dvh] background">
      <header className="h-[10dvh] container-centered">
        <Balance />
        <Options />
      </header>
      <main className="h-[70dvh] container-centered">
        <Table />
      </main>
      <footer className="h-[20dvh] container-centered">
        <Controls />
      </footer>
    </div>
  );
}
