const API = `https://61c46c02f1af4a0017d99522.mockapi.io/people`;

const controller = async (path, method="GET", obj) =>{

	const options = {
		method: method,
		headers: {
			"content-type": "application/json"
		}
	}

	if(obj){
		options.body = JSON.stringify(obj);
	}

	try{

		let request = await fetch(path, options),
			response = await request.json();

		return response;

	} catch(err){
		console.log(err);
		return [];
	}

}



// FORM

const heroesForm = document.querySelector(`#heroesForm`);

let body = document.querySelector(`body`);
bodyload = async function(){

	let heroComics = heroesForm.querySelector(`select[data-name="heroComics"]`);

	let universes = await controller(`https://61c46c02f1af4a0017d99522.mockapi.io/countries`, "GET");
	for(let key in universes){
		heroComics.innerHTML += `<option value="${universes[key].country}">${universes[key].country}</option>`
	}
	// console.log(heroComics);

}
body.addEventListener(`load`, bodyload());



heroesForm.addEventListener(`submit`, async e=>{
	e.preventDefault();

	let heroName = e.target.querySelector(`input[data-name="heroName"]`).value;
	let heroComics = e.target.querySelector(`select[data-name="heroComics"]`).value;
	let heroFavourite = e.target.querySelector(`input[data-name="heroFavourite"]:checked`);

	if(heroFavourite){
		console.log(heroName, heroComics, `true`);

	} else {
		console.log(heroName, heroComics, `false`)
	}
	let person = {
		"name": heroName,
		"country": heroComics,
		"favourite": heroFavourite
	}

	console.log(person);

	let persons = await controller(`https://61c46c02f1af4a0017d99522.mockapi.io/people`);

	let personExist = persons.find(person => person.name === heroName);
	
	if(personExist){
		if(personExist.name === heroName){
		console.log(`Person exist`);
		new Person(personExist);
		} 
	} else {
		console.log(`Person not exists`);
		let newPerson = await controller(`https://61c46c02f1af4a0017d99522.mockapi.io/people`, "POST", person);
		new Person(newPerson);
	}


})

// TABLE

const tbody = document.querySelector(`#heroesTable`);


class Person{
	constructor(person){
		for(let key in person){
			this[key] = person[key]
		}
		this.render()
	}

	render(){


		let tr = document.createElement(`tr`);
		tr.innerHTML = `<td>${this.name}</td>
						<td>${this.country}</td>
						`

		let firstTd = document.createElement(`td`);
		tr.append(firstTd);

		let input = document.createElement(`input`);
		input.setAttribute("type", "checkbox");
		firstTd.append(input);

		

		let td = document.createElement(`td`);
		tr.append(td);

		let deleteBtn = document.createElement(`button`);
		td.append(deleteBtn);

		deleteBtn.innerHTML = `Delete`;
		deleteBtn.addEventListener(`click`, async ()=>{
			let deletedPerson = controller(`https://61c46c02f1af4a0017d99522.mockapi.io/people`+ `/${this.id}`, "DELETE");
			if(deletedPerson){
				tr.outerHTML = ``;
			}
		});

		// vfjvfj.addEventListener(`onchange`, ()=>{
		// 	console.log(`clicked`);
		// })

		heroesTable.append(tr);


	}
}



