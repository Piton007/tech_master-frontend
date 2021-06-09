import AWS from 'aws-sdk'
import dayjs from "dayjs"
import dayjsUTC from "dayjs/plugin/utc"
dayjs.extend(dayjsUTC)


export const s3 = new AWS.S3({
  accessKeyId: 'AKIARLTV7BOD7AZGE4AC',
  secretAccessKey: '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',
  region: 'us-east-2',
})

export function upload(file,callback){
    s3.upload({
        Bucket: 'techmentordocuments',
        Key: `${dayjs().utcOffset(-5).valueOf()}-${file.name}`,
        Body: file,
        ContentType: file.type,
    }, callback)
}

export function remove(key,callback){
    s3.deleteObject({
        Bucket: 'techmentordocuments',
        Key: key,
      },callback)
}

export function generateLink (urn) {
  return s3.getSignedUrl('getObject', {
    Bucket: 'techmentordocuments',
    Key: urn,
    Expires: 60 * 60 * 1, // signedUrlExpireSeconds
  })
}
