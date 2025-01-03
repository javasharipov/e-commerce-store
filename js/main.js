const wrapperEl = document.querySelector('.wrapper')
const loadingEl = document.querySelector('.loading__wrapper')
const seeMoreBTn = document.querySelector('.see_more')
const BASE_URL = 'https://dummyjson.com'

async function fetchData(endpoint) {
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`)
		const res = await response.json()
		createCard(res)
	} catch (err) {
		console.log(err)
	} finally {
		loadingEl.style.display = 'none'
		seeMoreBTn.removeAttribute('disabled')
	}
}

window.addEventListener('load', () => {
	createLoading(8)
	fetchData('/products?limit=8')
})

function createLoading(n) {
	loadingEl.style.display = 'flex'
	loadingEl.innerHTML = ''
	Array(n)
		.fill()
		.forEach(() => {
			const div = document.createElement('div')
			div.className = 'loading__item1'
			div.innerHTML = `
				<div class="item"></div>
				<div class="item2"></div>
			`
			loadingEl.appendChild(div)
		})
}

function createCard(data) {
	wrapperEl.innerHTML = ''
	// while (wrapperEl.firstChild) {
	// 	wrapperEl.firstChild.remove()
	// }
	data.products.forEach(product => {
		const divEl = document.createElement('div')
		divEl.className = 'card'
		divEl.innerHTML = `
			<div class="card__image">
				<img src="${product.thumbnail}" alt="">
			</div>
			<div class="wishlist__btn">
				<button><img src="./assets/heart.svg" alt=""></button>
			</div>
			<div class="card__content">
				<span>${product.title}</span>
				<div class="card__details">
					<strong>${product.price}$</strong>
					<div class="reviews">
						<img src="./assets/star.svg" alt="">
						<img src="./assets/star.svg" alt="">
						<img src="./assets/star.svg" alt="">
						<img src="./assets/emptystar.svg" alt="">
						<img src="./assets/emptystar.svg" alt="">
						<span>(${product.stock})</span>
					</div>
				</div>
			</div>
		`
		wrapperEl.appendChild(divEl)
	})
}
let offset = 1

seeMoreBTn.addEventListener('click', () => {
	seeMoreBTn.setAttribute('disabled', true)
	seeMoreBTn.textContent = 'Loading ...'
	createLoading(8)
	offset++
	fetchData(`/products?limit=8&skip=${(offset - 1) * 8}`)
})
