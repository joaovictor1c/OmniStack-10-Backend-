module.exports = (arrayAsString) =>{
    console.log(arrayAsString)
    return arrayAsString.split(',').map( tech => tech.trim())
}