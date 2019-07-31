import React from "react"; 
import lightsaber from "../../assets/lightsaber.png"; 
import {Header, Image, Button, Segment} from "semantic-ui-react";

const Plot = ({selectedPerson, selectedPlanet, showEmptyForm}) => {

    const createPlot = () => {
        
        const gender = selectedPerson.gender === "female" ? "woman" : "man";
        const pronoun = selectedPerson.gender === "female" ? "she" : "he"; 
        const possesivePronoun = selectedPerson.gender === "female" ? "her" : "his"; 
    
        let population = selectedPlanet.population;
        if(population === "unknown"){
            population = "millions of";
        }
        population = population.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    
        if(selectedPerson.hair_color === "none"){
            selectedPerson.hair_color = "no";
        }
        
        if(selectedPerson.skin_color === "none"){
            selectedPerson.skin_color = "no"
        }
    
    
        const possibleEndings = ["happy", "bad"];
        const ending = possibleEndings[Math.floor(Math.random() * possibleEndings.length)];
    
        const plotIntro = "An unidentified group of rebels are trying to seize control of the planet " + 
            selectedPlanet.name + " and are spreading fear and terror. There are growing rumors that the rebels " +
            "have come into possession of a new deadly weapon of mass destruction and could jeopardize the life of the " +
            population + " inhabitants of the planet.";
    
        const characterDescription = {
            happy: "The protagnoist " +  selectedPerson.name + ", is a heroic " + gender + " with " + selectedPerson.hair_color + 
                 " hair and " + selectedPerson.skin_color + " skin, whose sympathy and solidarity are true to the people of " + 
                 selectedPlanet.name + ". As "  + pronoun + " learns of the events on " +selectedPlanet.name + ", " + pronoun + 
                 " decides to risk everything, to save the planet and its inhabitants.",
    
            bad: "The antagonist " +  selectedPerson.name + ", is a power-hungry " + gender + " with " + selectedPerson.hair_color + 
                " hair and " + selectedPerson.skin_color + " skin, which always wanted to conquer " + selectedPlanet.name + ", to strengthen " +
                possesivePronoun + " influence in the empire. As " + pronoun + " learns of the events on " + selectedPlanet.name + ", " +
                pronoun + " decides to risk everything, to finally dominate the planet and its inhabitants.",
        }; 
    
        const plotEndings = {
            happy: "When " + selectedPerson.name + " arrives on " + selectedPlanet.name + ", "  + pronoun + " finds the population in a panic. " + 
                "The rebels have announced terror attacks in an anonymous message. Through " + possesivePronoun + " ingenuity, " + pronoun + " manages " + 
                 "to uncover the identity of the rebels. At the last second, an attack can be prevented and with the help of the military, the rebels can be " + 
                "overwhelmed. The future of " + selectedPlanet.name + " is saved.", 
    
            bad: "When " + selectedPerson.name + " arrives on " + selectedPlanet.name + ", "  + pronoun + " finds the population in a panic. " + 
                "The rebels have announced terror attacks in an anonymous message. Through " + possesivePronoun + " ingenuity, " + pronoun + " manages to uncover the " +
                "identity of the rebels, trick them, and bring the weapon of mass destruction into " + possesivePronoun + " own possession. After an " +
                "attack with many victims, the military capitulates and " + selectedPerson.name + " takes over " + selectedPlanet.name + "." 
        }; 
    
        const titles = {
            happy: selectedPerson.name + " saves " + selectedPlanet.name, 
            bad: selectedPerson.name + " conquers " + selectedPlanet.name,
        };
        
    
        return {
            title: titles[ending], 
            introduction: plotIntro,
            characterDescription: characterDescription[ending],
            ending: plotEndings[ending]
        };
    }
    
    const plot = createPlot();
    
    return (
        <div className="plot main-component">
            <Segment inverted>
              <Header inverted as='h2'>
                <Image circular src={lightsaber} /> 
                {plot.title}
              </Header>
                <h3>Plot summary:</h3>
                <p>{plot.introduction} </p>
                <p>{plot.characterDescription} </p>
                <p>{plot.ending} </p>
                <p><strong>Selected ressources:</strong> {selectedPerson.name} (character), {selectedPlanet.name} (planet)</p>
                <Button onClick={() => showEmptyForm(false)} fluid color='yellow' content='Generate another plot' />
            </Segment>     
        </div>
    );
}

export default Plot;