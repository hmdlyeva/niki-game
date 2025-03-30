"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";
import { RootState } from "@/redux/store/store";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useMemo } from "react";
import { goToNextStep } from "@/redux/slice/user/user";

const infoTexts = [
  {
    stepCode: 0,
    stepText:
      "Salam, xos geldin! Menim adim Nilovskidir ve men senin komekci asistantinam. Oyuna baslamaq istesen next duymesini six. Ele ise oyun baslasin!",
  },
  {
    stepCode: 1,
    stepText:
      "Oyuna xos geldin! burada xeyli oyun var, ustelik men sene komek de edecem. Gel umumi bir baxis kecirek.",
  },
  {
    stepCode: 2,
    stepText:
      "Coinler! en cox qazanmaq istediyimiz coindir. Cunku onlarla qehramanlarimizi guclendire, yeni qehremanlar ala bilerik!",
  },
  {
    stepCode: 3,
    stepText:
      "Urek! muharibe elan etsen sene can lazimdir! Diqqetli ol cunki muharibede qehremanlarin savasacaq ve onlarin cani senin canin olacaq. Qorxma, muharibeden sonra onlar ozlerini sagaldacaqlar, amma muharibe zamani butun canini itirsen...",
  },
  {
    stepCode: 4,
    stepText:
      "Muharibelerden qazandigin xp deyerleri toplandiqca novbeti seviyeye kecmek daha da rahatdir. Hazirda senin 0 xp var. Onu artirmaq ucun muharibe etmelisen. Bunun ucun sene esger lazimdir, gel baxaq",
  },
  {
    stepCode: 5,
    stepText:
      "Esgerlerine buradan baxa bilersen. Hazirda esgerimiz yoxdur. Hmm... Belke Dukanda var? Dukan haradadir?",
  },
  {
    stepCode: 6,
    stepText:
      "Budur! Artiq bizim dukanimiz var. Buradan yeni ve guclu qehremanlar ala, onlari guclendire bilersen! Cox sebirsizlendim, muharibe elan etmek isteyirem!",
  },
  {
    stepCode: 7,
    stepText:
      "Arena bizi gozleyir! Ozumuze bir qehreman secek ve muharibeye baslayaq.",
  },
  {
    stepCode: 8,
    stepText:
      "Ilk once magazadan ozune gozel bir esger sec, daha sonra muharibeye baslaya bileceksen.",
  },
  {
    stepCode: 9,
    stepText:
      "Ne gozel qehremanimiz var! Indi bu guclu qehremani goturek ve muharibeye gedek.",
  },
];

const infoGirls = [
  {
    infoGirlPath: "/assets/info/info0.png",
    code: 0,
    position: "bottom",
  },
  {
    infoGirlPath: "/assets/info/info1.png",
    code: 1,
    position: "bottom",
  },
  {
    infoGirlPath: "/assets/info/info2.png",
    code: 2,
    position: "top",
  },
  {
    infoGirlPath: "/assets/info/info3.png",
    code: 3,
    position: "bottom",
  },
];

const InfoGirlModal = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const infoGirlType = useMemo(() => {
    return infoGirls.find((girl) => girl.code === user.backgroundCode);
  }, [user.backgroundCode]);

  const infoTextType = useMemo(() => {
    return infoTexts.find((text) => text.stepCode === user.stepCode);
  }, [user.stepCode]);

  const handleNextStep = () => {
    dispatch(goToNextStep());
  };

  return (
    infoGirlType &&
    infoTextType && (
      <div className={styles[`info-modal-${infoGirlType?.position}`]}>
        <div className={styles["info-modal"]}>
          <div className={styles["info-modal-girl"]}>
            <Image
              src={infoGirlType?.infoGirlPath}
              alt="info-girl"
              width={100}
              height={100}
            />
          </div>
          <div className={styles["info-modal-text"]}>
            <p className={styles["info-modal-text-msg"]}>
            `&quot;`
              <TypeAnimation
                key={user.stepCode}
                sequence={[infoTextType?.stepText]}
                wrapper="span"
                speed={50}
              />
              `&quot;`
            </p>
            {((user.stepCode !== 8 && user.stepCode !== 9) ||
              (user.stepCode === 8 && user.heros.length === 1) ||
              (user.stepCode === 9 && user.warCount > 0)) && (
              <button
                className={styles["info-modal-text-btn"]}
                onClick={handleNextStep}
              >
                next -
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default InfoGirlModal;
