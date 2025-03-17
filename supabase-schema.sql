-- Tabela para confirmações de presença
CREATE TABLE IF NOT EXISTS rsvps (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  number_of_guests INTEGER NOT NULL,
  message TEXT
);

-- Tabela para mensagens e fotos
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author TEXT NOT NULL,
  message TEXT NOT NULL,
  image_url TEXT
);

-- Políticas de segurança para permitir acesso público
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir leitura e escrita para todos
CREATE POLICY "Allow public read access on rsvps" ON rsvps FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on rsvps" ON rsvps FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on messages" ON messages FOR INSERT WITH CHECK (true); 