# POD

### Para ejecutar el manifiesto

```
kubectl apply -f 01-pod.yaml

```

### Para listar pods

```
kubectl get pods
kubectl get po
```

### Para obtener información de un pod

```
kubectl get po <nombre pod> -o yaml
kubectl get po <nombre pod> -o json
```

### Descripción de un pod

```
kubectl describe po <nombre pod>
```

### Para obtener el log de un pod

```
kubectl logs <nombre pod>
```

### Para eliminar un manifiesto

```
kubectl delete -f 01-pod.yaml
```
