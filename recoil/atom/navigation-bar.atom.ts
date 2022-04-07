import { atom } from 'recoil';

type navigationBarStateType = {
  display: boolean,
}

export const navigationBarStateAtom = atom<navigationBarStateType>({
  key: 'navigation-bar-state',
  default: {
    display: false,
  }
});