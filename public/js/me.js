let urlParams = new URLSearchParams(location.search);

let params = {
	category: 0,
	color: 0,
	brand: 0,
	min: 0,
	max: 150,
	limit: 9,
	page: 1,
	sort: 'name',
	search: '',
};

for (let key in params) {
	if (!urlParams.has(key)) {
		urlParams.append(key, params[key]);
	}
}

document.addEventListener('DOMContentLoaded', function (event) {
	document.getElementById('sort').value = urlParams.get('sort');
	document.getElementById('limit').value = urlParams.get('limit');
	document.getElementById('search').value = urlParams.get('search');

	document.getQuerySelectorAll('#pagination li').addClass('page-item');
	document.getQuerySelectorAll('#pagination li a').addClass('page-link');

	let savePage = urlParams.get('page');
	Array.from(document.querySelectorAll('div')).forEach((element, index) => {
		let page = element.attributes('href').split('=')[1];
		urlParams.set('page', page);
		let href = '/products?' + urlParams.toString();
		element.attributes('href', href);
	});
	urlParams.set('page', savePage);
});

function selectParam(key, value, reset = false) {
	if (reset) {
		for (let key in params) {
			urlParams.set(key, params[key]);
		}
	}
	urlParams.set(key, value);
	var url = `/products?${urlParams.toString()}`;
	location.href = url;
}

function getUrlParams() {
	return urlParams;
}
