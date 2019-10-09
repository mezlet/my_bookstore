# my_bookstore
A book review web API

# Table of Contents

- [Installation](#installation)
    - [Windows Environment](#windows-environment)
    - [MacOS/Linux Environment](#mac-linux-environment)
- [Endpoints](#endpoints)
	- [Register](#register)
	- [Login](#login)
	- [Get Books](#getbooks)
    - [Post Books](#postbooks)
	- [Get Comments](#getcomments)
	- [Create Comment](#createcomment)
    - [Get Book](#getbook)
    - [Update Book](#getbook)
    - [Delete Book](#getbook)



## Installation

```
clone the repository

create .env and paste the content of .env sample into it

run npm install
```

### Windows Environment
```
if you are in a windows environment install choco by following this discription
https://chocolatey.org/docs/installation

run choco install make

run "make start" to start the docker environment 
```

### MacOS/Linux Environment
```
run "make start"
```

## Endpoints

### Register: Register an admin

#### Request
`Post api/auth/register`

#### Body
{
	"username":"letty",
	"email":"letty@gmail.com",
	"password":"letty1234"
}

####  Response
```
{
    "succes": true,
    "user": {
        "id": 1,
        "username": "letty",
        "email": "letty@gmail.com",
        "createdAt": "2019-10-08T21:16:18.982Z",
        "updatedAt": "2019-10-08T21:16:18.982Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsZXR0eSIsImlhdCI6MTU3MDU4Nzc5OSwiZXhwIjoxNTcxMTkyNTk5fQ.ZYqpqg1k1OoN8dn2OIaCmqdWgQpT84oGfiA-s42bGN0"
    }
}

```

### Login: Admin login

#### Request
`Post api/auth/login/`

#### Body
{
	"email":"letty@gmail.com",
	"password":"letty1234"
}

####  Response
```
{
    "succes": true,
    "user": {
        "id": 1,
        "username": "letty",
        "email": "letty@gmail.com",
        "createdAt": "2019-10-08T21:16:18.982Z",
        "updatedAt": "2019-10-08T21:16:18.982Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsZXR0eSIsImlhdCI6MTU3MDU4Nzc5OSwiZXhwIjoxNTcxMTkyNTk5fQ.ZYqpqg1k1OoN8dn2OIaCmqdWgQpT84oGfiA-s42bGN0"
    }
}

```

### Get Books
*Requires no authentication*

#### Request
`GET /api/books`

#### Response
```
{
    "success": true,
    "data": [
         {
            "id": 1,
            "title": "Virus",
            "author": "Vas",
            "genre": "crime",
            "description": "hello from the other side",
            "createdAt": "2019-10-08T21:34:06.497Z",
            "updatedAt": "2019-10-08T21:34:06.497Z"
        },
        {
            "id": 2,
            "title": "Virus",
            "author": "Vas",
            "genre": "crime",
            "description": "hello from the other side",
            "createdAt": "2019-10-08T22:04:04.746Z",
            "updatedAt": "2019-10-08T22:04:04.746Z"
        },
    ],
}

```

### Get Comments
*Requires no authentication*

#### Request
`GET api/comments/5`

####  Response
```
{
    "success": true,
    "data": [
               {
            "id": 1,
            "comment": "dope",
            "book_id": 5,
            "createdAt": "2019-10-09T02:44:37.983Z",
            "updatedAt": "2019-10-09T02:44:37.983Z"
        }
    ]
}
```

### Create Post
*Only an admin is allowed to make a post
*

#### Request
`Post api/books/`

#### Body
{
	"title":"Clothes",
	"author":"Francis",
	"genre":"crime",
	"description":"hello from the other side"
}

####  Response
```
{
    "succes": true,
    "book": {
        "id": 6,
        "title": "Clothes",
        "author": "Francis",
        "genre": "crime",
        "description": "hello from the other side",
        "updatedAt": "2019-10-09T02:48:21.164Z",
        "createdAt": "2019-10-09T02:48:21.164Z"
    }
}

```

### Create Comment
*Requires no authentication*

#### Request
`Post api/comments/1`

#### Body
{
	"comment":"dope"
}

####  Response
```
{
    "success":true
    "message": "comment posted successfully",
    "data": {
        "id": 1,
        "book_id": 5,
        "comment": "dope",
        "updatedAt": "2019-10-09T02:44:37.983Z",
        "createdAt": "2019-10-09T02:44:37.983Z"
    }
}

```

### Get Single Book
*Requires no authentication*


#### Request
`GET api/v1/books/1/`

#### Response
```
{
    "source": "cache",
    "data": {
        "dataValues": {
            "id": 1,
            "title": "Clothes",
            "author": "Francis",
            "genre": "crime",
            "description": "hello from the other side",
            "createdAt": "2019-10-09T02:16:21.847Z",
            "updatedAt": "2019-10-09T02:16:21.847Z"
        }
    }
}
```

### Update Post
*Any admin can update a post*

#### Request
`PUT api/books/1`

#### Body
{
	"title":"Vila"
	
}
####  Response
```
{
    "success": true,
    "data":
            {
                "id": 1,
                "title": "Vila",
                "author": "Vas",
                "genre": "crime",
                "description": "hello from the other side",
                "createdAt": "2019-10-08T21:34:06.497Z",
                "updatedAt": "2019-10-09T03:02:49.285Z"
            }
}
```
### Update Post
*Any admin can update a post*

#### Request
`PUT api/books/1`

#### Body
{
	"title":"Vila"
	
}
####  Response
```
{
    "success": true,
    "data":
            {
                "id": 1,
                "title": "Vila",
                "author": "Vas",
                "genre": "crime",
                "description": "hello from the other side",
                "createdAt": "2019-10-08T21:34:06.497Z",
                "updatedAt": "2019-10-09T03:02:49.285Z"
            }
}
```
### Update Post
*Any admin can update a post*

#### Request
`PUT api/books/1`

#### Body
{
	"title":"Vila"
	
}
####  Response
```
{
    "success": true,
    "data":
            {
                "id": 1,
                "title": "Vila",
                "author": "Vas",
                "genre": "crime",
                "description": "hello from the other side",
                "createdAt": "2019-10-08T21:34:06.497Z",
                "updatedAt": "2019-10-09T03:02:49.285Z"
            }
}
```
### Delete Post
*Any admin can delete a post*

#### Request
`DELETE api/books/1`

####  Response
```
{
    "success": true,
    "message": "Delete was successful"
}
```