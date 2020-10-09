import React, { useState } from 'react'
import RadioButton from '../Buttons/RadioButton'
import { Collapse, Button} from 'reactstrap'
import './sectionChild.css'

const SectionChild = (props) => {


    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <div className="frequencyDiv">
            <p>En quelle section est-il ? </p>
          

        <Button id='toggle_btn_chev'color="transparent" onClick={() => setIsOpen(!isOpen)} style={{ marginBottom: '1rem' }}>
            <svg className="bi bi-chevron-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        </Button>
        </div>


        <Collapse isOpen={isOpen}> 

            <div className='select_frequency'>

                <RadioButton
                radioButtonText="Maternelle"
                radioButtonValue="Maternelle"
                radioButtonName="section"
                radioButtonId="maternelle"
                onClick={props.onClick}
                />

                <RadioButton
                radioButtonText="Primaire"
                radioButtonValue="Primaire"
                radioButtonName="section"
                radioButtonId="primaire"
                onClick={props.onClick}
                />

                <RadioButton
                radioButtonText="College"
                radioButtonValue="College"
                radioButtonName="section"
                radioButtonId="college"
                onClick={props.onClick}
                />

            </div>   
      </Collapse>     

    </>)
}

export default SectionChild