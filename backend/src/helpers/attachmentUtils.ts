import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

//  Implement the fileStogare logic
const s3BucketName = process.env.ATTACHMENT_S3_BUCKET
const urlExpiration: number = parseInt(process.env.SIGNED_URL_EXPIRATION)

export class AttachmentUtils {
  constructor(
    private readonly s3 = new XAWS.S3({
      signatureVersion: 'v4'
    })
  ) {}

  getAttachmentUrl(todoId: string): string {
    return `https://${s3BucketName}.s3.amazonaws.com/${todoId}`
  }

  getUploadUrl(todoId: string): string {
    console.log('getUploadUrl called')

    const url = this.s3.getSignedUrl('putObject', {
      Bucket: s3BucketName,
      Key: todoId,
      Expires: urlExpiration
    })
    return url as string
  }
}
