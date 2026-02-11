import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  // Tenta em Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader && authHeader.split(' ')[0] === 'Bearer' ? authHeader.split(' ')[1] : null;

  // Ou tenta em cookie (se você setar cookie httpOnly)
  const cookieToken = req.cookies?.token;

  const token = bearerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // anexar dados do usuário (sub, username, email)
    console.log("DECODED:", decoded);
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

export default verifyToken;
