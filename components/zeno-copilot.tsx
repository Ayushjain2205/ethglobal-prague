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
import { useState } from "react";
import { client } from "@/lib/client";
import { ConnectButton } from "thirdweb/react";
import { flowEvmTestnet } from "@/lib/flow-evm-testnet";

export function ZenoCopilot() {
  const [hasContent, setHasContent] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#FAFAFC] to-blue-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-white to-blue-50/50 border-r border-blue-100 flex flex-col shadow-xl">
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
      <div className="flex-1 flex flex-col p-8">
        <div className="w-full max-w-2xl mx-auto flex flex-col h-full">
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
                <p className="text-sm text-gray-600 electro-text">Stake Sol</p>
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

          {/* Input at bottom */}
          <div className="pb-8">
            <div className="relative">
              <textarea
                placeholder="Ask me to swap tokens, check portfolio, find trending coins, or explain DeFi protocols... 🚀"
                rows={2}
                className="w-full px-6 py-4 pr-16 text-lg border-2 border-blue-200 rounded-3xl focus:border-[#3366FF] focus:ring-4 focus:ring-[#3366FF]/20 bg-white shadow-lg hover:shadow-xl transition-all duration-300 electro-text resize-none"
                onChange={(e) =>
                  setHasContent(e.target.value.trim().length > 0)
                }
              />
              <CornerDownLeft
                className={`absolute right-5 bottom-5 w-6 h-6 transition-all duration-300 cursor-pointer ${
                  hasContent
                    ? "text-[#3366FF] hover:text-[#7366FF]"
                    : "text-gray-400"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
