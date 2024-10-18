export type BreadcrumbItem = {
    label: string;
    href?: string; // href is optional for the last item (current page)
  };
  
  export type BreadcrumbProps = {
    items: BreadcrumbItem[]; // Array of breadcrumb items
    separator?: React.ReactNode; // Optional custom separator (default: ChevronRight)
  };