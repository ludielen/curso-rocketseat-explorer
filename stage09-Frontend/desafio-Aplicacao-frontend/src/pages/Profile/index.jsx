import {Container, Form, Avatar} from './styles'
import { ButtonText } from '../../components/ButtonText'
import {Input} from '../../components/Input'
import {Button} from '../../components/Button'
import {FiUser, FiMail, FiLock, FiCamera} from 'react-icons/fi';
import {Link} from 'react-router-dom'
import {AiOutlineArrowLeft } from "react-icons/ai";
import { useState } from 'react';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import {useAuth} from '../../hooks/auth';
import {api} from '../../../../desafio-aplicacao-node/src/services/api'

export function Profile() {

    const {user, updateProfile} = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl)
    const [avatarFile, setAvatarFile] = useState(null)

    async function handleUpdate(){
        const user = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }
        await updateProfile({user, avatarFile})
    }

    function handleChangeAvatar(event) {
        const file = event.target.files[0]
        setAvatarFile(file)

        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
    }

    return(
        <Container>
            <header>
                <Link to="/">
                    Voltar
                    <AiOutlineArrowLeft/>
                </Link>
            </header>

            <Form>
                <Avatar>
                     <img src={avatar} />
                    
                    <label htmlFor="avatar">
                        <FiCamera/>
                        <input id="avatar" type="file" onChange={handleChangeAvatar}></input>
                    </label>
                </Avatar>
                
                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value= {name}
                    onChange = { e => setName(e.target.value)}
                />

                <Input
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    value={email}
                    onChange= {e => setEmail(e.target.value)}
              
                />

                <Input
                    placeholder="Senha Atual"
                    type="password"
                    icon={FiLock}
                    onChange = { e => setPasswordOld(e.target.value)}
                />

                <Input
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    onChange = { e => setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate}/>
            </Form>

        </Container>
    )
}