import State from '../lib/state';

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate');

// Custom revirer example, check how to convert JSON to custom record types.
// http://facebook.github.io/immutable-js/docs/#/fromJS
export const appState = new State(initialState, function(key, value) {

});

export const appCursor = appState.cursor(['app']);
export const i18nCursor = appState.cursor(['i18n']);
export const pendingActionsCursor = appState.cursor(['pendingActions']);
