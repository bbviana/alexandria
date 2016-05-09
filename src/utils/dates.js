export function timeAgo(date) {
    const seconds = Math.floor((Date.now() - date) / 1000)
    
    if(seconds < 0){
        throw "Data inválida. Só são aceitas datas no passado."
    }

    let interval = Math.floor(seconds / 31536000)

    if (interval > 1) {
        return `há ${interval} anos`
    }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1) {
        return `há ${interval} meses`
    }
    interval = Math.floor(seconds / 86400)
    if (interval > 1) {
        return `há ${interval} dias`
    }
    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
        return `há ${interval} horas`
    }
    interval = Math.floor(seconds / 60)
    if (interval > 1) {
        return `há ${interval} minutos`
    }

    if(seconds <= 5){
        return 'agora'
    }

    return `há ${Math.floor(seconds)} segundos`
}