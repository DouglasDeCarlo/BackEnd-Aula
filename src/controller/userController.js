import {User} from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class UserController {
    
    static async LoginUser(req, res){
        const { email, password } = req.body;

        try {
            const user = await User.findOne({email});

            if(!user){
                return res.status(404).json({ message: 'Usuário não encontrado no DB' });
            }

            const Pass = await bcrypt.compare(password, user.password);

            if(!Pass){
                return res.status(401).json({ message: 'Senha incorreta' });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login realizado com sucesso', token });   
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
    }

    static async RegisterUser(req, res){
        const { name, age, email, password, confirmPassword } = req.body;

        if(confirmPassword !== password){
            return res.status(400).json({ message: 'As senhas não coincidem' });
        }

        try {
            const cryptPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name,
                age,
                email,
                password: cryptPassword
            });

            const createUser = await user.save();
            return res.status(201).json({ message: 'Usuário criado com sucesso' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar usuário' });
        }
    }

    static async authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];

        if(authHeader == null){
            return res.status(401).json({ message: 'Acesso não autorizado' });
        }
        jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
            if(err){
                return res.status(403).json({ message: 'Token inválido' });
            }
            req.user = user;
            next();
        });
    }
}