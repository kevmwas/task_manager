import PageMeta from "../../components/common/PageMeta";
import Metrics from "../../components/metrics/metrics";
import MonthlyStats from "../../components/metrics/monthly_stats";
import StatisticsChart from "../../components/metrics/StatisticsChart";
import Targets from "../../components/metrics/targets";

const Home = () => {
  return (
    <>
      <PageMeta
        title="Panga"
        description="Dashboard"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <Metrics />
          <MonthlyStats />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <Targets />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

      </div>
    </>
  );
}

export default Home
