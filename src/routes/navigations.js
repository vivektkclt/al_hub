export let navigator;
export let authNavigator;

export const setTopLevelNavigator = (ref) => (navigator = ref);

export const setAuthLevelNavigator = (ref) => (authNavigator = ref);
