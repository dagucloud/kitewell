// The home page's loop and the figures beside it. The loop is
// public/videos/hero/VIDEO.mp4 (with VIDEO-720.mp4 for phones and a .webp
// poster); the figures and the stills come from the runs it shows, published
// by marketing/promo/scripts/publish-hero.sh in the source repository.
import figures from "../data/hero-runs.json";
import chatEn from "../assets/home/en/chat.webp";
import replayedEn from "../assets/home/en/replayed.webp";
import recoveredEn from "../assets/home/en/recovered.webp";
import chatJa from "../assets/home/ja/chat.webp";
import replayedJa from "../assets/home/ja/replayed.webp";
import recoveredJa from "../assets/home/ja/recovered.webp";

export const hero = figures;

// The stage at the end of each beat the page explains: the chat at work,
// the next run replayed, and the run after the site changed.
export const stills = {
  en: [chatEn, replayedEn, recoveredEn],
  ja: [chatJa, replayedJa, recoveredJa],
};
