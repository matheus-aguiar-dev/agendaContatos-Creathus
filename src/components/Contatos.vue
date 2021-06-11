<template>
  <div class="tablet">
    <h1>Contatos</h1>
    <div v-if="loading"><h1>Carregando...</h1></div>

    <div v-else>
      <div v-if="!isEditing">
        <form @submit="validate" action="/http://localhost:8080/novo-contato"  method="post" novalidate="true" >
         <p v-if="errors.length">
    <b>Corrija o(s) seguinte(s) erro(s):</b>
    <ul>
      <li v-for="(error,index) in errors" :key='index'>{{ error }}</li>
    </ul>
  </p>
          <input type="text" placeholder="Nome:" v-model="contatoNome" />
          <input
            type="radio"
            @change="onChange($event)"
            class="inline"
            value="Masculino"
            v-model="contatoSexoChecked"
          />
          Homem
          <input
            type="radio"
            @change="onChange($event)"
            value="Feminino"
            v-model="contatoSexoChecked"
          />
          Mulher<br />
          <input type="text" placeholder="Email:" v-model="contatoEmail" />
          <input type="text" placeholder="Número 9xxxxxxxx" v-model="contatoNumero" /><br />
          <input class="form-submit-button" type="submit" value="Add">
        </form>
      </div>
      <div v-else>

      <form @submit="validateUpdate" action="/http://localhost:8080/novo-contato"  method="post" novalidate="true" >
         <p v-if="errors.length">
    <b>Corrija o(s) seguinte(s) erro(s):</b>
    <ul>
      <li v-for="(error,index) in errors" :key='index'>{{ error }}</li>
    </ul>
  </p>
          <input type="text" placeholder="Nome:" v-model="contatoNome" />
          <input
            type="radio"
            @change="onChange($event)"
            class="inline"
            value="Masculino"
            v-model="contatoSexoChecked"
          />
          Homem
          <input
            type="radio"
            @change="onChange($event)"
            value="Feminino"
            v-model="contatoSexoChecked"
          />
          Mulher<br />
          <input type="text" placeholder="Email:" v-model="contatoEmail" />
          <input type="text" placeholder="Número 9xxxxxxxx" v-model="contatoNumero" /><br />
          <input class="updateButton " type="submit" value="Editar">
        </form>
      </div>

      <div v-for="(contato, index) of contatos" :key="contato.id" class='divFlex  '>
        <div class="divFlexContent">

        <h4>Nome: {{ contato.nome }}</h4>
        <h4>Sexo: {{ contato.sexo }}</h4>
        <h4>Email: {{ contato.email }}</h4>
        <h4>Numero: {{ contato.numero }}</h4>

        </div>
        <button class="editButton" @click="editContato(index, contato.nome, contato.sexo,contato.email,contato.numero)">Editar</button>
        <button class="deleteButton" @click="removeContato(index)">Deletar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {

  data() {
    return {
      errors: [],
      showErrors:[],
      requestSent: true,
      isEditing: false,
      contatoSelecionado: null,
      loading: true,
      contatos: null,
      contatoNome: null,
      contatoSexo: "",
      contatoSexoChecked: false,
      contatoEmail: "",
      contatoNumero: "",
      id: null,
    };
  },
  
  methods: {

    /*
    Função responsável pela validação de cada um dos campos
  */
    validate(e) {
      /*
      Validação nome de contato, basta apenas escrever alguma coisa para ser dado como válido
      */
      this.errors=[]
      if (!this.contatoNome) {
        this.errors.push("Insira o nome.");
                this.requestSent=false;

      }
      /*
        Apenas é necessário marcar o input radio para passar dessa etapa
      */
      if(!this. contatoSexoChecked){
        this.errors.push("Insira o sexo")
                this.requestSent=false;

      }
      /*
        Aqui a validação foi dada da seguinte forma, é obrigatório ao menos um caracter antes do "@"
         também sendo necessário um caracter antes do ponto e dois caracteres após
      */
      if (!this.contatoEmail) {
        this.errors.push('Insira email para contato.');
                this.requestSent=false;

      } else if (!this.validEmail(this.contatoEmail)) {
        this.errors.push('Valid email required.');
                this.requestSent=false;

      }
      /*
        A validação de número de contato é a seguinte, é necessário uma string composta por 9 caracteres 
        O primeiro caracter tem que ser obrigatoriamente 9
      */
      if(!this.contatoNumero){
        this.errors.push('Insira um numero para contato.');
                this.requestSent=false;

      }else if (!this.validCelular(this.contatoNumero)) {
        this.errors.push('Insira numero valido para contato.');
        this.requestSent=false;

      }
      /*
        Se todas as condições de validações foram passadas, está tudo pronto para armazenar o dado para nosso array of objects de informações

      */
      if(this.requestSent){
        this.contatos.push({nome: this.contatoNome,
        sexo: this.contatoSexo,
        email: this.contatoEmail,
        numero: this.contatoNumero,})
        this.contatoNome = "";
        this.contatoSexo = "";
        this.contatoEmail = "";
        this.contatoNumero = "";
        this.contatoSexoChecked= false;
        console.log("POST request para armazenar novo contato")
        axios.post("http://localhost:8080/novo-contato", this.contatos[this.contatos.length-1])
        .then((response)=>{
          console.log(response)
        }).catch((error)=>{
          console.log(error)
        })
         
      }
      this.requestSent=true;
      e.preventDefault();
    },
    validateUpdate(e) {
      /*
      Validação nome de contato, basta apenas escrever alguma coisa para ser dado como válido
      */

      this.errors=[]
      this.isEditing = true;

      if (!this.contatoNome) {
        this.errors.push("Insira o nome.");
                this.requestSent=false;
      }
      /*
        Apenas é necessário marcar o input radio para passar dessa etapa
      */
      if(!this. contatoSexoChecked){
        this.errors.push("Insira o sexo")
                this.requestSent=false;

      }
      /*
        Aqui a validação foi dada da seguinte forma, é obrigatório ao menos um caracter antes do "@"
         também sendo necessário um caracter antes do ponto e dois caracteres após
      */
      if (!this.contatoEmail) {
        this.errors.push('Insira email para contato.');
                this.requestSent=false;

      } else if (!this.validEmail(this.contatoEmail)) {
        this.errors.push('Valid email required.');
                this.requestSent=false;

      }
      /*
        A validação de número de contato é a seguinte, é necessário uma string composta por 9 caracteres 
        O primeiro caracter tem que ser obrigatoriamente 9
      */
      if(!this.contatoNumero){
        this.errors.push('Insira um numero para contato.');
                this.requestSent=false;

      }else if (!this.validCelular(this.contatoNumero)) {
        this.errors.push('Insira numero valido para contato.');
        this.requestSent=false;

      }
      /*
        Se todas as condições de validações foram passadas, está tudo pronto para armazenar o dado para nosso array of objects de informações

      */
      if(this.requestSent){
        
      console.log("PUT request para atualizar um contato especifico")
      axios.put("http://localhost:8080/contatos-id", this.contatos[this.selectedIndex]).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
        this.contatos.splice(this.selectedIndex, 1, {
        nome: this.contatoNome,
        sexo: this.contatoSexo,
        email: this.contatoEmail,
        numero: this.contatoNumero,
      });
        this.contatoNome = "";
      this.contatoSexo = "";
      this.contatoEmail = "";
      this.contatoNumero = "";
      this.contatoSexoChecked= false,      
      this.isEditing = false;
        
         
      }
      this.requestSent=true;
      e.preventDefault();
    },

    /*
      Função Regex usada para validação de email
      */
    validEmail: function (email) {
      const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reEmail.test(email);
    },
    /*
      Função Regex usada para validação de numero
      */
    validCelular: function(telefone){
      const reCel = /^(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/
      return reCel.test(telefone);
    },
    /*
      Para observar cada mudança no input de gênero
      */
    onChange(e) {
      this.contatoSexo = e.target.value;
    },
    /*
      Função responsável por remover o contato
      */
    removeContato(index) {
      console.log("DELETE request ")
      axios
      .delete("http://localhost:8080/delete-contato", this.contatos[index])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error); 
      });
      this.contatos.splice(index, 1);

    },
    /*
      Função responsável por atualizar um contato já salvo
      
      */
    updateContato() {
      console.log("PUT request para atualizar um contato especifico")
      axios.put("http://localhost:8080/contatos-id", this.contatos[this.selectedIndex]).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
      this.contatos.splice(this.selectedIndex, 1, {
        nome: this.contatoNome,
        sexo: this.contatoSexo,
        email: this.contatoEmail,
        numero: this.contatoNumero,
        
      });
      this.contatoNome = "";
      this.contatoSexo = "";
      this.contatoEmail = "";
      this.contatoNumero = "";
      this.contatoSexoChecked= false,      
      this.isEditing = false;
      

    },
    /*
      Função responsável por pegar as informações do contato que queremos editar
      */
    editContato(index, nome,sexo,email,numero) {
      
      this.isEditing = true;
      this.contatoNome = nome;
      this.contatoSexo = sexo;
      this.contatoEmail = email;
      this.contatoNumero = numero;
      this.selectedIndex = index;
     
    },
  },
  /*
      Função destinada a requisitar os dados armazenados no datas-mock e salvar em nosso object of arrays de contatos
      */
  created() {
    console.log("GET request para pegar dados da API do data-mocks")
    axios
      .get("http://localhost:8080/contatos")
      .then((response) => {
        console.log(response);
        this.contatos = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error); 
      });
  },
};
</script>

<style>
  .tablet{
    position: relative;
    width: 768px;
    height: 1024px;
    margin: auto;
    border: 16px black solid;
    border-top-width: 60px;
    border-bottom-width: 60px;
    border-radius: 36px;
    background: #aaa;
    overflow: auto;

}
.divFlex{
  margin-top: 30px;
  background: rgb(241, 239, 239);
	display: flex;
	flex-wrap: wrap;
}
.divFlexContent{
  flex-grow: 1;
	width: 33%;
	height: 150px;
}
h4{
  margin-top: 10px;
  margin-bottom: 10px;
}
  .editButton {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 20px 10px;
  height: 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 20px 20px 0px 0px;
  cursor: pointer;
}
.deleteButton {
  background-color: #f5140c;
  border: none;
  color: white;
  padding: 20px 10px;
  height: 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 20px 20px 0px 0px;
  cursor: pointer;
}
 
.form-submit-button {
     background: #0066A2;
     color: white;
     margin-top: 20px;
     border-style: outset;
     border-color: #0066A2;
     height: 50px;
     width: 100px;
     font: bold 15px arial, sans-serif;
     text-shadow:none;
} 
.updateButton {
     background: #44ac4c;
     color: white;
     margin-top: 20px;
     border-style: outset;
     border-color: #19d823;
     height: 50px;
     width: 100px;
     font: bold 15px arial, sans-serif;
     text-shadow:none;
} 
</style>
