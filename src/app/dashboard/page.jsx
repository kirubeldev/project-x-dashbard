import React from "react";
import { ActivityGraph } from "../../components/Dashboard/ActivityGraph";
import { Barchart } from "../../components/Dashboard/Barchart";
import { RecentTransactions } from "../../components/Dashboard/RecentTransactions";


 const page = () => {
  return (
    <div className="px-4 grid mt-6  gap-3 grid-cols-12">
      {/* <StatCards /> */}
      <ActivityGraph />
      <Barchart />
      <RecentTransactions />
    </div>
  );
};
export default page;