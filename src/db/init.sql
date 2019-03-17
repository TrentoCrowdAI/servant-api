
-- data: {
--  name: <string>, 
--	description: <string>, 
--	numVotes: <number>,  // votes per item
--	maxVotes: <number>,  // max votes per worker
--	reward: <number>,        // how much we pay per vote
--	items_csv: <string>,  // path to items file in the server
--	items_gold_csv: <string>,   //   path to gold items file in the server
--	design: {
--    markup: <string>,
--		javascript: <string>,
--		css: <string>
--  },
--	instructions,   // html/text content for the instructions of the task
--	platform: <> // to be defined better
-- }
CREATE TABLE job (
  id bigserial NOT NULL,
  created_at timestamp,
  updated_at timestamp,
  deleted_at timestamp,
  id_requester bigint, -- to be NOT NULL
  data JSONB,
  CONSTRAINT pk_job PRIMARY KEY (id)
);