import React, {Component} from "react"; 
import "./PlotGenerator.css";
import axios from "axios";
import PlotGeneratorForm from "../PlotGeneratorForm/PlotGeneratorForm";
import Plot from "../Plot/Plot"; 
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"; 


class PlotGenerator extends Component{
    
    state = {
        people: [],
        planets: [],
        totalNumberOfPeople: null,
        totalNumberOfPlanets: null,
        ressourcesHaveLoaded: false,
        
        selectedPerson: null, 
        selectedPlanet: null, 
        selectionCompleted: false
    };
    
    loadRessources = (url, ressourceType) => {
        axios.get(url)
            .then(response => {
        		const totalCount = "totalNumberOf" + 
        		    ressourceType.charAt(0).toUpperCase() + 
        			ressourceType.slice(1);
                
                if(response.data.next){
                    this.loadRessources(response.data.next, ressourceType);
                }
                
                if(!this.state[totalCount]){
                    this.setState({
                        [totalCount]: response.data.count
                    });
                }
                
                this.setState({
                    [ressourceType]: [...this.state[ressourceType], ...response.data.results]
                });
                
                
                const {people, planets, totalNumberOfPeople, totalNumberOfPlanets} = this.state;
                if(people.length === totalNumberOfPeople && planets.length === totalNumberOfPlanets){
                    this.setState({
                        ressourcesHaveLoaded: true
                    }); 
                } 

            });    
    }
    
    saveSelectedRessources = (selectedPersonIndex, selectedPlanetIndex) => {
        const {people, planets} = this.state;
        const selectedPerson = people[selectedPersonIndex];
        const selectedPlanet = planets[selectedPlanetIndex];
        
        this.setState({
            selectedPerson: selectedPerson, 
            selectedPlanet: selectedPlanet
        }); 
    } 
    
    showEmptyForm = (value) => {
        this.setState({
            selectionCompleted: value
        });
    }
    
    componentDidMount(){
        this.loadRessources("https://swapi.co/api/people/", "people");
        this.loadRessources("https://swapi.co/api/planets/", "planets");
    }
    
    render(){
        const {people, planets, ressourcesHaveLoaded, selectedPerson, selectedPlanet, selectionCompleted} = this.state;
        
        if(!ressourcesHaveLoaded){
            return(
                <div>
                    <LoadingSpinner />
                </div>
            );
        }
        
        if(selectionCompleted){
            return(
                <div>
                    <Plot 
                        selectedPerson={selectedPerson}
                        selectedPlanet={selectedPlanet} 
                        showEmptyForm={this.showEmptyForm} 
                    />
                </div>       
            );
        }
        
        return (
            <div>
                <PlotGeneratorForm
                    people={people}
                    planets={planets} 
                    saveSelectedRessources={this.saveSelectedRessources}
                    showEmptyForm={this.showEmptyForm}
                /> 
            </div>
        );
        
    }
}

export default PlotGenerator;