import { faqdata } from '@/constants/faq';
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



interface FaqItem {
  question: string;
  answer: string;
}



const Faq = ()=>{
  return (
    <div className=' container mx-auto py-12  w-full '>
    <h2 className='text-5xl text-primary font-medium mb-8 '>Frequently Asked Questions</h2> 
    
    <ul>
      {faqdata.map((faq: FaqItem, index:number)=>
       <li>
           <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className='font-medium text-xl focus-within:bg-primary focus-within:text-white mt-4 '
        >
        <h1>{faq.question}</h1>
        </AccordionSummary>
        <AccordionDetails className='px-10 text-lg border-xl'>
        <h3>{faq.answer}</h3>
        </AccordionDetails>
      </Accordion>
       </li>
      )}
    </ul>
    </div>

  )
}

export default Faq;