"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Image from "next/image";
import { IEnemy, IHero } from "@/types/common.type";
import EndOfWarModal from "../endOfWar";

export type IBattleProp = {
  result: number;
  text: string;
};

const enemies = [
  {
    id: 1,
    arenaCode: 1,
    heart: 50,
    attack: 10,
    attackTime: 2,
    heroPath: "/assets/enemy/enemy11.png",
  },
  {
    id: 2,
    arenaCode: 1,
    heart: 75,
    attack: 15,
    attackTime: 3,
    heroPath: "/assets/enemy/enemy12.png",
  },
  {
    id: 3,
    arenaCode: 2,
    heart: 100,
    attack: 20,
    attackTime: 3,
    heroPath: "/assets/enemy/enemy21.png",
  },
  {
    id: 4,
    arenaCode: 2,
    heart: 125,
    attack: 25,
    attackTime: 4,
    heroPath: "/assets/enemy/enemy22.png",
  },
  {
    id: 5,
    arenaCode: 3,
    heart: 150,
    attack: 30,
    attackTime: 3,
    heroPath: "/assets/enemy/enemy31.png",
  },
  {
    id: 6,
    arenaCode: 3,
    heart: 175,
    attack: 40,
    attackTime: 4,
    heroPath: "/assets/enemy/enemy32.png",
  },
  {
    id: 7,
    arenaCode: 3,
    heart: 200,
    attack: 45,
    attackTime: 5,
    heroPath: "/assets/enemy/enemy33.png",
  },
];

const Lobi = () => {
  const user = useSelector((state: RootState) => state.user);
  const [randomEnemies, setRandomEnemies] = useState<IEnemy[]>([]);
  const enemiesRef = useRef(randomEnemies); 
  const [heroAttacks, setHeroAttacks] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [heroes, setHeroes] = useState<IHero[]>(user.warHeros);
  const heroesRef = useRef(heroes); 
  const [enemyAttacks, setEnemyAttacks] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [battleResult, setBattleResult] = useState<IBattleProp | null>(null);

  useEffect(() => {
    setHeroes(user.warHeros);
  }, [user.warHeros]);

  useEffect(() => {
    const filteredEnemies = enemies.filter(
      (enemy) => enemy.arenaCode === user.backgroundCode
    );

    const enemyCount = Math.min(
      user.level > 1 ? filteredEnemies.length : filteredEnemies.length - 1,
      Math.floor(Math.random() * 3) + 1
    );
    const shuffledEnemies = filteredEnemies.sort(() => 0.5 - Math.random());
    setRandomEnemies(shuffledEnemies.slice(0, enemyCount));
  }, [user.backgroundCode]);

  useEffect(() => {
    if (user.start && heroes.length === 0) {
      setBattleResult({
        result: 0,
        text: "Defeat",
      });
    } else if (user.start && randomEnemies.length === 0) {
      const result = heroes.reduce((sum, hero) => sum + hero.heart, 0);
      setBattleResult({
        result: result,
        text: "Win",
      });
    }
  }, [heroes, randomEnemies]);

  const enemyAttack = (damage: number) => {
    setHeroes((prevHeroes) => {
      if (prevHeroes.length === 0) return prevHeroes;

      return prevHeroes
        .map((hero, index) =>
          index === 0 ? { ...hero, heart: hero.heart - damage } : hero
        )
        .filter((hero) => hero.heart > 0);
    });
  };

  const heroAttack = (damage: number) => {
    setRandomEnemies((prevEnemies) => {
      if (prevEnemies.length === 0) return prevEnemies;

      return prevEnemies
        .map((enemy, index) =>
          index === 0 ? { ...enemy, heart: enemy.heart - damage } : enemy
        )
        .filter((enemy) => enemy.heart > 0);
    });
  };

  useEffect(() => {
    if (battleResult || randomEnemies.length === 0 || heroes.length === 0) return;

    const heroIntervals = heroes.map((hero) => {
      return setTimeout(function heroAttackLoop() {
        setHeroAttacks((prev) => ({ ...prev, [hero.id]: true }));

        if (heroesRef.current.length > 0 && enemiesRef.current.length > 0) {
          heroAttack(hero.attack);
          const heroAttackSound = new Audio("/assets/sounds/hero-attack.mp3");
          heroAttackSound.play();
        }

        setTimeout(() => {
          setHeroAttacks((prev) => ({ ...prev, [hero.id]: false }));
          if (!battleResult  && randomEnemies.length > 0) {
            setTimeout(heroAttackLoop, (hero.attackTime - 1) * 1000);
          }
        }, 1000);
      }, hero.attackTime * 1000);
    });

    const enemyIntervals = randomEnemies.map((enemy) => {
      return setTimeout(function enemyAttackLoop() {
        setEnemyAttacks((prev) => ({ ...prev, [enemy.id]: true }));

        if (heroesRef.current.length > 0 && enemiesRef.current.length > 0) {
          enemyAttack(enemy.attack);
          const enemyAttackSound = new Audio("/assets/sounds/enemy-attack.mp3");
          enemyAttackSound.play();
        }

        setTimeout(() => {
          setEnemyAttacks((prev) => ({ ...prev, [enemy.id]: false }));
          if (!battleResult  && heroes.length > 0) {
            setTimeout(enemyAttackLoop, (enemy.attackTime - 1) * 1000);
          }
        }, 1000);
      }, enemy.attackTime * 1000);
    });

    return () => {
      heroIntervals.forEach(clearTimeout);
      enemyIntervals.forEach(clearTimeout);
    };
  }, [heroes, randomEnemies, battleResult]);

  useEffect(() => {
    enemiesRef.current = randomEnemies;
    heroesRef.current = heroes;
  }, [randomEnemies, heroes]);

  return (
    <div className={styles["lobi"]}>
      <div
        className={`${styles["lobi-content"]} ${
          user.backgroundCode !== 0 && styles["war-lobi-content"]
        }`}
      >
        <div
          className={`${styles["hero-cards"]} ${
            user.backgroundCode !== 0 && styles["war-card-template"]
          }`}
        >
          {(user.backgroundCode === 0 ? user.heros : heroes).map((hero) => (
            <div
              key={hero.id}
              className={`${styles["hero-card"]} ${
                hero.heart <= 0 && styles["disabled"]
              }`}
            >
              {user.backgroundCode !== 0 && heroAttacks[hero.id] && (
                <Image
                  src="/assets/weapon/hero-weapon.png"
                  alt="hero"
                  width={100}
                  height={100}
                  className={styles["hero-weapon-img"]}
                />
              )}
              <Image
                src={hero.heroPath}
                alt="hero"
                width={100}
                height={100}
                className={styles["hero-img"]}
              />
              <div className={styles["hero-info"]}>
                <div className={styles["heart"]}>
                  <Image
                    src="/assets/common/heart.png"
                    alt="hero"
                    width={24}
                    height={24}
                  />
                  {hero.heart}
                </div>
                <div className={styles["weapon"]}>
                  <Image
                    src="/assets/common/weapon.png"
                    alt="hero"
                    width={24}
                    height={24}
                  />
                  {hero.attack}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles["enemy-cards"]}>
          {user.backgroundCode !== 0 &&
            randomEnemies.map((enemy) => (
              <div
                key={enemy.heroPath}
                className={`${styles["enemy-card"]} ${
                  randomEnemies.length === 1 && styles["end"]
                } ${enemy.heart <= 0 && styles["disabled"]}`}
              >
                {enemyAttacks[enemy.id] && (
                  <Image
                    src="/assets/weapon/enemy-weapon.png"
                    alt="hero"
                    width={100}
                    height={100}
                    className={styles["enemy-weapon-img"]}
                  />
                )}
                <div className={styles["enemy-info"]}>{enemy.heart}</div>
                <Image
                  src={enemy.heroPath}
                  alt="hero"
                  width={100}
                  height={100}
                  className={styles["enemy-img"]}
                />
              </div>
            ))}
        </div>
      </div>

      {battleResult && <EndOfWarModal result={battleResult} setBattleResult={setBattleResult}/>}
    </div>
  );
};

export default Lobi;
