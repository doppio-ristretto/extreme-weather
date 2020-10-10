const stage = document.querySelector('.container')
const fragment = document.createDocumentFragment();
const grid = [20,20];
const col = grid[0];
const row = grid[1];
const field = col * row;

for(let i = 0; i < field; i++) {
    const div = document.createElement('div');
    fragment.appendChild(div);
    div.ClassName = "tail";
} 

stage.appendChild(fragment);

const stageAnimation = anime.taimeline({
    targets: 'tail',
    easing: 'easeInBack',
    delay: anime.stagger(10, { from: 'last'}),
    duration:2000,
    endDelay: 1000,
    loop:true,
    autoplay: false,
})
    .add({
    translateX:() => anime.random(-250,250),
    translateY: () =>anime.random(-250,250),
    delay: anime.stagger(200, {grid: grid, from:
    'last'}),
    scale: 0.5,
    backgroundColor: "#15ffa5",
    borderRadius:"50%",
    })
    .add ({
        targets:stage,
        rotate: 180,
        easing: 'easeOutBounce',
    });


   stageAnimation.play();