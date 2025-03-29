
-- Create index on implementation_notes.requirement_id to improve query performance
CREATE INDEX IF NOT EXISTS idx_implementation_notes_requirement_id 
ON public.implementation_notes(requirement_id);

-- Create index on control_implementation_notes.control_id for backward compatibility
CREATE INDEX IF NOT EXISTS idx_control_implementation_notes_control_id 
ON public.control_implementation_notes(control_id);

-- Create index on soc2_requirements.control_number for better sorting performance
CREATE INDEX IF NOT EXISTS idx_soc2_requirements_control_number 
ON public.soc2_requirements(control_number);

-- Add updated_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'implementation_notes' 
        AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE public.implementation_notes 
        ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
    END IF;
END
$$;
