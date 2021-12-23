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

const tbody = document.querySelector(`#heroesTable`);

// FORM

const heroesForm = document.querySelector(`#heroesForm`);

let body = document.querySelector(`body`);
bodyload = async function(){

	let heroComics = heroesForm.querySelector(`select[data-name="heroComics"]`);

	let universes = await controller(`https://61c46c02f1af4a0017d99522.mockapi.io/countries`, "GET");
	for(let key in universes){
		heroComics.innerHTML += `<option value="${universes[key].country}">${universes[key].country}</option>`
	}

}
body.addEventListener(`load`, bodyload());



heroesForm.addEventListener(`submit`, async e=>{
	e.preventDefault();

	let heroName = e.target.querySelector(`input[data-name="heroName"]`).value;
	let heroComics = e.target.querySelector(`select[data-name="heroComics"]`).value;
	let heroFavourite = e.target.querySelector(`input[data-name="heroFavourite"]`).checked;

	let person = {
		"name": heroName,
		"country": heroComics,
		"favourite": heroFavourite
	}

	console.log(person);

	let persons = await controller(`https://61c46c02f1af4a0017d99522.mockapi.io/people`);

	let personExist = persons.find(person => person.name === heroName);
	
	if(personExist){
		if(
			personExist.name != heroName ||
			personExist.country != heroComics || 
			personExist.favourite != heroFavourite 
		) {
			console.log(`Person exist`);
			await controller(`https://61c46c02f1af4a0017d99522.mockapi.io/people/` + personExist.id, "PUT", person);
			personExist.country = person.country
			personExist.favourite = person.favourite
			personTR = tbody.querySelector('#tr-'+personExist.id);
			if (personTR) {
				personTR.outerHTML = '';
			}
            new Person(personExist);
			} 
	} else {
		console.log(`Person not exists`);
		let newPerson = await controller(`https://61c46c02f1af4a0017d99522.mockapi.io/people`, "POST", person);
		new Person(newPerson);
	}
})

// TABLE



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
		tr.setAttribute("id", "tr-"+this.id)
		let firstTd = document.createElement(`td`);
		tr.append(firstTd);

		let input = document.createElement(`input`);
		input.setAttribute("type", "checkbox");
		input.checked = this.favourite;

		firstTd.append(input);

		input.addEventListener(`change`, async ()=>{
            this.favourite = input.checked
			let persons = await controller(`https://61c46c02f1af4a0017d99522.mockapi.io/people/`+ this.id, "PUT", this)
			console.log(input.checked);
		})
		

		let td = document.createElement(`td`);
		tr.append(td);

		let deleteBtn = document.createElement(`button`);
		td.append(deleteBtn);

		deleteBtn.innerHTML = `Delete`;
		deleteBtn.addEventListener(`click`, async ()=>{
			let deletedPerson = await controller(`https://61c46c02f1af4a0017d99522.mockapi.io/people/`+ this.id, "DELETE");
			if(deletedPerson){
				tr.outerHTML = ``;
			}
		});

		heroesTable.append(tr);

	}
}



