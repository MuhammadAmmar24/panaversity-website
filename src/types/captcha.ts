import { BaseSyntheticEvent } from "react";

export type SubmitHandler<T> = (data: T, event?: BaseSyntheticEvent) => void | Promise<void>;

export interface CaptchaProps {
    size?: "normal" | "compact" | "flexible";
  }