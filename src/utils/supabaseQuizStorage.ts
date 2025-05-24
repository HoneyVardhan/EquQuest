
import { supabase } from '@/integrations/supabase/client';
import { Question } from '../data/questions/data-science';

export interface QuizAttempt {
  id: string;
  user_id: string;
  topic_id: string;
  score: number;
  total_questions: number;
  completed_at: string;
  streak_day: string;
}

export interface WrongAnswer {
  id: string;
  user_id: string;
  question_id: number;
  topic_id: string;
  question_data: Question;
  answered_on: string;
}

export const saveQuizAttempt = async (
  topicId: string,
  score: number,
  totalQuestions: number
): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('quiz_attempts')
    .insert({
      user_id: user.id,
      topic_id: topicId,
      score,
      total_questions: totalQuestions,
      streak_day: new Date().toISOString().split('T')[0]
    });

  if (error) {
    console.error('Error saving quiz attempt:', error);
  }
};

export const saveWrongAnswerToSupabase = async (
  question: Question,
  topicId: string
): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('wrong_answers')
    .upsert({
      user_id: user.id,
      question_id: question.id,
      topic_id: topicId,
      question_data: question
    }, {
      onConflict: 'user_id,question_id,topic_id'
    });

  if (error) {
    console.error('Error saving wrong answer:', error);
  }
};

export const getWrongAnswersFromSupabase = async (): Promise<WrongAnswer[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('wrong_answers')
    .select('*')
    .eq('user_id', user.id)
    .order('answered_on', { ascending: false });

  if (error) {
    console.error('Error fetching wrong answers:', error);
    return [];
  }

  return data || [];
};

export const removeWrongAnswerFromSupabase = async (
  questionId: number,
  topicId: string
): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('wrong_answers')
    .delete()
    .eq('user_id', user.id)
    .eq('question_id', questionId)
    .eq('topic_id', topicId);

  if (error) {
    console.error('Error removing wrong answer:', error);
  }
};

export const getUserStreak = async (): Promise<number> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { data, error } = await supabase.rpc('get_user_streak', {
    user_uuid: user.id
  });

  if (error) {
    console.error('Error getting user streak:', error);
    return 0;
  }

  return data || 0;
};

export const getSpecialQuestionFromSupabase = async (): Promise<WrongAnswer | null> => {
  const wrongAnswers = await getWrongAnswersFromSupabase();
  if (wrongAnswers.length === 0) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eligibleAnswers = wrongAnswers.filter(wa => {
    const answeredDate = new Date(wa.answered_on);
    answeredDate.setHours(0, 0, 0, 0);
    return answeredDate < today;
  });

  if (eligibleAnswers.length === 0) return null;

  return eligibleAnswers.sort((a, b) => 
    new Date(a.answered_on).getTime() - new Date(b.answered_on).getTime()
  )[0];
};
