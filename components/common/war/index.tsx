"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { startWar, warActivity } from "@/redux/slice/user/user";
import Image from "next/image";
import { backgroundImages } from "../background/Background";
import { IArena, IHero } from "@/types/common.type";

const initialArena = {
  imagePath: "",
  code: 0,
  position: "",
  backgroundColor: "",
  backgroundSize: "",
  name: "",
};

const WarModal = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [arena, setArena] = useState<IArena>(initialArena);
  const [selectedHero, setSelectedHero] = useState<IHero[]>([]);

  const handleWarOpen = () => {
    dispatch(warActivity(false));
  };
  const handleStartWar = () => {
    if (selectedHero.length > 0) {
      dispatch(startWar(selectedHero))
      dispatch(warActivity(false))
    }
  }

  return (
    user.warOpen && (
      <div className={styles["war-modal"]} onClick={handleWarOpen}>
        <div
          className={styles["war-modal-content"]}
          onClick={(e) => e.stopPropagation()}
        >
          {!arena.code && (
            <div className={styles["arena-cards"]}>
              {backgroundImages.slice(1).map((arena) => (
                <div
                  key={arena.code}
                  className={`${styles["arena-card"]} ${
                    !user.arenas.includes(arena.code) && styles["disabled"]
                  }`}
                >
                  <div className={styles["arena-card-img"]}>
                    <Image
                      src={arena.imagePath}
                      alt="hero"
                      width={100}
                      height={100}
                      className={styles["img"]}
                      onClick={() =>
                        user.arenas.includes(arena.code) && setArena(arena)
                      }
                    />
                    {!user.arenas.includes(arena.code) && (
                      <Image
                        src="/assets/common/lock.png"
                        alt="lock"
                        width={40}
                        height={40}
                        className={styles["lock-img"]}
                      />
                    )}
                  </div>
                  <p className={styles["arena-card-name"]}>{arena.name}</p>
                </div>
              ))}
            </div>
          )}

          {arena.code !== 0 && (
            <div className={styles["war-section"]}>
              <div
                className={styles["back-icon"]}
                onClick={() => setArena(initialArena)}
              >
                {"<"}
              </div>
              <p className={styles["war-arena-name"]}>{arena.name}</p>
              <div className={styles["war-section-content"]}>
                <div className={styles["left"]}>
                  <div className={styles["heros-cards"]}>
                    {user.heros
                      .filter((hero) => hero.arenaCode === arena.code)
                      .map((hero) => (
                        <Image
                          key={hero.id}
                          src={hero.heroPath}
                          alt="hero"
                          width={100}
                          height={100}
                          className={`${styles["hero-img"]} ${selectedHero.includes(hero) && styles["disabled"]}`}
                          onClick={() => setSelectedHero((prev) => [...prev, hero])}
                        />
                      ))}
                  </div>
                </div>
                <div className={styles["right"]}>
                  <div className={styles["selected-heros"]}>
                  {selectedHero && selectedHero
                      .map((hero) => (
                        <Image
                          key={hero.heart}
                          src={hero.heroPath}
                          alt="hero"
                          width={50}
                          height={50}
                          className={styles["hero-img"]}
                          onClick={() => setSelectedHero((prev) => prev.filter((h) => h !== hero))}
                        />
                      ))}
                  </div>
                  <div className={styles["war-btn"]} onClick={handleStartWar}>start</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default WarModal;
