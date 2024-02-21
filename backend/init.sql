CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE ticket (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    employee_name TEXT,
    resolution_description TEXT
);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.modified_at = CURRENT_TIMESTAMP;
   RETURN NEW;   
END;
$$ language 'plpgsql';

CREATE TRIGGER update_modified_at BEFORE UPDATE
ON ticket FOR EACH ROW
EXECUTE FUNCTION update_modified_column();