// components/VisitorAgent.tsx
"use client";

import { Client } from "@langchain/langgraph-sdk";
import { Bot, Maximize2, Minimize2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/src/components/ui/button";
import { useOnClickOutside } from "@/src/hooks/use-on-click-outside";
import { getThreadId, setThreadId } from "@/src/lib/threadCookie";
import { userAgentTokenValidity } from "@/src/lib/userAgentTokenValidity";
import {
  ChatContent,
  Message,
  messagesReducer,
  starterPrompts,
} from "./ChatBot_Component";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const INITIAL_MESSAGE_LIMIT = 5;
const LOGGED_IN_MESSAGE_LIMIT = 20;

export function VisitorAgent() {
  const [messages, dispatch] = useReducer(messagesReducer, []);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [inputDisabled, setInputDisabled] = useState(false);
  const threadRef = useRef<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Initialize the LangChain client using useRef to prevent re-instantiation
  const client = useRef(
    new Client({
      apiUrl: process.env.NEXT_PUBLIC_LANGGRAPH_API_URL,
      defaultHeaders: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.NEXT_PUBLIC_LANGCHAIN_API_KEY,
      },
    }),
  ).current;

  const assistantID = "visitor_agent";

  // Determine the current message limit based on login status
  const userMessageLimit = isLoggedIn
    ? LOGGED_IN_MESSAGE_LIMIT
    : INITIAL_MESSAGE_LIMIT;

  // Login Prompt Modal
  const LoginPrompt = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-11/12 max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-xl font-bold">Login Required</h2>
        <p className="mb-4 text-center">
          Free messages limit reached. Please login to continue.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => {
              router.push("/login");
              setIsOpen(false);
            }}
            className="hover:bg-accent-dark rounded bg-accent px-4 py-2 text-white"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              setInputDisabled(true);
              setShowLoginPrompt(false);
            }}
            className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            Cancel
          </Button>
        </div>
        {isLoggedIn && (
          <p className="mt-4 text-center text-sm text-green-600">
            Thank you for login! Your message limit updated.
          </p>
        )}
      </div>
    </div>
  );

  // Initialize or retrieve the thread ID and load messages
  useEffect(() => {
    const initializeThreadAndMessages = async () => {
      // Check if the user is logged in
      const loggedIn = await userAgentTokenValidity();
      setIsLoggedIn(loggedIn);

      let existingThreadId = getThreadId();
      if (!existingThreadId) {
        try {
          const thread = await client.threads.create();
          existingThreadId = thread.thread_id;
          setThreadId(existingThreadId);
        } catch (error) {}
      }
      threadRef.current = existingThreadId || null;

      // Load messages from localStorage
      if (existingThreadId) {
        const storedMessages = localStorage.getItem(
          `messages_${existingThreadId}`,
        );
        if (storedMessages) {
          try {
            const parsedMessages: Message[] = JSON.parse(storedMessages);
            parsedMessages.forEach((msg) =>
              dispatch({ type: "ADD_MESSAGE", payload: msg }),
            );

            // Set userMessageCount based on messages
            const userCount = parsedMessages.filter(
              (m) => m.role === "user",
            ).length;
            setUserMessageCount(userCount);
            if (userCount >= userMessageLimit) {
              setShowLoginPrompt(true);
              setInputDisabled(true);
            }
          } catch (e) {}
        }
      }
    };

    initializeThreadAndMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  // Listen for login status changes (e.g., after login)
  useEffect(() => {
    const verifyToken = async () => {
      const valid = await userAgentTokenValidity();
      setIsLoggedIn(valid);
      if (valid) {
        // Allow additional messages up to LOGGED_IN_MESSAGE_LIMIT
        setUserMessageCount((prevCount) => {
          // If already above initial limit, keep the current count
          // Otherwise, keep as is to allow additional messages
          return prevCount < INITIAL_MESSAGE_LIMIT ? prevCount : prevCount;
        });
        setInputDisabled(false);
        setShowLoginPrompt(false);
      } else {
        setIsLoggedIn(false);
      }
    };

    verifyToken();

    // Optional: Polling or event listeners for real-time updates
    const interval = setInterval(() => {
      verifyToken();
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  // Close chat when clicking outside
  useOnClickOutside(chatRef, () => setIsOpen(false));

  // Function to scroll chat to the bottom
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        requestAnimationFrame(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        });
      }
    }
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (threadRef.current) {
      localStorage.setItem(
        `messages_${threadRef.current}`,
        JSON.stringify(messages),
      );
    }
  }, [messages]);

  // Function to send a message
  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !threadRef.current || isLoading || inputDisabled)
      return;

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: messageText,
    };

    dispatch({ type: "ADD_MESSAGE", payload: userMessage });
    setInput("");

    // Update the message count correctly
    setUserMessageCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount >= userMessageLimit) {
        setShowLoginPrompt(true);
        setInputDisabled(true);
      }
      return newCount;
    });

    setIsLoading(true);

    try {
      const streamResponse = client.runs.stream(
        threadRef.current,
        assistantID,
        {
          input: { messages: [userMessage] },
          streamMode: "events",
        },
      );

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "",
        isStreaming: true,
      };
      dispatch({ type: "ADD_MESSAGE", payload: assistantMessage });

      const assistantMessageId = assistantMessage.id; // Capture the assistant message's ID

      for await (const chunk of streamResponse) {
        if (
          chunk.event === "events" &&
          chunk.data.event === "on_chat_model_stream" &&
          chunk.data.metadata?.langgraph_node === "query_assistant_llm"
        ) {
          const content = chunk.data.data.chunk.content;
          if (content) {
            dispatch({
              type: "UPDATE_MESSAGE_BY_ID",
              payload: {
                id: assistantMessageId,
                content: content, // Append the new content
              },
            });
            scrollToBottom();
          }
        }
      }

      // Mark streaming as false once done without providing content
      dispatch({
        type: "UPDATE_MESSAGE_BY_ID",
        payload: { id: assistantMessageId, isStreaming: false },
      });
    } catch (error) {
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          id: uuidv4(),
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
        },
      });
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }
  };

  return (
    <div
      ref={chatRef}
      className={`fixed z-50 transition-all duration-300 ease-in-out ${
        isOpen
          ? isFullScreen
            ? "bottom-0 left-0 right-0 top-0 h-[full] w-full px-2  pt-2 ssm:px-8 ssm:pt-8"
            : "bottom-0 left-0 right-0 mx-2 ssm:left-auto ssm:right-2 h-[80vh] max-h-[600px] ssm:h-[500px] ssm:w-96"
          : "bottom-4 right-4 w-auto"
      }`}
    >
      {showLoginPrompt && <LoginPrompt />}
      {!isOpen && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsOpen(true)}
                className="h-14 w-14 rounded-full bg-accent text-white shadow-lg hover:bg-accent/70 hover:animate-in ssm:h-16 ssm:w-16"
                aria-label="Open visitor chat"
              >
                <Bot size={28} className="ssm:h-8 ssm:w-8" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-accent">Open chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {isOpen && (
        <div className="flex h-full w-full flex-col overflow-hidden rounded-t-lg bg-white/50 shadow-2xl backdrop-blur-md sm:rounded-t-2xl">
          <div className="flex items-center justify-between bg-accent px-2 py-1 ssm:px-3">
            <h2 className="text-lg font-semibold text-white">PanaChat</h2>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={toggleFullScreen}
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-gray-700"
                      aria-label={
                        isFullScreen ? "Exit full screen" : "Enter full screen"
                      }
                    >
                      {isFullScreen ? (
                        <Minimize2 size={20} />
                      ) : (
                        <Maximize2 size={20} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-green-600">
                      {isFullScreen ? "Shrink" : "Expand"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-gray-700"
                      aria-label="Close chat"
                    >
                      <X size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-green-600 mr-2">Close</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <ChatContent
            messages={messages}
            sendMessage={sendMessage}
            starterPrompts={starterPrompts}
            handleSubmit={handleSubmit}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            scrollAreaRef={scrollAreaRef}
            scrollToBottom={scrollToBottom}
            userMessageCount={userMessageCount}
            userMessageLimit={userMessageLimit}
            inputDisabled={inputDisabled}
          />
        </div>
      )}
    </div>
  );
}
