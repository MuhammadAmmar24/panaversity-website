export type FaqItem = {
    question: string;
    answer: string;
  }
  
  export type AccordionItemProps = {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
  }