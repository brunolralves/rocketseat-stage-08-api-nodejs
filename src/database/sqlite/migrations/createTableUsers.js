const createTableUsers = `
CREATE TABLE IF NOT EXISTS users(
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  id VARCHAR(36),
  name VARCHAR(60),
  email VARCHAR(60),
  password VARCHAR(60),
  avatar VARCHAR NULL,
  excluido BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

export default createTableUsers;