import {
  BsEmojiAngryFill,
  BsEmojiFrownFill,
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
  BsEmojiLaughingFill,
} from "react-icons/bs";

const ratingOptions = [
  {
    id: 1,
    label: "Terrible",
    icon: <BsEmojiAngryFill className="feedback__icon" />,
  },
  {
    id: 2,
    label: "Bad",
    icon: <BsEmojiFrownFill className="feedback__icon" />,
  },
  {
    id: 3,
    label: "Okay",
    icon: <BsEmojiNeutralFill className="feedback__icon" />,
  },
  {
    id: 4,
    label: "Good",
    icon: <BsEmojiSmileFill className="feedback__icon" />,
  },
  {
    id: 5,
    label: "Amazing",
    icon: <BsEmojiLaughingFill className="feedback__icon" />,
  },
];

export default ratingOptions;
