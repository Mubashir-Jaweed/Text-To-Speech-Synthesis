// init SpeechSynthesis API
const synth =  window.speechSynthesis;

//Dom Element
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body')

//Init voices array
let voices = []

const getVoices = () =>{
    voices = synth.getVoices()

    // loop Through voices and create an option for each one
    voices.forEach(voice =>{
        // create an option element
        const option = document.createElement('option')
        // fill option with voices and lang
        option.textContent = voice.name + '('+ voice.lang +')'

        //set needed option attributes
        option.setAttribute('data-lang',voice.lang)
        option.setAttribute('data-name',voice.name)
        voiceSelect.appendChild(option)
    })
}

getVoices()
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices
}

// Speak 
const speak = ()=>{
   
    //Check if speaking
    if(synth.speaking){
        console.error('already speaking')
        return
    }

    if(textInput.value !== ''){
        //add bacground animation
        body.style.background = '#000000 url(http://gifimage.net/wp-content/uploads/2017/10/music-gif.gif)'
        body.style.backgroundRepeat = 'repeat-x'
        body.style.backgroundSize = '100% 100%'
        // get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value)
        

        // speak error
        speakText.onerror= e =>{
            console.error('error in speaking')
        }
        //speak end
        speakText.onend = e =>{
            console.log('Done Speaking')
            body.style.background = '#000000'

        }
        //selected voice
        const SelectedVoice = voiceSelect.selectedOptions[0]
        .getAttribute('data-name')

        //loop Through voices
        voices.forEach(voice =>{
            if(voice.name === SelectedVoice){
                speakText.voice = voice
            }
        })

        // set pitch and rate
        speakText.rate = rate.value
        speakText.pitch = pitch.value
        //Speak
        synth.speak(speakText)
    }
}

// event listener

//text form submit
textForm.addEventListener('submit',e =>{
    e.preventDefault();
    speak();
    textInput.blur()
})

// value changes
rate.addEventListener('change',e=>rateValue.textContent = rate.value)
pitch.addEventListener('change',e=>pitchValue.textContent = pitch.value)


// voice select change
voiceSelect.addEventListener('change',e=> speak())

