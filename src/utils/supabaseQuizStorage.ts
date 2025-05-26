
import { supabase } from '@/integrations/supabase/client';
import { Question } from '../data/questions/data-science';
import { getAIExplanationForWrongAnswer } from './aiWrongAnswerHandler';
import { toast } from 'sonner';

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
  ai_explanation?: string;
}

export const saveQuizAttempt = async (
  topicId: string,
  score: number,
  totalQuestions: number
): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: user.id,
        topic_id: topicId,
        score,
        total_questions: totalQuestions,
        streak_day: new Date().toISOString().split('T')[0]
      });

    if (error) throw error;
    console.log('✅ Quiz attempt saved successfully');
  } catch (error) {
    console.error('❌ Error saving quiz attempt:', error);
    throw error;
  }
};

export const saveWrongAnswerToSupabase = async (
  question: Question,
  topicId: string,
  userAnswer?: number
): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    console.log('💾 Saving wrong answer and generating AI explanation...');

    // Generate AI explanation for the wrong answer
    let aiExplanation: string | undefined;
    try {
      aiExplanation = await getAIExplanationForWrongAnswer(question, topicId, userAnswer);
      console.log('🤖 AI explanation generated for wrong answer');
    } catch (error) {
      console.error('❌ Failed to generate AI explanation:', error);
      // Continue without AI explanation
    }

    const wrongAnswerData = {
      user_id: user.id,
      question_id: question.id,
      topic_id: topicId,
      question_data: question as any,
      ...(aiExplanation && { ai_explanation: aiExplanation })
    };

    const { error } = await supabase
      .from('wrong_answers')
      .upsert(wrongAnswerData, {
        onConflict: 'user_id,question_id,topic_id'
      });

    if (error) throw error;
    
    console.log('✅ Wrong answer saved with AI explanation');
    
    if (aiExplanation) {
      toast.success('AI explanation generated for your incorrect answer!');
    }
  } catch (error) {
    console.error('❌ Error saving wrong answer:', error);
    throw error;
  }
};

export const getWrongAnswersFromSupabase = async (): Promise<WrongAnswer[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('wrong_answers')
      .select('*')
      .eq('user_id', user.id)
      .order('answered_on', { ascending: false });

    if (error) throw error;

    console.log(`📊 Retrieved ${data?.length || 0} wrong answers from database`);

    // Cast the Json type back to Question for our interface with proper type conversion
    return (data || []).map(item => ({
      ...item,
      question_data: item.question_data as unknown as Question
    }));
  } catch (error) {
    console.error('❌ Error fetching wrong answers:', error);
    return [];
  }
};

export const removeWrongAnswerFromSupabase = async (
  questionId: number,
  topicId: string
): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('wrong_answers')
      .delete()
      .eq('user_id', user.id)
      .eq('question_id', questionId)
      .eq('topic_id', topicId);

    if (error) throw error;
    console.log('✅ Wrong answer removed from database');
  } catch (error) {
    console.error('❌ Error removing wrong answer:', error);
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
    console.log(`📈 User streak: ${data || 0}`);
    return data || 0;
  } catch (error) {
    console.error('❌ Error fetching user streak:', error);
    return 0;
  }
};

export const getSpecialQuestionFromSupabase = async (): Promise<WrongAnswer | null> => {
  try {
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

    const specialQuestion = eligibleAnswers.sort((a, b) => 
      new Date(a.answered_on).getTime() - new Date(b.answered_on).getTime()
    )[0];

    console.log('🎯 Special question selected for review');
    return specialQuestion;
  } catch (error) {
    console.error('❌ Error getting special question:', error);
    return null;
  }
};

// New function to test Supabase connection
export const testSupabaseConnection = async (): Promise<{
  success: boolean;
  userAuthenticated: boolean;
  error?: string;
}> => {
  try {
    console.log('🔧 Testing Supabase connection...');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.error('❌ Supabase auth error:', authError);
      return { success: false, userAuthenticated: false, error: authError.message };
    }

    const userAuthenticated = !!user;
    console.log(`👤 User authenticated: ${userAuthenticated}`);

    // Test database access
    if (user) {
      const { data, error: dbError } = await supabase
        .from('quiz_attempts')
        .select('count')
        .eq('user_id', user.id)
        .limit(1);

      if (dbError) {
        console.error('❌ Supabase database error:', dbError);
        return { success: false, userAuthenticated, error: dbError.message };
      }
    }

    console.log('✅ Supabase connection test successful');
    return { success: true, userAuthenticated };
    
  } catch (error) {
    console.error('❌ Supabase connection test failed:', error);
    return { success: false, userAuthenticated: false, error: error.message };
  }
};
