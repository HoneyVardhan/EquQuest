
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
  avatar_url?: string;
  total_score?: number;
  quiz_count?: number;
  premium_status?: boolean;
  created_at: string;
}

export const getUserQuizResults = async (): Promise<QuizResult[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', user.id)
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
      user_id: userId
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

export const getLeaderboard = async (): Promise<UserProfile[]> => {
  try {
    const { data, error } = await supabase
      .from('leaderboard_stats')
      .select(`
        user_id,
        total_score,
        total_quizzes,
        current_streak,
        certificates_count,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .order('total_score', { ascending: false })
      .limit(10);

    if (error) throw error;

    return data?.map(item => ({
      id: item.user_id,
      email: '',
      full_name: item.profiles?.full_name || 'Anonymous',
      avatar_url: item.profiles?.avatar_url,
      total_score: item.total_score,
      quiz_count: item.total_quizzes,
      created_at: ''
    })) || [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

export const checkPremiumStatus = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('profiles')
      .select('premium_status')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data?.premium_status || false;
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
      .update({ premium_status: isPremium })
      .eq('id', user.id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating premium status:', error);
    throw error;
  }
};
