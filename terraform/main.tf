provider "aws" {
  region = var.region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_instance" "docker_host" {
  ami           = "ami-0c02fb55956c7d316"
  instance_type = var.instance_type

  # key_name = var.key_name

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y docker
              service docker start
              docker run -d -p 8080:8080 ${var.docker_image}
              EOF

  tags = {
    Name = var.instance_name
  }
}