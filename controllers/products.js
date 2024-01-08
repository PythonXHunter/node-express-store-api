const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
	const product = await Product.find({}).sort({ price: 1 });
	res.status(200).json({ product, query_length: product.length });
}


const getAllProducts = async (req, res) => {
	const { featured, company, name, sort } = req.query;
	// console.log(featured);
	const queryObject = {}
	if(featured){
		queryObject.featured = featured === 'true' ? true : false;
	}
	if(company){
		queryObject.company = company;
	}
	if(name){
		queryObject.name = {$regex: name, $options: 'i' };
	}
	// console.log(name);
	// const products = await Product.find(queryObject);
	let result = Product.find(queryObject);
	if(sort){
		// console.log(typeof sort);
		const filterString = sort.split(',').join(' ');
		// console.log(filterString);
		result = result.sort(filterString);
	} else {
		result = result.sort('createAt');
	}
	const products = await result;
	// console.log(queryObject);
	res.status(200).json({ products, query_length: products.length });
}

module.exports = {
	getAllProductsStatic,
	getAllProducts,
}