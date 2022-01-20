# Getting Started with Create React App


Services
- auth-header.js
- auth.service.js (Authentication service)
- user.service.js (Data service)


Authentication service
- login(): POST {username, password} & save JWT to Local Storage
- logout(): remove JWT from Local Storage
- register(): POST {username, email, password}
- getCurrentUser(): get stored user information (including JWT)