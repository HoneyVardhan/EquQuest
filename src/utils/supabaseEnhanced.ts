
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
