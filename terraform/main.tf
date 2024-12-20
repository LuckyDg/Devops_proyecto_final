provider "aws" {
  region = var.region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_s3_bucket" "test_bucket" {
  bucket = "jenkins-terraform-test-bucket-${random_id.id.hex}"
  acl    = "private"

  tags = {
    Name        = "JenkinsTestBucket"
    Environment = "Dev"
  }
}

resource "random_id" "id" {
  byte_length = 8
}
