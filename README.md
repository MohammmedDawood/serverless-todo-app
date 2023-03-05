# Serverless TODO Application

A simple TODO application using AWS Lambda and Serverless framework.

This application allows creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.

**ServiceEndpoint**: https://01308pmq6j.execute-api.us-east-1.amazonaws.com/dev

**Pages screenshots** can be found at [PAGES.md](./PAGES.md)

## Prerequisites

- <a href="https://manage.auth0.com/" target="_blank">Auth0 account</a>
- <a href="https://github.com" target="_blank">GitHub account</a>
- <a href="https://nodejs.org/en/download/package-manager/" target="_blank">NodeJS</a> version up to 12.xx
- Serverless
  - Create a <a href="https://dashboard.serverless.com/" target="_blank">Serverless account</a> user
  - Install the Serverless Framework’s CLI (up to VERSION=2.21.1). Refer to the <a href="https://www.serverless.com/framework/docs/getting-started/" target="_blank">official documentation</a> for more help.
  ```bash
  npm install -g serverless@3.2.1
  serverless --version
  ```
  - Login and configure serverless
  ```bash
  serverless login
  ```
  - Deploy Changes
  ```bash
  serverless deploy --verbose
  ```
  - If you face a permissions error, you may need to specify the user profile
  ```bash
  serverless deploy --aws-profile serverless --verbose
  ```

## Getting Started

### Backend

To deploy an application run the following commands:

```
cd backend
npm install
serverless deploy --verbose
```

### Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

## APIs

### Postman collection

You can use the Postman collection that contains sample request/response, as an alternative way to test each API.

Postman collection: [Serverless-TODO-App.postman_collection.json](./Serverless-TODO-App.postman_collection.json)

### `GET` - GetTodos

`GET` - https://01308pmq6j.execute-api.us-east-1.amazonaws.com/dev/todos

<details>
  <summary>Expand to show sample Request/Response</summary>

Request:

```shell
curl --location --request GET 'https://01308pmq6j.execute-api.us-east-1.amazonaws.com/dev/todos' \
--header 'Authorization: Bearer TOKEN'
```

Response:

```json
{
  "items": [
    {
      "todoId": "558009cd-8802-4e6b-a126-3aa99d6b3544",
      "attachmentUrl": "https://serverless-todos-images-1800-dev.s3.amazonaws.com/558009cd-8802-4e6b-a126-3aa99d6b3544",
      "userId": "google-oauth2|112286458328572665803",
      "dueDate": "2023-03-05",
      "createdAt": "2023-03-05T10:41:24.003Z",
      "name": "Water flowers 12:41 PM",
      "done": false
    },
    {
      "todoId": "8e1c00d3-6aee-479d-a768-d40836d6a3d2",
      "attachmentUrl": "https://serverless-todos-images-1800-dev.s3.amazonaws.com/8e1c00d3-6aee-479d-a768-d40836d6a3d2",
      "userId": "google-oauth2|112286458328572665803",
      "dueDate": "2023-03-12",
      "createdAt": "2023-03-05T10:43:26.114Z",
      "name": "to test getTodos function",
      "done": true
    }
  ]
}
```

</details>

### `POST` - CreateTodo

`POST` - https://01308pmq6j.execute-api.us-east-1.amazonaws.com/dev/todos

<details>
  <summary>Expand to show sample Request/Response</summary>

Request:

```shell
curl --location --request POST 'https://01308pmq6j.execute-api.us-east-1.amazonaws.com/dev/todos' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer TOKEN' \
--data-raw '{
	"name": "Submit Mohammed Dawood Project",
	"dueDate": "2023-03-05"
}'
```

Response:

```json
{
  "item": {
    "userId": "google-oauth2|112286458328572665803",
    "todoId": "a42a2103-4b44-4f39-99b5-cc203e97977f",
    "createdAt": "2023-03-05T14:32:53.532Z",
    "done": false,
    "attachmentUrl": "https://serverless-todos-images-1800-dev.s3.amazonaws.com/a42a2103-4b44-4f39-99b5-cc203e97977f",
    "name": "Submit Mohammed Dawood Project",
    "dueDate": "2023-03-05"
  }
}
```

</details>

### `PATCH` - UpdateTodo

`PATCH` - https://01308pmq6j.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}

<details>
  <summary>Expand to show sample Request/Response</summary>

Request:

```shell
curl --location --request PATCH 'https://01308pmq6j.execute-api.us-east-1.amazonaws.com/dev/todos/a42a2103-4b44-4f39-99b5-cc203e97977f' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer TOKEN' \
--data-raw '{
	"name": "Submit Mohammed Dawood Project Update",
	"dueDate": "2023-03-05",
	"done": true
}'
```

Response:

```json
{}
```

</details>

### `DELETE` - DeleteTodo

`DELETE` - https://01308pmq6j.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}

<details>
  <summary>Expand to show sample Request/Response</summary>

Request:

```shell
curl --location --request DELETE 'https://01308pmq6j.execute-api.us-east-1.amazonaws.com/dev/todos/b8c69a08-636e-4a76-b867-abf03f8fcec4' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer TOKEN' \
--data-raw ''
```

Response:

```json
{}
```

</details>

### `POST` - GetAttachmentUrl

`POST` - https://01308pmq6j.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}/attachment

<details>
  <summary>Expand to show sample Request/Response</summary>

Request:

```shell
curl --location --request POST 'https://01308pmq6j.execute-api.us-east-1.amazonaws.com/dev/todos/b8c69a08-636e-4a76-b867-abf03f8fcec4/attachment' \
--header 'Authorization: Bearer TOKEN' \
--data-raw ''
```

Response:

```shell
{
    "uploadUrl": "https://serverless-todos-images-1800-dev.s3.amazonaws.com/b8c69a08-636e-4a76-b867-abf03f8fcec4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAREDPCM6Y6BGKSAP3%2F20230305%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230305T144232Z&X-Amz-Expires=3000&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLWVhc3QtMSJHMEUCIEX%2BHH9LF85Y8OzjHVVVbucuPVkOEzP0YfKa7neJSQhMAiEA%2FCpEovmqUXnW1MM8E3gLBSWNK8EJKq%2B1VIkVsbs3XtYqsAMI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARACGgwwNzc1NDIzNTI4MTciDGXxXYyqfNqOxXJRSSqEA30CNQ%2BQZ7Wshcvp8IJg9GCzQpN7qGCoifQ%2BFUreiiM4tJY1WB0VntVundmS64%2B0kgR3lc9520DZFIeC%2F%2F%2Fyqs6P%2BXWjV75RvxSUjS%2Ba2tXctSEH2oyqhBClTe6%2FEQ5FYXLtXGV8%2BJIqL0ZMUKG9km8MMKYylJmqn%2Fz5mIwpzTebEOw6OvSlHYw1VNXMDCVZZsNuKdF9aJ60xTX7trlG1CZg02%2FJDeVGuwftaZB4ObNunKMX2Eezs1Q29suxiVr4F3b%2BULzdjV39%2BkUr8IXsnX%2FkXBtEqJsXuIbiEpRgddquMcM4FA9L9nrH5aabMP%2FsRhYM9Pkd5NVaMgmNi3LWnJHxZNFSBgZTrFlvDDYamWZKouMDfVuzENkM4zfdiVoz91EBDegp%2BkqD5kwHA4WsdA25IFXuKLuT98ssfc5x3Cl%2FA3BYAyTycHEMrd%2F%2F0yheck2BlOGUa%2BJYuuOVWDF84qyAy96C8%2FBOmLMX2FVcB7Mc8GzAJCPlepShPz2X%2F4FG3O5iILYw19SSoAY6nQEnuXtGzAffxZgAZiLiFCcLNsLAqrcjb0lMMMvxsXHJ4UYJIGR00od%2FhISThyo8X3eGiPirwj8NpvRTTaLtKcwsPSQ1PcYVARRnAnVHJgEqhnarRKP0S08nK%2F7LJgude4AlN0N2r0wdBrAimoxAGfZVfm3wUY9kpDHV0Vs4aCJCBK8gvY%2FbWfPAL2HVkMWYrgx7Xy88dshlFrU6%2F9hB&X-Amz-Signature=dbed35fd3da4cb614de48f71ea02f5f631ffce0f5b268b250489cdcf7b535e48&X-Amz-SignedHeaders=host"
}
```

</details>

## Authentication

Auth0 is used as a third-party OAuth provider using asymmetrically encrypted JWT tokens with `RS256` signature algorithm.

<details>
  <summary>Expand to show Configurations Summary</summary>

Configurations Summary:

```yaml
Application Type: Single Page Application
Allowed Callback URLs: http://localhost:3000/callback
Allowed Web Origins: http://localhost:3000/
ID Token Expiration: 360000
Absolute Lifetime: 2592000
Inactivity Lifetime: 1296000
JSON Web Token (JWT) Signature Algorithm: RS256
OIDC Conformant: False
```

</details>

## Best practices

- Optimized Code Size by adding the below in `serverless.yaml`:

  ```yaml
  package:
    individually: true
  ```

- Enabled AWS X-Ray Metrics by adding the below in `serverless.yaml`:

  ```yaml
  tracing:
    lambda: true
    apiGateway: true
  ```

  <details>
    <summary>Expand to show X-Ray Metrics</summary>

  ![AWS X-Ray - Services Map](images/aws-xray-smap.png)
  ![AWS X-Ray - Traces](images/aws-xray-traces.png)
  </details>

<details>
  <summary>Expand to show CloudWatch Logs</summary>

![CloudWatch - Log Groups](images/cloudwatch-loggroups.png)
![CloudWatch - Auth Logs](images/cloudwatch-authlogs.png)
![CloudWatch - CreateTodo Logs](images/cloudwatch-createtedlogs.png)

</details>
