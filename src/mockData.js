import { injectMocks } from "data-mocks";

const initMocks = () => {
  const scenarios = {
    default: [
      {
        url: /contatos/,
        method: "GET",
        response: [
          {
            id: 0,
            nome: "Matheus Aguiar",
            sexo: "Masculino",
            email: "Matheus__aguiar@outlook.com",
            numero: "984743963",
          },
        ],
      },
      {
        url: /contatos-id/,
        method: "GET",
        response: {
          id: "getId",
          nome: "getNome",
          sexo: "getSexo",
          email: "getEmail",
          numero: "getNumero",
        },
      },
      {
        url: /novo-contato/,
        method: "POST",
        response: {
          id: "getId",
          nome: "getNome",
          sexo: "getSexo",
          email: "getEmail",
          numero: "getNumero",
        },
      },
      {
        url: /contatos-id/,
        method: "PUT",
        response: {
          id: "novoId",
          nome: "novoNome",
          sexo: "novoSexo",
          email: "novoEmail",
          numero: "novoNumero",
        },
      },
      {
        url: /delete-contato/,
        method: "DELETE",
        response: {
          id: "deleteId",
          nome: "deleteNome",
          sexo: "deleteSexo",
          email: "deleteEmail",
          numero: "deleteNumero",
        },
      },
    ],
  };
  injectMocks(scenarios);
};

export { initMocks };
