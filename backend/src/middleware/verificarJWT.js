import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  // Tenta em cookie
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ mensagem: 'Não autenticado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // anexar dados do usuário (sub, username, email)
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

export default verifyToken;
