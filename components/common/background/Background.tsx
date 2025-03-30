"use client";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { RootState } from "@/redux/store/store";

export const backgroundImages = [
  {
    imagePath: "/assets/background/sakura.gif",
    code: 0,
    position: "top",
    backgroundColor: "#a08a71",
    backgroundSize: "150%",
    name: "Lobi"
  },
  {
    imagePath: "/assets/background/forest.gif",
    code: 1,
    position: "",
    backgroundColor: "",
    backgroundSize: "cover",
    name: "Forest Arena"
  },
  {
    imagePath: "/assets/background/bluesky.gif",
    code: 2,
    position: "bottom",
    backgroundColor: "#50a8e8",
    backgroundSize: "contain",
    name: "Sky Arena"
  },
  {
    imagePath: "/assets/background/fire.gif",
    code: 3,
    position: "",
    backgroundColor: "",
    backgroundSize: "cover",
    name: "Fire Arena"
  },
];

const BackgroundFloor = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user);
  const backgroundStyleType = backgroundImages.find(
    (style) => style.code === user.backgroundCode
  );
  const backgroundStyle = {
    backgroundImage: `url(${backgroundStyleType?.imagePath})`,
    backgroundPosition: `${backgroundStyleType?.position}`,
    backgroundColor: `${backgroundStyleType?.backgroundColor}`,
    backgroundSize: `${backgroundStyleType?.backgroundSize}`
  };
  return (
    <div style={backgroundStyle} className={styles["background-image"]}>
      {children}
    </div>
  );
};

export default BackgroundFloor;
