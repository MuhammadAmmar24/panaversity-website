import { z } from "zod";

export const TimeSlotSchema = z.object({
  time_slot_name: z.string(),
  is_time_slot_active: z.boolean(),
  time_slot_day: z.string(),
  slot_start_time: z.union([z.string(), z.null()]), 
  slot_end_time: z.union([z.string(), z.null()]),   
  zoom_link: z.union([z.string(), z.null()]),      
  github_link: z.union([z.string(), z.null()]),      
  lectures_playlist: z.union([z.string(), z.null()]),      
  instructor_id: z.number().int(),
  section_id: z.number().int(),
  id: z.number(),
  time_zone: z.string(),
  instructor: z.union([
    z.string(),
    z.object({
      instructor_id: z.string(),
      name: z.string(),
      socials: z.array(z.record(z.any())).optional(),
      is_active: z.boolean(),
    }),
  ]),
});

// Main section schema
export const CourseSectionSchema = z.object({
  section_name: z.string(),
  section_code: z.string(),
  course_id: z.number().int(),
  total_seats: z.number().int().min(0),
  booked_seats: z.number().int().min(0),
  confirmed_seats: z.number().int().min(0),
  start_date: z.union([z.string(), z.null()]), 
  end_date: z.union([z.string(), z.null()]), 
  registration_deadline: z.union([z.string(), z.null()]), 
  is_registration_open: z.boolean(),
  status: z.enum(["Active", "Inactive"]),
  is_virtual: z.boolean(),
  is_active: z.boolean(),
  id: z.number().int(),
  language: z.union([
    z.string(),
    z.object({
      language_name: z.string(),
      is_language_active: z.boolean()
    })
  ]),
  class_time_slots: z.array(TimeSlotSchema).optional(),
  lab_time_slots: z.array(TimeSlotSchema).optional(),
});

export const CourseActiceSectionsResponseSchema = z.array(CourseSectionSchema);

export type CourseActiceSectionsResponse = z.infer<typeof CourseActiceSectionsResponseSchema>;