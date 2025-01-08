"use client";

import { Globe, Paperclip, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { Textarea } from "www/components/ui/textarea";
import { cn } from "www/lib/utils";
import { useAutoResizeTextarea } from "www/hooks/use-auto-resize-textarea";

const MIN_HEIGHT = 48;
const MAX_HEIGHT = 164;

export default function AiSearch() {
    const [value, setValue] = useState<string>("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: MIN_HEIGHT,
        maxHeight: MAX_HEIGHT,
    });
    const [showSearch, setShowSearch] = useState(true);

    const handleSubmit = () => {
        setValue("");
        adjustHeight(true);
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
                            value={value}
                            placeholder="Search the web..."
                            className="w-full font-sans rounded-xl rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 leading-[1.2]"
                            ref={textareaRef}
                            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                        />
                    </div>

                    <div className="h-12 bg-black/5 dark:bg-white/5 rounded-b-xl">
                        <div className="absolute left-3 bottom-3 flex items-center gap-2">
                            <label className="cursor-pointer rounded-lg p-2 bg-black/5 dark:bg-white/5">
                                <input type="file" className="hidden" />
                                <Paperclip className="w-4 h-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors" />
                            </label>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowSearch(!showSearch);
                                }}
                                className={cn(
                                    "rounded-full transition-all flex items-center gap-2 px-1.5 py-1 border h-8",
                                    showSearch
                                        ? "bg-sky-500/15 border-sky-400 text-sky-500"
                                        : "bg-black/5 dark:bg-white/5 border-transparent text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                                )}
                            >
                                <Globe className="w-4 h-4" />
                                <span className=" ">Web</span>
                            </button>
                        </div>
                        <div className="absolute right-3 bottom-3">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className={cn(
                                    "rounded-lg p-2 transition-colors",
                                    value
                                        ? "bg-sky-500/15 text-sky-500"
                                        : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                                )}
                            >
                                <Sparkles className=" opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
