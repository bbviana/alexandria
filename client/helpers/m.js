/**
 * se condition for true, faz o merge de obj2 com obj1. Se nao, devolve obj1.
 *
 * var result = m(obj1, condition && obj2)
 *
 *
 * @returns objeto resultante de um merge entre os arguments recebidos que não forem false
 */
export default function(){
    var res = {}
    for(var i = 0; i < arguments.length; i++){
        if(arguments[i]){
            Object.assign(res, arguments[i])
        }
    }
    return res
}
