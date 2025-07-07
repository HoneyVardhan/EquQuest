
import { supabase } from '@/integrations/supabase/client';

export interface StreakData {
  current_streak: number;
  max_streak: number;
}

export const updateUserStreak = async (isCorrectAnswer: boolean): Promise<StreakData> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get current streak data
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('current_streak, max_streak')
      .eq('id', user.id)
      .single();

    if (fetchError) throw fetchError;

    let newCurrentStreak: number;
    let newMaxStreak: number;

    if (isCorrectAnswer) {
      // Increase streak by 1 for correct answer
      newCurrentStreak = (profile?.current_streak || 1) + 1;
      newMaxStreak = Math.max(profile?.max_streak || 1, newCurrentStreak);
    } else {
      // Reset streak to 1 for wrong answer
      newCurrentStreak = 1;
      newMaxStreak = profile?.max_streak || 1; // Keep max streak unchanged
    }

    // Update the profile with new streak values
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        current_streak: newCurrentStreak,
        max_streak: newMaxStreak
      })
      .eq('id', user.id);

    if (updateError) throw updateError;

    console.log(`✅ Streak updated: current=${newCurrentStreak}, max=${newMaxStreak}`);
    
    return {
      current_streak: newCurrentStreak,
      max_streak: newMaxStreak
    };
  } catch (error) {
    console.error('❌ Error updating streak:', error);
    // Return default values on error
    return {
      current_streak: 1,
      max_streak: 1
    };
  }
};

export const getCurrentStreak = async (): Promise<StreakData> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { current_streak: 1, max_streak: 1 };

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('current_streak, max_streak')
      .eq('id', user.id)
      .single();

    if (error) throw error;

    return {
      current_streak: profile?.current_streak || 1,
      max_streak: profile?.max_streak || 1
    };
  } catch (error) {
    console.error('❌ Error fetching streak:', error);
    return { current_streak: 1, max_streak: 1 };
  }
};
