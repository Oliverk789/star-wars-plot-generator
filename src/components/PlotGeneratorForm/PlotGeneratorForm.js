import React, {Component} from "react";
import ressourceArraySorter from "../../utils/ressourceArraySorter";
import {Dropdown, Message, Button,Form, Icon, Segment} from "semantic-ui-react";

class PlotGeneratorForm extends Component{
    
    state = {
        selectedPersonId: "",
        selectedPlanetId:"",
        displayIncompleteFormAlert: false, 
    }
    
    handleChange =  (event, { name, value }) => {
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

        const {selectedPersonId, selectedPlanetId} = this.state;
        const {saveSelectedRessources, showEmptyForm} = this.props;
        
        // selectPersonId && selectPlanetId alone would evaluate to false for first person or planet (index == 0). 
        if(selectedPersonId !== "" && selectedPlanetId !== ""){
            
            saveSelectedRessources(selectedPersonId, selectedPlanetId);
            showEmptyForm(true);

            this.setState({
                selectedPersonId: "", 
                selectedPlanetId: "",
                displayIncompleteFormAlert: false
            });
        }else{
            this.setState({displayIncompleteFormAlert: true});
        }
    }
    
    render(){
        const {selectedPersonId, selectedPlanetId, displayIncompleteFormAlert} = this.state;
        const {people, planets} = this.props;
        
        const orderedPeopleArray = people.sort(ressourceArraySorter);
        const peopleList = orderedPeopleArray.map((person, i) => {
            return {
                key: i,
                value: i, 
                text: person.name
            };
        });
        
        const orderedPlanetsArray = planets.sort(ressourceArraySorter);
        const planetsList = orderedPlanetsArray.map((planet, i) => {
            return {
                key: i,
                value: i, 
                text: planet.name
            };
        });
        
        const incompleteFormAlert = (
            <div className="incomplete-form-alert">
                <Message icon negative>
                    <Icon name='circle warning' />
                    <Message.Content>
                        <Message.Header>Please fill out the form!</Message.Header>
                        We need you to select a character and a planet for the plot. 
                    </Message.Content>
                </Message>      
            </div>
        );

        return (
            <div className="plot-generator-form main-component">
                <Segment inverted>
                    <Message className="form-description" color="yellow">
                        <Message.Content>
                            <Message.Header>Welcome to the Star Wars Plot Generator!</Message.Header> 
                            Please select a character and a planet in the form below and we will 
                            generate a corresponding movie plot for you. The plot will be based
                            on the properties of the selected character (name, hair color, etc.) and 
                            planet (name, population, etc.), as well as a randomly chosen 
                            ending. Have fun! 
                        </Message.Content> 
                    </Message>
                    {displayIncompleteFormAlert && incompleteFormAlert}
                    <Form inverted onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label htmlFor="selectedPersonId">Character: </label>
                            <Dropdown
                                error={selectedPersonId ==="" && displayIncompleteFormAlert ? true : false}
                                id="selectedPersonId"
                                name="selectedPersonId"
                                value={selectedPersonId}
                                onChange={this.handleChange}
                                placeholder="Select the story's character"
                                fluid
                                search
                                selection
                                options={peopleList}
                              />
                        </Form.Field>
                        <br/>
                        <Form.Field>
                            <label htmlFor="selectedPlanetId">Planet: </label>
                            <Dropdown
                                error={selectedPlanetId ==="" && displayIncompleteFormAlert ? true : false}
                                id="selectedPlanetId"
                                name="selectedPlanetId"
                                value={selectedPlanetId}
                                onChange={this.handleChange}
                                placeholder="Select the story's planet"
                                fluid
                                search
                                selection
                                options={planetsList}
                              />
                         </Form.Field>
                         <br/>
                         <Button fluid color="yellow" content="Generate plot" />
                    </Form>
                </Segment>
            </div>
        );
    }
}

export default PlotGeneratorForm;