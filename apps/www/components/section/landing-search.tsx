"use client";

import { Brain, ChevronDown, Globe, Lightbulb,  Send, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { Textarea } from "www/components/ui/textarea";
import { cn } from "www/lib/utils";
import { useAutoResizeTextarea } from "www/hooks/use-auto-resize-textarea";
import { useClickOutside } from "www/hooks/use-click-outside";

const MIN_HEIGHT = 48;
const MAX_HEIGHT = 164;

const PROJECT_TYPE = [
    { name: "Personal Project", description: "Want to learn" },
    { name: "Buisness idea", description: "want to build" },
];

const AI_MODELS = [
    { name: "GPT-4", description: "The popular kid" },
    { name: "Gemini", description: "Pretty new" },
    { name: "Claude", description: "Yes, the best for coding" },
].map((model) => ({ ...model, icon: <Brain className="w-4 h-4" /> }));

export default function AiSearch() {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        value: "",
        selectedAgent: PROJECT_TYPE[0].name,
        selectedModel: AI_MODELS[0].name,
        isAgentMenuOpen: false,
        isModelMenuOpen: false,
    });

    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: MIN_HEIGHT,
        maxHeight: MAX_HEIGHT,
    });

    const handleSubmit = () => {
        if (!state.value) return;
        const input = {
            value: state.value,
            agent: state.selectedAgent,
            model: state.selectedModel,
        }
        alert(JSON.stringify(input, null, 2));
        adjustHeight(true);
    };

    const agentMenuRef = useRef<HTMLDivElement>(null);
    const modelMenuRef = useRef<HTMLDivElement>(null);

    useClickOutside(agentMenuRef, () => {
        updateState({ isAgentMenuOpen: false });
    });

    useClickOutside(modelMenuRef, () => {
        updateState({ isModelMenuOpen: false });
    });

    const updateState = (updates: Partial<typeof state>) =>
        setState((prev) => ({ ...prev, ...updates }));

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="w-full py-4">
            <div className="relative max-w-xl w-full mx-auto">
                <div className="relative flex flex-col">
                    <div
                        className="overflow-y-auto"
                        style={{ maxHeight: `${MAX_HEIGHT}px` }}
                    >
                        <Textarea
                            id="ai-input-04"
                            value={state.value}
                            placeholder="Search the web..."
                            className="w-full font-sans rounded-xl rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 leading-[1.2]"
                            ref={textareaRef}
                            onKeyDown={handleKeyDown}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setState((prev) => ({ ...prev, value: e.target.value }));
                                adjustHeight();
                            }}
                        />
                    </div>

                    <div className="h-12 bg-black/5 dark:bg-white/5 rounded-b-xl">
                        <div className="absolute left-3 bottom-3 flex items-center gap-2">
                            {/* Agent Selection */}
                            <div className="rounded-xl bg-black/5 dark:bg-white/5">
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateState({
                                                isAgentMenuOpen: !state.isAgentMenuOpen,
                                                isModelMenuOpen: false,
                                            })
                                        }
                                        className="flex items-center p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
                                    >
                                        <Lightbulb className="size-5 dark:text-white" />
                                    </button>

                                    <div className="absolute -bottom-8 left-0 text-nowrap flex items-center gap-1.5 text-[10px] text-muted-foreground dark:text-white/50">
                                        <span>{state.selectedAgent}</span>
                                    </div>

                                    {state.isAgentMenuOpen && (
                                        <div
                                            ref={agentMenuRef}
                                            className="absolute top-12 left-2 mt-1 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-black/10 dark:border-white/10 py-1 w-72 z-10"
                                        >
                                            {PROJECT_TYPE.map((agent) => (
                                                <button
                                                    key={agent.name}
                                                    type="button"
                                                    onClick={() => {
                                                        updateState({
                                                            selectedAgent: agent.name,
                                                            isAgentMenuOpen: false,
                                                        });
                                                    }}
                                                    className="w-full px-3 py-1.5 text-left hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2"
                                                >
                                                    <div>
                                                        <div className="text-sm dark:text-white">
                                                            {agent.name}
                                                        </div>
                                                        <div className="text-xs text-black/50 dark:text-white/50">
                                                            {agent.description}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Model Selection */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateState({
                                            isModelMenuOpen: !state.isModelMenuOpen,
                                            isAgentMenuOpen: false,
                                        })
                                    }
                                    className="flex items-center gap-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg px-2 py-1"
                                >
                                    <Brain className="w-4 h-4 dark:text-white" />
                                    <span className="dark:text-white">
                                        {state.selectedModel}
                                    </span>
                                    <ChevronDown className="w-3 h-3 ml-0.5 dark:text-white" />
                                </button>

                                {state.isModelMenuOpen && (
                                    <div
                                        ref={modelMenuRef}
                                        className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-zinc-800 rounded-md shadow-lg py-1 z-50 border border-black/10 dark:border-white/10"
                                    >
                                        {AI_MODELS.map((model) => (
                                            <button
                                                type="button"
                                                key={model.name}
                                                className="w-full px-3 py-1.5 text-left hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2 text-sm transition-colors dark:text-white"
                                                onClick={() =>
                                                    updateState({
                                                        selectedModel: model.name,
                                                        isModelMenuOpen: false,
                                                    })
                                                }
                                            >
                                                <div className="flex items-center gap-2 flex-1">
                                                    {model.icon}
                                                    <span className=" flex text-nowrap">{model.name}</span>
                                                </div>
                                                <span className="text-xs  line-clamp-1  text-zinc-500 dark:text-zinc-400">
                                                    {model.description}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="absolute right-3 bottom-3">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className={cn(
                                    "rounded-lg p-2 transition-colors",
                                    state.value
                                        ? "bg-sky-500/15 text-sky-500"
                                        : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                                )}
                            >
                                <Sparkles className="opacity-60 " size={16} strokeWidth={2} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}