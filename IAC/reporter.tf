module "reporter" {
  source = "git::https://github.com/kgordillo-hub/SoundMonitor-IAC-Infrastructure-Common.git//use-cases/lambda_s3_kafka?ref=4.0.0"

  aws_provider_key= var.aws_provider_key
  aws_provider_secret= var.aws_provider_secret

  kafka_bootstrap_server_one= var.kafka_bootstrap_server_one
}
