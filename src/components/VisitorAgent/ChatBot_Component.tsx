// components/ChatBot_Component.tsx
"use client";

import React, { memo } from "react";
import { MessagesSquare, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import Image from "next/image";
import logo from "../../../public/logos/logoIcon.webp";

// Define the Message type with a unique identifier
export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
};

// Starter prompts for the chat
export const starterPrompts = [
  "What is Panaversity?",
  "What courses Panaversity offers?",
  "What is the fee structure?",
];

// Define the state and actions for useReducer
export type MessagesState = Message[];

export type Action =
  | { type: "ADD_MESSAGE"; payload: Message }
  | {
      type: "UPDATE_MESSAGE_BY_ID";
      payload: { id: string; content?: string; isStreaming?: boolean };
    };

// Reducer function to manage messages state
export const messagesReducer = (
  state: MessagesState,
  action: Action,
): MessagesState => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [...state, action.payload];

    case "UPDATE_MESSAGE_BY_ID":
      return state.map((msg) =>
        msg.id === action.payload.id
          ? {
              ...msg,
              content:
                action.payload.content !== undefined
                  ? (msg.content || "") + action.payload.content
                  : msg.content,
              isStreaming: action.payload.isStreaming ?? msg.isStreaming,
            }
          : msg,
      );

    default:
      return state;
  }
};

// Memoized component to render individual message content
export const MessageContent = memo(({ message }: { message: Message }) => {
  const isStreamingMessage =
    message.isStreaming && message.role === "assistant";

  if (isStreamingMessage && message.content === "") {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 animate-bounce rounded-md bg-accent" />
        <div className="h-2 w-2 animate-bounce rounded-md bg-accent delay-100" />
        <div className="h-2 w-2 animate-bounce rounded-md bg-accent delay-200" />
      </div>
    );
  }

  // Ensure combinedContent is a properly formatted string
  const combinedContent = message.content + (isStreamingMessage ? "▊" : "");

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => (
          <a
            {...props}
            className="text-green-400 underline hover:text-green-600"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
        p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
        ul: ({ node, ...props }) => (
          <ul {...props} className="mb-2 ml-4 list-disc" />
        ),
        ol: ({ node, ...props }) => (
          <ol {...props} className="mb-2 ml-4 list-decimal" />
        ),
        li: ({ node, ...props }) => <li {...props} className="mb-1" />,
      }}
    >
      {combinedContent}
    </ReactMarkdown>
  );
});

MessageContent.displayName = "MessageContent";

// Memoized component to render the chat content
export const ChatContent = memo(
  ({
    messages,
    sendMessage,
    starterPrompts,
    handleSubmit,
    input,
    setInput,
    isLoading,
    scrollAreaRef,
    scrollToBottom,
    userMessageCount,
    userMessageLimit,
    inputDisabled,
  }: {
    messages: Message[];
    sendMessage: (msg: string) => void;
    starterPrompts: string[];
    handleSubmit: (e: React.FormEvent) => void;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    scrollAreaRef: React.RefObject<HTMLDivElement>;
    scrollToBottom: () => void;
    userMessageCount: number;
    userMessageLimit: number;
    inputDisabled: boolean;
  }) => (
    <div className="relative flex h-full flex-col">
      {/* Messages Area - Scrollable */}
      <div className="absolute inset-0 bottom-[80px] overflow-hidden">
        <ScrollArea className="h-full px-4" ref={scrollAreaRef}>
          {messages.length !== 0 ? (
            <div className="py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.role === "user"
                      ? "justify-end text-left"
                      : "justify-start text-left"
                  }`}
                >
                  {message.role !== "user" && (
                    <Image
                      src={logo}
                      alt="Panaversity Logo"
                      className="h-8 w-8"
                    />
                  )}

                  <div
                    className={`inline-block max-w-[85%] rounded-2xl px-3 py-2 shadow-md ${
                      message.role === "user"
                        ? "mt-2 bg-gray-200 text-sm font-light text-gray-900"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="prose prose-sm max-w-none">
                      <MessageContent message={message} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-between gap-y-2 py-4">
              <div className="flex items-center gap-x-2 border-b">
                <Image
                  src={logo}
                  alt="Panaversity Logo"
                  className="h-16 w-16"
                />
                <h5 className="font-sans text-3xl font-bold">Greetings! 👋</h5>
              </div>
              <p className="pb-4 text-base font-semibold text-gray-800">
                Ready to dive in? Choose a question to get started!
              </p>
              <div className="space-y-3">
                {starterPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    className="h-auto w-full justify-start whitespace-normal rounded-md bg-white text-left text-sm font-normal text-gray-900 shadow-lg"
                    onClick={() => sendMessage(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-2">
        {messages.length !== 0 && (
          <div className="mb-2 flex items-center gap-x-2 rounded-md px-2 text-sm text-gray-700">
            <MessagesSquare />
            <p>
              {userMessageCount} / {userMessageLimit}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setTimeout(scrollToBottom, 0)}
            className="flex-grow border bg-gray-100 text-gray-800 focus-visible:ring-[0.5px] focus-visible:ring-accent"
            autoFocus
            disabled={inputDisabled || isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim() || inputDisabled}
            className="rounded-md bg-green-500 text-white hover:bg-green-600"
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Send size={18} />
            )}
          </Button>
        </form>
      </div>
    </div>
  ),
);

ChatContent.displayName = "ChatContent";
