import { IHero } from "@/types/common.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  level: number;
  xp: number;
  heros: IHero[];
  warHeros: IHero[];
  arenas: number[];
  coin: number;
  heart: number;
  backgroundCode: number;
  stepCode: number;
  arenaCode: number;
  warCount: number;
  start: boolean;
  info: boolean;
  storeOpen: boolean;
  warOpen: boolean;
  loading: boolean;
}

const initialState: UserState = {
  name: "",
  level: 0,
  xp: 0,
  heros: [],
  warHeros: [],
  arenas: [1],
  coin: 100,
  heart: 0,
  backgroundCode: 0,
  stepCode: 0,
  arenaCode: 1,
  warCount: 0,
  start: false,
  storeOpen: false,
  warOpen: false,
  info: false,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    goToNextStep: (state) => {
      state.stepCode += 1;
    },
    storeActivity: (state, action: PayloadAction<boolean>) => {
      state.storeOpen = action.payload;
    },
    warActivity: (state, action: PayloadAction<boolean>) => {
      state.warOpen = action.payload;
    },
    buyHero: (state, action: PayloadAction<IHero>) => {
      const amout = state.coin - action.payload.price;
      if (amout >= 0) {
        state.coin -= action.payload.price;
        state.heros.push(action.payload);
        state.heart += action.payload.heart;
        if (action.payload.arenaCode > 1) {
          state.arenas.push(action.payload.arenaCode);
        }
      }
    },
    startWar: (state, action: PayloadAction<IHero[]>) => {
      if (action.payload.length > 0) {
        state.backgroundCode = action.payload[0].arenaCode;
        state.warHeros.push(...action.payload);
        state.start = true;
      }
    },
    endWar: (state, action: PayloadAction<number[]>) => {
      state.backgroundCode = 0;
      state.start = false;
      state.warHeros = [];
      state.xp += action.payload[0];
      state.coin += action.payload[1];

      while (state.xp >= (state.level + 1) * 1000) {
        state.xp -= (state.level + 1) * 1000;
        state.level += 1;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const {
  goToNextStep,
  storeActivity,
  warActivity,
  buyHero,
  startWar,
  endWar,
} = userSlice.actions;

export default userSlice.reducer;
