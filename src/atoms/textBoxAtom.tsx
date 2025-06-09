import { atom } from "jotai";

type TTextBoxAtom = string;

const TextBoxAtom = atom<TTextBoxAtom>("");

export default TextBoxAtom;
