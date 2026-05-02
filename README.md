# Assignment-08: Despliegue de Aplicación con Kubernetes y ArgoCD

Este proyecto consiste en desplegar una aplicación en Kubernetes utilizando Minikube, Docker y ArgoCD para la gestión de despliegues.

Se implementó un flujo básico de CI/CD donde la aplicación es gestionada desde un repositorio Git y sincronizada automáticamente en el clúster.

## Pasos realizados

1. Creación de la aplicación en Node.js
2. Creación de imagen Docker
3. Despliegue en Kubernetes usando Deployment y Service
4. Instalación de ArgoCD en el clúster
5. Exposición de servicios mediante port-forward
6. Conexión del repositorio Git con ArgoCD
7. Despliegue automático desde la rama assignment-08

Dominio configurado:

argo.luis-deleon.com


<img width="1600" height="801" alt="03f64f13-9cf4-4d62-b2c9-539e5db5df11" src="https://github.com/user-attachments/assets/cc868107-4f26-4e82-864d-b2d3b000eb78" />
<img width="1600" height="289" alt="281774d6-1bf9-42e6-8b1a-41b54ed01487" src="https://github.com/user-attachments/assets/f4d3a26a-cee6-4487-b9a5-caf8f1b31de5" />


# Iniciar Minikube
minikube start --driver=docker

# Verificar estado
minikube status

# Configurar kubectl
kubectl get nodes

# Desplegar aplicación
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Ver pods
kubectl get pods

# Ver servicios
kubectl get svc

# Exponer aplicación
kubectl port-forward svc/mi-app-service 3000:3000

# Instalar ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Ver pods de ArgoCD
kubectl get pods -n argocd

# Acceder a ArgoCD
kubectl port-forward svc/argocd-server -n argocd 8080:80

# Obtener contraseña de ArgoCD (Windows)
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String((kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}")))
