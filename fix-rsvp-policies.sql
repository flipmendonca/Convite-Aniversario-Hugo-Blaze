-- Verificar se a tabela rsvps existe
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'rsvps'
);

-- Verificar as políticas existentes para a tabela rsvps
SELECT * FROM pg_policies WHERE tablename = 'rsvps';

-- Remover políticas existentes para a tabela rsvps
DROP POLICY IF EXISTS "Allow public read access on rsvps" ON rsvps;
DROP POLICY IF EXISTS "Allow public insert access on rsvps" ON rsvps;

-- Verificar se o RLS está habilitado
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'rsvps';

-- Habilitar RLS para a tabela rsvps
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Criar novas políticas para a tabela rsvps
CREATE POLICY "Allow public read access on rsvps" 
ON rsvps FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access on rsvps" 
ON rsvps FOR INSERT 
WITH CHECK (true);

-- Verificar as políticas após a criação
SELECT * FROM pg_policies WHERE tablename = 'rsvps';

-- Testar inserção na tabela rsvps
INSERT INTO rsvps (name, phone, number_of_guests, message)
VALUES ('Teste SQL', '21777777777', 2, 'Teste de inserção via SQL')
RETURNING *; 