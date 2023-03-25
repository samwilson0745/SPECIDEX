import React, { useRef,useState } from 'react';
import * as tf from "@tensorflow/tfjs";
const labelMap={
  1:{
      name:'Dog',
      color:'red',
      description:'Dogs (Canis lupus familiaris) are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time, and were the first animals ever to be domesticated. There are different studies that suggest that this happened between 15.000 and 100.000 years before our time. The dingo is also a dog, but many dingos have become wild animals again and live independently of humans in the range where they occur (parts of Australia).',
  },
  2:{
      name:'Cat',
      color:'blue',
      description:'The cat (Felis catus) is a domestic species of a small carnivorous mammal.It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family.[4] A cat can either be a house cat, a farm cat or a feral cat; the latter ranges freely and avoids human contact.[5] Domestic cats are valued by humans for companionship and their ability to kill rodents. About 60 cat breeds are recognized by various cat registries.',      
  },
  3:{
      name:'Cheetah',
      color:'green',
      description:'The cheetah (Acinonyx jubatus) is a large cat native to Africa and central Iran. It is the fastest land animal, estimated to be capable of running at 80 to 128 km/h (50 to 80 mph) with the fastest reliably recorded speeds being 93 and 98 km/h (58 and 61 mph), and as such has several adaptations for speed, including a light build, long thin legs and a long tail. It typically reaches 67–94 cm (26–37 in) at the shoulder, and the head-and-body length is between 1.1 and 1.5 m (3 ft 7 in and 4 ft 11 in). Adults weigh between 21 and 72 kg (46 and 159 lb). Its head is small and rounded, and has a short snout and black tear-like facial streaks. The coat is typically tawny to creamy white or pale buff and is mostly covered with evenly spaced, solid black spots. Four subspecies are recognised.',
  },
  4:{
      name:'Chicken',
      color:'yellow',
      description:'The chicken (Gallus domesticus) is a domesticated bird, with attributes of wild species such as the red and grey junglefowl that are originally from Southeastern Asia. Rooster or cock is a term for an adult male bird, and a younger male may be called a cockerel. A male that has been castrated is a capon. An adult female bird is called a hen and a sexually immature female is called a pullet.',
  },
  5:{
      name:'Cow',
      color:'lime',
      description:'Cattle (Bos taurus) are large, domesticated, cloven-hooved, herbivores. They are a prominent modern member of the subfamily Bovinae and the most widespread species of the genus Bos. Adult females are referred to as cows and adult males are referred to as bulls.',
      
  },
  6:{
      name:'Elephant',
      color:'white',
      description:'Elephants are the largest existing land animals. Three living species are currently recognised: the African bush elephant, the African forest elephant, and the Asian elephant. They are an informal grouping within the proboscidean family Elephantidae. Elephantidae is the only surviving family of proboscideans; extinct members include the mastodons. Elephantidae also contains several extinct groups, including the mammoths and straight-tusked elephants. African elephants have larger ears and concave backs, whereas Asian elephants have smaller ears, and convex or level backs. The distinctive features of all elephants include a long proboscis called a trunk, tusks, large ear flaps, massive legs, and tough but sensitive skin. The trunk is used for breathing, bringing food and water to the mouth, and grasping objects. Tusks, which are derived from the incisor teeth, serve both as weapons and as tools for moving objects and digging. The large ear flaps assist in maintaining a constant body temperature as well as in communication. The pillar-like legs carry their great weight.',
      
  } ,
  7:{
      name:'Human',
      color:'black',
      description:'Humans (Homo sapiens) are the most abundant and widespread species of primate, characterized by bipedalism and large, complex brains. This has enabled the development of advanced tools, culture, and language. Humans are highly social and tend to live in complex social structures composed of many cooperating and competing groups, from families and kinship networks to political states. Social interactions between humans have established a wide variety of values, social norms, and rituals, which bolster human society. Curiosity and the human desire to understand and influence the environment and to explain and manipulate phenomena have motivated humanitys development of science, philosophy, mythology, religion, and other fields of study.',
      
  },   
}

export default function Upload(){
  
  const [imageURL,setImageURl] = useState(null);
  const imageRef = useRef();
  const [result,setResult] = useState(null);
  const [description,setDescription] = useState(null);
  const [logoURL,setLogoURL]=useState(null)
  
  const imageDetect = async ()=>{
      const model = await tf.loadGraphModel('http://127.0.0.1:8081/model.json');
      if(imageURL!==null){
        const image = imageRef.current
        const img = tf.browser.fromPixels(image)
      const resized = tf.image.resizeBilinear(img,[640,480])
      const casted = resized.cast('int32')//to perform out model a little bit better
      const expanded = casted.expandDims(0)//this is the pre proccessed image
      const obj = await model.executeAsync(expanded)
      const classes =  await obj[4].array()
      setResult(labelMap[(classes[0])[0]].name)
      setDescription(labelMap[(classes[0])[0]].description)
      setLogoURL(labelMap[(classes[0])[0]].logo)

    }
  }
  
  const handleChange =(event)=>{
    if(event.target.files[0] == null){
      setImageURl(null)
      setResult(null)
      setDescription(null)
    }
    else{
      setImageURl(URL.createObjectURL(event.target.files[0]))
    }
  }

  return (
    <div>
      <div>
        <input type="file" onChange={handleChange}/>
      </div><br/>
      <div style={{display:'flex'}}>
        <div>
          <img ref={imageRef} src={imageURL} height={'400px'} width={'400px'} alt="No Image"
            style={{objectFit:'contain'}}
          />
        </div>
        <div style={{margin:'1rem 2rem 2rem 3rem'}}>
          <div style={{display:'flex'}}>
            <h1 style={{marginBottom:'1rem'}}>{result}</h1>
          </div>
          <p>{description}</p>
        </div>
      </div><br/>
      <button className='button' onClick={()=>{imageDetect()}}>Predict</button>
    </div>
  );
}