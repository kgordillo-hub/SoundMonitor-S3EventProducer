resource "aws_lambda_function" "func" {
  filename      = var.filename
  function_name = "soundmonitor-reporter"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.handler"
  runtime       = "nodejs12.x"
  source_code_hash = filebase64sha256(var.filename)

  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
    aws_cloudwatch_log_group.soundmonitor-reporter
  ]

  environment {
    variables = {
      KAFKA_ENDPOINTS = "200.69.103.29:26240",
      TOPIC = "audio-upload-event"
    }
  }
}