DEPLOY USING

sam deploy --stack-name git-to-s3 --s3-bucket my-potentx-sam-artifacts-20251022 --capabilities CAPABILITY_IAM --region eu-north-1 --no-confirm-changeset


ALLOW ACCESS TO S3

aws s3api put-bucket-policy --bucket my-lambda-website-bucket --policy "{
  \"Version\": \"2012-10-17\",
  \"Statement\": [
    {
      \"Effect\": \"Allow\",
      \"Principal\": {\"AWS\": \"arn:aws:iam::YOUR_ACCOUNT_ID:user/YOUR_USER_NAME\"},
      \"Action\": [\"s3:GetObject\", \"s3:ListBucket\"],
      \"Resource\": [
        \"arn:aws:s3:::my-lambda-website-bucket\",
        \"arn:aws:s3:::my-lambda-website-bucket/*\"
      ]
    }
  ]
}"
