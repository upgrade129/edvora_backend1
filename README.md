# edvora_backend1
Authentication crud using Nodejs, Express, MongoDB

# Api's
### Create user - POST -https://edvora1.herokuapp.com/api/users/create
This api is used to create a new user. It accepts the request body consists of username, email and password
Example : 
```
{
    "username" : "test1",
    "password" : "2222",
    "email" : "test1@gmail.com"
}
```
Sample Output : 
```
{
    "username": "test1",
    "email": "test1@gmail.com",
    "_id": "6130b747ff4f03711b057916",
    "__v": 0
}
```
This api checks the given email is unique and hashes the password using bcrypt and then creates the new user.
<br>
***
### Login user - POST - https://edvora1.herokuapp.com/api/users/login
This api is used logging in. First it checks whether the user is present or not.
If the user is valid then it checks with the password. And it creates a unique sessionId for each login.
Example : 
```
{
    "email" : "test1@gmail.com",
    "password" : "2222"
}
```
Sample Output : 
```
{
    "message": "Sucessfully logedin",
    "data": {
        "userId": "6130924a0155fef6ce2f1708",
        "sessionId": "6054",
        "_id": "6130a3716599d185a7361fe0",
        "__v": 0
    }
}
```

***
### Logout user - POST - https://edvora1.herokuapp.com/api/users/logout
This api is used to logout the particular session.
Example : 
```
{
    "sessionId" : "4979"
}
```
Sample Output : 
```
{
    "message": "session was logged out sucessfully"
}
```

***
### update password - PATCH - https://edvora1.herokuapp.com/api/users/logout
This api is used to update the password using the old password and logout all other sessions.
Example : 
```
{
    "email" : "test@gmail.com",
    "oldpassword" : "1111",
    "newpassword" : "1115",
    "sessionId" : "7369"
    
}
```
Sample Output : 
```
{
    "message": "password changed and all loged out from all other sessions"
}
```

***
### Logout all - DELETE - https://edvora1.herokuapp.com/api/users/logout
This api is used to logout all the sessions of the user.
Example : 
```
{
    "userId" : "6130924a0155fef6ce2f1708"
}
```
Sample Output : 
```
{
    "message": "All the sessions are sucessfully logged out"
}
```




