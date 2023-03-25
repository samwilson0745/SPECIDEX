//Define our LabelMap

const labelMap={
    1:{
        name:'Dog',
        color:'red'
    },
    2:{
        name:'Cat',
        color:'blue'
    },
    3:{
        name:'Cheetah',
        color:'green'
    },
    4:{
        name:'Chicken',
        color:'yellow'
    },
    5:{
        name:'Cow',
        color:'lime'
    },
    6:{
        name:'Elephant',
        color:'white'
    } ,
    7:{
        name:'Human',
        color:'black'
    },   
}

//Define a drawing function
export const drawRect = (boxes,classes,scores,threshold,imgWidth,imgHeight,ctx)=>{
    for(let i=0;i<=boxes.length;i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            //Extract variables
            const[y,x,height,width] = boxes[i]
            const text= classes[i]

            //Set Styling 
            ctx.strokeStyle=labelMap[text]['color']
            ctx.lineWidth=10 //thickness of the line
            ctx.fillStyle='white'
            ctx.font='30px Arial'
            
            //Draw!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100,x*imgWidth,y*imgHeight-10)
            ctx.rect(x*imgWidth,y*imgHeight,width*imgWidth/2,height*imgHeight/1.5);
            ctx.stroke()


            

        }
    }
}