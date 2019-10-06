import { LOGIN_ERROR, LOGIN_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from '../actionTypes'

import { getCategories } from './categoriesActions';

import { defaultCategories } from '../../utils/categories/defaultCategories';

/**
 * @function signIn - Get username, password, as string and dispatch login actions
 * @param {string} email
 * @param {string} password
 */
export const signIn = (email, password, history) => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    const signedInToken = await firebase.auth().signInWithEmailAndPassword(email, password);
    const seriealizedSignedInToken = await JSON.stringify(signedInToken);
    await localStorage.setItem('loggedIn', seriealizedSignedInToken);
    await dispatch(getCategories(signedInToken.user.uid));
    await dispatch({ type: LOGIN_SUCCESS })
    history.push('/user/dashboard')
  } catch (err) {
    dispatch({ type: LOGIN_ERROR, err })
  }
}

/**
 * @function signOut - Sign out
 */
export const signOut = (history) => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
    localStorage.clear('loggedIn');
    history.push('/')
  } catch (err) {
    throw (err)
  }
}

/**
 * @function signUp - Get username, password, as string and dispatch signup actions
 * @param {string} email
 * @param {string} password
 */
export const signUp = (email, password, history) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)
    //User enrich email in user collection
    await firestore.collection('users').doc(resp.user.uid).set({ email })
    //User enrich default categories in categories collection
    await firestore.collection('categories').doc(resp.user.uid).set(defaultCategories)
    dispatch({ type: SIGNUP_SUCCESS })
    history.push('/')
  } catch (err) {
    dispatch({ type: SIGNUP_ERROR, err })
  }
}

/**
 * @function signInWithGoogle - Login with google provider
 */
export const signInWithGoogle = (history) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await firebase.auth().signInWithPopup(provider)
    history.push('/user/dashboard')
  } catch (err) {
    dispatch({ type: SIGNUP_ERROR, err })
  }
}