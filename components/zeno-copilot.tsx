"use client";
import {
  MessageSquare,
  Vault,
  TrendingUp,
  ArrowUpDown,
  BookOpen,
  PieChart,
  CornerDownLeft,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { client } from "@/lib/client";
import { ConnectButton } from "thirdweb/react";
import { flowEvmTestnet } from "@/lib/flow-evm-testnet";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const markdownComponents: Components = {
  p: ({ children }) => (
    <span style={{ display: "block", margin: 0, marginBottom: 2 }}>
      {children}
    </span>
  ),
  br: () => <br style={{ margin: 0, display: "inline" }} />,
  li: ({ children }) => <li style={{ margin: 0, padding: 0 }}>{children}</li>,
};

export function ZenoCopilot() {
  const [hasContent, setHasContent] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<
    { role: "user" | "zeno"; content: string }[]
  >([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  async function sendToNebula() {
    if (!prompt.trim()) return;
    setLoading(true);
    const userMessage = prompt;
    setChat((prev) => [...prev, { role: "user", content: userMessage }]);
    setPrompt("");
    try {
      const response = await fetch("/api/nebula", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      let zenoMsg = "";
      if (typeof data.response === "string") {
        zenoMsg = data.response;
      } else if (
        data.response &&
        typeof data.response === "object" &&
        data.response.message
      ) {
        zenoMsg = data.response.message;
      } else if (data.message) {
        zenoMsg = data.message;
      } else {
        zenoMsg = JSON.stringify(data, null, 2);
      }
      setChat((prev) => [...prev, { role: "zeno", content: zenoMsg }]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "zeno", content: "Error contacting Nebula AI" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendToNebula();
    }
  }

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, loading]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#FAFAFC] to-blue-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-white to-blue-50/50 border-r border-blue-100 flex flex-col shadow-xl fixed left-0 top-0 bottom-0 h-full z-20">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-12 h-12">
            <Image
              src="/images/zeno-logo.png"
              alt="Zeno Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="electro-title text-xl text-[#1F1F2E] glow-text">
            Zeno
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="flex items-center gap-4 px-4 py-3 text-[#1F1F2E] bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="electro-text">Chats</span>
                <span className="ml-auto text-lg font-bold electro-text">
                  +
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-3 text-[#1F1F2E] hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <Vault className="w-5 h-5" />
                <span className="electro-text">Vaults</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Connect Wallet */}
        <div className="p-4 border-t border-blue-100 flex items-center justify-center">
          <div className="flex items-center px-4 py-3 text-[#1F1F2E] hover:bg-gradient-to-r hover:from-orange-100 hover:to-yellow-100 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <ConnectButton client={client} chains={[flowEvmTestnet]} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-0 sm:p-8 relative ml-0 sm:ml-64 min-h-screen">
        <div className="w-full max-w-3xl mx-auto flex flex-col h-full items-center justify-center">
          {/* Preview UI: show only if no chat yet */}
          {chat.length === 0 && !loading ? (
            <>
              {/* Mascot and Heading */}
              <div className="flex items-center justify-center gap-6 pt-8 pb-12">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#7366FF]/10 to-[#3366FF]/10 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden border-4 border-[#7366FF]/20">
                  <Image
                    src="/images/zeno-mascot.png"
                    alt="Zeno Robot Mascot"
                    width={110}
                    height={110}
                    className="object-contain"
                  />
                </div>
                <h1 className="text-4xl font-bold text-[#1F1F2E] electro-title">
                  How can{" "}
                  <span className="text-transparent bg-gradient-to-r from-[#3366FF] to-[#7366FF] bg-clip-text glow-text">
                    Zeno
                  </span>{" "}
                  help you?
                </h1>
              </div>

              {/* Action Suggestion Tiles */}
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 w-full">
                  {/* Trending Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-3xl p-6 text-left hover:border-[#3366FF] hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-bold text-lg text-[#1F1F2E] electro-title">
                        Trending
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 electro-text">
                      Search the trending tokens
                    </p>
                  </div>

                  {/* Stake Card */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-6 text-left hover:border-[#7366FF] hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <PieChart className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-bold text-lg text-[#1F1F2E] electro-title">
                        Stake
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 electro-text">
                      Stake Sol
                    </p>
                  </div>

                  {/* Trade Card */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-6 text-left hover:border-[#3366FF] hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <ArrowUpDown className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-bold text-lg text-[#1F1F2E] electro-title">
                        Trade
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 electro-text">
                      Swap on Jupiter
                    </p>
                  </div>

                  {/* Knowledge Card */}
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-3xl p-6 text-left hover:border-[#7366FF] hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-bold text-lg text-[#1F1F2E] electro-title">
                        Knowledge
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 electro-text">
                      Get developer docs for protocols
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Chat UI
            <div className="flex flex-col h-full pb-32 w-full items-center justify-center">
              <div className="flex-1 w-full overflow-y-auto px-1 sm:px-0 flex flex-col justify-end">
                {chat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex mb-3 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    } items-end`}
                  >
                    {msg.role === "zeno" && (
                      <div className="mr-2 flex-shrink-0">
                        <Image
                          src="/images/zeno-mascot.png"
                          alt="Zeno Avatar"
                          width={36}
                          height={36}
                          className="rounded-full border-2 border-blue-200 bg-white shadow"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[90%] px-5 py-3 rounded-2xl electro-text text-base shadow-lg break-words overflow-wrap-anywhere
                        ${
                          msg.role === "user"
                            ? "bg-gradient-to-br from-blue-200 to-blue-100 text-right text-[#1F1F2E] mr-2"
                            : "bg-gradient-to-br from-white to-blue-50 border border-blue-200 text-left text-[#3366FF]"
                        }
                      `}
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                        whiteSpace: "pre-line",
                      }}
                    >
                      <ReactMarkdown components={markdownComponents}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                    {msg.role === "user" && (
                      <div className="ml-2 flex-shrink-0">
                        {/* User avatar: simple SVG user icon */}
                        <div className="w-9 h-9 rounded-full border-2 border-blue-200 bg-white shadow flex items-center justify-center">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#3366FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M21 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start mb-3 items-end">
                    <div className="mr-2 flex-shrink-0">
                      <Image
                        src="/images/zeno-mascot.png"
                        alt="Zeno Avatar"
                        width={36}
                        height={36}
                        className="rounded-full border-2 border-blue-200 bg-white shadow"
                      />
                    </div>
                    <div className="max-w-[90%] px-5 py-3 rounded-2xl electro-text text-base bg-gradient-to-br from-white to-blue-50 border border-blue-200 text-left text-[#3366FF] shadow-lg">
                      Thinking...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>
          )}
        </div>
        {/* Prompt box fixed at bottom, centered, and not overlapping sidebar */}
        <div className="fixed bottom-0 left-0 w-full z-30 flex justify-center pointer-events-none">
          <div className="w-full max-w-2xl ml-0 sm:ml-64 px-2 sm:px-0 pb-4 pointer-events-auto">
            <div className="relative">
              <textarea
                placeholder="Ask me to swap tokens, check portfolio, find trending coins, or explain DeFi protocols... 🚀"
                rows={2}
                className="w-full px-6 py-4 pr-16 text-lg border-2 border-blue-200 rounded-3xl focus:border-[#3366FF] focus:ring-4 focus:ring-[#3366FF]/20 bg-white shadow-lg hover:shadow-xl transition-all duration-300 electro-text resize-none"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setHasContent(e.target.value.trim().length > 0);
                }}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <CornerDownLeft
                className={`absolute right-5 bottom-5 w-6 h-6 transition-all duration-300 cursor-pointer ${
                  hasContent && !loading
                    ? "text-[#3366FF] hover:text-[#7366FF]"
                    : "text-gray-400"
                }`}
                onClick={sendToNebula}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
