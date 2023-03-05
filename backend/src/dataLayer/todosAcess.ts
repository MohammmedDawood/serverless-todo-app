import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// Implement the dataLayer logic
export class TodosAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly todosIndex = process.env.TODOS_INDEX
  ) {}

  async getAllTodos(userId: string): Promise<TodoItem[]> {
    logger.info('Getting all todos', { userId })

    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: this.todosIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()

    const items = result.Items
    return items as TodoItem[]
  }

  async createTodoItem(newTodo: TodoItem): Promise<TodoItem> {
    logger.info('Creating a new todo', { newTodo })

    const result = await this.docClient
      .put({
        TableName: this.todosTable,
        Item: newTodo
      })
      .promise()
    logger.info('Todo created', { result })

    return newTodo as TodoItem
  }

  async updateTodoItem(
    userId: string,
    todoId: string,
    todoUpdate: TodoUpdate
  ): Promise<TodoUpdate> {
    logger.info('Updating a todo', { userId, todoId, todoUpdate })

    const result = await this.docClient
      .update({
        TableName: this.todosTable,
        Key: {
          userId,
          todoId
        },
        UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
        ExpressionAttributeValues: {
          ':name': todoUpdate.name,
          ':dueDate': todoUpdate.dueDate,
          ':done': todoUpdate.done
        },
        ExpressionAttributeNames: {
          '#name': 'name'
        },
        ReturnValues: 'ALL_NEW'
      })
      .promise()

    const todoItemUpdate = result.Attributes

    logger.info('Todo updated', { result })

    return todoItemUpdate as TodoUpdate
  }

  async deleteTodoItem(userId: string, todoId: string): Promise<string> {
    logger.info('Deleting a todo', { userId, todoId })

    const result = await this.docClient
      .delete({
        TableName: this.todosTable,
        Key: {
          userId,
          todoId
        }
      })
      .promise()

    logger.info('Todo deleted', { result })

    return todoId as string
  }
}
