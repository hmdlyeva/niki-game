"use client";
import React from "react";
import styles from "./styles.module.scss";
import { IBattleProp } from "../lobi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { endWar } from "@/redux/slice/user/user";

type Props = {
  result: IBattleProp;
  setBattleResult: React.Dispatch<React.SetStateAction<IBattleProp | null>>;
};

const EndOfWarModal = ({ result, setBattleResult }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleWarEnd = () => {
    const warData = [result.result * 2, result.result];
    dispatch(endWar(warData));
    setBattleResult(null);
  };
  return (
    user.start &&
    result.text && (
      <div className={styles["war-modal"]}>
        <div
          className={styles["war-modal-content"]}
          onClick={(e) => e.stopPropagation()}
        >
          <p className={styles["war-modal-content-text"]}>{result.text}</p>
          <div className={styles["war-modal-content-info"]}>
            <p className={styles["war-modal-content-info-text"]}>
              {result.text === "Win"
                ? `You Earned ${result.result * 2} XP and ${
                    result.result
                  } Coins`
                : "Gelen sefer udarsan"}
            </p>
            <button
              className={styles["war-modal-content-info-btn"]}
              onClick={handleWarEnd}
            >
              Lobi
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EndOfWarModal;
