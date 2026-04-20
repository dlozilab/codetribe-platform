import { supabase } from '../config/supabaseClient.js';

export const createCourse = async (courseData) => {
  const { data, error } = await supabase
    .from('courses')
    .insert([courseData])
    .select();
    if (error) throw error;
    return data[0];
};

export const getAllCourses = async () => {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) throw error;
  return data;
};

export const getCourseById = async (id) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const updateCourse = async (id, courseData) => {
  const { data, error } = await supabase
    .from('courses')
    .update(courseData)
    .eq('id', id)
    .select();  
    if (error) throw error;
    return data[0];
};


export const deleteCourse = async (id) => {
  const { data, error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id)
    .select();  
    if (error) throw error;
    return data[0];
};