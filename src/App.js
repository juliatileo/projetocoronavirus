import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Loading from 'react-loading'
import styled from 'styled-components'

export default class App extends React.Component {
	state = {
		pais: [],
		total: '',
		paginator: 20,
		carregado: false
	}

	compare = (a, b) => {
		if (a.latest.confirmed < b.latest.confirmed) {
			return -1
		}
		if (a.latest.confirmed > b.latest.confirmed) {
			return 1
		}
		return 0
	}

	requisicao = () => {
		const virusURL =
			'https://coronavirus-tracker-api.herokuapp.com/v2/locations'

		axios
			.get(virusURL)
			.then(res => {
				let filtro = res.data.locations
				filtro.sort(this.compare)
				console.log(res)
				this.setState({
					pais: filtro.reverse(),
					carregado: true
				})
			})
			.catch(res => {
			})

		axios
			.get('https://coronavirus-tracker-api.herokuapp.com/v2/latest')
			.then(res => {
				console.log(res)
				this.setState({
					total: res.data.latest.confirmed
				})
			})
			.catch(res => {
			})
	}

	paginar = () => {
		this.setState({
			paginator: this.state.paginator + 50
		})
	}

	componentDidMount() {
		this.requisicao()
		setInterval(this.requisicao, 5000)
		let splash = document.querySelector('.splash')
		setTimeout(() => {
			splash.style.display = 'none'
		}, 3000)
	}

	render() {
		const { paginator } = this.state
		return (
			<>
				<Splash className="splash">Coronaveres by Leonardo</Splash>
				<div className="container">
					<Nav>
						<p id="logo">Coronaveres</p>
					</Nav>
					<br /><br /><br /><br />
					<div style={{
						textAlign: 'center',
						fontSize: '30px',
						color: '#1b8251'
					}}>
						<h2>{this.state.total}</h2>
						<p style={{
							fontSize: '25px',
							color: '#1b8251'
						}}>casos confirmados</p></div>

					<div
						className="row"
						style={{
							display: 'flex',
							justifyContent: 'space-around',
							margin: '10px',
							height: '400px',
							overflow: 'auto',
							border: '2px solid #1b8251',
							borderRadius: '3px'
						}}>
						{this.state.carregado ? this.state.pais.map((id, index) => (
							index < paginator
								? <div className="card col-md-5 p-2"
									key={id.id}
									style=
									{{
										margin: '10px 0',
										backgroundColor: '#ddf0e6',
									}}>
									<h3
										className="card-header"
										style={{
											borderBottom: 'none',
											backgroundColor: '#25b36f',
											color: 'white'
										}}>
										{id.country_code} {id.country}
									</h3>

									<h5 className="card-header" style={{
										backgroundColor: '#25b36f',
										color: 'white'

									}}>{id.province}</h5>

									<p className="card-text">
										<br />
									Casos confirmados: {id.latest.confirmed}
										<br />
									Mortes: {id.latest.deaths}
										<br />
									Recuperações: {id.latest.recovered}
									</p>
								</div> : null
						)) : <Loading type="spin" color={'#333'} height={50} width={50} ></Loading>}
					</div>

					<br />

					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							onClick={this.paginar}>Carregar mais</Button>
					</div>

					<br /> <br />
				</div>

				<DivContent>

					<h1>O que é coronavirus?</h1>

					<br />

					<p style={{
						textAlign: 'justify',
						fontSize: '17px'
					}}> 	Os coronavírus (CoV) são uma grande família viral,
						conhecidos desde meados dos anos 1960, que causam infecções respiratórias em seres humanos e em animais.
						Geralmente, infecções por coronavírus causam doenças respiratórias leves a moderada, semelhantes a um resfriado comum.
						A maioria das pessoas se infecta com os coronavírus comuns ao longo da vida, sendo as crianças pequenas mais propensas
						a se infectarem. Os coronavírus comuns que infectam humanos são alpha coronavírus 229E e NL63 e beta coronavírus OC43, HKU1.
						Alguns coronavírus podem causar síndromes respiratórias graves,
						como a síndrome respiratória aguda grave que ficou conhecida pela sigla SARS da síndrome em inglês “Severe Acute Respiratory Syndrome”.
						</p>

					<p style={{
						textAlign: 'justify',
						fontSize: '17px'
					}}> SARS é causada pelo coronavírus associado à SARS (SARS-CoV), sendo os primeiros relatos na China em 2002.
						O SARS-CoV se disseminou rapidamente para mais de doze países na América do Norte, América do Sul, Europa e Asia,
						infectando mais de 8.000 pessoas e causando entorno de 800 mortes, antes da epidemia global de SARS ser controlada em 2003.
						Desde 2004, nenhum caso de SARS tem sido relatado mundialmente.
						</p>


				</DivContent>

				<DivContent style={{
					backgroundColor: '#1b8251',
					color: 'white',
				}}>

					<h1>Sintomas</h1>

					<br />

					<p style={{
						fontSize: '19px'
					}}>
						Os sintomas variam muito de pessoa para pessoa, de acordo com a idade e se está ou não no grupo de risco. Os mais comuns são:
					</p>

					<br />

					<div className="imagecontent">

						<div>

							<h1>Febre</h1>
							<img src="https://cdn.dribbble.com/users/35810/screenshots/2302971/wagepoint-call-sick-shot.jpg" alt="imagem" width="300" height="225"></img>

						</div>

						<div>

							<h1>Tosse</h1>
							<img src="https://cdn.dribbble.com/users/296983/screenshots/2777198/dribbble-01.png" alt="imagem" width="300" height="225"></img>

						</div>

						<div>

							<h1>Dor de garganta</h1>
							<img src="https://cdn.dribbble.com/users/1294330/screenshots/3243911/pilek.png" alt="imagem" width="300" height="225"></img>

						</div>

					</div>

				</DivContent>

				<DivContent>

					<h1>Quem são os mais afetados?</h1>

					<br />

					<p style={{
						textAlign: 'justify',
						fontSize: '17px'
					}}>
						Os mais afetados pelo vírus são aqueles no grupo de risco. O grupo de risco consiste de idosos, pessoas com uma condição
						pré-existente e imunossuprimidos. Pessoas acima de 60 anos são consideradas de risco porque a própria idade já faz com que
						a capacidade do sistema imunológico de combater infecções seja menor.
						</p>
					<p style={{
						textAlign: 'justify',
						fontSize: '17px'
					}}>Algumas doenças crônicas, como diabetes e hipertensão também pode agravar a covid-19.
						Se o indivíduo for insulinodependente e o nível de glicose no sangue estiver estabilizado,
						não há grandes preocupações.
						O risco maior é para pessoas que, por muito tempo, permaneceram ou permanecem com níveis altos de açúcar no sangue.
						Depois de um tempo de evolução, a diabetes causa danos em alguns órgãos ou sistemas do organismo.
					</p>

					<p style={{
						textAlign: 'justify',
						fontSize: '17px'
					}}>
						O organismo de pessoas imunossuprimidas tem menor capacidade de lidar com vírus e bactérias. O mais comum é em pessoas em
						tratamento contra câncer que fazem quimioterapia e radioterapia.
					</p>

				</DivContent>

				<hr style={{
					border: '1px solid #1b8251',
					width: '70vw',
				}}></hr>

				<DivContent>

					<h1>Como ocorre a transmissão?</h1>

					<br />

					<p style={{
						fontSize: '19px'
					}}>
						A transimissão ocorre através do contato de pessoa para pessoa normalmente pela tosse ou espirro.
					</p>

				</DivContent>

				<DivContent style={{
					backgroundColor: '#1b8251',
					color: 'white',
				}}>
					<h1>Prevenção</h1>

					<br />

					<div className="imagecontent">

						<div>
							<img src="https://portalarquivos2.saude.gov.br/images/png/2020/marco/02/img1-maos.png" alt="imagem" width="200px"></img><br />
							<p>Lave as mãos com água e sabão ou use álcool em gel.</p>
						</div>

						<div>
							<img src="https://portalarquivos2.saude.gov.br/images/png/2020/marco/02/img2-tosse.png" alt="imagem" width="200px"></img><br />
							<p>Cubra o nariz e boca ao espirrar ou tossir.</p>
						</div>

						<div>
							<img src="https://portalarquivos2.saude.gov.br/images/png/2020/marco/02/img3-pessoas.png" alt="imagem" width="200px"></img><br />
							<p>Evite aglomerações se estiver doente.</p>
						</div>

						<div>
							<img src="https://portalarquivos2.saude.gov.br/images/png/2020/marco/02/img4-janela.png" alt="imagem" width="200px"></img><br />
							<p>Mantenha os ambientes bem ventilados.</p>
						</div>

						<div>
							<img src="https://portalarquivos2.saude.gov.br/images/png/2020/marco/02/img5-objetos.png" alt="imagem" width="200px"></img><br />
							<p>Não compartilhe objetos pessoais.</p>
						</div>

					</div>

				</DivContent>

			</>
		)
	}
}

const Nav = styled.nav`
width: 100%;
position: fixed;
background-color: #47d18f;
box-shadow: 0px 2px 4px #999;
margin: 0 !important;
z-index: 20;
display: 'flex';
flex-direction: row;
justify-content: flex-end;
align-items: 'center';
padding: 12px 30px;
top: 0;
left: 0;
color: white;

& > #logo {
	font-size: 1.5rem;
	margin: 0;
	font-weight: bold;
	width: 60px !important;
}

& > div {
	position: absolute;
	right: 30px;
	top: 20px;
}
`

const Button = styled.button`
border: none;
background-color: #25b36f;
box-shadow: 0 0 0 2px #25b36f;
transition: 0.2s;
border-radius: 3px;
color: white;
padding: 5px;

&:hover{
	box-shadow: 0 0 0 3px #1b8251;
	background-color: #1b8251;
}

&:focus{
	outline: none;
}
`

const Splash = styled.div`
position: fixed;
background-color: #1b8251;
width: 100vw;
height: 100vh;
top: 0;
left: 0;
z-index: 100;
display: flex;
align-items:center;
justify-content: center;
font-size: 40px;
color: white;
font-weight: bold;
animation: splash;
animation-delay: 2.5s;
animation-duration: 0.5s;
`

const DivContent = styled.div`
width: 100%;
text-align: center;
color: #1b8251;
padding: 20px;
height: fit-content;
`