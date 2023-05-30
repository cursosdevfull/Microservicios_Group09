# Cluster Autoscaler

### Descargar el manifiesto del autoscaler

```
curl -o cluster-autoscaler-autodiscovery.yaml https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml
```

### Aplicar el manifiesto

```
kubectl apply -f cluster-autoscaler-autodiscover.yaml
```

### Editar el manifiesto del deployment del cluster autoscaler

```
kubectl edit deployment.apps/cluster-autoscaler -n kube-system
```
