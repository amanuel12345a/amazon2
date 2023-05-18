import axios from 'axios'
export async function ProductsData(){
    let data = await axios.get('https://fakestoreapi.com/products')
    return data
}