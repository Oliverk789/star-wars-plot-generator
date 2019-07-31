import React from "react";
import {Message, Icon, Header} from "semantic-ui-react";

const LoadingSpinner = () => {
    return(
        <div className="loading-spinner main-component">
            <Message>
              <Header as="h2" icon>
                <Icon name='circle notched' loading size="massive"/>
                Please wait while we are fetching the data...
              </Header>
            </Message>
        </div>
    );
}

export default LoadingSpinner;