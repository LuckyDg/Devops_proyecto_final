# Kubernetes and Docker Commands Guide

This guide consolidates commonly used Kubernetes, Docker, and general workflow commands for building, pushing, managing, and debugging your deployments. Use this as a reference to streamline your workflow.

---

## **General Workflow**

1. **Build Docker Image**

   ```bash
   docker build -t <image-name>:<tag> .
   ```

2. **Push Docker Image**

   ```bash
   docker push <image-name>:<tag>
   ```

3. **Delete Kubernetes Resources (All Pods, Deployments, Services)**

   ```bash
   kubectl delete -f <k8s-config-file.yaml>
   ```

4. **Apply Kubernetes Configuration**

   ```bash
   kubectl apply -f <k8s-config-file.yaml>
   ```

5. **Restart a Deployment**

   ```bash
   kubectl rollout restart deployment <deployment-name>
   ```

6. **View Logs for a Pod**

   ```bash
   kubectl logs -f <pod-name>
   ```

---

## **Building and Pushing Images**

1. **Build Image Locally**

   ```bash
   docker build -t luckydg/<image-name>:latest .
   ```

2. **Tag Image** (Optional, if pushing to a custom repository)

   ```bash
   docker tag luckydg/<image-name>:latest <your-docker-repo>/<image-name>:<tag>
   ```

3. **Push Image to Repository**

   ```bash
   docker push luckydg/<image-name>:latest
   ```

4. **List Local Images**

   ```bash
   docker images
   ```

5. **Remove a Local Image**

   ```bash
   docker rmi <image-id>
   ```

---

## **Kubernetes Commands**

### **Managing Pods and Deployments**

1. **Get All Pods**

   ```bash
   kubectl get pods
   ```

2. **Describe a Pod**

   ```bash
   kubectl describe pod <pod-name>
   ```

3. **Delete a Pod**

   ```bash
   kubectl delete pod <pod-name>
   ```

4. **Get All Deployments**

   ```bash
   kubectl get deployments
   ```

5. **Describe a Deployment**

   ```bash
   kubectl describe deployment <deployment-name>
   ```

6. **Scale a Deployment**

   ```bash
   kubectl scale deployment <deployment-name> --replicas=<number>
   ```

---

### **Managing Services**

1. **Get All Services**

   ```bash
   kubectl get services
   ```

2. **Describe a Service**

   ```bash
   kubectl describe service <service-name>
   ```

3. **Delete a Service**

   ```bash
   kubectl delete service <service-name>
   ```

---

### **Debugging and Logs**

1. **View Pod Logs**

   ```bash
   kubectl logs -f <pod-name>
   ```

2. **Check Events in a Namespace**

   ```bash
   kubectl get events --sort-by=.metadata.creationTimestamp
   ```

3. **Debug Connectivity from a Pod**

   ```bash
   kubectl exec -it <pod-name> -- sh
   curl <service-name>:<port>
   ```

4. **Inspect Environment Variables in a Pod**

   ```bash
   kubectl exec -it <pod-name> -- env
   ```

---

## **Full Workflow Example**

1. **Delete All Resources**

   ```bash
   kubectl delete -f k8s/
   ```

2. **Build Docker Images**

   ```bash
   docker build -t luckydg/api-users:latest ./api-users
   docker build -t luckydg/client-user-interface:latest ./client-ui
   ```

3. **Push Docker Images**

   ```bash
   docker push luckydg/api-users:latest
   docker push luckydg/client-user-interface:latest
   ```

4. **Apply Kubernetes Configurations**

   ```bash
   kubectl apply -f k8s/
   ```

5. **Debug Logs and Connectivity**

   - Check logs:
     ```bash
     kubectl logs -f <pod-name>
     ```
   - Test connectivity inside a pod:
     ```bash
     kubectl exec -it <pod-name> -- sh
     curl http://api-users-service:64001/api/auth/register
     ```

### Pruebas

```bash
kubectl delete pods --all
kubectl delete svc --all
kubectl delete deployment --all
kubectl delete secret --all
kubectl delete configmap --all

kubectl delete -f k8s/configmap.yml
kubectl delete -f k8s/service.yml
kubectl delete -f k8s/deployment.yml
kubectl delete -f k8s/secret.yml

kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/service.yml
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/secret.yml

kubectl get pods
kubectl get svc

kubectl logs api-users-deployment-f5f75f76d-bj6km

docker build -t luckydg/client-user-interface:latest ./client-user-interface
docker push luckydg/client-user-interface:latest

docker build -t luckydg/ms-auth:latest ./api-users
docker push luckydg/ms-auth:latest

minikube service api-users-service --url
minikube service client-user-interface-angular-service --url
```