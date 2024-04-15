const birth = new URLSearchParams(window.location.search)
let birthName = birth.get("name")
let birthYear = parseInt(birth.get("years"))
if(!birthName){
    birthName = prompt("Escribe tu nombre:")
}
if(!birthYear){
    birthYear = prompt("Tu edad:")
}
const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#800000",
    "#000080",
    "#808000",
    "#808080",
    "#C0C0C0",
    "#FFC0CB",
    "#008080",
    "#FFD700",
    "#4B0082",
    "#A52A2A",
    "#6B8E23",
    "#2F4F4F",
    "#8B0000",
    "#556B2F",
    "#9932CC",
    "#8B008B",
    "#4682B4",
    "#DAA520",
    "#A9A9A9",
    "#DC143C",
    "#B8860B",
    "#5F9EA0",
    "#F4A460",
    "#BDB76B",
    "#ADFF2F",
    "#D2691E",
    "#32CD32",
    "#BA55D3",
    "#DB7093",
    "#8A2BE2",
    "#87CEEB",
];

const canvas = document.getElementById("play")
const ctx = canvas.getContext("2d")


canvas.width = window.innerWidth
canvas.height = window.innerHeight

//-------------------------------------------------------------
class Explosion{
    constructor(x,y,color,size){
        this.F = (n=7) => Math.random()*n
        this.x = x;
        this.y = canvas.height 
        this.color = color;
        this.size = size;
        this.acceleration = .3
        this.speed = this.size * this.F() * this.acceleration
        this.directionX = ((Math.random() * 20)-10)*this.acceleration
    }
    move(){
        if(this.y > canvas.height * 1.2){
            this.x = Math.random() * window.innerWidth
            this.y = canvas.height
            this.size = (Math.random()*15).toFixed(0)
            this.speed = this.size * this.F()  * this.acceleration
            return
        }
        this.x += this.directionX
        this.speed-= this.acceleration
        this.y -= this.speed
    }
    draw(){
        this.move()
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2)
        ctx.fill()
        ctx.closePath()
    }
}
function MakeExplosion(amount = 100){
    const randInt = (n=15) => (Math.random() * n).toFixed(0)
    const x = () => Math.random() * window.innerWidth
    const y = () => Math.random() * window.innerHeight
    const color = () => colors[randInt(colors.length)]
    const size = () => randInt()
    let array = Array.from({length:amount}, 
        () => new Explosion(x(), y(), color(), size() ))
    return array
}


//-------------------------------------------------------------
class WriteName{
    constructor(name,color,stroke=0,size=1, y=1, animate = true){
        this.name = name
        this.color = color
        this.stroke = stroke
        this.size = size
        this.y = canvas.height * y / 100
        this.time = 0.02
        this.maxSize = this.size * 1.2
        this.minSize = this.size * 0.8
        this.animate = animate
    }
    playSize(){
        if(this.increment && this.size<this.maxSize){
            this.size += this.time
        }
        else if(this.increment && this.size>this.maxSize){
            this.increment = false
            this.size -= this.time
        }
        else if(!this.increment && this.size>this.minSize){
            this.size -= this.time
        }
        else if(!this.increment && this.size<this.minSize){
            this.increment = true
            this.size += this.time
        }
    }
    draw(){
        const centerx = canvas.width/2
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.font = `${this.size}vw Wendy One, sans-serif`
        ctx.textAlign = "center"
        ctx.fillText(this.name, centerx, this.y)
        if(this.stroke){
            ctx.strokeStyle = this.stroke
            ctx.lineWidth = 2;
            ctx.strokeText(this.name, centerx, this.y)
        }
        ctx.closePath()
        if(this.animate)
            this.playSize()
    }
}


//-------------------------------------------------------------
const song = new Audio('./song.mp3')
song.volume=0.5
song.loop=true
song.currentTime=0


//-------------------------------------------------------------
const explosions = MakeExplosion(150)
const board = new WriteName("Feliz Cumpleaños","#fff","#000",7,20,0)
const salutation = new WriteName(birthName,"#f00","#222",18, 50)
const nmb = new WriteName(birthYear,"#fff","#000",12,70,0)

function Animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    explosions.forEach(ex => ex.draw()) 
    board.draw()
    salutation.draw()
    nmb.draw()
    requestAnimationFrame(Animate)
    song.play()
}
Animate()

const Ballons = `<div class="ballon"><span></span><span></span><span></span></div>`
document.body.append(Ballons)
