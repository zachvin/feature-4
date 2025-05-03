const k8s = require("@kubernetes/client-node");

const kc = new k8s.KubeConfig();
kc.loadFromFile("config");

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod({ namespace: "default" }).then((res) => {
  //   console.log(res);
  res.items.forEach((pod) => {
    console.log(pod.spec);
    pod.spec.containers.forEach((container) => {
      console.log(container.image);
    });
  });
});
