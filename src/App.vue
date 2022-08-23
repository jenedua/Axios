 <!-- eslint-disable-next-line no-console -->
<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-alert show dismissible v-for="mensagen in mensagens"
			:key="mensagen.texto"
			:variant="mensagen.tipo"> {{ mensagen.texto}}</b-alert>
		<b-card>
			<b-form-group label="Nome:">
				<b-form-input type="text" size="lg"
				v-model="usuarios.nome" placeholder="Informe seu nome"></b-form-input>
			</b-form-group>
			<b-form-group label="E-mail:">
				<b-form-input type="email" size="lg"
				v-model="usuarios.email" placeholder="Informe seu E-mail"></b-form-input>
			</b-form-group>
			<hr>
			<b-button @click="Salvar"
			variant="primary" size="lg">
				Salvar
			</b-button>
			<b-button @click="obterUsuarios"
			variant="success" size="lg">
				Obter usuarios
			</b-button>

		</b-card>
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(usuario , id) in obterDados" :key="id">
			<strong>Nome:</strong> {{ usuario.nome }} <br>
			<strong>E-mail:</strong> {{ usuario.email }} <br>
			<strong>ID:</strong> {{ id }} <br>
			<b-button variant="warning" size="lg"
				@click="carregar(id)">Carregar</b-button>
				<b-button variant="danger" size="lg" class="ml-2"
					@click="excluir(id)">Excluir</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
// import axios from 'axios'
export default {
	// eslint-disable
	data(){
		return{
			obterDados: [],
			mensagens:[],
			id: null,
			usuarios :{
				nome: '',
				email: ''
			}
		}
	},
	methods: {
		limpar(){
			this.usuarios.nome = ''
			this.usuarios.email = ''
			this.id = null
			this.mensagens = []
			
		},
		carregar(id){
			this.id = id
			this.usuarios = {...this.obterDados[id]}
		},
		excluir(id){
			this.$http.delete(`/usuarios/${id}.json`)
			.then(() => this.limpar())
			.catch(() => {
				this.mensagens.push({
					texto: 'Problema para excluir',
					tipo: 'danger'
				})

			})
		},
		
		Salvar(){
			// this.$http.post('usuarios.json',this.usuarios)
			// .then(() => this.limpar())
			const metodo = this.id ? 'patch' : 'post'
			const finaUrl = this.id ? `/${this.id}.json` : '.json'
			this.$http[metodo](`/usuarios${finaUrl}`, this.usuarios)
			.then(() => {
				this.limpar()
				this.mensagens.push({
					texto: 'Operação realizado com sucesso!...',
					tipo: 'success'
				})

			})
		},
		obterUsuarios(){
			// axios.get('https://curso-vue-1c945-default-rtdb.firebaseio.com/usuarios.json').then(res => {
			// 	this.obterDados = res.data
			// 	//console.log(this.obterDados);

			// })
			this.$http.get('usuarios.json').then(res => {
				this.obterDados = res.data
				//console.log(res.data);
			})

		}
	},
	
	// created (){		
	// this.$http.post('usuarios.json', {
	// 	nome: 'Maria',
	// 	email: 'maria@gmail.com'
	// }).then( resp => console.log(resp))
	// }

}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
