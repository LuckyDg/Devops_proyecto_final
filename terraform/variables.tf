variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "docker_image" {}
variable "key_name" {}
variable "region" {}
variable "instance_type" {
  default = "t2.micro"
}
variable "instance_name" {
  default = "MyWebInstance"
}