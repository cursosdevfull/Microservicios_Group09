# Certificates

### Crear el key

```
openssl genrsa -out cursosdev.key 2048
```

### Crear la solicitud

```
openssl req -new -key cursosdev.key -out cursosdev.csr -subj "/CN=cursosdev/O=tech"
```

### Para generar el certificado final

openssl x509 -req -in cursosdev.csr -CA \\wsl.localhost\docker-desktop-data\data\kubeadm\pki\ca.crt -CAkey \\wsl.localhost\docker-desktop-data\data\kubeadm\pki\ca.key -CAcreateserial -out cursosdev.crt -days 500
