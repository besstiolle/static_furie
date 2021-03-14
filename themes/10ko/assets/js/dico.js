var body = document.body.parentElement.innerHTML
var start = body.length
var dico = new Map()
var weight = null
var orders = null

//Grec Dictionnary
//var g = ["«","»","“","”","ʹ","͵","·",";","Α","Β","Γ","Δ","Ε","Ϛ","Ϝ","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ϟ","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω","Ϡ","α","β","ϐ","γ","δ","ε","ϛ","ϝ","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ϟ","ρ","σ","ς","τ","υ","φ","χ","ψ","ω","ϡ"]

//Latin Dictionnary (better)
var g = ["¡","¢","£","¤","¥","¦","§","¨","©","ª","«","¬","®","¯","°","±","²","³","´","µ","¶","·","¸","¹","º","»","¼","½","¾","¿","À","Á","Â","Ã","Ä","Å","Æ","Ç","È","É","Ê","Ë","Ì","Í","Î","Ï","Ð","Ñ","Ò","Ó","Ô","Õ","Ö","×","Ø","Ù","Ú","Û","Ü","Ý","Þ","ß","à","á","â","ã","ä","å","æ","ç","è","é","ê","ë","ì","í","î","ï","ð","ñ","ò","ó","ô","õ","ö","÷","ø","ù","ú","û","ü","ý","þ","ÿ"]


let getDic = (str) => {
    let slice = ""
    let word = ""
    let innerdico = new Map()
    for(let i = 0; i < str.length ; i++){
        slice = str.substring(i, i+11);
        for(let j=2; j < slice.length; j++){
            word = slice.substring(0, j)
            if(innerdico.has(word)){
                innerdico.set(word, innerdico.get(word) + 1 )
            } else {
                innerdico.set(word, 1 )
            }
        }
    }
    return innerdico
}

let getWeigth = (value, key, map) => {
    weight.set(key, key.length * (value - 1) -9) // -1 car poids du dico, -9 
}

var dicoMap = "new Map(["

for(let i = 0; i < g.length; i++){
    if(body.includes(g[i])){
        console.info("drop " + g[i])
        continue
    }
    weight = new Map()
    dico = getDic(body).forEach(getWeigth)
    orders = new Map([...weight.entries()].sort((a, b) => b[1] - a[1])); 
    let [key, value] = orders.entries().next().value
    body = body.split(key).join(g[i])
    console.info("replace : `" + key + "` by `" + g[i] + "` for an expected gain of " + value + " octets")
    if(i>0){
        dicoMap+=","
    }
    dicoMap+="['" + g[i] + "', '" + key + "']"   
}
dicoMap +="])"

body = '<!doctype html><body></body><script>var b=`' + body + '`;var s=' + dicoMap.replaceAll('\n',"\\n") + ';r=(e=>{let l=e.next().value;if(null!=l){let[t,i]=l;r(e),b=b.split(t).join(i)}}),r(s.entries());document.body.parentElement.innerHTML=b</script>'

console.info(" Before : " + start + " After : " + body.length)
console.info(" new HTML :")
console.info(body)
