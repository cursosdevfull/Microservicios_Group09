const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

fetch("/api/config")
  .then((res) => res.json())
  .then((res) => {
    fetch(res.pathBackend1)
      .then((res) => res.json())
      .then((res) => {
        msg1.innerHTML = res.msg01;
        msg2.innerHTML = res.msg02;
      });
  });
