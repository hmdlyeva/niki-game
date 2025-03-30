import InfoGirlModal from "@/components/common/infoGirl";
import Lobi from "@/components/common/lobi";
import StoreModal from "@/components/common/store";
import WarModal from "@/components/common/war";
import React from "react";

const HomeContainer = () => {
  return (
    <main>
      <Lobi/>
      <InfoGirlModal />
      <StoreModal />
      <WarModal/>
    </main>
  );
};

export default HomeContainer;
