export function IsAuthenticated(to, from, next) {
  if(localStorage.getItem('token')) {
    return next('/');
  }
  return next();
}

export function IsNotAuthenticated(to, from, next) {
  if(!localStorage.getItem('token')) {
    return next('/login');
  }
  return next();
}