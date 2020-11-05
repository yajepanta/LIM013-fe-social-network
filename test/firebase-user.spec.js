import MockFirebase from 'mock-cloud-firestore';

import {
  createPost, allPosts, deletePost, editTextPost,
} from '../src/model/firebase-user';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        post_001: {
          user: '01',
          name: 'Usuario 1',
          date: '',
          contentPost: 'Post uno',
          img: '',
          photo: '',
          privacy: '',
        },
        post_002: {
          userId: '02',
          name: 'Usuario 2',
          date: '',
          contentPost: 'Post dos',
          img: '',
          photo: '',
          privacy: '',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('createPost', () => {
  it('Debería crear un post', done => createPost('03', 'Usuario 3', '', 'Post 3', '', '', '')
    .then(() => {
      const callback = (post) => {
        const result = post.find(element => element.content === 'Post 3');
        expect(result.content).toBe('Post 3');
        done();
      };
      allPosts(callback);
    }));
});

describe('deletePost', () => {
  test('Debería eliminar un post', done => deletePost('post_002')
    .then(() => {
      const callback = (post) => {
        const result = post.find(element => element.id === 'post_002');
        expect(result).toBe(undefined);
        done();
      };
      allPosts(callback);
    }));
});

describe('editTextPost', () => {
  it('Debería modificar un post', done => editTextPost('post_001', 'Post uno modificado', 'privado')
    .then(() => {
      const callback = (post) => {
        const result = post.find(element => element.id === 'post_001');
        expect(result.content).toBe('Post uno modificado');
        done();
      };
      allPosts(callback());
    }));
});
