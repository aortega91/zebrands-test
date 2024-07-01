import { PRIMARY_COLOR } from '@/src/utils/constants';

type TPageButton = {
  page: number;
  isSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelect: (page: number) => void;
}

export default function PageButton({ page, isSelected, onSelect }: TPageButton) {
  // className="relative z-10
  // inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold
  // text-white focus:z-20 focus-visible:outline focus-visible:outline-2
  // focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

  const onClick = () => {
    onSelect(page);
  };

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      key={page}
      href="#"
      style={isSelected ? { backgroundColor: PRIMARY_COLOR, color: 'white' } : {}}
      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-10 focus:z-20 focus:outline-offset-0 "
      onClick={onClick}
    >
      {page}
    </a>
  );
}
