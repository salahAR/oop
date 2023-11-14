var count = 1, partOfSpeechArea, definitionsArea, exampleArea, antonymArea, synonymArea

function findMeaning(){
    document.getElementById("result_area").innerHTML = ""
    var query = document.getElementById("search").value

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
    .then((response) => response.json())
    .then((data) => {

        var word = data[0].word
        var audio = data[0].phonetics[0].audio
        var url = data[0].sourceUrls
        document.getElementById("word").innerHTML = word
        document.getElementById("audioData").src = audio
        document.getElementById("urlData").href = url
        document.getElementById("urlData").innerHTML = "Wiktionary page"
        document.getElementById("search_result").style.display = "block"

        var length = data[0].meanings.length //find the length for looping condition
        for(var i = 0; i<length ; i++){
            var partOfSpeech = data[0].meanings[i].partOfSpeech
            partOfSpeechArea = document.createElement("p")
            partOfSpeechArea.innerText = partOfSpeech
            partOfSpeechArea.setAttribute("style", "font-style:italic;")
            document.getElementById("result_area").appendChild(partOfSpeechArea) //append content to p tag in html
            
            var definitions_length = data[0].meanings[i].definitions.length
            for(var y = 0; y < definitions_length ; y++){
                var definition = data[0].meanings[i].definitions[y].definition //fetch meaning in definitions array
                definitionsArea = document.createElement("p")
                definitionsArea.innerText =  count + ". " + definition
                document.getElementById("result_area").appendChild(definitionsArea)
                count+=1
                
                var example = data[0].meanings[i].definitions[y].example
                if (example != null){ //if there is an example for the meaning, append the example under the meaning
                    
                    exampleArea = document.createElement("p")
                    exampleArea.innerText = "example: " + example
                    exampleArea.setAttribute("style", "font-style:italic;font-size:22px;font-weight:lighter;")
                    document.getElementById("result_area").appendChild(exampleArea)
                }
                else {
                    document.getElementById("result_area").appendChild(document.createElement("br"))
                }
            }
            
        }
        document.getElementById("result_area").appendChild(document.createElement("br"))

        var antonyms = data[0].meanings[0].antonyms
        if (antonyms != ""){
            antonymArea = document.createElement("p")
            antonymArea.innerText = "antonyms: " + antonyms
            document.getElementById("result_area").appendChild(antonymArea)
        }
        count = 1
    })
}

function findSynonyms(){
    document.getElementById("result_area").innerHTML = ""
    var query = document.getElementById("search").value

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
    .then((response) => response.json())
    .then((data) => {

        var word = data[0].word
        var audio = data[0].phonetics[0].audio
        document.getElementById("audioData").src = audio
        document.getElementById("word").innerHTML = word
        document.getElementById("search_result").style.display = "block"

        var synonyms = data[0].meanings[0].synonyms
        if (synonyms != ""){
            synonymArea = document.createElement("p")
            synonymArea.innerText = "Synonyms: " + synonyms
            document.getElementById("result_area").appendChild(synonymArea)
        }
        else {
            synonymArea = document.createElement("p")
            synonymArea.innerText = "No synonyms found"
            document.getElementById("result_area").appendChild(synonymArea)
        }
        document.getElementById("result_area").appendChild(document.createElement("br"))
    })
}

function saveWord(){
    var content = document.getElementById("result_area").value
    var wordName = document.getElementById("word").value
    document.getElementById("fileName").placeholder = wordName
    document.getElementById("fileContents").placeholder = content
}