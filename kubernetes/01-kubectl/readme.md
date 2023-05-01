# Kubectl

### Para crear un pod

```
kubectl run server --image=nginx:alpine
```

### Para conectar un pod específico

```
kubectl port-forward server 7500:80
```

### Comandos básicos

```
kubectl version
kubectl api-resources
kubectl api-versions
```
