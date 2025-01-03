const wrapperEl = document.querySelector('.wrapper')
const loadingEl = document.querySelector('.loading__wrapper')
const seeMoreBTn = document.querySelector('.see_more')
const categoryEl = document.querySelector('.category')
const categoryItemElEl = document.querySelector('.category__loading__wrapper')

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
		seeMoreBTn.textContent = 'See more'
	}
}

window.addEventListener('load', () => {
	createLoading(8)
	fetchData('/products?limit=8')
	fetchCategory('/products/category-list')
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

async function fetchCategory(endpoint) {
	const response = await fetch(`${BASE_URL}${endpoint}`)
	response
		.json()
		.then(res => {
			createCategory(res)
		})
		.catch()
		.finally(() => {
			categoryItemElEl.style.display = 'none'
		})
}

function createCategory(data) {
	data.forEach(category => {
		const categoryItemEl = document.createElement('div')
		categoryItemEl.className = 'category__item'
		categoryItemEl.dataset.category = `/products/category/${category}`
		categoryItemEl.innerHTML = `
			<img src="./assets/Category-CellPhonphonee.svg" alt="">
			<span>${category}</span>
		`
		categoryEl.appendChild(categoryItemEl)
		categoryItemEl.addEventListener('click', e => {
			const endpoint = e.currentTarget.dataset.category
			wrapperEl.innerHTML = ''
			fetchData(`${endpoint}?limit=8`)
		})
	})
}
