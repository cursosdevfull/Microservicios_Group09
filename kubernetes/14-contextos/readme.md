# Contextos

### Contexto actual

```
kubectl config current-context
```

### Para listar los contextos

```
kubectl config view
```

### Crear un contexto

```
kubectl config set-context ctx-ms --cluster=docker-desktop --user=user-ms
```

### Cambiar de contexto

```
kubectl config use-context ctx-ms
```
