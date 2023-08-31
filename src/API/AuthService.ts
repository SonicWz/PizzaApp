import axios from 'axios';

export default class AuthService {
  static async auth(login: string, password: string) {
    const response = await axios.get<boolean>('https://scythe-mud-mascara.glitch.me/auth_', {
      params: {
        login: login,
        password: password
      }
    });
    return response
  }

}