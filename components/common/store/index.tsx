"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { buyHero, storeActivity } from "@/redux/slice/user/user";
import Image from "next/image";
import { IHero } from "@/types/common.type";

const heros = [
  {
    id: 1,
    arenaCode: 1,
    price: 75,
    heart: 75,
    attack: 10,
    attackTime: 2,
    heroPath: "/assets/hero/hero11.png",
  },
  {
    id: 2,
    arenaCode: 1,
    price: 125,
    heart: 100,
    attack: 15,
    attackTime: 3,
    heroPath: "/assets/hero/hero12.png",
  },
  {
    id: 3,
    arenaCode: 1,
    price: 200,
    heart: 125,
    attackTime: 4,
    attack: 20,
    heroPath: "/assets/hero/hero13.png",
  },
  {
    id: 4,
    arenaCode: 1,
    price: 300,
    heart: 150,
    attackTime: 5,
    attack: 25,
    heroPath: "/assets/hero/hero14.png",
  },
  {
    id: 5,
    arenaCode: 2,
    price: 450,
    heart: 175,
    attackTime: 3,
    attack: 30,
    heroPath: "/assets/hero/hero21.png",
  },
  {
    id: 6,
    arenaCode: 2,
    price: 600,
    heart: 200,
    attackTime: 4,
    attack: 40,
    heroPath: "/assets/hero/hero22.png",
  },
  {
    id: 7,
    arenaCode: 2,
    price: 850,
    heart: 225,
    attackTime: 5,
    attack: 45,
    heroPath: "/assets/hero/hero23.png",
  },
  {
    id: 8,
    arenaCode: 3,
    price: 1200,
    heart: 250,
    attackTime: 4,
    attack: 50,
    heroPath: "/assets/hero/hero31.png",
  },
  {
    id: 9,
    arenaCode: 3,
    price: 1500,
    heart: 275,
    attackTime: 5,
    attack: 60,
    heroPath: "/assets/hero/hero32.png",
  },
];

const StoreModal = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [heroData, setHeroData] = useState(heros);

  const handleStoreOpen = () => {
    dispatch(storeActivity(false));
  };
  const handleBuyHero = (hero: IHero) => {
    dispatch(buyHero(hero));
    setHeroData((prev) => (prev = prev.filter((prevHero) => prevHero.price !== hero.price)));
  };
  return (
    user.storeOpen && (
      <div className={styles["store-modal"]} onClick={handleStoreOpen}>
        <div className={styles["store-modal-content"]} onClick={(e)=> e.stopPropagation()}>
          {heroData.map((hero) => (
            <div key={hero.id} className={styles["hero-card"]}>
              <Image
                src={hero.heroPath}
                alt="hero"
                width={60}
                height={90}
                className={styles["hero-img"]}
              />
              <div className={styles["heart"]}>
                <Image
                  src="/assets/common/heart.png"
                  alt="hero"
                  width={40}
                  height={40}
                />
                {hero.heart}
              </div>
              <div className={styles["weapon"]}>
                <Image
                  src="/assets/common/weapon.png"
                  alt="hero"
                  width={40}
                  height={40}
                />
                {hero.attack}
              </div>
              <button
                className={`${styles["coin-btn"]} ${hero.price > user.coin && styles["disabled"]}`}
                disabled={hero.price > user.coin}
                onClick={() => handleBuyHero(hero)}
              >
                <Image
                  src="/assets/common/coin.png"
                  alt="hero"
                  width={30}
                  height={30}
                />
                {hero.price}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default StoreModal;
