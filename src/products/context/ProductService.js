import requestGenerico from "../../services/HttpCliente";

export const productService ={

async getAllProducts(){
    try{
        const products = await requestGenerico.get("/tour/buscartodos");
        return products;
    }
    catch(error){
        throw error.response?.data || error.message;
    }
},

async updateProduct(id, product){
    try{
        const updateProduct = await requestGenerico.put(`/tour/modificar/${id}`, product);
        return updateProduct;
    }
    catch(error){
        throw error.response?.data || error.message;    
    }
},

async deleteProduct(id){
    try{
        const deleteProduct = await requestGenerico.put(`/tour/eliminar/${id}`)
        return deleteProduct;
    }
    catch(error){
        throw error.responsess?.data || error.message;
    }
}

}