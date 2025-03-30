"use client";
import React from "react";
import styles from "./style.module.scss";
import type { RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";
import Image from "next/image";

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    user.stepCode >= 1 && (
      <header>
        <div className={styles["header"]}>
          <div className={styles["left"]}>
            <div className={`${styles["level"]} ${user.stepCode === 4 && styles["active"]}`}>
              <div className={styles["level-star"]}>
                <Image
                  src="/assets/common/level.png"
                  alt="star"
                  width={50}
                  height={50}
                />
                <p className={styles["level-star-count"]}>{user.level}</p>
              </div>
              <div className={styles["level-xp-outside"]}>
                <div className={styles["level-xp"]}>
                  <div
                    style={{
                      width: `${Math.max(
                        4,
                        (user.xp / (user.level + 1)) * 1000
                      )}%`,
                    }}
                    className={styles["level-xp-load"]}
                  ></div>
                  <p className={styles["level-xp-text"]}>
                    {user.xp} / {(user.level + 1) * 1000}
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles["hero"]} ${user.stepCode === 5 && styles["active"]}`}>
              <Image
                src="/assets/info/info2.png"
                alt="star"
                width={50}
                height={60}
              />
              <p className={styles["hero-count"]}>{user.heros.length}</p>
            </div>
          </div>
          <div className={styles["right"]}>
            <div className={`${styles["coin"]} ${user.stepCode === 2 && styles["active"]}`}>
              <p className={styles["coin-count"]}>{user.coin}</p>
              <Image
                src="/assets/common/coin.png"
                alt="star"
                width={36}
                height={36}
              />
            </div>
            <div className={`${styles["heart"]} ${user.stepCode === 3 && styles["active"]}`}>
              <p className={styles["heart-count"]}>{user.heart}</p>
              <Image
                src="/assets/common/heart.png"
                alt="star"
                width={36}
                height={36}
              />
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
