/** Aspect ratio to render the photo at; "" respects the image's natural proportions. */
export type PhotoSize = "1:1" | "4:3" | "16:9" | "9:16" | "";

export type ProfilePhoto = {
  img: string;
  size: PhotoSize;
  /** Shown as a tooltip on hover; "" renders no tooltip. */
  label: string;
};

export const PROFILE_PHOTOS: ProfilePhoto[] = [
  { img: "/images/20260113_213952.jpg", size: "", label: "out there" },

  { img: "/images/20260117_181327.jpg", size: "", label: "helicopt" },
  { img: "/images/20260201_180958.jpg", size: "4:3", label: "" },
  { img: "/images/20260113_203324.jpg", size: "1:1", label: "drinks and all" },
  { img: "/images/20260217_173236.jpg", size: "4:3", label: "great mug" },
  { img: "/images/20260516_181803.jpg", size: "1:1", label: "" },
  { img: "/images/20260316_220857.jpg", size: "4:3", label: "sleepyhead" },
  { img: "/images/20260516_235331.jpg", size: "", label: "cool stuff" },
  { img: "/images/20260623_173230.jpg", size: "", label: "" },

  {
    img: "/images/20260724_084940(1)(1).jpg",
    size: "1:1",
    label: "fiat punto hell yeah",
  },

  {
    img: "/images/20260726_105136.jpg",
    size: "",
    label: "pink floyd-ish cows",
  },

  { img: "/images/20260820_180611.jpg", size: "", label: "on my birthday :)" },
  { img: "/images/20260821_214813.jpg", size: "", label: "rabiscos" },
  { img: "/images/IMG-20260117-WA0015.jpg", size: "", label: "see the sea" },
  {
    img: "/images/IMG_20260511_111736_039.jpg",
    size: "1:1",
    label: "remote work",
  },
  {
    img: "/images/IMG_20260727_193831_639.jpg",
    size: "",
    label: "I love her, but she hates me",
  },
  { img: "/images/20260824_095957.jpg", size: "", label: "linda" },
  {
    img: "/images/IMG_20260815_213409_712.jpg",
    size: "1:1",
    label: "sinuquinha",
  },
];
