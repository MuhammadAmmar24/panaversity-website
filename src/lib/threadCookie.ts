import { getCookie, setCookie } from "cookies-next";

export const getThreadId = () => {
  return getCookie("visitor_agent_thread_id") as string | undefined;
};

export const setThreadId = (threadId: string) => {
  setCookie("visitor_agent_thread_id", threadId, {
    maxAge: 24 * 60 * 60,
    path: "/",
  });
};
