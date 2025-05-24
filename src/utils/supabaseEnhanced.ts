import { supabase } from '@/integrations/supabase/client';
import { Question } from '../data/questions/data-science';

export interface QuizSession {
  id: string;
  user_id: string;
  quiz_id: string;
  start_time: string;
  end_time?: string;
  score?: number;
}

export interface QuizResult {
  id: string;
  user_id: string;
  topic_id: string;
  score: number;
  total: number;
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

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  username?: string;
  is_premium?: boolean;
  email_confirmed_at?: string;
  avatar_url?: string;
  onboarding_completed?: boolean;
  preferred_language?: string;
  notification_preferences?: any;
}

export interface BookmarkedQuestion {
  id: string;
  user_id: string;
  question_id: number;
  topic_id: string;
  question_data: Question;
  bookmarked_at: string;
}

export interface QuestionReport {
  id: string;
  user_id: string;
  question_id: number;
  topic_id: string;
  message: string;
  status: 'pending' | 'reviewed' | 'resolved';
  reported_at: string;
}

export interface LifelineUsage {
  id: string;
  user_id: string;
  quiz_session_id?: string;
  question_id: number;
  lifeline_type: 'hint' | 'skip';
  used_at: string;
}

export interface LeaderboardEntry {
  user_id: string;
  total_score: number;
  total_quizzes: number;
  current_streak: number;
  max_streak: number;
  certificates_count: number;
  last_updated: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
}

// Quiz Session Management
export const startQuizSession = async (quizId: string): Promise<string | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('quiz_sessions')
    .insert({
      user_id: user.id,
      quiz_id: quizId,
      start_time: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('Error starting quiz session:', error);
    return null;
  }

  return data.id;
};

export const endQuizSession = async (sessionId: string, score: number): Promise<void> => {
  const { error } = await supabase
    .from('quiz_sessions')
    .update({
      end_time: new Date().toISOString(),
      score
    })
    .eq('id', sessionId);

  if (error) {
    console.error('Error ending quiz session:', error);
  }
};

// Quiz Results Management
export const saveQuizResult = async (
  topicId: string,
  score: number,
  total: number
): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('quiz_results')
    .insert({
      user_id: user.id,
      topic_id: topicId,
      score,
      total,
      created_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error saving quiz result:', error);
  }
};

// Certificate Management
export const awardCertificate = async (
  topicId: string,
  score: number,
  total: number
): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const percentage = (score / total) * 100;
  if (percentage < 80) return false;

  // Check if certificate already exists
  const { data: existingCert } = await supabase
    .from('certificates')
    .select('id')
    .eq('user_id', user.id)
    .eq('topic_id', topicId)
    .single();

  if (existingCert) return false; // Certificate already exists

  const { error } = await supabase
    .from('certificates')
    .insert({
      user_id: user.id,
      topic_id: topicId,
      score,
      total,
      issued_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error awarding certificate:', error);
    return false;
  }

  return true;
};

// Streak Management
export const getUserStreak = async (userId?: string): Promise<number> => {
  const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
  if (!targetUserId) return 0;

  const { data, error } = await supabase
    .rpc('get_user_streak', { user_uuid: targetUserId });

  if (error) {
    console.error('Error fetching user streak:', error);
    return 0;
  }

  return data || 0;
};

// Bookmark Management
export const bookmarkQuestion = async (
  question: Question,
  topicId: string
): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('bookmarked_questions')
    .upsert({
      user_id: user.id,
      question_id: question.id,
      topic_id: topicId,
      question_data: question as any
    }, {
      onConflict: 'user_id,question_id,topic_id'
    });

  if (error) {
    console.error('Error bookmarking question:', error);
    return false;
  }

  return true;
};

export const removeBookmark = async (
  questionId: number,
  topicId: string
): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('bookmarked_questions')
    .delete()
    .eq('user_id', user.id)
    .eq('question_id', questionId)
    .eq('topic_id', topicId);

  if (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }

  return true;
};

export const getUserBookmarks = async (): Promise<BookmarkedQuestion[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('bookmarked_questions')
    .select('*')
    .eq('user_id', user.id)
    .order('bookmarked_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }

  return (data || []).map(item => ({
    ...item,
    question_data: item.question_data as unknown as Question
  }));
};

export const isQuestionBookmarked = async (
  questionId: number,
  topicId: string
): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from('bookmarked_questions')
    .select('id')
    .eq('user_id', user.id)
    .eq('question_id', questionId)
    .eq('topic_id', topicId)
    .single();

  if (error) return false;
  return !!data;
};

// Question Reports
export const reportQuestion = async (
  questionId: number,
  topicId: string,
  message: string
): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('question_reports')
    .insert({
      user_id: user.id,
      question_id: questionId,
      topic_id: topicId,
      message
    });

  if (error) {
    console.error('Error reporting question:', error);
    return false;
  }

  return true;
};

// Lifeline Management
export const useLifeline = async (
  questionId: number,
  lifelineType: 'hint' | 'skip',
  quizSessionId?: string
): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('lifeline_usage')
    .insert({
      user_id: user.id,
      quiz_session_id: quizSessionId,
      question_id: questionId,
      lifeline_type: lifelineType
    });

  if (error) {
    console.error('Error using lifeline:', error);
    return false;
  }

  return true;
};

export const getLifelineUsage = async (questionId: number): Promise<LifelineUsage[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('lifeline_usage')
    .select('*')
    .eq('user_id', user.id)
    .eq('question_id', questionId);

  if (error) {
    console.error('Error fetching lifeline usage:', error);
    return [];
  }

  return data || [];
};

// Leaderboard Management
export const getLeaderboard = async (limit: number = 50, offset: number = 0): Promise<LeaderboardEntry[]> => {
  const { data, error } = await supabase
    .from('leaderboard_stats')
    .select(`
      *,
      profiles!inner(full_name, username, avatar_url)
    `)
    .order('total_score', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  return (data || []).map(entry => ({
    ...entry,
    full_name: entry.profiles?.full_name,
    username: entry.profiles?.username,
    avatar_url: entry.profiles?.avatar_url
  }));
};

export const getUserRank = async (): Promise<number | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .rpc('get_user_rank', { target_user_id: user.id });

  if (error) {
    console.error('Error fetching user rank:', error);
    return null;
  }

  return data;
};

// User Profile Management
export const getUserProfile = async (): Promise<UserProfile | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
};

export const updateUserProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id);

  if (error) {
    console.error('Error updating user profile:', error);
    return false;
  }

  return true;
};

export const getPublicProfile = async (username: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error) {
    console.error('Error fetching public profile:', error);
    return null;
  }

  return data;
};

export const getUserCertificates = async (userId?: string): Promise<Certificate[]> => {
  const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
  if (!targetUserId) return [];

  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', targetUserId)
    .order('issued_at', { ascending: false });

  if (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }

  return data || [];
};

export const getUserQuizResults = async (userId?: string): Promise<QuizResult[]> => {
  const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
  if (!targetUserId) return [];

  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .eq('user_id', targetUserId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quiz results:', error);
    return [];
  }

  return data || [];
};

// Premium and Email Verification Checks
export const checkPremiumStatus = async (): Promise<boolean> => {
  const profile = await getUserProfile();
  return profile?.is_premium || false;
};

export const checkEmailVerification = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  
  return !!user.email_confirmed_at;
};

export const resendEmailVerification = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: user.email
  });

  return !error;
};
