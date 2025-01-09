// components/VisitorAgent.tsx
"use client";

import React, { useEffect, useReducer, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Client } from "@langchain/langgraph-sdk";
import { Bot } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";
import { useOnClickOutside } from "@/src/hooks/use-on-click-outside";
import { getThreadId, setThreadId } from "@/src/lib/threadCookie";
import { userAgentTokenValidity } from "@/src/lib/userAgentTokenValidity";
import {
  ChatContent,
  Message,
  messagesReducer,
  starterPrompts,
} from "./ChatBot_Component";

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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

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
          You have reached the daily message limit. Please login to continue.
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
            You are currently logged in and can send more messages.
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

  // Render for mobile devices
  if (isMobile) {
    return (
      
      <>
        {showLoginPrompt && <LoginPrompt />}
        <Button
          onClick={() => setIsOpen(true)}
          className="hover:animate-in fixed bottom-4 right-4  rounded-full bg-accent text-white shadow-lg"
          aria-label="Open visitor support chat"
        >
          <Bot size={16}  />
        </Button>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="h-[90vh]">
            <DrawerHeader className="border-b border-accent bg-accent ">
              <DrawerTitle className="text-white">Panaversity Visitor Assistant</DrawerTitle>
              <DrawerClose />
            </DrawerHeader>
            <div className="flex h-[calc(90vh-65px)] flex-col overflow-hidden">
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
                inputDisabled={inputDisabled} // Pass the new prop
              />
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Render for desktop and larger devices
  return (
    <div
      ref={chatRef}
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "w-96" : "w-auto"
      }`}
    >
      {showLoginPrompt && <LoginPrompt />}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="hover:animate-in  h-16 w-16 rounded-full bg-accent text-white shadow-lg"
          aria-label="Open visitor chat"
        >
          <Bot size={48} />
        </Button>
      )}
      {isOpen && (
        <div className="flex flex-col h-[500px] overflow-hidden rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-md shadow-2xl ">
          <div className="flex items-center justify-between border-b border-gray-200 bg-accent p-1 ">
            <h2 className="px-2 text-lg font-semibold text-white text-center ">
            Panaversity Visitor Assistant
            </h2>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </Button>
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
            inputDisabled={inputDisabled} // Pass the new prop
          />
        </div>
      )}
    </div>
  );
}
