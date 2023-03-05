import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'

const todosAccess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()
const logger = createLogger('TodosAccess')

// get todos function
export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
  logger.info('getTodosForUser', { userId })

  return todosAccess.getAllTodos(userId)
}

// create todo function
export async function createTodo(
  newTodo: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  logger.info('createTodo', { newTodo, userId })

  const todoId = uuid.v4()
  const createdAt = new Date().toISOString()
  // const s3AttachmentUrl = attachmentUtils.getAttachmentUrl(todoId)
  const newItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    attachmentUrl: null,
    ...newTodo
  }

  return todosAccess.createTodoItem(newItem)
}

// update todo function
export async function updateTodo(
  userId: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest
): Promise<UpdateTodoRequest> {
  logger.info('updateTodo', { userId, todoId, updatedTodo })

  return todosAccess.updateTodoItem(userId, todoId, updatedTodo)
}

// delete todo function
export async function deleteTodo(
  userId: string,
  todoId: string
): Promise<string> {
  logger.info('deleteTodo', { userId, todoId })

  return todosAccess.deleteTodoItem(userId, todoId)
}

// generate upload url function
export async function createAttachmentPresignedUrl(
  todoId: string,
  userId: string
): Promise<string> {
  const attachmentId = uuid.v4()
  const attachmentUrl = await attachmentUtils.getAttachmentUrl(attachmentId)
  const uploadUrl = attachmentUtils.getUploadUrl(attachmentId)

  const todoItem = await todosAccess.addAttachmentUrl(
    userId,
    todoId,
    attachmentUrl
  )
  todoItem.attachmentUrl = uploadUrl

  logger.info('URL updated', { todoItem })

  return todoItem.attachmentUrl
}
