import S3 from "aws-sdk/clients/s3"

export default async function handler(req, res) {
  const s3 = new S3({
    apiVersion: "2006-03-01"
  })

  const date = new Date();
  const d =
    date.getFullYear() +
    "" +
    date.getMonth() +
    "" +
    date.getDate() +
    "" +
    date.getTime();
  

  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: d+req.query.file,
      "Content-Type": req.query.fileType
    },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 10485760] // up to 10 MB
    ]
  })
  console.log("Post ",post)
  res.status(200).json(post)
}
