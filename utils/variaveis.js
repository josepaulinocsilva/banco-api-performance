const configLocal = JSON.parse(open("../config/config.local.json")); // ler o arquivo de configuração local, que contém a baseUrl

export function pegarBaseUrl() {
  // forma de fazer a validação de variáveis de ambiente, caso não seja passada, ele vai pegar o valor default.
  return __ENV.BASE_URL || configLocal.baseUrl;
}
