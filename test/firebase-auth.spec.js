import {
  registerUser, logInUser, logInGm, logOut,
} from '../src/model/firebase-auth.js';

// Llamamos al mock instalado en node_modules, y a sus métodos
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

// Cada vez que diga 'firebase', se usará en reemplazo el mock
global.firebase = firebasemock.MockFirebaseSdk(
  // usamos null porque no estamos trabajando con data en tiempo real, sino con cloudfirestore
  () => null,
  () => mockauth,
);

// Inician tests

describe('registerUser', () => {
  it('Debería ser una función', () => {
    expect(typeof registerUser).toBe('function');
  });
  it('Deberia crear un nuevo usuario', () => registerUser('hola@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('hola@gmail.com');
    }));
});

describe('logInUser', () => {
  it('Debería ser una función', () => {
    expect(typeof logInUser).toBe('function');
  });
  it('Debería iniciar sesión', () => logInUser('hola@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('hola@gmail.com');
    }));
});

describe('logInGm', () => {
  it('Debería ser una funciÓn', () => {
    expect(typeof logInGm).toBe('function');
  });
  it('Debería iniciar sesión con Google', () => logInGm()
    .then((data) => {
      const provider = data.providerData[0].providerId;
      expect(provider).toBe('google.com');
    }));
});

describe('logOut', () => {
  it('Debería cerrar sesión', () => logOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});
