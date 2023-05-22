# Despliegue local

### Crear un contenedor de registry

```
docker run -d -p 5000:5000 --restart always --name registry registry:2
```

### Instalar el ingress controller

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.0/deploy/static/provider/cloud/deploy.yaml
```
