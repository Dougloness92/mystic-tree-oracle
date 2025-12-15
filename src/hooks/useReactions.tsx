import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ReactionType = "heart" | "light" | "leaf";

interface ReactionCounts {
  heart: number;
  light: number;
  leaf: number;
}

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("visitor_id", visitorId);
  }
  return visitorId;
};

export const useReactions = (postId: string | undefined) => {
  const [counts, setCounts] = useState<ReactionCounts>({ heart: 0, light: 0, leaf: 0 });
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchReactions();
    }
  }, [postId]);

  const fetchReactions = async () => {
    if (!postId) return;

    const visitorId = getVisitorId();

    // Fetch all reactions for this post
    const { data, error } = await supabase
      .from("likes")
      .select("reaction_type, user_identifier")
      .eq("post_id", postId);

    if (!error && data) {
      const newCounts: ReactionCounts = { heart: 0, light: 0, leaf: 0 };
      let foundUserReaction: ReactionType | null = null;

      data.forEach((like) => {
        const reactionType = like.reaction_type as ReactionType;
        if (newCounts[reactionType] !== undefined) {
          newCounts[reactionType]++;
        }
        if (like.user_identifier === visitorId) {
          foundUserReaction = reactionType;
        }
      });

      setCounts(newCounts);
      setUserReaction(foundUserReaction);
    }
  };

  const toggleReaction = async (type: ReactionType) => {
    if (!postId || isLoading) return;

    setIsLoading(true);
    const visitorId = getVisitorId();

    try {
      if (userReaction === type) {
        // Remove existing reaction
        await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_identifier", visitorId);

        setCounts((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
        setUserReaction(null);
      } else if (userReaction) {
        // Change reaction type - delete old, insert new
        await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_identifier", visitorId);

        await supabase.from("likes").insert({
          post_id: postId,
          user_identifier: visitorId,
          reaction_type: type,
        });

        setCounts((prev) => ({
          ...prev,
          [userReaction]: Math.max(0, prev[userReaction] - 1),
          [type]: prev[type] + 1,
        }));
        setUserReaction(type);
      } else {
        // Add new reaction
        await supabase.from("likes").insert({
          post_id: postId,
          user_identifier: visitorId,
          reaction_type: type,
        });

        setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
        setUserReaction(type);
      }
    } catch (error) {
      console.error("Error toggling reaction:", error);
    }

    setIsLoading(false);
  };

  const totalReactions = counts.heart + counts.light + counts.leaf;

  return { counts, totalReactions, userReaction, toggleReaction, isLoading };
};

// Hook for fetching post stats (reactions + comments) for blog cards
export const usePostStats = (postIds: string[]) => {
  const [stats, setStats] = useState<Record<string, { reactions: number; comments: number }>>({});

  useEffect(() => {
    if (postIds.length > 0) {
      fetchStats();
    }
  }, [postIds.join(",")]);

  const fetchStats = async () => {
    // Fetch reaction counts
    const { data: likesData } = await supabase
      .from("likes")
      .select("post_id")
      .in("post_id", postIds);

    // Fetch approved comment counts
    const { data: commentsData } = await supabase
      .from("comments")
      .select("post_id")
      .in("post_id", postIds)
      .eq("status", "approved");

    const newStats: Record<string, { reactions: number; comments: number }> = {};

    postIds.forEach((id) => {
      newStats[id] = {
        reactions: likesData?.filter((l) => l.post_id === id).length || 0,
        comments: commentsData?.filter((c) => c.post_id === id).length || 0,
      };
    });

    setStats(newStats);
  };

  return stats;
};