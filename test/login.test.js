import http from "k6/http";
//permite o check e sleep, no mesmo import do k6 para validar a resposta e simular o tempo de espera entre as requisições
import { check, sleep } from "k6";

export const options = {
  // Interações, ou seja, quantas vezes o teste vai rodar
  // iterations: 50,
  vus: 50, // quantidade de usuários virtuais
  duration: "30s", // duração do teste

  thresholds: {
    http_req_duration: ["p(90)<3000", "max<5000"], // 90% das requisições devem ser menores que 10ms e o máximo de 4ms
    http_req_failed: ["rate<0.01"], // a taxa de falhas deve ser menor que 1%
  },
};

export default function () {
  const url = "http://localhost:3000/login";

  const payload = JSON.stringify({
    username: "julio.lima",
    senha: "123456",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //validação de performance, só depois que o ckeck estiver ok.
  //const resposta = http.post(url, payload, params);
  //console.log(resposta);

  //validação de check, depois performance.
  const res = http.post(url, payload, params);
  check(res, {
    "Validar que o status é 200": (r) => r.status === 200,
    "Validar que o Token é string": (r) => typeof r.json().token === "string",
    "Validar que o Token não é vazio": (r) => r.json().token.length > 0,
  });

  sleep(1);
}
