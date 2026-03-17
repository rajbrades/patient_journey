-- 004: Add not_for_you transparency field to tests
-- Stores a short, honest limitation statement for each test

alter table tests add column not_for_you text;
