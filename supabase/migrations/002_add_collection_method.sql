-- 002: Add collection_method and parent grouping to tests

-- Collection method: how the sample is collected
alter table tests add column collection_method text not null default 'in-person'
  check (collection_method in ('in-person', 'at-home-blood', 'at-home-saliva', 'at-home-blood-spot'));

-- Optional parent grouping (e.g. AHB panels share a device/collection)
alter table tests add column test_group text;

create index idx_tests_collection_method on tests(collection_method);
create index idx_tests_group on tests(test_group) where test_group is not null;
