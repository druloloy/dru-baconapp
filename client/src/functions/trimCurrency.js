const trimCurrency = (value)=>{
    value = value.toString().split('.');
    if(value[0].length === 3&&value[1]==='00') return parseFloat(value);
    let str = '';
    let ctr = 0;
    for(let v=value[0].length-1; v>=0; v--){
       
        if(ctr===3) {
            str+=','
            ctr=0;
        }
        str+=value[0][v]
        ctr++;
    } 
    value[0] = str.split('').reverse().join('');
    return value.join('.');
}
export default trimCurrency