/*
  # Create consultation bookings table

  1. New Tables
    - `consultation_bookings`
      - `id` (bigint, primary key) - Unique booking identifier
      - `user_id` (uuid, nullable) - Links to auth.users if user is authenticated
      - `name` (text) - Full name of the person booking
      - `email` (text) - Email address for sending Google Meet link
      - `phone` (text, nullable) - Optional phone number
      - `booking_date` (timestamptz) - Date and time of the consultation
      - `duration_minutes` (integer) - Duration of consultation (default 30)
      - `message` (text, nullable) - Optional message about consultation topic
      - `status` (text) - Booking status: pending, confirmed, completed, cancelled
      - `google_meet_link` (text, nullable) - Google Meet link for the consultation
      - `created_at` (timestamptz) - When the booking was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `consultation_bookings` table
    - Allow users to view their own bookings (by user_id or email)
    - Allow users to insert new bookings
    - Only authenticated users can view their bookings by user_id
    - Unauthenticated users can insert bookings (captured by email)

  3. Indexes
    - Index on user_id for faster queries
    - Index on email for faster queries
    - Index on booking_date for scheduling queries
    - Index on status for filtering active bookings
*/

CREATE TABLE IF NOT EXISTS consultation_bookings (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES auth.users(id) DEFAULT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT NULL,
  booking_date timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 30,
  message text DEFAULT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  google_meet_link text DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings by user_id"
  ON consultation_bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view their own bookings by email"
  ON consultation_bookings
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

CREATE POLICY "Anyone can insert bookings"
  ON consultation_bookings
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_consultation_bookings_user_id 
  ON consultation_bookings(user_id);

CREATE INDEX IF NOT EXISTS idx_consultation_bookings_email 
  ON consultation_bookings(email);

CREATE INDEX IF NOT EXISTS idx_consultation_bookings_booking_date 
  ON consultation_bookings(booking_date);

CREATE INDEX IF NOT EXISTS idx_consultation_bookings_status 
  ON consultation_bookings(status);

CREATE OR REPLACE FUNCTION update_consultation_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER consultation_bookings_updated_at
  BEFORE UPDATE ON consultation_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_consultation_bookings_updated_at();
