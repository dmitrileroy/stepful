DROP TABLE IF EXISTS schedule;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS coaches;
DROP TABLE IF EXISTS students;

CREATE TABLE coaches (
  "id" serial PRIMARY KEY, 
  "email" VARCHAR(50) NOT NULL,
  "password" VARCHAR(20) NOT NULL,
  "name" VARCHAR(50) NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE students (
  "id" serial PRIMARY KEY, 
  "email" VARCHAR(50) NOT NULL,
  "password" VARCHAR(20) NOT NULL,
  "name" VARCHAR(50) NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE schedule (
  "id" serial PRIMARY KEY,
  "coach_id" INT NOT NULL, 
  "student_id" INT DEFAULT NULL, 
  "start_time" TIMESTAMPTZ NOT NULL,
  "booking_status" VARCHAR(20) NOT NULL,
  CONSTRAINT fk_student_id FOREIGN KEY(student_id) REFERENCES students(id), 
  CONSTRAINT fk_coach_id FOREIGN KEY(coach_id) REFERENCES coaches(id) 
);

CREATE TABLE feedback (
  "id" serial PRIMARY KEY,
  "schedule_id" INT NOT NULL, 
  "rating" INT NOT NULL,
  "notes": VARCHAR(200),
  CONSTRAINT fk_schedule_id FOREIGN KEY(schedule_id) REFERENCES schedule(id)
);