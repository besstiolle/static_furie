// Some code could be here ...
var body = document.body.innerHTML
var start = body.length
var dico = new Map()
var weight = null
var orders = null
var g = ["«","»","“","”","ʹ","͵","·",";","Α","Β","Γ","Δ","Ε","Ϛ","Ϝ","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ϟ","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω","Ϡ","α","β","ϐ","γ","δ","ε","ϛ","ϝ","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ϟ","ρ","σ","ς","τ","υ","φ","χ","ψ","ω","ϡ"]
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
    weight.set(key, key.length * (value - 1) -9) // -1 car poid du dico, -9 
}

var solvetxt = "new Map(["

for(let i = 0; i < g.length; i++){
    weight = new Map()
    dico = getDic(body).forEach(getWeigth)
    orders = new Map([...weight.entries()].sort((a, b) => b[1] - a[1])); 
    let [key, value] = orders.entries().next().value
    body = body.split(key).join(g[i])
    console.info("replace : `" + key + "` by `" + g[i] + "` for an expected gain of " + value + " octets")
    if(i>0){
        solvetxt+=","
    }
    solvetxt+="['" + g[i] + "', '" + key + "']"   
}
solvetxt +="])"


console.info(start + " - " + body.length)
console.info(solvetxt)

var b = body
var s = new Map([['«', 'e '],['»', '><'],['“', 'es'],['”', ' class="'],['ʹ', 'a href="'],['͵', 'on'],['·', ' d'],[';', 'en'],['Α', 'an'],['Β', '</'],['Γ', 'https://'],['Δ', 'er'],['Ε', 'imag'],['Ϛ', '»/'],['Ϝ', 't '],['Ζ', '“ '],['Η', 'ti'],['Θ', 'li'],['Ι', 'spΑ'],['Κ', 'co'],['Λ', 'in'],['Μ', '">'],['Ν', 's '],['Ξ', 'qu'],['Ο', 'ou'],['Π', 'ai'],['Ϟ', 'le'],['Ρ', 'or'],['Σ', 'div'],['Τ', '»ʹΓkdΑezis'],['Υ', 'un'],['Φ', '="'],['Χ', 'l«'],['Ψ', '·«'],['Ω', 'ar'],['Ϡ', 'appel'],['α', ' s'],['β', 'te'],['ϐ', 'Βa'],['γ', '»p>'],['δ', '/imgs/Ϟav“'],['ε', 'de'],['ϛ', 'as'],['ϝ', 'pr'],['ζ', 'hall;g'],['η', 'web'],['θ', 'm;'],['ι', 't«'],['κ', 'ag'],['λ', '»Θ»ʹ'],['μ', 'tr'],['ν', 'la '],['ξ', 'headΔ'],['ο', '"»'],['π', 'Η͵'],['ϟ', 'ur'],['ρ', 'id'],['σ', 'Ι>\n<Ι'],['ς', 'Βp'],['τ', '“-'],['υ', 'po'],['φ', 're'],['χ', 'ϐϚ'],['ψ', ', '],['ω', 'c͵'],['ϡ', 'au']])


r=(e=>{let l=e.next().value;if(null!=l){let[t,i]=l;r(e),b=b.split(t).join(i)}}),r(s.entries());
/*
r = (i) => {
    let n = i.next().value
    if(n != undefined){
        let [k, v] = n
        r(i)
        body = body.split(k).join(v)
    }
}

r(s.entries())
*/
console.info(start + " - " + b.length)