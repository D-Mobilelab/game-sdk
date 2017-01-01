import NewtonAdapter from 'newton-adapter';

export const newtonMiddleware = (store) => (next) => (action) => {
    const currentState = store.getState();
    return next(action);
} 