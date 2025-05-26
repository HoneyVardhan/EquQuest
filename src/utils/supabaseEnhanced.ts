
import { supabase } from '@/integrations/supabase/client';

export interface QuizResult {
  id: string;
  user_id: string;
  topic_id: string;
  score: number;
  total: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  username?: string;
  avatar_url?: string;
  total_score?: number;
  quiz_count?: number;
  is_premium?: boolean;
  created_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  topic_id: string;
  score: number;
  total: number;
  issued_at: string;
}

export interface BookmarkedQuestion {
  id: string;
  user_id: string;
  question_id: number;
  topic_id: string;
  question_data: any;
  bookmarked_at: string;
}

export interface LeaderboardEntry {
  id: string;
  full_name: string;
  username?: string;
  avatar_url?: string;
  total_score: number;
  quiz_count: number;
  total_quizzes: number;
  current_streak: number;
  rank: number;
  user_id: string;
}

export const getUserQuizResults = async (userId?: string): Promise<QuizResult[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const targetUserId = userId || user?.id;
    if (!targetUserId) return [];

    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', targetUserId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    return [];
  }
};

export const saveQuizResult = async (topicId: string, score: number, total: number): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { error } = await supabase
      .from('quiz_results')
      .insert({
        user_id: user.id,
        topic_id: topicId,
        score,
        total,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  }
};

export const updateLeaderboardStats = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('update_leaderboard_stats', {
      target_user_id: userId
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating leaderboard stats:', error);
    throw error;
  }
};

export const getUserStreak = async (): Promise<number> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { data, error } = await supabase.rpc('get_user_streak', {
      user_uuid: user.id
    });

    if (error) throw error;
    return data || 0;
  } catch (error) {
    console.error('Error fetching user streak:', error);
    return 0;
  }
};

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  try {
    const { data, error } = await supabase
      .from('leaderboard_stats')
      .select(`
        user_id,
        total_score,
        total_quizzes,
        current_streak,
        certificates_count
      `)
      .order('total_score', { ascending: false })
      .limit(50);

    if (error) throw error;

    // Get profile data separately to avoid relation issues
    const userIds = data?.map(item => item.user_id) || [];
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, username, avatar_url')
      .in('id', userIds);

    if (profileError) throw profileError;

    return data?.map((item, index) => {
      const profile = profiles?.find(p => p.id === item.user_id);
      return {
        id: item.user_id,
        user_id: item.user_id,
        full_name: profile?.full_name || 'Anonymous',
        username: profile?.username,
        avatar_url: profile?.avatar_url,
        total_score: item.total_score,
        quiz_count: item.total_quizzes,
        total_quizzes: item.total_quizzes,
        current_streak: item.current_streak,
        rank: index + 1
      };
    }) || [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

export const getUserRank = async (): Promise<number> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { data, error } = await supabase.rpc('get_user_rank', {
      user_id: user.id
    });
    if (error) throw error;
    return data || 0;
  } catch (error) {
    console.error('Error fetching user rank:', error);
    return 0;
  }
};

export const checkPremiumStatus = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data?.is_premium || false;
  } catch (error) {
    console.error('Error checking premium status:', error);
    return false;
  }
};

export const updatePremiumStatus = async (isPremium: boolean): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { error } = await supabase
      .from('profiles')
      .update({ is_premium: isPremium })
      .eq('id', user.id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating premium status:', error);
    throw error;
  }
};

export const getUserCertificates = async (userId?: string): Promise<Certificate[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const targetUserId = userId || user?.id;
    if (!targetUserId) return [];

    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', targetUserId)
      .order('issued_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
};

export const getUserBookmarks = async (): Promise<BookmarkedQuestion[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('bookmarked_questions')
      .select('*')
      .eq('user_id', user.id)
      .order('bookmarked_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
};

export const removeBookmark = async (questionId: number, topicId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('bookmarked_questions')
      .delete()
      .eq('user_id', user.id)
      .eq('question_id', questionId)
      .eq('topic_id', topicId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
};

export const getPublicProfile = async (username: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching public profile:', error);
    return null;
  }
};

export const startQuizSession = async (quizId: string): Promise<string> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('quiz_sessions')
      .insert({
        user_id: user.id,
        quiz_id: quizId,
        start_time: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error starting quiz session:', error);
    throw error;
  }
};

export const endQuizSession = async (sessionId: string, score: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('quiz_sessions')
      .update({
        end_time: new Date().toISOString(),
        score
      })
      .eq('id', sessionId);

    if (error) throw error;
  } catch (error) {
    console.error('Error ending quiz session:', error);
    throw error;
  }
};

export const awardCertificate = async (topicId: string, score: number, total: number): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { error } = await supabase
      .from('certificates')
      .insert({
        user_id: user.id,
        topic_id: topicId,
        score,
        total,
        issued_at: new Date().toISOString()
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error awarding certificate:', error);
    throw error;
  }
};

export const checkEmailVerification = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.email_confirmed_at !== null;
  } catch (error) {
    console.error('Error checking email verification:', error);
    return false;
  }
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const resendEmailVerification = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) throw new Error('No user email found');

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error resending email verification:', error);
    return false;
  }
};
