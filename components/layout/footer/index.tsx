"use client";
import React from "react";
import styles from "./style.module.scss";
import type { RootState } from "../../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { storeActivity, warActivity } from "@/redux/slice/user/user";

const Footer = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleStoreOpen = () =>{
    dispatch(storeActivity(true))
  }
  const handleWarOpen = () =>{
    dispatch(warActivity(true))
  }
  return (
    user.stepCode >= 6 && user.backgroundCode === 0 && (
      <header>
        <div className={styles["footer"]}>
          <div className={styles["left"]}>
            <div className={`${styles["war"]} ${user.stepCode === 7 && styles["active"]}`}>
              <Image
                src="/assets/common/war2.png"
                alt="war"
                width={70}
                height={70}
                onClick={handleWarOpen}
              />
            </div>
          </div>
          <div className={styles["right"]}>
            <div className={`${styles["store"]} ${user.stepCode === 6 && styles["active"]}`}>
              <Image
                src="/assets/common/store.png"
                alt="store"
                width={60}
                height={60}
                onClick={handleStoreOpen}
              />
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Footer;
