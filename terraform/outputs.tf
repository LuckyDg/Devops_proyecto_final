output "instance_id" {
  value = aws_instance.docker_host.id
}

output "instance_public_ip" {
  value = aws_instance.docker_host.public_ip
}

output "public_ip" {
  value = aws_instance.docker_host.public_ip
}
