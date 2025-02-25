import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();

// // use this to decode a token and get the user's information out of it
// import decode from 'jwt-decode';

// import { GraphQLError } from 'graphql';
// import jwt from 'jsonwebtoken';

// if (process.env.NODE_ENV !== 'production') {
// await import('dotenv').then(dotenv => dotenv.config());
// }

// const secret = process.env.SECRET || 'secret';
// const expiration = '2h';

// // create a new class to instantiate for a user
// class AuthService {
//   // get user data
//   getProfile() {
//     return decode(this.getToken());
//   }

//   // check if user's logged in
//   loggedIn() {
//     // Checks if there is a saved token and it's still valid
//     const token = this.getToken();
//     return !!token && !this.isTokenExpired(token); // handwaiving here
//   }

//   // check if token is expired
//   isTokenExpired(token) {
//     try {
//       const decoded = decode(token);
//       if (decoded.exp < Date.now() / 1000) {
//         return true;
//       } else return false;
//     } catch (err) {
//       return false;
//     }
//   }

//   getToken() {
//     // Retrieves the user token from localStorage
//     return localStorage.getItem('id_token');
//   }

//   login(idToken) {
//     // Saves user token to localStorage
//     localStorage.setItem('id_token', idToken);
//     window.location.assign('/');
//   }

//   logout() {
//     // Clear user token and profile data from localStorage
//     localStorage.removeItem('id_token');
//     // this will reload the page and reset the state of the application
//     window.location.assign('/');
//   }
// }

// export default new AuthService();

// export const AuthenticationError = new GraphQLError('Could not authenticate user.', {
//     extensions: {
//       code: 'UNAUTHENTICATED',
//     },
//   });

//   export const signToken = ({ username, email, password }) => {
//     const payload = { username, email, password };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   };

