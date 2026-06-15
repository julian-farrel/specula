"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Send } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import type { Comment } from "@/lib/data"

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
    const [liked, setLiked] = useState(false)
    const [showReplyInput, setShowReplyInput] = useState(false)
    const [replyText, setReplyText] = useState("")

    return (
        <div className={`${depth > 0 ? "ml-8 border-l-2 border-border/40 pl-4" : ""}`}>
            <div className="flex gap-3 py-3">
                <Avatar className="h-8 w-8 shrink-0 border border-border/50">
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{comment.text}</p>
                    <div className="flex items-center gap-3 pt-1">
                        <button
                            onClick={() => setLiked(!liked)}
                            className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-[var(--positive)]" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <Heart className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} />
                            {comment.likes + (liked ? 1 : 0)}
                        </button>
                        <button
                            onClick={() => setShowReplyInput(!showReplyInput)}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <MessageCircle className="h-3.5 w-3.5" />
                            Reply
                        </button>
                    </div>
                    {showReplyInput && (
                        <div className="flex gap-2 pt-2">
                            <Textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                className="min-h-[60px] resize-none bg-secondary border-input text-sm"
                            />
                            <Button
                                size="icon"
                                className="shrink-0 h-[60px] w-10"
                                disabled={!replyText.trim()}
                                onClick={() => { setReplyText(""); setShowReplyInput(false) }}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            {comment.replies?.map((reply) => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
        </div>
    )
}

export function CommentSection({ comments: initialComments }: { comments: Comment[] }) {
    const [comments, setComments] = useState(initialComments)
    const [newComment, setNewComment] = useState("")
    const { user } = useAuth()

    const handlePost = () => {
        if (!newComment.trim()) return
        const comment: Comment = {
            id: "c_" + Date.now(),
            author: user?.name || "Anonymous",
            avatar: user ? `https://avatar.vercel.sh/${user.email}` : "https://avatar.vercel.sh/anon",
            text: newComment,
            timestamp: "Just now",
            likes: 0,
        }
        setComments([comment, ...comments])
        setNewComment("")
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Discussion
                <span className="text-sm font-normal text-muted-foreground">({comments.length})</span>
            </h3>

            {/* Post box */}
            <div className="rounded-lg border border-border/60 bg-card p-4 space-y-3">
                <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={user ? "Share your analysis..." : "Log in to comment"}
                    disabled={!user}
                    className="min-h-[80px] resize-none bg-secondary border-input"
                />
                <div className="flex justify-end">
                    <Button
                        onClick={handlePost}
                        disabled={!user || !newComment.trim()}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <Send className="h-4 w-4 mr-2" />
                        Post
                    </Button>
                </div>
            </div>

            {/* Comments list */}
            <div className="divide-y divide-border/40">
                {comments.map((c) => (
                    <CommentItem key={c.id} comment={c} />
                ))}
            </div>
        </div>
    )
}
