import {
  cssAlignRight,
  cssCardClubs,
  cssDatabase,
  cssDebug,
  cssDice3,
  cssEditNoise,
  cssFlag,
  cssGhostCharacter,
  cssGhost,
  cssGift,
  cssGitBranch,
  cssGitCommit,
  cssGitFork,
  cssListTree,
  cssLivePhoto,
  cssPen,
  cssPiano,
  cssRuler,
  cssSmartHomeWashMachine,
  cssSmartphoneChip,
  cssSmartphoneRam,
  cssSmartphoneShake,
  cssSquare,
  cssTrees,
  cssUmbrella,
  cssVoicemailR,
} from '@ng-icons/css.gg';

export interface Icon {
  refreshAt: Date;
  updatedAt: Date;
  slug: string;
  name: string;
}

export function buildIcon(): Icon {
  const icons = Object.keys(ICONS);
  const icon = icons[(Math.floor(Math.random() * icons.length))];

  const date = new Date();
  const offset  = (Math.floor(Math.random() * 5) + 10);
  date.setSeconds(date.getSeconds() + offset);

  return {
    name: icon,
    slug: icon.toLowerCase(),
    refreshAt: date,
    updatedAt: new Date(),
  }
}

export const ICONS = {
  cssAlignRight,
  cssCardClubs,
  cssDatabase,
  cssDebug,
  cssDice3,
  cssEditNoise,
  cssFlag,
  cssGhostCharacter,
  cssGhost,
  cssGift,
  cssGitBranch,
  cssGitCommit,
  cssGitFork,
  cssListTree,
  cssLivePhoto,
  cssPen,
  cssPiano,
  cssRuler,
  cssSmartHomeWashMachine,
  cssSmartphoneChip,
  cssSmartphoneRam,
  cssSmartphoneShake,
  cssSquare,
  cssTrees,
  cssUmbrella,
  cssVoicemailR,
  }
