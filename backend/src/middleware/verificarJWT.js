// Middleware de Verificação de Token
const verifyToken = (req, res, next) => {
    // 1. Extrai o token do cabeçalho 'Authorization' (Esperado: Bearer <TOKEN>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // 2. Verifica e decodifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Anexa os dados do usuário à requisição (req.user)
        req.user = decoded;

        // 4. Continua o processamento da requisição
        next();
    } catch (err) {
        // Token inválido (expirado, adulterado, etc.)
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};

export { verifyToken };