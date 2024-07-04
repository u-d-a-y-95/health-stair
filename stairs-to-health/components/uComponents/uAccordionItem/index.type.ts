export type UAccordionItemProps = {
  id: number;
  title: string;
  url?: string;
  data: { title: string };
  expanded: number;
  onExpanded: (id: number) => void;
};
