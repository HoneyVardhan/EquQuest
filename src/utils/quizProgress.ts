
import { supabase } from '@/integrations/supabase/client';

export interface QuizProgress {
  user_id: string;
  topic_id: string;
  current_question: number;
  answers: (number | null)[];
}

export const saveQuizProgress = async (
  topicId: string,
  currentQuestion: number,
  answers: (number | null)[]
): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('quiz_progress')
      .upsert({
        user_id: user.id,
        topic_id: topicId,
        current_question: currentQuestion,
        answers: answers
      }, {
        onConflict: 'user_id,topic_id'
      });

    if (error) throw error;
    console.log('✅ Quiz progress saved successfully');
  } catch (error) {
    console.error('❌ Error saving quiz progress:', error);
    throw error;
  }
};

export const loadQuizProgress = async (topicId: string): Promise<QuizProgress | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('quiz_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('topic_id', topicId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      throw error;
    }

    if (!data) {
      console.log('📝 No saved progress found, starting fresh');
      return null;
    }

    console.log('📂 Loaded saved progress:', data);
    return {
      user_id: data.user_id,
      topic_id: data.topic_id,
      current_question: data.current_question,
      answers: data.answers || []
    };
  } catch (error) {
    console.error('❌ Error loading quiz progress:', error);
    return null;
  }
};

export const clearQuizProgress = async (topicId: string): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('quiz_progress')
      .delete()
      .eq('user_id', user.id)
      .eq('topic_id', topicId);

    if (error) throw error;
    console.log('🗑️ Quiz progress cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing quiz progress:', error);
    throw error;
  }
};
