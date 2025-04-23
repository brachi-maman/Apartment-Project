
//Authorization
// import advertiser from '../models/advertiser.js'
import Advertiser from '../models/advertiser.js'
import jwt from 'jsonwebtoken'
export const register = (req, res) => {
    const {email, password,phon} = req.body
Advertiser.find()
        .where({ email: { $eq: email } })
        .then(users => {
            if (users.length > 0) {
                return res.status(400).send({ error: 'email has been exists already!' })
            }
            const newAdver = new Advertiser({
                email, 
                password,
                phon,         
               apartments:[]
            })
            newAdver.save()
                .then(async adver => {
                    const token = await jwt.sign(
                        { adver: adver.phon, email },
                        process.env.SECRET,
                        {
                            expiresIn: '30d'
                        }
                    )
                    return res.status(200).send({adver , token })
                })
                .catch(err => {
                    return res.status(500).send({ error: err.message })
                })
        })
}
export const login = (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ error: `email and password are required!` })
    }
 
   Advertiser.find()
        .where({ email: { $eq: email } })
        .then(async advertisers => {
            if (advertisers.length == 0) {
                console.log('email not found!');
                 return res.status(404).send({ error: `email not found!!` })
            }
            let [advertiser] = advertisers
            if (advertiser.password !== password) {
                
                return res.status(404).send({ error: `email and password are not match!` })
            }
            const token = await jwt.sign(
                { advertisername: advertiser.phon, email },
                process.env.SECRET,
                {
                   expiresIn: '30d'
                }
            )
            res.status(200).send({ advertiser, token })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
