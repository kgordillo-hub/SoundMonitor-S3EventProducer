variable "records_bucket_arn" {
  description =  "audio files bucket ARN"
}

variable "records_bucket_name" {
  description =  "audio files bucket NAME"
}

variable "aws_region" {
  description = "aws region to deploy"
  default = "us-east-1"
}

variable "filename" {
  description = ".zip function name"
  default = "function.zip"
}

variable "aws_provider_key" {
  description = "AWS key for deploy and infrastructure providing"
}

variable "aws_provider_secret" {
  description = "AWS secret for deploy and infrastructure providing"
}

variable "kafka_data_upload_event" {
  description = "Kafka event of data uploading"
}

variable "kafka_bootstrap_server_one" {
  description =  "Endpoint of kafka server one"
}