import { BaseSyntheticEvent } from "react";

export type SubmitHandler<T> = (data: T, event?: BaseSyntheticEvent) => void | Promise<void>;

export interface CaptchaProps {
    size?: "normal" | "compact" | "flexible";
  }

export type TurnstileWindow = typeof window & {
  turnstile?: {
    render: (
      container: Element,
      options: {
        sitekey: string;
        callback?: string;
        theme?: string;
        size?: string;
      }
    ) => void;
    reset?: (widgetId: string) => void;
  };
};